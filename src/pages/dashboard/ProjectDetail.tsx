import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, ArrowLeft, Download, Share2 } from "lucide-react";
import { toast } from "sonner";

type Result = any;
type Project = { id: string; name: string | null; idea: string; result: Result; created_at: string };

const CopyBtn = ({ text }: { text: string }) => (
  <Button size="icon" variant="ghost" className="h-7 w-7 shrink-0" onClick={() => { navigator.clipboard.writeText(text); toast.success("Copied"); }}>
    <Copy className="w-3.5 h-3.5" />
  </Button>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="glass rounded-2xl p-6">
    <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">{title}</h3>
    {children}
  </div>
);

export const ProjectDetail = () => {
  const { id } = useParams();
  const [p, setP] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data } = await supabase.from("projects").select("*").eq("id", id).maybeSingle();
      setP(data as Project | null);
      setLoading(false);
    })();
  }, [id]);

  const exportJson = () => {
    if (!p) return;
    const blob = new Blob([JSON.stringify(p.result, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${p.name ?? "startup"}.json`; a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div className="p-10 text-muted-foreground">Loading…</div>;
  if (!p) return <div className="p-10">Project not found. <Link to="/dashboard/projects" className="text-primary">Back</Link></div>;

  const r = p.result ?? {};

  return (
    <div className="p-6 md:p-10 max-w-6xl">
      <Button asChild variant="ghost" size="sm" className="mb-4"><Link to="/dashboard/projects"><ArrowLeft className="w-4 h-4" /> All projects</Link></Button>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Idea</div>
          <h1 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
            <span className="text-gradient-primary">{p.name}</span>
          </h1>
          <p className="text-muted-foreground italic mt-2">"{p.idea}"</p>
        </div>
        <div className="flex gap-2">
          <Button variant="glass" size="sm" onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success("Link copied"); }}><Share2 className="w-4 h-4" /> Share</Button>
          <Button variant="hero" size="sm" onClick={exportJson}><Download className="w-4 h-4" /> Export</Button>
        </div>
      </div>

      <Tabs defaultValue="brand" className="space-y-6">
        <TabsList className="flex flex-wrap h-auto bg-card/40 p-1 gap-1">
          {[
            ["brand", "Brand"],
            ["domains", "Domains"],
            ["logo", "Logo"],
            ["landing", "Landing"],
            ["audience", "Audience"],
            ["money", "Monetization"],
            ["marketing", "Marketing"],
            ["seo", "SEO"],
            ["social", "Social"],
            ["pitch", "Pitch"],
            ["competitors", "Competitors"],
          ].map(([v, l]) => (
            <TabsTrigger key={v} value={v} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">{l}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="brand" className="space-y-4">
          <Section title="Brand names">
            <div className="grid sm:grid-cols-2 gap-3">
              {(r.brand_names ?? []).map((b: any, i: number) => (
                <div key={i} className="p-4 rounded-xl bg-card/60 border border-border flex items-start gap-3">
                  <div className="flex-1">
                    <div className="font-display text-lg font-semibold">{b.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">{b.rationale}</div>
                  </div>
                  <CopyBtn text={b.name} />
                </div>
              ))}
            </div>
          </Section>
          <Section title="Taglines">
            <div className="space-y-2">
              {(r.taglines ?? []).map((t: string, i: number) => (
                <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-card/60 border border-border">
                  <span className="flex-1 italic">"{t}"</span><CopyBtn text={t} />
                </div>
              ))}
            </div>
          </Section>
          <Section title="USP">
            <ul className="space-y-2">
              {(r.usp ?? []).map((u: string, i: number) => <li key={i} className="p-3 rounded-lg bg-card/60 border border-border text-sm">{u}</li>)}
            </ul>
          </Section>
          <Section title="Color palette">
            <div className="flex flex-wrap gap-3">
              {(r.color_palette ?? []).map((c: any, i: number) => (
                <div key={i} className="rounded-xl overflow-hidden border border-border">
                  <div className="w-24 h-24" style={{ background: c.hex }} />
                  <div className="px-3 py-2 bg-card text-xs">
                    <div className="font-medium">{c.name}</div>
                    <div className="text-muted-foreground">{c.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="domains">
          <Section title="Domain ideas">
            <div className="grid sm:grid-cols-2 gap-2">
              {(r.domains ?? []).map((d: any, i: number) => (
                <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-card/60 border border-border">
                  <span className="font-mono text-sm flex-1">{d.domain}</span>
                  <span className="text-xs text-muted-foreground">{d.tld}</span>
                  <CopyBtn text={d.domain} />
                </div>
              ))}
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="logo">
          <Section title="Logo concepts">
            <div className="grid md:grid-cols-3 gap-4">
              {(r.logo_concepts ?? []).map((l: any, i: number) => (
                <div key={i} className="p-5 rounded-xl bg-card/60 border border-border">
                  <div className="text-xs uppercase tracking-wider text-primary mb-2">Concept {i + 1}</div>
                  <div className="font-semibold mb-1">{l.concept}</div>
                  <div className="text-xs text-muted-foreground mb-3">{l.style}</div>
                  <div className="text-xs bg-background/50 rounded-md p-3 font-mono leading-relaxed">{l.prompt}</div>
                  <Button variant="ghost" size="sm" className="mt-2 w-full" onClick={() => { navigator.clipboard.writeText(l.prompt); toast.success("Prompt copied"); }}><Copy className="w-3 h-3" /> Copy prompt</Button>
                </div>
              ))}
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="landing" className="space-y-4">
          {r.landing_copy && (
            <>
              <Section title="Hero">
                <h2 className="text-3xl font-display font-bold tracking-tight">{r.landing_copy.headline}</h2>
                <p className="text-muted-foreground mt-3">{r.landing_copy.subheadline}</p>
                <Button variant="hero" className="mt-4" disabled>{r.landing_copy.cta}</Button>
              </Section>
              <Section title="Features">
                <div className="grid sm:grid-cols-2 gap-3">
                  {(r.landing_copy.features ?? []).map((f: any, i: number) => (
                    <div key={i} className="p-4 rounded-lg bg-card/60 border border-border">
                      <div className="font-semibold text-sm">{f.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">{f.description}</div>
                    </div>
                  ))}
                </div>
              </Section>
            </>
          )}
        </TabsContent>

        <TabsContent value="audience">
          <Section title="Ideal customer personas">
            <div className="grid md:grid-cols-2 gap-4">
              {(r.audience ?? []).map((a: any, i: number) => (
                <div key={i} className="p-5 rounded-xl bg-card/60 border border-border">
                  <div className="font-semibold mb-3">{a.persona}</div>
                  <div className="text-xs uppercase tracking-wider text-primary">Pains</div>
                  <p className="text-sm mt-1 mb-3 text-muted-foreground">{a.pains}</p>
                  <div className="text-xs uppercase tracking-wider text-primary">Goals</div>
                  <p className="text-sm mt-1 text-muted-foreground">{a.goals}</p>
                </div>
              ))}
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="money">
          <Section title="Monetization">
            <div className="grid sm:grid-cols-3 gap-3">
              {(r.monetization ?? []).map((m: any, i: number) => (
                <div key={i} className="p-5 rounded-xl bg-card/60 border border-border">
                  <div className="text-xs uppercase tracking-wider text-primary mb-1">{m.model}</div>
                  <div className="text-2xl font-display font-bold">{m.price}</div>
                  <div className="text-xs text-muted-foreground mt-2">{m.description}</div>
                </div>
              ))}
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="marketing" className="space-y-4">
          <Section title="Growth hooks">
            <ul className="space-y-2">
              {(r.growth_hooks ?? []).map((g: string, i: number) => <li key={i} className="p-3 rounded-lg bg-card/60 border border-border text-sm">{g}</li>)}
            </ul>
          </Section>
          <Section title="Ad copy">
            <div className="space-y-2">
              {(r.ad_copy ?? []).map((a: any, i: number) => (
                <div key={i} className="p-3 rounded-lg bg-card/60 border border-border flex items-start gap-3">
                  <span className="text-xs px-2 py-0.5 rounded bg-primary/20 text-primary shrink-0">{a.platform}</span>
                  <span className="text-sm flex-1">{a.copy}</span>
                  <CopyBtn text={a.copy} />
                </div>
              ))}
            </div>
          </Section>
          <Section title="Launch strategy">
            <ol className="space-y-2 list-decimal list-inside">
              {(r.launch_strategy ?? []).map((s: string, i: number) => <li key={i} className="p-3 rounded-lg bg-card/60 border border-border text-sm">{s}</li>)}
            </ol>
          </Section>
        </TabsContent>

        <TabsContent value="seo">
          <Section title="SEO keywords">
            <div className="flex flex-wrap gap-2">
              {(r.seo_keywords ?? []).map((k: string, i: number) => (
                <span key={i} className="px-3 py-1.5 rounded-full bg-card/60 border border-border text-sm">{k}</span>
              ))}
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="social">
          <Section title="Social media handles">
            <div className="grid sm:grid-cols-2 gap-2">
              {(r.social_handles ?? []).map((h: string, i: number) => (
                <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-card/60 border border-border">
                  <span className="font-mono text-sm flex-1">{h}</span><CopyBtn text={h} />
                </div>
              ))}
            </div>
          </Section>
        </TabsContent>

        <TabsContent value="pitch">
          <Section title="Pitch deck summary">
            <p className="leading-relaxed text-foreground/90">{r.pitch_deck_summary}</p>
          </Section>
        </TabsContent>

        <TabsContent value="competitors">
          <Section title="Competitor breakdown">
            <div className="space-y-3">
              {(r.competitors ?? []).map((c: any, i: number) => (
                <div key={i} className="p-4 rounded-xl bg-card/60 border border-border">
                  <div className="font-semibold mb-2">{c.name}</div>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div><span className="text-success text-xs uppercase tracking-wider">Strength</span><p className="text-muted-foreground mt-1">{c.strength}</p></div>
                    <div><span className="text-warning text-xs uppercase tracking-wider">Weakness</span><p className="text-muted-foreground mt-1">{c.weakness}</p></div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </TabsContent>
      </Tabs>
    </div>
  );
};
