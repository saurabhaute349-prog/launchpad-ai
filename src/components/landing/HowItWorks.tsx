import { motion } from "framer-motion";
import { Lightbulb, Wand2, Rocket } from "lucide-react";

const steps = [
  { icon: Lightbulb, title: "Drop your idea", desc: "One sentence is enough. The rougher, the better." },
  { icon: Wand2, title: "AI does the work", desc: "Brand, copy, growth, monetization — generated in seconds." },
  { icon: Rocket, title: "Launch", desc: "Export, publish, ship. Investor-ready from day one." },
];

export const HowItWorks = () => (
  <section id="how" className="py-24 md:py-32 relative">
    <div className="container">
      <div className="text-center mb-16">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">How it works</span>
        <h2 className="mt-3 text-4xl md:text-5xl font-display font-bold tracking-tight">
          From spark to <span className="text-gradient-primary">startup</span> in 3 steps
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6 relative">
        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative glass rounded-2xl p-8 hover:border-primary/40 transition-colors"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-5 shadow-elegant">
              <s.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="text-xs text-muted-foreground mb-1">Step {i + 1}</div>
            <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
