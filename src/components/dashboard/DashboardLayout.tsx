import { ReactNode } from "react";
import { Navigate, NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Logo } from "@/components/Logo";
import { LayoutDashboard, Sparkles, FolderKanban, Palette, CreditCard, Settings, LogOut, Trash2, Wrench, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/dashboard/new", label: "New idea", icon: Sparkles },
  { to: "/dashboard/projects", label: "My projects", icon: FolderKanban },
  { to: "/dashboard/branding", label: "Branding kit", icon: Palette },
  { to: "/dashboard/tools", label: "AI tools", icon: Wrench },
  { to: "/dashboard/billing", label: "Billing", icon: Receipt },
  { to: "/dashboard/subscription", label: "Subscription", icon: CreditCard },
  { to: "/dashboard/trash", label: "Trash", icon: Trash2 },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  if (!user) return <Navigate to="/auth/login" replace />;
  return <>{children}</>;
};

export const DashboardLayout = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-sidebar-border bg-sidebar shrink-0">
        <div className="p-5 border-b border-sidebar-border">
          <Logo />
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
                )
              }
            >
              <n.icon className="w-4 h-4" />
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-sidebar-border space-y-3">
          <div className="px-3 py-3 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/30">
            <div className="text-xs text-muted-foreground">Free plan</div>
            <div className="text-sm font-semibold mt-0.5">Upgrade for unlimited</div>
            <Button asChild variant="hero" size="sm" className="w-full mt-3">
              <NavLink to="/dashboard/subscription">Upgrade</NavLink>
            </Button>
          </div>
          <div className="flex items-center gap-2 px-2 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-semibold">
              {user?.email?.[0]?.toUpperCase() ?? "U"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium truncate">{user?.email}</div>
            </div>
            <Button variant="ghost" size="icon" onClick={signOut} title="Sign out">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-30 glass-strong border-b border-border h-14 flex items-center px-4 justify-between">
        <Logo />
        <Button variant="ghost" size="icon" onClick={signOut}><LogOut className="w-4 h-4" /></Button>
      </div>

      <main className="flex-1 min-w-0 pt-14 md:pt-0">
        {/* mobile nav strip */}
        <div className="md:hidden flex gap-1 overflow-x-auto px-3 py-2 border-b border-border bg-surface">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                cn(
                  "shrink-0 px-3 py-1.5 rounded-md text-xs whitespace-nowrap",
                  isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                )
              }
            >
              {n.label}
            </NavLink>
          ))}
        </div>
        <div key={location.pathname} className="animate-fade-in-up">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
