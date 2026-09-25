'use client';

import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative border-t border-border py-12 px-6">
      <div className="absolute inset-0 grid-bg-sm opacity-10" />
      <div className="relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-background">
              Y
            </div>
            <span className="font-bold">Yeasin</span>
          </div>

          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            Built with <Heart size={14} className="text-cyan-400 fill-cyan-400" /> using Next.js & Framer Motion
          </p>

          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: 'https://github.com/Arifyeasin', label: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/md-yeasin-arafat-897140399/', label: 'LinkedIn' },
              { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-lg border border-border bg-card/50 flex items-center justify-center text-muted-foreground hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Yeasin All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
