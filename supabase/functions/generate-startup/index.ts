import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are LaunchForge AI — an elite startup strategist, brand designer, and growth marketer.
Given a raw startup idea, you produce a complete, launch-ready brand & GTM package.
Be concrete, punchy, and investor-grade. No fluff. Use vivid, specific language.`;

const tools = [
  {
    type: "function",
    function: {
      name: "generate_startup_package",
      description: "Return a complete launch-ready startup package.",
      parameters: {
        type: "object",
        properties: {
          brand_names: {
            type: "array",
            description: "5 brand name candidates",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                rationale: { type: "string" },
              },
              required: ["name", "rationale"],
              additionalProperties: false,
            },
          },
          taglines: { type: "array", items: { type: "string" }, description: "5 punchy taglines" },
          domains: {
            type: "array",
            description: "8 domain suggestions",
            items: {
              type: "object",
              properties: {
                domain: { type: "string" },
                tld: { type: "string" },
              },
              required: ["domain", "tld"],
              additionalProperties: false,
            },
          },
          logo_concepts: {
            type: "array",
            description: "3 logo concept descriptions for designers/AI image gen",
            items: {
              type: "object",
              properties: {
                concept: { type: "string" },
                style: { type: "string" },
                prompt: { type: "string" },
              },
              required: ["concept", "style", "prompt"],
              additionalProperties: false,
            },
          },
          color_palette: {
            type: "array",
            description: "5 hex colors",
            items: {
              type: "object",
              properties: { name: { type: "string" }, hex: { type: "string" } },
              required: ["name", "hex"],
              additionalProperties: false,
            },
          },
          landing_copy: {
            type: "object",
            properties: {
              headline: { type: "string" },
              subheadline: { type: "string" },
              cta: { type: "string" },
              features: {
                type: "array",
                items: {
                  type: "object",
                  properties: { title: { type: "string" }, description: { type: "string" } },
                  required: ["title", "description"],
                  additionalProperties: false,
                },
              },
            },
            required: ["headline", "subheadline", "cta", "features"],
            additionalProperties: false,
          },
          usp: { type: "array", items: { type: "string" }, description: "3 unique selling points" },
          audience: {
            type: "array",
            description: "2 ICP personas",
            items: {
              type: "object",
              properties: {
                persona: { type: "string" },
                pains: { type: "string" },
                goals: { type: "string" },
              },
              required: ["persona", "pains", "goals"],
              additionalProperties: false,
            },
          },
          monetization: {
            type: "array",
            description: "Pricing tiers and revenue models",
            items: {
              type: "object",
              properties: {
                model: { type: "string" },
                price: { type: "string" },
                description: { type: "string" },
              },
              required: ["model", "price", "description"],
              additionalProperties: false,
            },
          },
          competitors: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                strength: { type: "string" },
                weakness: { type: "string" },
              },
              required: ["name", "strength", "weakness"],
              additionalProperties: false,
            },
          },
          social_handles: { type: "array", items: { type: "string" } },
          pitch_deck_summary: { type: "string", description: "Short investor pitch summary" },
          growth_hooks: { type: "array", items: { type: "string" }, description: "5 growth hacks" },
          seo_keywords: { type: "array", items: { type: "string" } },
          ad_copy: {
            type: "array",
            items: {
              type: "object",
              properties: { platform: { type: "string" }, copy: { type: "string" } },
              required: ["platform", "copy"],
              additionalProperties: false,
            },
          },
          launch_strategy: { type: "array", items: { type: "string" }, description: "5 viral launch tactics" },
        },
        required: [
          "brand_names",
          "taglines",
          "domains",
          "logo_concepts",
          "color_palette",
          "landing_copy",
          "usp",
          "audience",
          "monetization",
          "competitors",
          "social_handles",
          "pitch_deck_summary",
          "growth_hooks",
          "seo_keywords",
          "ad_copy",
          "launch_strategy",
        ],
        additionalProperties: false,
      },
    },
  },
];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { idea } = await req.json();
    if (!idea || typeof idea !== "string" || idea.length < 5 || idea.length > 600) {
      return new Response(JSON.stringify({ error: "Idea must be 5-600 characters." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Startup idea: "${idea}"\n\nGenerate the full launch-ready package.` },
        ],
        tools,
        tool_choice: { type: "function", function: { name: "generate_startup_package" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit hit. Please wait a moment and try again." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Add funds in workspace settings." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      return new Response(JSON.stringify({ error: "AI did not return structured output." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const result = JSON.parse(toolCall.function.arguments);
    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-startup error:", e);
    const msg = e instanceof Error ? e.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
