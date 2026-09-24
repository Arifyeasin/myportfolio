'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase/client';
import { Send, Mail, MapPin, CheckCircle2, Loader2 } from 'lucide-react';

type FormState = {
  name: string;
  email: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [showModal, setShowModal] = useState(false);

  const validate = (): boolean => {
    const newErrors: Errors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    else if (form.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';

    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Please enter a valid email';

    if (!form.message.trim()) newErrors.message = 'Message is required';
    else if (form.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    const { error } = await supabase.from('contact_messages').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    });

    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setShowModal(true);
      setForm({ name: '', email: '', message: '' });
    }
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-[150px]" />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">Let&apos;s Build Something Together</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 space-y-4"
          >
            <div className="rounded-xl border border-border bg-card/50 p-6 hover:border-cyan-400/30 transition-all">
              <div className="w-12 h-12 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-4">
                <Mail size={22} className="text-cyan-400" />
              </div>
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-sm text-muted-foreground">arifyeasin9109@gmail.com</p>
            </div>

            <div className="rounded-xl border border-border bg-card/50 p-6 hover:border-cyan-400/30 transition-all">
              <div className="w-12 h-12 rounded-lg bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center mb-4">
                <MapPin size={22} className="text-emerald-400" />
              </div>
              <h3 className="font-semibold mb-1">Location</h3>
              <p className="text-sm text-muted-foreground">San Francisco, California</p>
            </div>

            <div className="rounded-xl border border-border bg-card/50 p-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                I&apos;m currently open to freelance work and full-time positions.
                Feel free to reach out and I&apos;ll get back to you within 24 hours.
              </p>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="md:col-span-3 rounded-xl border border-border bg-card/50 p-6 space-y-5"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Your name"
                className={`w-full px-4 py-3 rounded-lg bg-background border text-sm placeholder:text-muted-foreground/50 focus:outline-none transition-colors ${
                  errors.name ? 'border-red-500/50' : 'border-border focus:border-cyan-400/50'
                }`}
              />
              {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="you@email.com"
                className={`w-full px-4 py-3 rounded-lg bg-background border text-sm placeholder:text-muted-foreground/50 focus:outline-none transition-colors ${
                  errors.email ? 'border-red-500/50' : 'border-border focus:border-cyan-400/50'
                }`}
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => handleChange('message', e.target.value)}
                placeholder="Tell me about your project..."
                className={`w-full px-4 py-3 rounded-lg bg-background border text-sm placeholder:text-muted-foreground/50 focus:outline-none transition-colors resize-none ${
                  errors.message ? 'border-red-500/50' : 'border-border focus:border-cyan-400/50'
                }`}
              />
              {errors.message && <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-cyan-400 text-background font-semibold hover:bg-cyan-300 transition-all hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'submitting' ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>

            {status === 'error' && (
              <p className="text-sm text-red-400 text-center">
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </motion.form>
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-6"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-sm w-full rounded-2xl border border-cyan-400/30 bg-card p-8 text-center neon-glow"
            >
              <div className="w-16 h-16 rounded-full bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Thanks for reaching out. I&apos;ll get back to you within 24 hours.
              </p>
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2.5 rounded-lg bg-cyan-400 text-background font-semibold hover:bg-cyan-300 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
