import { motion } from "framer-motion";
import { Palette, Globe, Target, DollarSign, Megaphone, Search, Users, FileText, Zap } from "lucide-react";

const features = [
  { icon: Palette, title: "Brand & logo concepts", desc: "Names, taglines, palettes and logo prompts ready for designers or AI image gen." },
  { icon: Globe, title: "Domain finder", desc: "Smart, available-leaning domain suggestions across .com, .ai, .io and more." },
  { icon: Target, title: "ICP & audience", desc: "Detailed personas with pains, goals, and where to reach them." },
  { icon: DollarSign, title: "Monetization strategy", desc: "Pricing tiers, revenue models and upsell paths tailored to your idea." },
  { icon: Megaphone, title: "Launch & ad copy", desc: "Viral launch playbook, social handles, and platform-specific ad copy." },
  { icon: Search, title: "SEO keywords", desc: "Long-tail and head terms ranked by intent and competitive opportunity." },
  { icon: Users, title: "Competitor breakdown", desc: "Who you're up against, where they're weak, where you'll win." },
  { icon: FileText, title: "Pitch deck summary", desc: "Investor-ready narrative you can drop into a deck or memo." },
  { icon: Zap, title: "Growth hooks", desc: "Five high-leverage growth tactics to bootstrap your first 1,000 users." },
];

export const Features = () => (
  <section id="features" className="py-24 md:py-32 relative">
    <div className="container">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Everything you need</span>
        <h2 className="mt-3 text-4xl md:text-5xl font-display font-bold tracking-tight">
          A founder's toolkit, <span className="text-gradient-primary">condensed</span>
        </h2>
        <p className="mt-4 text-muted-foreground">Nine engines work in parallel to ship a complete launch package — not just a name generator.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.05 }}
            className="group relative glass rounded-2xl p-6 hover:border-primary/40 transition-all hover:-translate-y-1"
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-gradient-primary group-hover:border-transparent transition-all">
              <f.icon className="w-5 h-5 text-primary group-hover:text-primary-foreground transition-colors" />
            </div>
            <h3 className="font-semibold text-lg mb-1.5">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
