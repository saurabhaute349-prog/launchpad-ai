import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Pricing } from "@/components/landing/Pricing";

export const Settings = () => {
  const { user, signOut } = useAuth();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle().then(({ data }) => {
      setName(data?.full_name ?? "");
    });
  }, [user]);

  const save = async () => {
    if (!user) return;
    setLoading(true);
    const { error } = await supabase.from("profiles").update({ full_name: name }).eq("id", user.id);
    setLoading(false);
    if (error) toast.error(error.message); else toast.success("Saved");
  };

  return (
    <div className="p-6 md:p-10 max-w-3xl">
      <h1 className="text-3xl font-display font-bold tracking-tight">Settings</h1>
      <p className="text-muted-foreground mt-1 mb-8">Manage your account.</p>

      <div className="glass rounded-2xl p-6 space-y-4">
        <h2 className="font-semibold">Profile</h2>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input value={user?.email ?? ""} disabled />
        </div>
        <div className="space-y-2">
          <Label>Full name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <Button variant="hero" onClick={save} disabled={loading}>Save changes</Button>
      </div>

      <div className="glass rounded-2xl p-6 mt-4">
        <h2 className="font-semibold">Account</h2>
        <p className="text-sm text-muted-foreground mt-1 mb-4">Sign out of LaunchForge AI on this device.</p>
        <Button variant="outline" onClick={signOut}>Sign out</Button>
      </div>
    </div>
  );
};

export const Subscription = () => (
  <div className="py-10">
    <div className="container max-w-6xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">Choose your plan</h1>
        <p className="text-muted-foreground mt-2">Upgrade anytime. Cancel anytime.</p>
      </div>
    </div>
    <Pricing />
  </div>
);

export const Billing = () => (
  <div className="p-6 md:p-10 max-w-4xl">
    <h1 className="text-3xl font-display font-bold tracking-tight">Billing</h1>
    <p className="text-muted-foreground mt-1 mb-8">Payment history & invoices.</p>
    <div className="glass rounded-2xl p-12 text-center text-muted-foreground">
      <p>No payments yet. Start with a free plan to test the platform.</p>
    </div>
  </div>
);

export const BrandingKit = () => (
  <div className="p-6 md:p-10 max-w-5xl">
    <h1 className="text-3xl font-display font-bold tracking-tight">Branding kit</h1>
    <p className="text-muted-foreground mt-1 mb-8">Open any project to access its full branding kit — colors, logos, fonts, and more.</p>
    <div className="glass rounded-2xl p-12 text-center text-muted-foreground">
      Generate a project to unlock branding kits.
    </div>
  </div>
);

export const AITools = () => (
  <div className="p-6 md:p-10 max-w-5xl">
    <h1 className="text-3xl font-display font-bold tracking-tight">AI tools</h1>
    <p className="text-muted-foreground mt-1 mb-8">Specialized engines for individual tasks.</p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {["Name generator", "Domain finder", "Logo prompter", "Market validator", "ICP builder", "Pricing strategist", "Competitor scanner", "Ad copywriter", "Landing writer", "Viral planner"].map((t) => (
        <div key={t} className="glass rounded-2xl p-5">
          <div className="font-semibold">{t}</div>
          <div className="text-xs text-muted-foreground mt-1">Coming soon</div>
        </div>
      ))}
    </div>
  </div>
);
