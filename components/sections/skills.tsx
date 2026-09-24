'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase, type Skill } from '@/lib/supabase/client';
import { Code2, Server, Wrench } from 'lucide-react';

const categoryConfig: Record<string, { icon: typeof Code2; color: string; gradient: string }> = {
  Frontend: { icon: Code2, color: 'text-cyan-400', gradient: 'from-cyan-500/20 to-blue-500/5' },
  Backend: { icon: Server, color: 'text-emerald-400', gradient: 'from-emerald-500/20 to-teal-500/5' },
  Tools: { icon: Wrench, color: 'text-orange-400', gradient: 'from-orange-500/20 to-amber-500/5' },
};

export function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category, sort_order');
      if (!error && data) setSkills(data as Skill[]);
      setLoading(false);
    };
    fetchSkills();
  }, []);

  const categories = ['Frontend', 'Backend', 'Tools'];

  return (
    <section id="skills" className="relative py-24 px-6">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Tech Stack</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Skills & Technologies</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-80 rounded-2xl border border-border bg-card/50 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((category, catIdx) => {
              const config = categoryConfig[category];
              const Icon = config.icon;
              const catSkills = skills.filter((s) => s.category === category);

              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: catIdx * 0.15 }}
                  className="group relative rounded-2xl border border-border bg-card/50 p-6 hover:border-cyan-400/30 transition-all duration-300 overflow-hidden"
                >
                  <div className={`absolute inset-0 bg-gradient-to-b ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-12 h-12 rounded-xl border border-border bg-background/50 flex items-center justify-center ${config.color}`}>
                        <Icon size={24} />
                      </div>
                      <h3 className="text-xl font-bold">{category}</h3>
                    </div>

                    <div className="space-y-4">
                      {catSkills.map((skill, idx) => (
                        <motion.div
                          key={skill.id}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: idx * 0.05 }}
                          className="group/skill"
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-medium text-foreground group-hover/skill:text-cyan-400 transition-colors">
                              {skill.name}
                            </span>
                            <span className="text-xs text-muted-foreground">{skill.proficiency}%</span>
                          </div>
                          <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.proficiency}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, delay: idx * 0.05, ease: 'easeOut' }}
                              className={`h-full rounded-full ${
                                category === 'Frontend' ? 'bg-cyan-400' :
                                category === 'Backend' ? 'bg-emerald-400' : 'bg-orange-400'
                              }`}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
