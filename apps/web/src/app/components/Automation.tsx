'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type Platform = 'Instagram' | 'TikTok' | 'Facebook' | 'YouTube' | 'X' | 'Threads';
type AutomationTab = 'automations' | 'logs';

type Flow = {
  id: string;
  platform: Platform;
  category: 'QA check' | 'Compatibility' | 'Accessibility' | 'Media validation';
  name: string;
  description: string;
};

const platforms: Array<'All Platforms' | Platform> = [
  'All Platforms',
  'Instagram',
  'TikTok',
  'Facebook',
  'YouTube',
  'X',
  'Threads',
];

const flows: Flow[] = [
  {
    id: 'ig-launch',
    platform: 'Instagram',
    category: 'QA check',
    name: 'Instagram — app launch check',
    description: 'Open the app on an authorized test device and confirm the main screen loads without errors.',
  },
  {
    id: 'ig-login-ui',
    platform: 'Instagram',
    category: 'QA check',
    name: 'Instagram — test account sign-in check',
    description: 'Validate the sign-in flow using a test account you own. Does not create accounts or interact with other users.',
  },
  {
    id: 'ig-profile-ui',
    platform: 'Instagram',
    category: 'Compatibility',
    name: 'Instagram — profile screen compatibility',
    description: 'Check profile screen layout, text clipping, and navigation on the selected Android version.',
  },
  {
    id: 'ig-media-preview',
    platform: 'Instagram',
    category: 'Media validation',
    name: 'Instagram — media picker preview',
    description: 'Verify that selected test images and videos appear correctly in the in-app preview. Does not publish content.',
  },
  {
    id: 'ig-accessibility',
    platform: 'Instagram',
    category: 'Accessibility',
    name: 'Instagram — accessibility labels',
    description: 'Inspect visible controls and accessibility labels on key app screens for QA review.',
  },
  {
    id: 'tt-launch',
    platform: 'TikTok',
    category: 'QA check',
    name: 'TikTok — app launch check',
    description: 'Open the app and confirm the initial screen is rendered successfully on a test phone.',
  },
  {
    id: 'tt-playback',
    platform: 'TikTok',
    category: 'Compatibility',
    name: 'TikTok — video playback check',
    description: 'Validate playback, orientation, and visible controls using approved test content.',
  },
  {
    id: 'tt-profile',
    platform: 'TikTok',
    category: 'Compatibility',
    name: 'TikTok — profile screen check',
    description: 'Check profile screen rendering and navigation in a designated QA account.',
  },
  {
    id: 'fb-launch',
    platform: 'Facebook',
    category: 'QA check',
    name: 'Facebook — app launch check',
    description: 'Open the app and verify that the main screen loads on the selected test device.',
  },
  {
    id: 'fb-permissions',
    platform: 'Facebook',
    category: 'Compatibility',
    name: 'Facebook — permission prompt check',
    description: 'Review camera, media, and notification permission prompts in an authorized test environment.',
  },
  {
    id: 'yt-playback',
    platform: 'YouTube',
    category: 'Compatibility',
    name: 'YouTube — playback smoke test',
    description: 'Verify video playback, captions controls, and screen orientation with public or test content.',
  },
  {
    id: 'yt-search-ui',
    platform: 'YouTube',
    category: 'QA check',
    name: 'YouTube — search UI check',
    description: 'Check search input, results layout, and back navigation without collecting account data.',
  },
  {
    id: 'x-launch',
    platform: 'X',
    category: 'QA check',
    name: 'X — app launch check',
    description: 'Confirm the app opens and the primary screen renders on an authorized test device.',
  },
  {
    id: 'threads-launch',
    platform: 'Threads',
    category: 'QA check',
    name: 'Threads — app launch check',
    description: 'Verify initial rendering and basic screen navigation for app compatibility testing.',
  },
];

const logColumns = [
  'Execution ID',
  'Plan name',
  'Task type',
  'Cloud phone',
  'Profile serial no.',
  'Group',
  'Proxy IP',
  'Remarks',
  'Scheduled time to publish',
  'Runtime',
  'Execution time',
  'Execution status',
  'Operation',
];

const sidebarSections = [
  { heading: 'PRINCIPAL', items: [{ label: 'Telefones', href: '/dashboard', icon: '▯' }, { label: 'Proxies', href: '/dashboard/proxies', icon: '◎' }] },
  { heading: 'DESCOBRIR', items: [{ label: 'Aplicações', href: '/dashboard/applications', icon: '▦' }, { label: 'Automação', href: '/dashboard/automation', icon: '◉' }, { label: 'Visão múltipla', href: '/dashboard/multi-view', icon: '⊞' }, { label: 'API & Claude', href: '/dashboard/api-claude', icon: '⚿' }] },
  { heading: 'EQUIPE', items: [{ label: 'Billing', href: '/dashboard/billing', icon: '▤' }, { label: 'Members', href: '/dashboard/members', icon: '♧' }, { label: 'Settings', href: '/dashboard/settings', icon: '⚙' }, { label: 'Contact', href: '/dashboard/contact', icon: '♡' }] },
];

function AutomationSidebar() {
  return (
    <aside className="dashboard-sidebar hidden md:flex">
      <Link href="/" className="flex h-[72px] items-center gap-2.5 border-b border-slate-200 px-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 text-sm font-bold text-white">PF</span>
        <span className="text-[17px] font-bold tracking-tight text-slate-900">PhoneFarm</span>
      </Link>
      <nav className="dashboard-nav" aria-label="Menu principal">
        {sidebarSections.map((section) => (
          <section key={section.heading} className="mb-5">
            <h2 className="mb-2 px-4 text-[10px] font-semibold tracking-[0.12em] text-slate-400">{section.heading}</h2>
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`dashboard-nav-item ${item.label === 'Automação' ? 'dashboard-nav-item-active' : ''}`}
                  aria-current={item.label === 'Automação' ? 'page' : undefined}
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

function MobileHeader() {
  return (
    <div className="dashboard-mobile-header md:hidden">
      <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs text-white">PF</span>
        PhoneFarm
      </Link>
      <span className="text-sm font-medium text-slate-600">Automation</span>
    </div>
  );
}

export default function Automation() {
  const [tab, setTab] = useState<AutomationTab>('automations');
  const [platform, setPlatform] = useState<(typeof platforms)[number]>('All Platforms');
  const [taskName, setTaskName] = useState('');
  const [notice, setNotice] = useState('');
  const [logStatus, setLogStatus] = useState('All');

  const filteredFlows = useMemo(() => {
    const query = taskName.trim().toLowerCase();
    return flows.filter((flow) => {
      const matchesPlatform = platform === 'All Platforms' || flow.platform === platform;
      const matchesQuery = !query || flow.name.toLowerCase().includes(query) || flow.description.toLowerCase().includes(query);
      return matchesPlatform && matchesQuery;
    });
  }, [platform, taskName]);

  return (
    <main className="flex min-h-screen bg-[#f7f8fa] text-slate-800">
      <AutomationSidebar />
      <div className="min-w-0 flex-1">
        <MobileHeader />
        <div className="dashboard-content mx-auto max-w-[1480px]">
          <header className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Automation</h1>
            <p className="mt-1 text-sm text-slate-500">
              Pre-built automation flows. Pick one, choose which phones to run it on, and we schedule the task for you.
            </p>
          </header>

          <div className="mb-4 flex gap-5 border-b border-slate-200">
            {([
              ['automations', 'Automations'],
              ['logs', 'Logs'],
            ] as const).map(([key, label]) => (
              <button
                type="button"
                key={key}
                onClick={() => { setTab(key); setNotice(''); }}
                className={`border-b-2 px-1 pb-2.5 text-xs font-medium ${
                  tab === key ? 'border-blue-600 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
                aria-pressed={tab === key}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === 'automations' ? (
            <>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <label className="dashboard-search">
                  <span aria-hidden="true">⌕</span>
                  <input
                    value={taskName}
                    onChange={(event) => setTaskName(event.target.value)}
                    placeholder="Task name"
                    aria-label="Search task name"
                  />
                </label>
                <span className="text-xs text-slate-400">{filteredFlows.length} QA flows</span>
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {platforms.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setPlatform(item)}
                    aria-pressed={platform === item}
                    className={`rounded-full border px-3 py-1.5 text-[11px] font-medium transition ${
                      platform === item
                        ? 'border-blue-100 bg-blue-50 text-blue-700'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50 px-3.5 py-3 text-xs leading-5 text-blue-900">
                Templates here are limited to authorized app QA and compatibility checks. Social actions, account creation, and bulk messaging are not available.
              </div>

              {filteredFlows.length ? (
                <section className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
                  {filteredFlows.map((flow) => (
                    <article key={flow.id} className="flex min-h-[148px] flex-col rounded-xl border border-slate-200 bg-white p-4">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <span className="rounded-full bg-blue-50 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-blue-700">{flow.platform}</span>
                        <span className="text-[9px] font-medium uppercase tracking-wide text-slate-400">{flow.category}</span>
                      </div>
                      <h2 className="text-sm font-semibold leading-5 text-slate-900">{flow.name}</h2>
                      <p className="mt-1.5 flex-1 text-xs leading-5 text-slate-500">{flow.description}</p>
                      <button
                        type="button"
                        onClick={() => setNotice('Automation scheduling is not connected yet. No phone was selected and no task was started.')}
                        className="mt-3 self-start text-xs font-semibold text-blue-700 hover:text-blue-800"
                      >
                        View flow
                      </button>
                    </article>
                  ))}
                </section>
              ) : (
                <section className="dashboard-empty-state min-h-[220px]">
                  <h2 className="text-base font-semibold text-slate-900">No automations found</h2>
                  <p className="mt-1 text-sm text-slate-500">Try a different task name or platform.</p>
                </section>
              )}
            </>
          ) : (
            <>
              <div className="mb-4 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-2 xl:grid-cols-4">
                <label className="block text-xs font-medium text-slate-600">
                  Start date
                  <input type="date" className="new-phone-input mt-1.5" />
                </label>
                <label className="block text-xs font-medium text-slate-600">
                  End date
                  <input type="date" className="new-phone-input mt-1.5" />
                </label>
                <label className="block text-xs font-medium text-slate-600">
                  Status
                  <select value={logStatus} onChange={(event) => setLogStatus(event.target.value)} className="new-phone-input mt-1.5">
                    <option>All</option>
                    <option>Scheduled</option>
                    <option>Running</option>
                    <option>Completed</option>
                    <option>Failed</option>
                    <option>Cancelled</option>
                  </select>
                </label>
                <label className="block text-xs font-medium text-slate-600">
                  Automation
                  <select className="new-phone-input mt-1.5" defaultValue="All automations">
                    <option>All automations</option>
                    {flows.map((flow) => <option key={flow.id}>{flow.name}</option>)}
                  </select>
                </label>
              </div>

              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-slate-500">Execution history and results for your authorized QA runs.</p>
                <button type="button" disabled className="dashboard-secondary-button cursor-not-allowed opacity-50" title="No account data is available to download">
                  Download accounts
                </button>
              </div>

              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table className="w-full min-w-[1500px] text-left text-[11px]">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>{logColumns.map((column) => <th key={column} className="whitespace-nowrap px-3 py-3 font-semibold">{column}</th>)}</tr>
                  </thead>
                </table>
                <div className="flex min-h-[220px] flex-col items-center justify-center px-4 text-center">
                  <span className="text-3xl text-slate-300" aria-hidden="true">▤</span>
                  <p className="mt-3 text-sm font-medium text-slate-700">No automation tasks.</p>
                  <p className="mt-1 text-xs text-slate-400">Completed and scheduled QA runs will appear here.</p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                <label className="flex items-center gap-2">
                  Rows per page
                  <select className="new-phone-input w-20" defaultValue="20">
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                  </select>
                </label>
                <div className="flex items-center gap-3">
                  <span>Page 1</span>
                  <button type="button" disabled className="dashboard-secondary-button cursor-not-allowed opacity-50">Previous</button>
                  <button type="button" disabled className="dashboard-secondary-button cursor-not-allowed opacity-50">Next</button>
                </div>
              </div>
            </>
          )}

          {notice && <p role="status" className="mt-4 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">{notice}</p>}
        </div>
      </div>
    </main>
  );
}
