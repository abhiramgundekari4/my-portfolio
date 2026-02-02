import { SectionTitle } from '@/components/ui/section-title';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { portfolioData } from '@/lib/data';
import { Mail, Phone, Linkedin, Github, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export function ContactSection() {
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

  return (
    <section id="contact" className="container mx-auto scroll-mt-20 px-4 py-16">
      <SectionTitle icon={MessageSquare}>Get In Touch</SectionTitle>
      <Card>
        <CardContent className="p-8">
          <p className="mb-8 max-w-2xl text-center mx-auto text-lg text-muted-foreground">
            I'm actively looking for new opportunities and would love to hear from you. Whether you have a question or just want to say hi, feel free to reach out.
          </p>
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
            {contactLinks.map(({ icon: Icon, label, href, text }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="flex items-center gap-4 rounded-lg border bg-card p-4 transition-all hover:bg-secondary hover:shadow-md">
                  <Icon className="h-8 w-8 text-accent" />
                  <div>
                    <h4 className="font-semibold text-primary">{label}</h4>
                    <p className="text-sm text-muted-foreground group-hover:underline">{text}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
