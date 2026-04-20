import { motion } from "framer-motion";

const items = [
  { quote: "Saved me three weeks of brand back-and-forth. We launched in a weekend.", name: "Maya R.", role: "Founder, Driftly" },
  { quote: "The pitch summary alone got us into a YC office hour.", name: "Diego P.", role: "CEO, Northbeam" },
  { quote: "Feels like an entire branding agency in your pocket.", name: "Aisha K.", role: "Solo founder" },
];

export const Testimonials = () => (
  <section className="py-24 relative">
    <div className="container">
      <div className="text-center mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Loved by founders</span>
        <h2 className="mt-3 text-4xl md:text-5xl font-display font-bold tracking-tight">
          Trusted by <span className="text-gradient-primary">2,400+ builders</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {items.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-7"
          >
            <div className="text-2xl text-primary mb-3">"</div>
            <p className="text-foreground/90 leading-relaxed mb-5">{t.quote}</p>
            <div>
              <div className="font-semibold text-sm">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
