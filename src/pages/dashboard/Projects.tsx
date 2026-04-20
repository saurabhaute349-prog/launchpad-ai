import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Sparkles, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";

type Project = { id: string; name: string | null; idea: string; status: string; created_at: string };

export const Projects = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("projects")
      .select("id,name,idea,status,created_at")
      .is("deleted_at", null)
      .order("created_at", { ascending: false });
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [user]);

  const softDelete = async (id: string) => {
    const { error } = await supabase.from("projects").update({ deleted_at: new Date().toISOString() }).eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Moved to trash."); load(); }
  };

  const duplicate = async (p: Project) => {
    const { data: full } = await supabase.from("projects").select("*").eq("id", p.id).single();
    if (!full || !user) return;
    await supabase.from("projects").insert({
      user_id: user.id,
      idea: full.idea,
      name: (full.name ?? "Untitled") + " (copy)",
      result: full.result,
    });
    toast.success("Duplicated.");
    load();
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">My projects</h1>
          <p className="text-muted-foreground mt-1">{items.length} startup{items.length === 1 ? "" : "s"} in your portfolio.</p>
        </div>
        <Button asChild variant="hero"><Link to="/dashboard/new"><Sparkles className="w-4 h-4" /> New idea</Link></Button>
      </div>

      {loading ? (
        <div className="text-muted-foreground">Loading…</div>
      ) : items.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <Sparkles className="w-10 h-10 mx-auto mb-4 text-primary" />
          <h3 className="font-semibold text-lg">No projects yet</h3>
          <p className="text-muted-foreground mt-1 mb-5">Generate your first startup in under a minute.</p>
          <Button asChild variant="hero"><Link to="/dashboard/new">Start now</Link></Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((p) => (
            <div key={p.id} className="glass rounded-2xl p-5 group hover:border-primary/40 transition-all flex flex-col">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center font-bold shrink-0">
                  {(p.name ?? p.idea)[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{p.name ?? "Untitled"}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{p.idea}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-auto pt-3 border-t border-border">
                <span>{new Date(p.created_at).toLocaleDateString()}</span>
                <div className="flex gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => duplicate(p)} title="Duplicate"><Copy className="w-3.5 h-3.5" /></Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => softDelete(p.id)} title="Delete"><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
              <Button asChild variant="soft" size="sm" className="mt-3"><Link to={`/dashboard/projects/${p.id}`}>Open</Link></Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
