'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type BillingTab = 'Overview' | 'Usage' | 'Purchase history';
type HistoryFilter = 'All' | 'Purchases' | 'Top-ups' | 'Refunds' | 'Usage charges';
type BillingModal = 'plan' | 'wallet' | 'time-addon';

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

function BillingSidebar() {
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
                  aria-current={item.label === 'Billing' ? 'page' : undefined}
                  className={`dashboard-nav-item ${item.label === 'Billing' ? 'dashboard-nav-item-active' : ''}`}
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
          <span className="mt-3 block rounded-lg bg-blue-600 px-3 py-2 text-center text-xs font-semibold text-white">Billing</span>
        </div>
        <div className="text-xs font-medium text-slate-700">Conta PhoneFarm</div>
      </div>
    </aside>
  );
}

function SectionLabel({ children }: { children: string }) {
  return <h2 className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">{children}</h2>;
}

function BillingCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <section className={`rounded-xl border border-slate-200 bg-white p-4 ${className}`}>{children}</section>;
}

function UsageEmptyState() {
  return (
    <div className="flex min-h-[140px] flex-col items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50/60 px-4 text-center">
      <p className="text-sm font-medium text-slate-700">No usage recorded in the last 30 days yet.</p>
      <p className="mt-1 text-xs text-slate-500">Start a phone to see stats here.</p>
    </div>
  );
}

function BillingModalFrame({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/35 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="my-auto flex max-h-[calc(100vh-32px)] w-full max-w-[810px] flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl md:flex-row"
      >
        {children}
      </section>
    </div>
  );
}

function OrderSummary({
  title,
  rows,
  total,
  warning,
  acknowledgement,
  buttonLabel,
  canSubmit = true,
  onSubmit,
}: {
  title: string;
  rows: Array<[string, string]>;
  total: string;
  warning?: string;
  acknowledgement: React.ReactNode;
  buttonLabel: string;
  canSubmit?: boolean;
  onSubmit: () => void;
}) {
  const [accepted, setAccepted] = useState(false);

  return (
    <aside className="flex w-full shrink-0 flex-col overflow-y-auto bg-slate-50 p-5 md:w-[265px]">
      <h3 className="text-xs font-semibold text-slate-800">{title}</h3>
      <dl className="mt-3 space-y-2 text-xs">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-3">
            <dt className="text-slate-500">{label}</dt>
            <dd className="text-right font-medium text-slate-700">{value}</dd>
          </div>
        ))}
        <div className="flex justify-between gap-3 border-t border-slate-200 pt-2">
          <dt className="font-semibold text-slate-800">Total</dt>
          <dd className="font-semibold text-slate-800">{total}</dd>
        </div>
      </dl>
      {warning && <p className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-2.5 text-[10px] leading-[1.55] text-slate-600">{warning}</p>}
      <label className="mt-auto flex cursor-pointer gap-2 rounded-lg border border-slate-200 bg-white p-3 text-[10px] leading-[1.55] text-slate-500 md:mt-5">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(event) => setAccepted(event.target.checked)}
          className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-blue-600"
        />
        <span>{acknowledgement}</span>
      </label>
      <button
        type="button"
        disabled={!accepted || !canSubmit}
        onClick={onSubmit}
        className="dashboard-primary-button mt-2 w-full disabled:cursor-not-allowed disabled:opacity-50"
      >
        {buttonLabel}
      </button>
    </aside>
  );
}

function ChangePlanModal({
  onClose,
  onUnavailable,
}: {
  onClose: () => void;
  onUnavailable: () => void;
}) {
  return (
    <BillingModalFrame title="Change plan" onClose={onClose}>
      <div className="min-w-0 flex-1 overflow-y-auto p-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">Change plan</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="text-lg leading-none text-slate-400 hover:text-slate-700">×</button>
        </div>
        <label className="block text-[10px] font-medium text-slate-500">
          Profiles
          <select className="new-phone-input mt-1.5" defaultValue="20">
            <option value="20">20 profiles — $39.99/month</option>
          </select>
        </label>
        <div className="mt-5">
          <p className="text-[10px] font-medium text-slate-500">Bonus minutes <span aria-hidden="true">ⓘ</span></p>
          <p className="mt-1 text-xs font-medium text-slate-700">60 min/month</p>
        </div>
        <fieldset className="mt-5">
          <legend className="mb-2 text-[10px] font-medium text-slate-500">Payment method</legend>
          <div className="grid gap-2 sm:grid-cols-3">
            <label className="flex cursor-not-allowed items-start gap-2 rounded-xl border border-slate-200 p-2.5 opacity-60">
              <input type="radio" name="plan-payment-method" disabled />
              <span><span className="block text-[11px] font-medium text-slate-700">Wallet</span><span className="mt-1 block text-[9px] text-slate-400">Empty, top up first</span></span>
            </label>
            <label className="flex cursor-pointer items-start gap-2 rounded-xl border border-blue-500 bg-blue-50/60 p-2.5">
              <input type="radio" name="plan-payment-method" defaultChecked className="accent-blue-600" />
              <span><span className="block text-[11px] font-medium text-slate-700">Card</span><span className="mt-1 block text-[9px] text-slate-400">Cards, Apple Pay</span></span>
            </label>
            <label className="flex cursor-pointer items-start gap-2 rounded-xl border border-slate-200 p-2.5">
              <input type="radio" name="plan-payment-method" className="accent-blue-600" />
              <span><span className="block text-[11px] font-medium text-slate-700">Crypto</span><span className="mt-1 block text-[9px] text-slate-400">BTC, ETH, USDT &amp; more</span></span>
            </label>
          </div>
        </fieldset>
        <label className="mt-3 flex cursor-pointer items-start justify-between gap-3 rounded-xl border border-slate-200 p-3">
          <span>
            <span className="block text-[11px] font-semibold text-slate-700">Auto-renew (wallet, then card)</span>
            <span className="mt-1 block text-[9px] leading-4 text-slate-400">$39.99 every 30 days after this period: from your wallet first, then this card for the rest. Turn it off anytime from Billing.</span>
          </span>
          <input type="checkbox" defaultChecked className="mt-0.5 h-4 w-4 shrink-0 accent-blue-600" />
        </label>
      </div>
      <OrderSummary
        title="Subscription overview"
        rows={[
          ['Starter', '$39.99/month'],
          ['Profiles', '20 profiles'],
          ['Bonus minutes', '60 min/month'],
        ]}
        total="$39.99/month"
        acknowledgement={(
          <>
            I acknowledge that $39.99 is paid now for 30 days, and I authorize PhoneFarm to take <strong className="font-semibold text-slate-700">$39.99 every 30 days</strong> after that, from my wallet balance first and from my card for the rest. The plan renews automatically. I accept the <Link href="/terms" className="text-blue-600 underline">Terms of Service</Link> and <Link href="/refund" className="text-blue-600 underline">Refund Policy</Link>.
          </>
        )}
        buttonLabel="Subscribe"
        onSubmit={onUnavailable}
      />
    </BillingModalFrame>
  );
}

function WalletModal({
  onClose,
  onUnavailable,
}: {
  onClose: () => void;
  onUnavailable: () => void;
}) {
  const [amount, setAmount] = useState(50);
  const [paymentMethod, setPaymentMethod] = useState<'Card' | 'Crypto'>('Card');
  const validAmount = Number.isFinite(amount) && amount >= 30;

  return (
    <BillingModalFrame title="Top up your wallet" onClose={onClose}>
      <div className="min-w-0 flex-1 overflow-y-auto p-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">Top up your wallet</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="text-lg leading-none text-slate-400 hover:text-slate-700">×</button>
        </div>
        <fieldset>
          <legend className="mb-2 text-[10px] font-medium text-slate-500">Payment method</legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {(['Card', 'Crypto'] as const).map((method) => (
              <label key={method} className={`flex cursor-pointer items-center gap-2 rounded-xl border p-2.5 ${paymentMethod === method ? 'border-blue-500 bg-blue-50/60' : 'border-slate-200'}`}>
                <input type="radio" name="wallet-payment-method" checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} className="accent-blue-600" />
                <span><span className="block text-[11px] font-medium text-slate-700">{method}</span><span className="mt-1 block text-[9px] text-slate-400">{method === 'Card' ? 'Cards, Apple Pay, Google Pay' : 'BTC, ETH, SOL, USDT & more'}</span></span>
              </label>
            ))}
          </div>
        </fieldset>
        <label className="mt-4 block text-[10px] font-medium text-slate-500">
          USD($) — minimum $30
          <input
            type="number"
            min="30"
            step="1"
            value={amount}
            onChange={(event) => setAmount(Math.max(0, Number(event.target.value)))}
            className="new-phone-input mt-1.5 max-w-36"
          />
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {[30, 50, 100, 300, 500].map((preset) => (
            <button type="button" key={preset} onClick={() => setAmount(preset)} className={`rounded-full px-3 py-1.5 text-[10px] font-semibold ${amount === preset ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}>${preset}</button>
          ))}
        </div>
        <p className="mt-4 text-[9px] leading-4 text-slate-400">Secure checkout is not connected yet. No payment details will be collected on this page.</p>
      </div>
      <OrderSummary
        title="Order summary"
        rows={[
          ['Top-up amount', `$${amount.toFixed(2)}`],
          ['Fee', '$0.00'],
        ]}
        total={`$${amount.toFixed(2)}`}
        acknowledgement={<>I acknowledge that this is a one-time payment for a wallet top-up, the service is delivered digitally upon payment, and all sales are final. I accept the <Link href="/terms" className="text-blue-600 underline">Terms of Service</Link> and <Link href="/refund" className="text-blue-600 underline">Refund Policy</Link>.</>}
        buttonLabel={`Pay $${amount.toFixed(2)}`}
        canSubmit={validAmount}
        onSubmit={onUnavailable}
      />
    </BillingModalFrame>
  );
}

function TimeAddonModal({
  onClose,
  onUnavailable,
}: {
  onClose: () => void;
  onUnavailable: () => void;
}) {
  const [promoCode, setPromoCode] = useState('');

  return (
    <BillingModalFrame title="Buy time add-on" onClose={onClose}>
      <div className="min-w-0 flex-1 overflow-y-auto p-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">Buy time add-on</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="text-lg leading-none text-slate-400 hover:text-slate-700">×</button>
        </div>
        <label className="block text-[10px] font-medium text-slate-500">
          Time add-on
          <select className="new-phone-input mt-1.5" defaultValue="5000">
            <option value="5000">5,000 mins ($60)</option>
          </select>
        </label>
        <label className="mt-3 block text-[10px] font-medium text-slate-500">
          Promo code
          <input value={promoCode} onChange={(event) => setPromoCode(event.target.value)} placeholder="Please enter the promo code" className="new-phone-input mt-1.5" />
        </label>
        <div className="mt-3 rounded-lg border border-blue-100 bg-blue-50/50 p-3 text-[9px] leading-[1.6] text-slate-600">
          <strong className="font-semibold text-slate-700">Note:</strong>
          <ol className="mt-1 list-decimal space-y-1 pl-4">
            <li>Time add-ons are valid until used.</li>
            <li>When you purchase a subscription, at most 172 minutes will be deducted from the time add-on per day. Any minutes used beyond this daily limit will not be deducted.</li>
            <li>Shared among team members. Applicable to cloud phones on the pay-per-minute plan.</li>
          </ol>
        </div>
        <fieldset className="mt-4">
          <legend className="mb-2 text-[10px] font-medium text-slate-500">Payment method</legend>
          <label className="flex max-w-[220px] cursor-not-allowed items-center gap-2 rounded-xl border border-slate-200 p-2.5 opacity-60">
            <input type="radio" name="time-addon-payment-method" disabled />
            <span><span className="block text-[11px] font-medium text-slate-700">Wallet</span><span className="mt-1 block text-[9px] text-slate-400">Empty — top up to use</span></span>
          </label>
        </fieldset>
        <p className="mt-3 text-[9px] leading-4 text-slate-400">Time add-ons are paid from your wallet balance. Top it up by card or crypto from the Wallet card.</p>
      </div>
      <OrderSummary
        title="Order summary"
        rows={[
          ['Full price', '$60.00'],
          ['Order amount', '$60.00'],
        ]}
        total="$60.00"
        warning="Your wallet balance ($0.00) doesn't cover this add-on ($60.00). Top up your wallet first, then come back."
        canSubmit={false}
        acknowledgement={<>I acknowledge that this is a one-time payment for 5,000 minutes of runtime (valid until used), the service is delivered digitally upon payment, and all sales are final. I accept the <Link href="/terms" className="text-blue-600 underline">Terms of Service</Link> and <Link href="/refund" className="text-blue-600 underline">Refund Policy</Link>.</>}
        buttonLabel="Pay $60.00"
        onSubmit={onUnavailable}
      />
    </BillingModalFrame>
  );
}

export default function Billing() {
  const [tab, setTab] = useState<BillingTab>('Overview');
  const [historyFilter, setHistoryFilter] = useState<HistoryFilter>('All');
  const [notice, setNotice] = useState('');
  const [activeModal, setActiveModal] = useState<BillingModal | null>(null);

  useEffect(() => {
    if (!activeModal) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setActiveModal(null);
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal]);

  function showUnavailable(action: string) {
    setNotice(`${action} is not connected yet. No payment, subscription, or account setting was changed.`);
    setActiveModal(null);
  }

  return (
    <main className="flex min-h-screen bg-[#f7f8fa] text-slate-800">
      <BillingSidebar />
      <div className="min-w-0 flex-1">
        <div className="dashboard-mobile-header md:hidden">
          <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs text-white">PF</span>
            PhoneFarm
          </Link>
          <span className="text-sm font-medium text-slate-600">Billing</span>
        </div>

        <div className="dashboard-content">
          <header className="mb-5">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Billing</h1>
            <p className="mt-1 text-sm text-slate-500">Manage your subscription, wallet and usage.</p>
          </header>

          <div className="mb-4 flex gap-5 border-b border-slate-200" role="tablist" aria-label="Billing sections">
            {(['Overview', 'Usage', 'Purchase history'] as const).map((item) => (
              <button
                type="button"
                role="tab"
                key={item}
                aria-selected={tab === item}
                onClick={() => { setTab(item); setNotice(''); }}
                className={`border-b-2 px-1 pb-2.5 text-xs font-medium ${
                  tab === item ? 'border-blue-600 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {tab === 'Overview' && (
            <div className="space-y-5">
              <section>
                <SectionLabel>Subscriptions</SectionLabel>
                <div className="grid gap-3 xl:grid-cols-2">
                  <BillingCard>
                    <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-900"><span className="text-blue-600">▱</span>Phones subscription</h3>
                    <dl className="grid grid-cols-[96px_1fr] gap-y-1.5 text-xs">
                      <dt className="text-slate-500">Plan:</dt><dd className="text-slate-800">Free</dd>
                      <dt className="text-slate-500">Profiles:</dt><dd className="text-slate-800">0</dd>
                      <dt className="text-slate-500">Monthly fee:</dt><dd className="text-slate-800">$0.00</dd>
                    </dl>
                    <p className="mt-2 text-[10px] text-slate-400">No active subscription.</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <button type="button" onClick={() => showUnavailable('Subscription renewal')} className="dashboard-primary-button !min-h-[32px] !px-3 !text-[11px]">Renew</button>
                      <button type="button" onClick={() => { setNotice(''); setActiveModal('plan'); }} className="dashboard-secondary-button !min-h-[32px] !px-3 !text-[11px]">Change plan</button>
                    </div>
                  </BillingCard>

                  <BillingCard>
                    <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-900"><span className="text-blue-600">✣</span>Automation add-on</h3>
                    <dl className="grid grid-cols-[96px_1fr] gap-y-1.5 text-xs">
                      <dt className="text-slate-500">Status:</dt><dd className="text-slate-500">Not subscribed</dd>
                      <dt className="text-slate-500">Monthly fee:</dt><dd className="text-slate-800">$99.00</dd>
                    </dl>
                    <p className="mt-2 text-[10px] leading-4 text-slate-400">ML-powered automation, billed monthly on its own cycle. Cancel anytime.</p>
                    <button type="button" onClick={() => showUnavailable('Automation add-on')} className="dashboard-primary-button mt-3 !min-h-[32px] !px-3 !text-[11px]">Add automation</button>
                  </BillingCard>
                </div>
              </section>

              <section>
                <SectionLabel>Balances &amp; credits</SectionLabel>
                <div className="grid gap-3 lg:grid-cols-3">
                  <BillingCard className="flex flex-col">
                    <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-900"><span className="text-blue-600">▣</span>Wallet</h3>
                    <p className="text-xs text-slate-500">Balance: <strong className="ml-5 text-slate-900">$0.00</strong></p>
                    <p className="mt-2 text-[10px] leading-4 text-slate-400">Top-ups and refunds land here. Consumed after bonus minutes.</p>
                    <button type="button" onClick={() => showUnavailable('Wallet low-balance email alerts')} className="mt-1 self-start text-[10px] text-blue-600 hover:underline">Get an email when it runs low</button>
                    <button type="button" onClick={() => { setNotice(''); setActiveModal('wallet'); }} className="dashboard-primary-button mt-3 self-start !min-h-[32px] !px-3 !text-[11px]">＋ Top up</button>
                  </BillingCard>
                  <BillingCard>
                    <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-900"><span className="text-blue-600">◴</span>Time add-on</h3>
                    <p className="text-xs text-slate-500">Available: <strong className="ml-5 text-slate-900">0</strong></p>
                    <div className="mt-2 h-1.5 rounded-full bg-slate-100" />
                    <p className="mt-2 text-[10px] text-slate-400">Used: 0 / Total: 0</p>
                    <button type="button" onClick={() => { setNotice(''); setActiveModal('time-addon'); }} className="dashboard-primary-button mt-3 self-start !min-h-[32px] !px-3 !text-[11px]">Buy</button>
                  </BillingCard>
                  <BillingCard>
                    <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold text-slate-900"><span className="text-blue-600">✣</span>Bonus minutes</h3>
                    <p className="text-xs text-slate-500">Available: <strong className="ml-5 text-slate-900">0</strong></p>
                    <div className="mt-2 h-1.5 rounded-full bg-slate-100" />
                    <p className="mt-2 text-[10px] text-slate-400">Used: 0 / Total: 0</p>
                    <p className="mt-2 text-[10px] leading-4 text-slate-400">Free minutes included with your subscription each month, consumed before add-on minutes and wallet.</p>
                  </BillingCard>
                </div>
              </section>

              <section>
                <SectionLabel>Account limits</SectionLabel>
                <BillingCard className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    ['Members', '0 / ∞'],
                    ['Profiles', '0 / ∞'],
                    ['Daily opens', '0 / ∞'],
                    ['Daily creates', '0 / ∞'],
                  ].map(([label, value]) => (
                    <p key={label} className="text-[11px] text-slate-500">{label} <strong className="ml-1 font-medium text-slate-800">{value}</strong></p>
                  ))}
                </BillingCard>
              </section>

              <section>
                <SectionLabel>Usage</SectionLabel>
                <div className="mb-3 grid gap-3 sm:grid-cols-3">
                  {[
                    ['Total minutes', '0', 'Phone time + automation, last 30 days'],
                    ['Estimated cost', '$0.00', 'At $0.012 / minute'],
                    ['Phones used', '0', '0 operators'],
                  ].map(([label, value, caption]) => (
                    <BillingCard key={label}>
                      <p className="text-xs text-slate-500">{label}</p>
                      <p className="mt-2 text-xl font-semibold text-slate-900">{value}</p>
                      <p className="mt-1 text-[10px] text-slate-400">{caption}</p>
                    </BillingCard>
                  ))}
                </div>
                <UsageEmptyState />
              </section>

              <section>
                <div className="mb-2 flex items-center justify-between">
                  <SectionLabel>Purchase history</SectionLabel>
                  <button type="button" onClick={() => setTab('Purchase history')} className="text-[11px] font-medium text-blue-600 hover:underline">View all</button>
                </div>
                <BillingCard className="flex min-h-24 items-center justify-center">
                  <p className="text-xs text-slate-400">No transactions yet. Purchases, top-ups and usage charges will appear here.</p>
                </BillingCard>
              </section>
            </div>
          )}

          {tab === 'Usage' && (
            <section>
              <SectionLabel>Usage — last 30 days</SectionLabel>
              <div className="mb-4 grid gap-3 sm:grid-cols-3">
                {[
                  ['Total minutes', '0', 'Phone time + automation'],
                  ['Estimated cost', '$0.00', 'At $0.012 / minute'],
                  ['Phones used', '0', '0 operators'],
                ].map(([label, value, caption]) => (
                  <BillingCard key={label}>
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="mt-2 text-xl font-semibold text-slate-900">{value}</p>
                    <p className="mt-1 text-[10px] text-slate-400">{caption}</p>
                  </BillingCard>
                ))}
              </div>
              <UsageEmptyState />
            </section>
          )}

          {tab === 'Purchase history' && (
            <section>
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <SectionLabel>Purchase history</SectionLabel>
                <label className="flex items-center gap-2 text-xs text-slate-500">
                  Filter
                  <select
                    className="new-phone-input w-auto min-w-32"
                    value={historyFilter}
                    onChange={(event) => setHistoryFilter(event.target.value as HistoryFilter)}
                    aria-label="Filter purchase history"
                  >
                    {(['All', 'Purchases', 'Top-ups', 'Refunds', 'Usage charges'] as const).map((filter) => <option key={filter}>{filter}</option>)}
                  </select>
                </label>
              </div>
              <BillingCard className="flex min-h-[240px] flex-col items-center justify-center text-center">
                <span className="text-3xl text-slate-300" aria-hidden="true">▤</span>
                <p className="mt-3 text-sm font-medium text-slate-700">No transactions yet.</p>
                <p className="mt-1 text-xs text-slate-400">Purchases, top-ups and usage charges will appear here.</p>
              </BillingCard>
            </section>
          )}

          {notice && <p role="status" className="mt-4 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-xs text-blue-800">{notice}</p>}
        </div>
      </div>
      {activeModal === 'plan' && <ChangePlanModal onClose={() => setActiveModal(null)} onUnavailable={() => showUnavailable('Plan subscription')} />}
      {activeModal === 'wallet' && <WalletModal onClose={() => setActiveModal(null)} onUnavailable={() => showUnavailable('Wallet top-up')} />}
      {activeModal === 'time-addon' && <TimeAddonModal onClose={() => setActiveModal(null)} onUnavailable={() => showUnavailable('Time add-on purchase')} />}
    </main>
  );
}
