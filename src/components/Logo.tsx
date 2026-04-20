import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export const Logo = ({ className = "" }: { className?: string }) => (
  <Link to="/" className={`flex items-center gap-2 group ${className}`}>
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-primary blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />
      <div className="relative w-9 h-9 rounded-lg bg-gradient-primary flex items-center justify-center shadow-elegant">
        <Sparkles className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
      </div>
    </div>
    <span className="font-display font-bold text-lg tracking-tight">
      LaunchForge<span className="text-gradient-primary"> AI</span>
    </span>
  </Link>
);
