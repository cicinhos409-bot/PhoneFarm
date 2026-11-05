'use client';

import Link from 'next/link';

const navigationSections = [
  {
    title: 'PRINCIPAL',
    links: [
      { label: 'Telefones', href: '/dashboard', icon: '▯' },
      { label: 'Proxies', href: '/dashboard/proxies', icon: '◎' },
    ],
  },
  {
    title: 'DESCOBRIR',
    links: [
      { label: 'Aplicações', href: '/dashboard/applications', icon: '▦' },
      { label: 'Automação', href: '/dashboard/automation', icon: '◉' },
      { label: 'Visão múltipla', href: '/dashboard/multi-view', icon: '⊞' },
      { label: 'API & Claude', href: '/dashboard/api-claude', icon: '⚿' },
    ],
  },
  {
    title: 'EQUIPE',
    links: [
      { label: 'Billing', href: '/dashboard/billing', icon: '▤' },
      { label: 'Members', href: '/dashboard/members', icon: '♧' },
      { label: 'Settings', href: '/dashboard/settings', icon: '⚙' },
      { label: 'Contact', href: '/dashboard/contact', icon: '♡' },
    ],
  },
];

function ContactSidebar() {
  return (
    <aside className="dashboard-sidebar hidden md:flex">
      <Link href="/" className="flex h-[72px] items-center gap-2.5 border-b border-slate-200 px-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 text-sm font-bold text-white">PF</span>
        <span className="text-[17px] font-bold tracking-tight text-slate-900">PhoneFarm</span>
      </Link>
      <nav className="dashboard-nav" aria-label="Main menu">
        {navigationSections.map((section) => (
          <section key={section.title} className="mb-5">
            <h2 className="mb-2 px-4 text-[10px] font-semibold tracking-[0.12em] text-slate-400">{section.title}</h2>
            <div className="space-y-1">
              {section.links.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={item.label === 'Contact' ? 'page' : undefined}
                  className={`dashboard-nav-item ${item.label === 'Contact' ? 'dashboard-nav-item-active' : ''}`}
                >
                  <span className="w-4 text-center" aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </nav>
      <div className="dashboard-sidebar-bottom">
        <div className="mb-3 rounded-xl border border-slate-200 bg-white p-3">
          <p className="text-[11px] text-slate-500">0 phones · 0/∞ members</p>
          <Link href="/dashboard/billing" className="mt-3 block rounded-lg bg-blue-600 px-3 py-2 text-center text-xs font-semibold text-white">Billing</Link>
        </div>
        <div className="text-xs font-medium text-slate-700">PhoneFarm account</div>
      </div>
    </aside>
  );
}

const contactChannels = [
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    detail: 'Chat with our team on WhatsApp.',
    icon: '◉',
    className: 'bg-emerald-500',
    action: 'Open WhatsApp',
  },
  {
    id: 'telegram',
    name: 'Telegram',
    detail: 'Message our team on Telegram.',
    icon: '➤',
    className: 'bg-sky-500',
    action: 'Open Telegram',
  },
];

export default function Contact() {
  return (
    <main className="flex min-h-screen bg-[#f7f8fa] text-slate-800">
      <ContactSidebar />
      <div className="min-w-0 flex-1">
        <div className="dashboard-mobile-header md:hidden">
          <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs text-white">PF</span>
            PhoneFarm
          </Link>
          <span className="text-sm font-medium text-slate-600">Contact</span>
        </div>

        <div className="dashboard-content">
          <header className="mb-5">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Contact</h1>
            <p className="mt-1 text-sm text-slate-500">Choose how you would like to get in touch.</p>
          </header>

          <section className="grid max-w-[820px] gap-4 sm:grid-cols-2">
            {contactChannels.map((channel) => (
              <article key={channel.id} className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex items-center gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${channel.className} text-xl text-white`} aria-hidden="true">{channel.icon}</span>
                  <h2 className="text-base font-semibold text-slate-900">{channel.name}</h2>
                </div>
                <p className="mt-3 text-sm text-slate-600">{channel.detail}</p>
                <p className="mt-2 text-xs text-slate-400">Contact link not configured yet.</p>
                <button
                  type="button"
                  disabled
                  title={`Add your ${channel.name} contact details to enable this button.`}
                  className="dashboard-primary-button mt-4 w-full cursor-not-allowed opacity-50"
                >
                  {channel.action}
                </button>
              </article>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}
