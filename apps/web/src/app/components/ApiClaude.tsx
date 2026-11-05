'use client';

import Link from 'next/link';
import { useState } from 'react';

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

function ApiClaudeSidebar() {
  return (
    <aside className="dashboard-sidebar hidden md:flex">
      <Link href="/" className="flex h-[72px] items-center gap-2.5 border-b border-slate-200 px-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 text-sm font-bold text-white">PF</span>
        <span className="text-[17px] font-bold tracking-tight text-slate-900">PhoneFarm</span>
      </Link>
      <nav className="dashboard-nav" aria-label="Menu principal">
        {navigationSections.map((section) => (
          <section key={section.title} className="mb-5">
            <h2 className="mb-2 px-4 text-[10px] font-semibold tracking-[0.12em] text-slate-400">{section.title}</h2>
            <div className="space-y-1">
              {section.links.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={item.label === 'API & Claude' ? 'page' : undefined}
                  className={`dashboard-nav-item ${item.label === 'API & Claude' ? 'dashboard-nav-item-active' : ''}`}
                >
                  <span className="w-4 text-center" aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                  {item.label === 'API & Claude' && <span className="dashboard-badge">NOVO</span>}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </nav>
      <div className="dashboard-sidebar-bottom">
        <div className="mb-3 rounded-xl border border-slate-200 bg-white p-3">
          <p className="text-[11px] text-slate-500">0 telefones</p>
          <Link href="/dashboard/billing" className="mt-3 block rounded-lg bg-blue-600 px-3 py-2 text-center text-xs font-semibold text-white">Billing</Link>
        </div>
        <div className="text-xs font-medium text-slate-700">Conta PhoneFarm</div>
      </div>
    </aside>
  );
}

export default function ApiClaude() {
  const [notice, setNotice] = useState('');

  return (
    <main className="flex min-h-screen bg-[#f7f8fa] text-slate-800">
      <ApiClaudeSidebar />
      <div className="min-w-0 flex-1">
        <div className="dashboard-mobile-header md:hidden">
          <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs text-white">PF</span>
            PhoneFarm
          </Link>
          <span className="text-sm font-medium text-slate-600">API &amp; Claude</span>
        </div>

        <div className="dashboard-content">
          <header className="mb-5">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">API &amp; Claude</h1>
            <p className="mt-1 max-w-[1050px] text-sm leading-6 text-slate-600">
              Control your phones from Claude, or from your own code. Each key acts on this account only — it can never see anyone else&apos;s phones, and it cannot go past your plan.
            </p>
          </header>

          <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
              <span className="text-blue-600" aria-hidden="true">♙</span>
              <h2>Included in the Automation plan</h2>
            </div>
            <div className="mt-2 max-w-[650px] space-y-2 text-xs leading-[1.65] text-slate-600">
              <p>
                The API and the Claude connector come with Automation, at <strong className="font-semibold text-slate-800">$99/month</strong> on top of your phone plan. It is the same add-on that unlocks the built-in automations — one subscription covers both.
              </p>
              <p>
                Your phones keep working exactly as they do today without it. This only adds the ability to drive them from Claude or from your own code.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setNotice('Automation plan subscriptions are not connected yet. No plan or charges were added.')}
              className="dashboard-primary-button mt-4"
            >
              Add Automation <span aria-hidden="true">↗</span>
            </button>
            {notice && (
              <p role="status" className="mt-3 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs text-blue-800">
                {notice}
              </p>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
