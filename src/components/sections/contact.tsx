'use client';

import { useState } from 'react';
import { SectionTitle } from '@/components/ui/section-title';
import { CardContent } from '@/components/ui/card';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { portfolioData } from '@/lib/data';
import { Mail, Phone, Linkedin, Github, MessageSquare, Send, Sparkles, CheckCircle2 } from 'lucide-react';
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

        // Reset success status after a delay
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
    <section id="contact" className="container mx-auto scroll-mt-20 px-4 py-20">
      <SectionTitle icon={MessageSquare}>Get In Touch</SectionTitle>
      
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 md:grid-cols-12 items-stretch">
          
          {/* Left Column: Info & Social Links (5 Cols) */}
          <div className="md:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="font-headline text-2xl font-black text-foreground flex items-center gap-2">
                <span>Let&apos;s Create Something Great</span>
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                I am actively looking for new internship and developer opportunities. Whether you have a question, want to discuss software systems, or just say hello, my inbox is open!
              </p>
            </div>

            <div className="grid gap-3">
              {contactLinks.map(({ icon: Icon, label, href, text }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="flex items-center gap-4 rounded-xl border border-white/[0.04] bg-white/[0.01] p-4.5 transition-all duration-300 hover:bg-accent/5 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform duration-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{label}</h4>
                      <p className="text-sm font-semibold text-foreground group-hover:text-accent mt-0.5 transition-colors line-clamp-1">{text}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Sleek Glass Contact Form (7 Cols) */}
          <div className="md:col-span-7">
            <SpotlightCard className="border-white/[0.05] h-full flex flex-col justify-between p-0">
              <CardContent className="p-6 md:p-8 space-y-5">
                <div className="flex items-center gap-2 text-xs text-accent font-bold tracking-widest uppercase">
                  <Sparkles className="h-4 w-4 text-accent animate-pulse" />
                  <span>Send direct message</span>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4.5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Your Name</label>
                      <Input
                        type="text"
                        placeholder="Abhiram Gundekari"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-white/[0.02] border-white/[0.06] focus:border-accent/40 focus:ring-accent/20 transition-all rounded-lg"
                      />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Your Email</label>
                      <Input
                        type="email"
                        placeholder="name@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="bg-white/[0.02] border-white/[0.06] focus:border-accent/40 focus:ring-accent/20 transition-all rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Your Message</label>
                    <Textarea
                      rows={5}
                      placeholder="Hi Abhiram, I came across your Python and SQL developer portfolio..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-white/[0.02] border-white/[0.06] focus:border-accent/40 focus:ring-accent/20 transition-all rounded-lg resize-none leading-relaxed"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSending || isSent}
                    className="w-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:scale-[1.02] active:scale-95 duration-200 mt-2 rounded-lg py-6"
                  >
                    {isSending ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                        <span>Transmitting Securely...</span>
                      </div>
                    ) : isSent ? (
                      <div className="flex items-center gap-2 text-emerald-400">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Message Dispatched!</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </SpotlightCard>
          </div>

        </div>
      </div>
    </section>
  );
}

