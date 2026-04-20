import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How fast does generation actually take?", a: "Most full startup packages complete in 30–60 seconds. Quick brand-only runs finish in under 15 seconds." },
  { q: "Can I edit the AI outputs?", a: "Yes — every result is editable inline, copyable, and exportable to PDF or Markdown." },
  { q: "Do I own what's generated?", a: "100%. All brand assets, copy and ideas you generate are yours to use commercially." },
  { q: "Which AI model powers it?", a: "We orchestrate multiple frontier models behind the scenes for the best result per task — names, copy, strategy and visuals." },
  { q: "Can I cancel anytime?", a: "Yes, no contracts. Cancel from your billing page in one click." },
  { q: "Do unused credits roll over?", a: "Pro and Growth credits roll over for one month. Lifetime tier refreshes monthly forever." },
];

export const FAQ = () => (
  <section id="faq" className="py-24 md:py-32 relative">
    <div className="container max-w-3xl">
      <div className="text-center mb-12">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">FAQ</span>
        <h2 className="mt-3 text-4xl md:text-5xl font-display font-bold tracking-tight">
          Common <span className="text-gradient-primary">questions</span>
        </h2>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="glass rounded-xl border-0 px-5">
            <AccordionTrigger className="text-left font-medium hover:no-underline py-5">{f.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);
