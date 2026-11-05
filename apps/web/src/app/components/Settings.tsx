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

function SettingsSidebar() {
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
                  aria-current={item.label === 'Settings' ? 'page' : undefined}
                  className={`dashboard-nav-item ${item.label === 'Settings' ? 'dashboard-nav-item-active' : ''}`}
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

function SettingsCard({ children }: { children: React.ReactNode }) {
  return <section className="rounded-xl border border-slate-200 bg-white p-4">{children}</section>;
}

function SettingRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1 border-b border-slate-100 py-2.5 last:border-0 sm:grid-cols-[150px_minmax(0,1fr)] sm:items-center sm:gap-4">
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className="min-w-0 text-xs text-slate-800">{children}</dd>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${checked ? 'bg-blue-600' : 'bg-slate-300'}`}
    >
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-all ${checked ? 'right-0.5' : 'left-0.5'}`} />
    </button>
  );
}

export default function Settings() {
  const [fullName, setFullName] = useState('monetizar comia');
  const [notice, setNotice] = useState('');
  const [keepPhonesRunning, setKeepPhonesRunning] = useState(false);
  const [darkPhoneViewer, setDarkPhoneViewer] = useState(false);
  const [walletAlertEnabled, setWalletAlertEnabled] = useState(false);
  const [walletThreshold, setWalletThreshold] = useState('10');
  const [productEmails, setProductEmails] = useState(true);

  function showUnavailable(action: string) {
    setNotice(`${action} is not connected yet. No account data or settings were changed.`);
  }

  function saveName(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showUnavailable('Saving your full name');
  }

  return (
    <main className="flex min-h-screen bg-[#f7f8fa] text-slate-800">
      <SettingsSidebar />
      <div className="min-w-0 flex-1">
        <div className="dashboard-mobile-header md:hidden">
          <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs text-white">PF</span>
            PhoneFarm
          </Link>
          <span className="text-sm font-medium text-slate-600">Settings</span>
        </div>

        <div className="dashboard-content">
          <header className="mb-5">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Settings</h1>
            <p className="mt-1 text-sm text-slate-500">Manage your account, security and preferences.</p>
          </header>

          <div className="max-w-[760px] space-y-4">
            <SettingsCard>
              <h2 className="text-xs font-semibold text-slate-900">Account</h2>
              <p className="mt-1 text-[10px] text-slate-400">Who you are on PhoneFarm.</p>
              <dl className="mt-2">
                <SettingRow label="Email">
                  <span>monetizarcomia7@gmail.com</span>
                  <span className="mt-1 block text-[10px] text-slate-400">Contact support if you need to change it.</span>
                </SettingRow>
                <SettingRow label="Full name">
                  <form onSubmit={saveName} className="flex flex-wrap items-center gap-2">
                    <input
                      value={fullName}
                      onChange={(event) => setFullName(event.target.value)}
                      aria-label="Full name"
                      className="new-phone-input h-8 min-h-8 max-w-[260px]"
                    />
                    <button type="submit" className="dashboard-secondary-button !min-h-8 !px-3 !text-[11px]">Save</button>
                  </form>
                </SettingRow>
                <SettingRow label="Sign-in method">Google</SettingRow>
                <SettingRow label="Member since">November 5, 2026</SettingRow>
              </dl>
            </SettingsCard>

            <SettingsCard>
              <h2 className="text-xs font-semibold text-slate-900">Security</h2>
              <p className="mt-1 text-[10px] text-slate-400">Change your password or sign out of every device.</p>
              <div className="mt-4 border-b border-slate-100 pb-3">
                <h3 className="text-xs font-semibold text-slate-800">Change password</h3>
                <p className="mt-1 text-xs text-slate-600">You sign in with Google. Your password is managed by Google.</p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
                <div className="max-w-[430px]">
                  <h3 className="text-xs font-semibold text-slate-800">Active sessions</h3>
                  <p className="mt-1 text-[10px] leading-4 text-slate-500">
                    Ends every session on every browser and device, this one included. API keys keep working; revoke them on the <Link href="/dashboard/api-claude" className="text-blue-600 hover:underline">API &amp; Claude</Link> page.
                  </p>
                </div>
                <button type="button" onClick={() => showUnavailable('Signing out of all devices')} className="dashboard-secondary-button !min-h-8 !text-[11px]">
                  ↪ Sign out of all devices
                </button>
              </div>
            </SettingsCard>

            <SettingsCard>
              <h2 className="text-xs font-semibold text-slate-900">Two-factor authentication</h2>
              <p className="mt-1 text-[10px] leading-4 text-slate-400">Require a 6-digit code from an authenticator app (Google Authenticator, 1Password, Authy…) each time you sign in.</p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-slate-600">Two-factor authentication is off.</p>
                <button type="button" onClick={() => showUnavailable('Two-factor authentication setup')} className="dashboard-primary-button !min-h-8 !px-3 !text-[11px]">Set up</button>
              </div>
            </SettingsCard>

            <SettingsCard>
              <h2 className="text-xs font-semibold text-slate-900">Phones</h2>
              <p className="mt-1 text-[10px] text-slate-400">Applies to every phone on your account.</p>
              <div className="mt-3 divide-y divide-slate-100">
                <div className="flex items-start justify-between gap-4 py-3 first:pt-0">
                  <div>
                    <h3 className="text-xs font-medium text-slate-800">Keep phones running 24/7</h3>
                    <p className="mt-1 max-w-[570px] text-[10px] leading-4 text-slate-500">
                      By default, a phone started from the dashboard stops after 10 minutes when nobody is viewing it and no automation is running, so a forgotten phone does not use your minutes. Turn this on to keep your phones running until you stop them or your runtime minutes run out. Phones started through the API are never stopped for inactivity.
                    </p>
                  </div>
                  <Toggle label="Keep phones running 24/7" checked={keepPhonesRunning} onChange={() => { setKeepPhonesRunning((value) => !value); showUnavailable('Phone runtime preference'); }} />
                </div>
                <div className="flex items-start justify-between gap-4 py-3 last:pb-0">
                  <div>
                    <h3 className="text-xs font-medium text-slate-800">Dark phone viewer</h3>
                    <p className="mt-1 text-[10px] leading-4 text-slate-500">Show your phone windows with a dark theme. Takes effect the next time you open a phone window.</p>
                  </div>
                  <Toggle label="Dark phone viewer" checked={darkPhoneViewer} onChange={() => { setDarkPhoneViewer((value) => !value); showUnavailable('Phone viewer preference'); }} />
                </div>
              </div>
            </SettingsCard>

            <SettingsCard>
              <h2 className="text-xs font-semibold text-slate-900">Wallet</h2>
              <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-[570px]">
                  <h3 className="text-xs font-medium text-slate-800">Low wallet balance alert</h3>
                  <p className="mt-1 text-[10px] leading-4 text-slate-500">Get an email when your wallet balance drops below an amount you choose, so you can top up before a plan paid from your wallet fails to renew or you run short of funds for a time add-on.</p>
                  {walletAlertEnabled && (
                    <label className="mt-3 flex items-center gap-2 text-[10px] text-slate-600">
                      Alert below
                      <span className="flex items-center rounded-lg border border-slate-200 bg-white px-2">
                        <span>$</span>
                        <input
                          type="number"
                          min="1"
                          value={walletThreshold}
                          onChange={(event) => setWalletThreshold(event.target.value)}
                          aria-label="Low wallet balance threshold in dollars"
                          className="w-20 border-0 px-1 py-1.5 text-xs outline-none"
                        />
                      </span>
                    </label>
                  )}
                </div>
                <Toggle label="Low wallet balance alert" checked={walletAlertEnabled} onChange={() => { setWalletAlertEnabled((value) => !value); showUnavailable('Wallet alert preference'); }} />
              </div>
            </SettingsCard>

            <SettingsCard>
              <h2 className="text-xs font-semibold text-slate-900">Email preferences</h2>
              <p className="mt-1 text-[10px] text-slate-400">Choose which emails we send you.</p>
              <div className="mt-3 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xs font-medium text-slate-800">Product news and tips</h3>
                  <p className="mt-1 text-[10px] leading-4 text-slate-500">New features, announcements and tips for running your phones.</p>
                </div>
                <Toggle label="Product news and tips" checked={productEmails} onChange={() => { setProductEmails((value) => !value); showUnavailable('Email preferences'); }} />
              </div>
              <p className="mt-3 border-t border-slate-100 pt-3 text-[10px] leading-4 text-slate-500">
                Billing and account emails (payment receipts, failed payments, plan endings, wallet alerts you set) are always sent.
              </p>
            </SettingsCard>

            <SettingsCard>
              <h2 className="text-xs font-semibold text-slate-900">Your data</h2>
              <p className="mt-1 text-[10px] text-slate-500">Download a copy of your account data as a JSON file.</p>
              <p className="mt-2 text-[10px] leading-4 text-slate-400">Includes your profile, subscriptions, phones, wallet transactions and team members. Passwords, API keys, proxy credentials and payment details are never included.</p>
              <button type="button" onClick={() => showUnavailable('Account data export')} className="dashboard-secondary-button mt-3 !min-h-8 !text-[11px]">
                ↓ Download account data
              </button>
            </SettingsCard>

            {notice && <p role="status" className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-xs text-blue-800">{notice}</p>}
          </div>
        </div>
      </div>
    </main>
  );
}
