'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

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

function MembersSidebar() {
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
                  aria-current={item.label === 'Members' ? 'page' : undefined}
                  className={`dashboard-nav-item ${item.label === 'Members' ? 'dashboard-nav-item-active' : ''}`}
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

export default function Members() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState('');

  const passwordValid = password.length >= 10 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  function inviteMember(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!emailValid || !passwordValid) {
      setNotice('Enter a valid email address and a password that meets all requirements.');
      return;
    }
    setNotice('Member invitations are not connected yet. No account was created and no invitation was sent.');
  }

  return (
    <main className="flex min-h-screen bg-[#f7f8fa] text-slate-800">
      <MembersSidebar />
      <div className="min-w-0 flex-1">
        <div className="dashboard-mobile-header md:hidden">
          <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs text-white">PF</span>
            PhoneFarm
          </Link>
          <span className="text-sm font-medium text-slate-600">Members</span>
        </div>

        <div className="dashboard-content">
          <header className="mb-5">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Members</h1>
            <p className="mt-1 text-sm text-slate-500">Invite VAs and teammates to operate your cloud phones.</p>
          </header>

          <div className="max-w-[760px] space-y-4">
            <section className="rounded-xl border border-slate-200 bg-white p-4">
              <h2 className="text-sm font-semibold text-slate-900">Invite a teammate</h2>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                For a new teammate, the password below creates their account — they verify their email, then sign in with it. If they already have an account, they keep their own sign-in method and simply accept the invitation.
              </p>

              <form onSubmit={inviteMember} className="mt-3 space-y-2" noValidate>
                <label className="sr-only" htmlFor="member-email">Teammate email</label>
                <input
                  id="member-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => { setEmail(event.target.value); setNotice(''); }}
                  placeholder="teammate@example.com"
                  className="new-phone-input"
                  required
                />
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="relative min-w-0 flex-1">
                    <label className="sr-only" htmlFor="member-password">Password</label>
                    <input
                      id="member-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      value={password}
                      onChange={(event) => { setPassword(event.target.value); setNotice(''); }}
                      placeholder="Password (min 10 characters)"
                      className="new-phone-input pr-16"
                      required
                      minLength={10}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute inset-y-0 right-2 px-2 text-[10px] font-medium text-slate-500 hover:text-slate-800"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  <button type="submit" className="dashboard-primary-button shrink-0" disabled={!emailValid || !passwordValid}>
                    <span aria-hidden="true">♧</span> Invite
                  </button>
                </div>
                <p className={`text-[10px] ${password && !passwordValid ? 'text-amber-700' : 'text-slate-500'}`}>
                  At least 10 characters, with a lowercase letter, an uppercase letter and a digit.
                </p>
              </form>
              {notice && <p role="status" className="mt-3 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs text-blue-800">{notice}</p>}
            </section>

            <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <h2 className="text-sm font-semibold text-slate-900">Team</h2>
                <span className="text-[10px] text-slate-400">0 active members</span>
              </header>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[480px] text-left text-xs">
                  <thead className="bg-slate-50 text-[10px] text-slate-500">
                    <tr>
                      <th className="px-4 py-2.5 font-semibold">Email</th>
                      <th className="px-4 py-2.5 font-semibold">Status</th>
                      <th className="px-4 py-2.5 font-semibold">Invited</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-4 py-3 font-medium text-slate-800">monetizarcomia7@gmail.com</td>
                      <td className="px-4 py-3"><span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-medium text-blue-700">Owner</span></td>
                      <td className="px-4 py-3 text-slate-400">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4">
              <div>
                <h2 className="text-sm font-semibold text-slate-900">Members only see their phones and shared phones</h2>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Phones a member creates are assigned to them, and you can assign any phone from the <Link href="/dashboard" className="font-medium text-blue-600 hover:underline">Phones page</Link>. You always see every phone.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked="true"
                aria-label="Members only see their phones and shared phones"
                title="Team sharing preferences are not connected yet."
                onClick={() => setNotice('Team sharing settings are not connected yet. No permissions were changed.')}
                className="relative mt-1 h-5 w-9 shrink-0 rounded-full bg-blue-600"
              >
                <span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-white shadow-sm" />
              </button>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
