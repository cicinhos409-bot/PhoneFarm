'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

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

function MultiViewSidebar() {
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
                  aria-current={item.label === 'Visão múltipla' ? 'page' : undefined}
                  className={`dashboard-nav-item ${item.label === 'Visão múltipla' ? 'dashboard-nav-item-active' : ''}`}
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
          <p className="text-[11px] text-slate-500">0 telefones</p>
          <Link href="/dashboard/billing" className="mt-3 block rounded-lg bg-blue-600 px-3 py-2 text-center text-xs font-semibold text-white">Billing</Link>
        </div>
        <div className="text-xs font-medium text-slate-700">Conta PhoneFarm</div>
      </div>
    </aside>
  );
}

function PhonePicker({ onClose }: { onClose: () => void }) {
  const [search, setSearch] = useState('');
  const [power, setPower] = useState('All');

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/35 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="phone-picker-title"
        className="w-full max-w-4xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
      >
        <header className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <h2 id="phone-picker-title" className="text-base font-semibold text-slate-900">Choose cloud phone profiles</h2>
            <p className="mt-1 text-xs text-slate-500">Select at least two profiles of the same phone type to sync.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-md px-2 py-1 text-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700">×</button>
        </header>

        <div className="px-5 pt-4">
          <p className="mb-3 text-xs font-medium text-slate-600">Selected <span className="font-semibold text-slate-900">0</span> cloud phones</p>
          <div className="mb-3 flex flex-wrap gap-2">
            <label className="dashboard-search flex-1">
              <span aria-hidden="true">⌕</span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search name or serial number / profile ID"
                aria-label="Search cloud phone profiles"
              />
            </label>
            <select className="new-phone-input w-auto min-w-32" aria-label="Filter by power" value={power} onChange={(event) => setPower(event.target.value)}>
              <option>All</option>
              <option>On</option>
              <option>Off</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto px-5">
          <table className="w-full min-w-[640px] border-collapse text-left text-xs">
            <thead>
              <tr className="border-y border-slate-100 bg-slate-50 text-slate-500">
                <th className="w-10 px-3 py-3"><span className="sr-only">Select</span></th>
                {['Name', 'Serial number / Profile ID', 'Version', 'Power'].map((heading) => (
                  <th key={heading} className="whitespace-nowrap px-3 py-3 font-semibold">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={5} className="h-40 px-4 text-center text-sm text-slate-400">No phone matches your filters.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <footer className="flex items-center justify-between border-t border-slate-100 px-5 py-3">
          <span className="text-xs text-slate-400">0 cloud phones available</span>
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="dashboard-secondary-button">Cancel</button>
            <button type="button" disabled className="dashboard-primary-button cursor-not-allowed opacity-50">Add selected</button>
          </div>
        </footer>
      </section>
    </div>
  );
}

export default function MultiView() {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [billingOpen, setBillingOpen] = useState(false);

  useEffect(() => {
    if (!billingOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setBillingOpen(false);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [billingOpen]);

  return (
    <main className="flex min-h-screen bg-[#f7f8fa] text-slate-800">
      <MultiViewSidebar />
      <div className="min-w-0 flex-1">
        <div className="dashboard-mobile-header md:hidden">
          <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs text-white">PF</span>
            PhoneFarm
          </Link>
          <span className="text-sm font-medium text-slate-600">Multi-view</span>
        </div>

        <div className="dashboard-content">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Multi-view</h1>
              <p className="mt-1 max-w-[620px] text-sm leading-6 text-slate-600">
                Pick the cloud phones you want to watch side by side. For a consistent layout, group profiles of the same phone type together since different types have different screen dimensions.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setPickerOpen(true)} className="dashboard-primary-button">Add</button>
              <button
                type="button"
                aria-label="Multi-view information"
                aria-expanded={billingOpen}
                aria-controls="multi-view-billing-title"
                title="Start at least two profiles of the same phone type to sync them side by side."
                onClick={() => setBillingOpen((previous) => !previous)}
                className="dashboard-secondary-button !w-[38px] !px-0 text-slate-500"
              >
                ⓘ
              </button>
            </div>
          </div>

          <section className="flex min-h-[420px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-12 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-3xl text-blue-400" aria-hidden="true">⌕</span>
            <h1 className="mt-4 text-sm font-semibold text-slate-800">Please start at least 2 profiles first</h1>
            <p className="mt-1 max-w-[330px] text-xs leading-5 text-slate-400">
              Click <button type="button" onClick={() => setPickerOpen(true)} className="font-medium text-blue-600 hover:underline">Add</button> to pick the cloud phones you want to sync,<br className="hidden sm:block" /> then hit Start sync.
            </p>
            <button type="button" disabled className="dashboard-primary-button mt-5 cursor-not-allowed opacity-50">Start sync</button>
          </section>
        </div>
      </div>
      {billingOpen && (
        <div
          className="fixed inset-0 z-30"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setBillingOpen(false);
          }}
        >
          <section
            role="dialog"
            aria-labelledby="multi-view-billing-title"
            className="absolute right-4 top-[88px] z-40 w-[min(460px,calc(100vw-32px))] rounded-xl border border-slate-200 bg-white p-4 text-left shadow-[0_12px_35px_rgba(15,23,42,0.12)] md:right-[max(24px,calc((100vw-1480px)/2+38px))]"
          >
            <h2 id="multi-view-billing-title" className="mb-2 text-sm font-semibold text-slate-900">Multi-view billing</h2>
            <ol className="list-decimal space-y-2 pl-4 text-xs leading-[1.65] text-slate-600">
              <li>
                Billing is based on the running time:
                <ul className="mt-1 list-disc space-y-0.5 pl-5">
                  <li>No extra charges for monthly rental cloud phones.</li>
                  <li>
                    For pay-per-minute cloud phones, parallels are used first (at no extra cost), followed by bonus minutes and time add-ons in sequence (with a subscription, time add-on usage capped at 172 minutes per day). After that, usage is charged at <strong className="font-semibold text-slate-700">$0.012 per minute</strong> (with a subscription, capped at $2.10 per day).
                  </li>
                </ul>
              </li>
              <li>
                Billing for your cloud phones begins as follows:
                <ul className="mt-1 list-disc space-y-0.5 pl-5">
                  <li>If all cloud phones start within 5 minutes, billing begins immediately upon successful startup of all phones.</li>
                  <li>In case of startup timeout, you can either skip timed-out phones to start billing successful ones, or wait to bill all (including delayed ones) immediately.</li>
                </ul>
              </li>
            </ol>
          </section>
        </div>
      )}
      {pickerOpen && <PhonePicker onClose={() => setPickerOpen(false)} />}
    </main>
  );
}
