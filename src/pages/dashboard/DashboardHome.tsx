import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, Zap, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

type Project = { id: string; name: string | null; idea: string; created_at: string };

const trending = [
  "AI co-founder for solo SaaS builders",
  "Climate-tech jobs marketplace",
  "Voice journaling for sleep coaches",
  "Subscription for indie game devs",
];

export const DashboardHome = () => {
  const { user } = useAuth();
  const [recent, setRecent] = useState<Project[]>([]);
  const [credits, setCredits] = useState<number>(5);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [{ data: projects }, { data: profile }, { count: c }] = await Promise.all([
        supabase.from("projects").select("id,name,idea,created_at").is("deleted_at", null).order("created_at", { ascending: false }).limit(4),
        supabase.from("profiles").select("credits").eq("id", user.id).maybeSingle(),
        supabase.from("projects").select("*", { count: "exact", head: true }).is("deleted_at", null),
      ]);
      setRecent(projects ?? []);
      setCredits(profile?.credits ?? 5);
      setCount(c ?? 0);
    })();
  }, [user]);

  return (
    <div className="p-6 md:p-10 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">
            Welcome back<span className="text-gradient-primary">.</span>
          </h1>
          <p className="text-muted-foreground mt-1">Let's turn another idea into a startup.</p>
        </div>
        <Button asChild variant="hero" size="lg">
          <Link to="/dashboard/new"><Sparkles className="w-4 h-4" /> New idea</Link>
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {[
          { icon: Zap, label: "Credits remaining", value: credits, accent: "text-primary" },
          { icon: TrendingUp, label: "Total ideas generated", value: count, accent: "text-secondary" },
          { icon: Clock, label: "Plan", value: "Free", accent: "text-warning" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{s.label}</span>
              <s.icon className={`w-4 h-4 ${s.accent}`} />
            </div>
            <div className="text-3xl font-display font-bold">{s.value}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Recent ideas</h2>
            <Link to="/dashboard/projects" className="text-xs text-primary hover:underline flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></Link>
          </div>
          {recent.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Sparkles className="w-8 h-8 mx-auto mb-3 opacity-40" />
              <p className="text-sm">No ideas yet. Generate your first startup.</p>
              <Button asChild variant="hero" size="sm" className="mt-4"><Link to="/dashboard/new">Start now</Link></Button>
            </div>
          ) : (
            <div className="space-y-2">
              {recent.map((p) => (
                <Link key={p.id} to={`/dashboard/projects/${p.id}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-card/60 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0 font-semibold">
                    {(p.name ?? p.idea)[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{p.name ?? "Untitled"}</div>
                    <div className="text-xs text-muted-foreground truncate">{p.idea}</div>
                  </div>
                  <div className="text-xs text-muted-foreground shrink-0">{new Date(p.created_at).toLocaleDateString()}</div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="font-semibold text-lg mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-primary" /> Trending ideas</h2>
          <div className="space-y-2">
            {trending.map((t) => (
              <Link key={t} to={`/dashboard/new?seed=${encodeURIComponent(t)}`} className="block p-3 rounded-lg bg-card/40 hover:bg-card transition-colors text-sm">
                {t}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
