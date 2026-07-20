import Image from 'next/image';
import Link from 'next/link';
import { CalendarDays, Mail, Phone } from 'lucide-react';

const contactLinks = [
  { label: '813-389-7871', href: 'tel:+18133897871', Icon: Phone },
  { label: 'contact@keentelengineering.com', href: 'mailto:contact@keentelengineering.com', Icon: Mail },
  { label: 'Schedule a Consultation', href: 'https://calendly.com/keentel-engineering/15min', Icon: CalendarDays },
];

const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/keentelengineering', path: 'M13.5 22v-9h3l.5-4h-3.5V6.5c0-1.2.4-2 2.1-2H18V1.1C17.6 1 16.2 1 14.5 1 11.1 1 9 3 9 6.2V9H6v4h3v9h4.5z' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/keentel-engineering', path: 'M5.3 7.9A2.4 2.4 0 105.3 3a2.4 2.4 0 000 4.9zM3.2 9.7h4.2V22H3.2V9.7zm6.7 0h4v1.7h.1c.6-1.1 2-2.2 4.1-2.2 4.4 0 5.2 2.9 5.2 6.6V22h-4.2v-5.5c0-1.3 0-3-2-3s-2.3 1.4-2.3 2.9V22H9.9V9.7z' },
  { label: 'YouTube', href: 'https://www.youtube.com/@keentelengineering', path: 'M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 00.5 6.2 31 31 0 000 12a31 31 0 00.5 5.8 3 3 0 002.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 002.1-2.1A31 31 0 0024 12a31 31 0 00-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z' },
];

export function NewsletterArticleClosing() {
  return (
    <section className="mt-14 border-t border-[#06103C]/20 pt-8 sm:mt-16 sm:pt-10">
      <div className="grid items-center gap-x-8 gap-y-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        {contactLinks.map(({ label, href, Icon }, index) => (
          <Link key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className={`group flex min-h-12 min-w-0 items-center gap-3 text-sm font-bold text-[#06103C] transition hover:text-[#A8228A] ${index === 1 ? 'sm:col-start-2 sm:row-start-1' : ''} ${index === 2 ? 'sm:col-start-1 sm:row-start-2' : ''}`}>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#A8228A] text-white shadow-sm transition group-hover:-translate-y-0.5"><Icon aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={2.2} /></span>
            <span className="min-w-0 break-words underline decoration-[#A8228A]/30 underline-offset-4">{label}</span>
          </Link>
        ))}
        <div className="flex min-h-12 items-center gap-2.5 sm:col-start-2 sm:row-start-2 sm:justify-end">
          {socialLinks.map(({ label, href, path }) => (
            <Link key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#06103C]/20 text-[#06103C] transition hover:border-[#A8228A] hover:bg-[#A8228A] hover:text-white"><svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d={path} /></svg></Link>
          ))}
        </div>
      </div>

      <div className="my-8 h-px bg-[#06103C]/25 sm:my-10" />

      <div className="overflow-hidden rounded-2xl bg-[#070B68] p-5 text-white shadow-[0_18px_45px_rgba(6,16,60,.18)] sm:p-7">
        <div className="grid items-start gap-5 sm:grid-cols-[104px_1fr] sm:gap-6">
          <Image src="/images/newsletters/author-sonny-patel.jpeg" alt="Sandip Sonny Patel, Principal Engineer and CEO" width={400} height={400} className="h-24 w-24 rounded-full border-4 border-white/10 object-cover sm:h-[104px] sm:w-[104px]" />
          <div>
            <p className="text-xs font-black uppercase tracking-[.18em] text-[#F06AC5]">About the Author</p>
            <h2 className="mt-2 font-urbanist text-xl font-black text-white sm:text-2xl">Sonny Patel P.E. EC</h2>
            <p className="mt-1 text-sm font-semibold text-white/75">IEEE Senior Member</p>
            <p className="mt-4 font-jost text-sm leading-6 text-white/80 sm:text-[15px] sm:leading-7">Sandip (Sonny) R. Patel earned his Electrical Engineering degree from the University of Illinois in 1995. For three decades, he has shaped power engineering as a licensed Professional Engineer across multiple states, a Florida Unlimited Licensed Electrical Contractor, and the founder and CEO of Keentel LLC—combining technical precision, field execution, and accountable leadership.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NewsletterConnectCta() {
  return (
    <section className="border-y border-slate-200 bg-[#F4F6FB] px-5 py-16 sm:px-8 sm:py-20">
      <div className="mx-auto max-w-5xl rounded-3xl bg-gradient-to-br from-[#06103C] via-[#0B1858] to-[#55247D] px-6 py-12 text-center shadow-xl sm:px-10 sm:py-16">
        <p className="text-xs font-black uppercase tracking-[.2em] text-[#F06AC5]">Let&apos;s Connect</p>
        <h2 className="mt-3 font-urbanist text-3xl font-black text-white sm:text-4xl">Turn insight into an executable engineering plan.</h2>
        <p className="mx-auto mt-4 max-w-2xl font-jost leading-7 text-white/75">Whether you&apos;re navigating NERC compliance, integrating BESS, or planning grid-scale projects, Keentel Engineering is ready to support your next phase.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="https://calendly.com/keentel-engineering/15min" target="_blank" className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#C72E9E] to-[#8C268E] px-8 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5">Schedule a Consultation</Link>
          <Link href="/newsletters" className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 px-8 py-3.5 font-bold text-white transition hover:bg-white/10">See All Newsletters</Link>
        </div>
      </div>
    </section>
  );
}
