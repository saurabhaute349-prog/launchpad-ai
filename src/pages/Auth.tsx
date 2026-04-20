import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const AuthLayout = ({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) => (
  <div className="min-h-screen flex">
    <div className="hidden lg:flex flex-1 relative overflow-hidden bg-surface">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-primary/40 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-secondary/30 rounded-full blur-3xl animate-blob" style={{ animationDelay: "5s" }} />
      <div className="relative z-10 flex flex-col justify-between p-12 w-full">
        <Logo />
        <div className="space-y-4 max-w-md">
          <h2 className="text-4xl font-display font-bold tracking-tight leading-tight">
            One idea. <span className="text-gradient">A full startup.</span> 60 seconds.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Join 2,400+ founders shipping faster with AI-generated brand, copy, and growth plans.
          </p>
        </div>
        <div className="text-xs text-muted-foreground">© LaunchForge AI</div>
      </div>
    </div>
    <div className="flex-1 flex items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-md">
        <div className="lg:hidden mb-10"><Logo /></div>
        <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground mt-2">{subtitle}</p>
        <div className="mt-8">{children}</div>
        {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
      </div>
    </div>
  </div>
);

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Welcome back!");
      navigate("/dashboard");
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue building your startup."
      footer={<>New here? <Link to="/auth/signup" className="text-primary hover:underline font-medium">Create an account</Link></>}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@startup.com" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/auth/forgot" className="text-xs text-muted-foreground hover:text-primary">Forgot?</Link>
          </div>
          <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </div>
        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Sign in
        </Button>
      </form>
    </AuthLayout>
  );
};

export const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { full_name: name },
      },
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created. Welcome aboard!");
      navigate("/dashboard");
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Free forever. 5 starter credits, no card needed."
      footer={<>Already have an account? <Link to="/auth/login" className="text-primary hover:underline font-medium">Sign in</Link></>}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Ada Lovelace" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@startup.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />
        </div>
        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Create account
        </Button>
      </form>
    </AuthLayout>
  );
};

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/login`,
    });
    setLoading(false);
    if (error) toast.error(error.message);
    else { toast.success("Reset link sent."); setSent(true); }
  };

  return (
    <AuthLayout
      title="Reset password"
      subtitle="We'll email you a link to set a new one."
      footer={<>Back to <Link to="/auth/login" className="text-primary hover:underline font-medium">sign in</Link></>}
    >
      {sent ? (
        <div className="glass rounded-xl p-6 text-center">
          <p className="text-foreground/90">Check your inbox for the reset link.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@startup.com" />
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Send reset link
          </Button>
        </form>
      )}
    </AuthLayout>
  );
};
