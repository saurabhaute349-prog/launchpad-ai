import { motion } from "framer-motion";

const examples = [
  {
    idea: "AI fitness app for busy execs",
    name: "PulseHQ",
    tagline: "Your 12-minute high-performance ritual.",
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    idea: "Marketplace for freelance climate scientists",
    name: "Carbonly",
    tagline: "Hire the planet's brightest minds, on demand.",
    color: "from-emerald-500 to-cyan-500",
  },
  {
    idea: "AI tutor for high-school chemistry",
    name: "Atomly",
    tagline: "Pass chem like it's a video game.",
    color: "from-amber-500 to-rose-500",
  },
];

export const Examples = () => (
  <section id="examples" className="py-24 md:py-32 relative">
    <div className="container">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Example outputs</span>
        <h2 className="mt-3 text-4xl md:text-5xl font-display font-bold tracking-tight">
          Real ideas. Real <span className="text-gradient-primary">brands</span>.
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {examples.map((e, i) => (
          <motion.div
            key={e.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-strong rounded-2xl overflow-hidden group hover:border-primary/40 transition-all"
          >
            <div className={`h-40 bg-gradient-to-br ${e.color} relative overflow-hidden`}>
              <div className="absolute inset-0 bg-grid opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-display font-bold text-white drop-shadow-2xl">{e.name}</span>
              </div>
            </div>
            <div className="p-6">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Idea</div>
              <p className="text-sm font-medium mb-4">"{e.idea}"</p>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Tagline</div>
              <p className="text-foreground italic">"{e.tagline}"</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
