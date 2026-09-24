'use client';

import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, MapPin } from 'lucide-react';
import { experiences } from '@/lib/data/experiences';

export function Experience() {
  return (
    <section id="experience" className="relative py-24 px-6">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Journey</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Experience & Education</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            My professional path and milestones along the way
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/50 via-border to-transparent md:-translate-x-1/2" />

          {experiences.map((exp, idx) => {
            const isLeft = idx % 2 === 0;
            const Icon = exp.type === 'work' ? Briefcase : GraduationCap;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative flex items-start gap-6 mb-12 last:mb-0 ${
                  isLeft ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="hidden md:block md:w-1/2" />

                <div className="absolute left-4 md:left-1/2 top-2 -translate-x-1/2 z-10">
                  <div className="w-10 h-10 rounded-full bg-background border-2 border-cyan-400/50 flex items-center justify-center text-cyan-400 neon-glow">
                    <Icon size={18} />
                  </div>
                </div>

                <div className={`flex-1 md:w-1/2 pl-16 md:pl-0 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="group rounded-xl border border-border bg-card/50 p-6 hover:border-cyan-400/30 transition-all duration-300">
                    <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'md:justify-end' : ''}`}>
                      <span className="text-xs font-medium text-cyan-400 px-2.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20">
                        {exp.period}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-1">{exp.role}</h3>
                    <div className={`flex items-center gap-1.5 text-sm text-muted-foreground mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
                      <MapPin size={14} />
                      {exp.company}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{exp.description}</p>
                    <ul className={`space-y-2 ${isLeft ? 'md:text-right' : ''}`}>
                      {exp.achievements.map((ach, i) => (
                        <li key={i} className={`flex items-start gap-2 text-sm text-muted-foreground ${isLeft ? 'md:flex-row-reverse md:text-right' : ''}`}>
                          <span className="text-cyan-400 mt-1 shrink-0">▹</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
