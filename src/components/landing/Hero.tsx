import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative pt-36 pb-24 md:pt-48 md:pb-32 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />

      {/* Floating orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-blob" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-blob" style={{ animationDelay: "6s" }} />

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <a href="#pricing" className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-medium text-foreground hover:border-primary/50 transition-colors group">
            <span className="flex h-2 w-2 rounded-full bg-success">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-success opacity-75" />
            </span>
            132 founders launched ideas this week
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.95] max-w-5xl mx-auto"
        >
          Turn one idea into a <br />
          <span className="text-gradient">real startup</span> in seconds
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-7 text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Drop in your raw idea. AI builds your brand, landing copy, monetization, growth plan and pitch — instantly. Investor-ready, launch-ready, in 60 seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Button asChild variant="hero" size="xl" className="w-full sm:w-auto">
            <Link to="/auth/signup">
              <Sparkles className="w-5 h-5" />
              Generate my startup
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
          <Button variant="glass" size="xl" className="w-full sm:w-auto" asChild>
            <a href="#examples">
              <Play className="w-4 h-4" />
              Watch demo
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground"
        >
          <span>✓ No credit card</span>
          <span>✓ 5 free credits</span>
          <span>✓ Export ready</span>
        </motion.div>

        {/* Mock product showcase */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          <div className="absolute inset-x-10 -top-10 h-40 bg-gradient-primary blur-3xl opacity-40 rounded-full" />
          <div className="relative glass-strong rounded-2xl p-2 shadow-elegant">
            <div className="rounded-xl bg-surface p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-warning/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm md:text-base text-muted-foreground">AI fitness app for busy professionals...</span>
                <span className="ml-auto text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">Generating</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                {["FitFlow", "PulsePro", "MomentumX", "PeakDay"].map((n, i) => (
                  <motion.div
                    key={n}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className="px-4 py-3 rounded-xl bg-card border border-border text-center"
                  >
                    <div className="text-sm font-semibold">{n}</div>
                    <div className="text-xs text-muted-foreground mt-1">{n.toLowerCase()}.ai</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
