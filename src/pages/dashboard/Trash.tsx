import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { RotateCcw, Trash2 } from "lucide-react";

type P = { id: string; name: string | null; idea: string; deleted_at: string };

export const Trash = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<P[]>([]);

  const load = async () => {
    if (!user) return;
    const { data } = await supabase.from("projects").select("id,name,idea,deleted_at")
      .not("deleted_at", "is", null).order("deleted_at", { ascending: false });
    setItems(data ?? []);
  };
  useEffect(() => { load(); }, [user]);

  const restore = async (id: string) => {
    await supabase.from("projects").update({ deleted_at: null }).eq("id", id);
    toast.success("Restored");
    load();
  };
  const purge = async (id: string) => {
    await supabase.from("projects").delete().eq("id", id);
    toast.success("Permanently deleted");
    load();
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      <h1 className="text-3xl font-display font-bold tracking-tight">Trash</h1>
      <p className="text-muted-foreground mt-1 mb-8">Deleted projects are recoverable for 30 days.</p>
      {items.length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center text-muted-foreground">Nothing in trash.</div>
      ) : (
        <div className="space-y-2">
          {items.map((p) => (
            <div key={p.id} className="glass rounded-xl p-4 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{p.name ?? "Untitled"}</div>
                <div className="text-xs text-muted-foreground truncate">{p.idea}</div>
              </div>
              <Button size="sm" variant="ghost" onClick={() => restore(p.id)}><RotateCcw className="w-3.5 h-3.5" /> Restore</Button>
              <Button size="sm" variant="ghost" className="text-destructive" onClick={() => purge(p.id)}><Trash2 className="w-3.5 h-3.5" /></Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
