'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { portfolioData } from '@/lib/data';
import { Mail, Phone, Linkedin, Github, Send, CheckCircle2 } from 'lucide-react';
import { Icons } from '@/components/icons';
import { useToast } from '@/hooks/use-toast';

export function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      href: `mailto:${portfolioData.contact.email}`,
      text: portfolioData.contact.email,
    },
    {
      icon: Phone,
      label: 'Phone',
      href: `tel:${portfolioData.contact.phone}`,
      text: portfolioData.contact.phone,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: portfolioData.socials.linkedin,
      text: 'Connect on LinkedIn',
    },
    {
      icon: Github,
      label: 'GitHub',
      href: portfolioData.socials.github,
      text: 'Follow on GitHub',
    },
  ];

  if (portfolioData.socials.leetcode) {
    contactLinks.push({
      icon: Icons.leetcode as any,
      label: 'LeetCode',
      href: portfolioData.socials.leetcode,
      text: 'View LeetCode Profile',
    });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast?.({
        title: "Incomplete Fields",
        description: "Please populate all fields before sending a message.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "f842e418-0890-4552-ba04-19a592049cf4",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSending(false);
        setIsSent(true);
        setFormData({ name: '', email: '', message: '' });
        
        toast?.({
          title: "Message Sent Successfully!",
          description: "Thank you for reaching out. Your message has been sent to Abhiram.",
        });

        setTimeout(() => setIsSent(false), 5000);
      } else {
        throw new Error(result.message || "Failed to submit message");
      }
    } catch (error: any) {
      setIsSending(false);
      toast?.({
        title: "Submission Error",
        description: error.message || "Something went wrong. Please check your network and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-20 px-6 py-24 border-t border-slate-100 bg-white">
      <div className="max-w-[1100px] mx-auto w-full">
        <span className="block font-sans text-[0.78rem] font-bold uppercase tracking-[0.08em] text-slate-400 mb-8">
          07 — Contact
        </span>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          {/* Left Column: Description & Socials */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="font-sans text-[2rem] font-bold tracking-tight text-slate-900 leading-snug">
                Let&apos;s Create Something Great
              </h2>
              <p className="text-[1.05rem] text-slate-500 leading-relaxed font-sans">
                I am actively looking for new internship and developer opportunities. Whether you have a question, want to discuss software systems, or just say hello, my inbox is open!
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {contactLinks.map(({ icon: Icon, label, href, text }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-[1.2rem_1.5rem] bg-slate-50 border border-slate-200/80 rounded-2xl font-sans text-[0.92rem] font-bold text-slate-950 transition-all duration-300 hover:translate-x-1.5 hover:border-slate-900"
                >
                  <Icon className="h-[18px] w-[18px] text-slate-900" />
                  <span>{text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-slate-50/50 border border-slate-200/80 p-8 rounded-3xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[0.78rem] font-bold uppercase tracking-[0.05em] text-slate-400 font-sans">Your Name</label>
                <Input
                  type="text"
                  placeholder="Abhiram Gundekari"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white border-slate-200 focus:border-slate-400 focus:ring-0 transition-all rounded-xl text-slate-900 p-6"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-[0.78rem] font-bold uppercase tracking-[0.05em] text-slate-400 font-sans">Your Email</label>
                <Input
                  type="email"
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white border-slate-200 focus:border-slate-400 focus:ring-0 transition-all rounded-xl text-slate-900 p-6"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[0.78rem] font-bold uppercase tracking-[0.05em] text-slate-400 font-sans">Your Message</label>
              <Textarea
                rows={5}
                placeholder="Hi Abhiram, I came across your Python and SQL developer portfolio..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-white border-slate-200 focus:border-slate-400 focus:ring-0 transition-all rounded-xl resize-none leading-relaxed text-slate-900 p-4"
              />
            </div>

            <Button 
              type="submit" 
              disabled={isSending || isSent}
              className="w-full bg-slate-900 text-white hover:bg-slate-800 transition-colors mt-2 rounded-xl py-6 font-bold font-sans tracking-wide"
            >
              {isSending ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                  Transmitting Securely...
                </span>
              ) : isSent ? (
                <span className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="h-5 w-5" />
                  Message Dispatched!
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Send Message
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}


