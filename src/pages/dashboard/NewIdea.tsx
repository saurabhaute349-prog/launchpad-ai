import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Sparkles, Wand2, Loader2, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const examples = [
  "AI fitness app for busy professionals",
  "Marketplace for freelance climate scientists",
  "Subscription box for indie board games",
  "AI tutor for high-school chemistry",
];

const loadingPhrases = [
  "Brainstorming brand names…",
  "Hunting available domains…",
  "Crafting taglines…",
  "Drawing logo concepts…",
  "Designing landing copy…",
  "Defining your audience…",
  "Pricing your product…",
  "Mapping competitors…",
  "Writing growth hooks…",
  "Building pitch deck…",
];

export const NewIdea = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [params] = useSearchParams();
  const [idea, setIdea] = useState(params.get("seed") ?? "");
  const [loading, setLoading] = useState(false);
  const [phrase, setPhrase] = useState(loadingPhrases[0]);

  const generate = async () => {
    if (!user) return;
    if (idea.trim().length < 5) {
      toast.error("Tell us a bit more about your idea (min 5 chars).");
      return;
    }
    setLoading(true);
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % loadingPhrases.length;
      setPhrase(loadingPhrases[i]);
    }, 1400);

    try {
      const { data, error } = await supabase.functions.invoke("generate-startup", {
        body: { idea: idea.trim() },
      });
      clearInterval(interval);
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);

      const result = (data as any).result;
      const name = result?.brand_names?.[0]?.name ?? "Untitled startup";

      const { data: inserted, error: insertErr } = await supabase
        .from("projects")
        .insert({ user_id: user.id, idea: idea.trim(), name, result })
        .select("id")
        .single();
      if (insertErr) throw insertErr;

      toast.success("Your startup is ready!");
      navigate(`/dashboard/projects/${inserted.id}`);
    } catch (e: any) {
      clearInterval(interval);
      toast.error(e?.message ?? "Generation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">New idea</span>
        <h1 className="mt-2 text-3xl md:text-5xl font-display font-bold tracking-tight">
          What are you <span className="text-gradient-primary">building?</span>
        </h1>
        <p className="mt-3 text-muted-foreground">Describe your startup in one line. AI will handle the rest.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong rounded-3xl p-3 shadow-elegant"
      >
        <Textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="e.g. AI app that helps students focus during study sessions"
          rows={4}
          maxLength={600}
          disabled={loading}
          className="bg-transparent border-0 resize-none focus-visible:ring-0 text-base md:text-lg p-4"
        />
        <div className="flex flex-col md:flex-row gap-2 p-2 border-t border-border">
          <Button onClick={generate} disabled={loading} variant="hero" size="lg" className="flex-1">
            {loading ? (<><Loader2 className="w-4 h-4 animate-spin" /> {phrase}</>) : (<><Sparkles className="w-4 h-4" /> Generate full startup</>)}
          </Button>
          <Button variant="glass" size="lg" disabled={loading} onClick={generate}>
            <Wand2 className="w-4 h-4" /> Quick brand
          </Button>
        </div>
      </motion.div>

      <div className="mt-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Lightbulb className="w-4 h-4" /> Try one of these
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          {examples.map((e) => (
            <button
              key={e}
              onClick={() => setIdea(e)}
              disabled={loading}
              className="text-left p-3 rounded-lg glass hover:border-primary/40 transition-colors text-sm"
            >
              {e}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
