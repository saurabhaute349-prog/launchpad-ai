import { Logo } from "../Logo";

const cols = [
  { title: "Product", links: ["Features", "Pricing", "Examples", "API"] },
  { title: "Company", links: ["About", "Blog", "Affiliates", "Contact"] },
  { title: "Legal", links: ["Privacy", "Terms", "Refund policy"] },
];

export const Footer = () => (
  <footer className="border-t border-border/50 py-14 mt-16">
    <div className="container">
      <div className="grid md:grid-cols-4 gap-10">
        <div>
          <Logo />
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            Turn any idea into a launch-ready startup in under a minute.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="font-semibold text-sm mb-4">{c.title}</h4>
            <ul className="space-y-2.5">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} LaunchForge AI. All rights reserved.</span>
        <span>Built for founders, by founders.</span>
      </div>
    </div>
  </footer>
);
