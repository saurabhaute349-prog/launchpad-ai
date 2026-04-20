import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const tiers = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    desc: "Test the waters",
    features: ["3 ideas / month", "Basic outputs", "Watermarked logos", "Community support"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$19",
    cadence: "/ month",
    desc: "For serious founders",
    features: ["100 ideas / month", "Premium names", "Full branding kit", "Logo generation", "PDF export", "Competitor insights"],
    cta: "Go Pro",
    highlight: true,
  },
  {
    name: "Growth",
    price: "$49",
    cadence: "/ month",
    desc: "For agencies & teams",
    features: ["Unlimited ideas", "Team seats", "Advanced market validation", "White-label exports", "Priority generation", "API access"],
    cta: "Scale up",
    highlight: false,
  },
  {
    name: "Lifetime",
    price: "$199",
    cadence: "one time",
    desc: "Limited launch offer",
    features: ["Everything in Pro", "Forever access", "All future updates", "Founder badge", "Lifetime credits refresh"],
    cta: "Lock in deal",
    highlight: false,
    badge: "Limited",
  },
];

export const Pricing = () => (
  <section id="pricing" className="py-24 md:py-32 relative">
    <div className="container">
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Pricing</span>
        <h2 className="mt-3 text-4xl md:text-5xl font-display font-bold tracking-tight">
          Pick a plan, <span className="text-gradient-primary">launch faster</span>
        </h2>
        <p className="mt-4 text-muted-foreground">Start free. Upgrade when you're ready to ship.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {tiers.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={cn(
              "relative rounded-2xl p-7 flex flex-col transition-all",
              t.highlight
                ? "glass-strong border-primary/50 shadow-elegant scale-[1.02] lg:scale-105"
                : "glass hover:border-primary/30"
            )}
          >
            {t.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-primary text-xs font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Most popular
              </div>
            )}
            {t.badge && (
              <div className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-warning text-warning-foreground text-xs font-semibold">
                {t.badge}
              </div>
            )}
            <div className="mb-4">
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-display font-bold">{t.price}</span>
              <span className="text-muted-foreground text-sm ml-1">{t.cadence}</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                  <span className="text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>
            <Button asChild variant={t.highlight ? "hero" : "glass"} className="w-full">
              <Link to="/auth/signup">{t.cta}</Link>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
