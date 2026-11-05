'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';

type AppDefinition = {
  id: string;
  name: string;
  versionCount: number;
  logo: string;
  versions: string[];
};

type CatalogEntry = {
  appId: string;
  version: string;
};

const apps: AppDefinition[] = [
  {
    id: 'tiktok',
    name: 'TikTok (Global)',
    versionCount: 32,
    logo: '/logos/tiktokicon.webp',
    versions: [
      'v47.6.3', 'v47.5.3', 'v47.4.3', 'v47.1.4', 'v46.8.2', 'v46.0.3',
      'v45.7.3', 'v45.0.3', 'v44.5.3', 'v44.4.3', 'v43.8.3', 'v43.6.2',
      'v43.2.1', 'v43.1.4', 'v42.4.4', 'v42.3.4', 'v42.2.3', 'v41.9.3',
      'v41.1.3', 'v40.7.3', 'v40.4.3', 'v40.1.4', 'v39.6.1', 'v39.2.1',
      'v39.1.0', 'v38.9.3', 'v37.6.3', 'v37.4.4', 'v36.0.4', 'v34.9.1',
      'v34.0.3', 'v32.5.1',
    ],
  },
  {
    id: 'instagram',
    name: 'Instagram',
    versionCount: 39,
    logo: '/logos/instagramicon.webp',
    versions: [
      'v453.0.0.57.79', 'v453.0.0.55.79', 'v452.0.0.48.64', 'v449.0.0.52.84',
      'v443.0.0.48.82', 'v441.0.0.43.81', 'v439.0.0.37.89', 'v439.0.0.30.89',
      'v438.0.0.28.88', 'v433.0.0.42.68', 'v432.0.0.40.80', 'v431.0.0.10.82',
      'v430.0.0.36.80', 'v429.1.0.44.70', 'v429.0.0.32.70', 'v428.0.0.47.67',
      'v428.0.0.23.67', 'v426.0.0.37.68', 'v426.0.0.25.68', 'v424.0.0.49.64',
      'v423.0.0.47.66', 'v422.0.0.44.64', 'v422.0.0.15.64', 'v420.0.0.55.74',
      'v418.0.0.51.77', 'v417.0.0.54.77', 'v414.0.0.40.83', 'v413.0.0.41.84',
      'v410.1.0.63.71', 'v410.0.0.53.71', 'v407.0.0.55.243', 'v403.0.0.49.74',
      'v400.0.0.49.68', 'v389.0.0.49.87', 'v374.0.0.43.67', 'v369.0.0.46.101',
      'v350.1.0.46.93', 'v295.0.0.32.109', 'v245.0.0.18.108',
    ],
  },
  {
    id: 'youtube',
    name: 'YouTube',
    versionCount: 21,
    logo: '/logos/youtubeicon.webp',
    versions: [
      'v21.43.523', 'v21.42.243', 'v21.39.522', 'v21.32.4', 'v21.20.402',
      'v21.16.251', 'v21.15.285', 'v21.10.493', 'v21.09.260', 'v21.08.261',
      'v21.04.222', 'v20.51.39', 'v20.47.60', 'v20.47.46', 'v20.45.34',
      'v20.43.35', 'v20.41.34', 'v20.36.41', 'v20.31.39', 'v20.25.35',
      'v20.14.39',
    ],
  },
  {
    id: 'reddit',
    name: 'Reddit',
    versionCount: 39,
    logo: '/logos/redditsicon.webp',
    versions: [
      'v2026.43.1', 'v2026.42.0', 'v2026.38.0', 'v2026.36.0', 'v2026.35.0',
      'v2026.32.0', 'v2026.30.0', 'v2026.29.0', 'v2026.28.0', 'v2026.27.0',
      'v2026.26.0', 'v2026.24.0', 'v2026.23.0', 'v2026.22.0', 'v2026.19.0',
      'v2026.18.0', 'v2026.17.0', 'v2026.16.0', 'v2026.15.1', 'v2026.15.0',
      'v2026.11.0', 'v2026.10.0', 'v2026.09.0', 'v2026.05.1', 'v2026.05.0',
      'v2026.03.0', 'v2025.51.0', 'v2025.50.0', 'v2025.44.0', 'v2025.41.0',
      'v2025.39.0', 'v2025.36.0', 'v2025.34.0', 'v2025.32.0', 'v2025.31.1',
      'v2025.20.0', 'v2025.18.1', 'v2025.10.0', 'v2024.52.0',
    ],
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    versionCount: 4,
    logo: '/logos/pinteresticon.png',
    versions: ['v14.43.0', 'v14.42.0', 'v14.41.0', 'v13.4.0'],
  },
  {
    id: 'facebook',
    name: 'Facebook',
    versionCount: 28,
    logo: '/logos/facebookicon.webp',
    versions: [
      'v585.0.0.47.54', 'v584.0.0.51.56', 'v583.0.0.39.55', 'v580.0.0.51.74',
      'v574.0.0.40.71', 'v570.0.0.24.72', 'v562.0.0.51.73', 'v558.0.0.70.72',
      'v556.0.0.60.64', 'v554.0.0.57.70', 'v553.0.0.56.58', 'v552.1.0.45.68',
      'v551.1.0.58.63', 'v548.1.0.51.64', 'v546.0.0.42.66', 'v543.0.0.55.73',
      'v541.0.0.85.79', 'v540.0.0.49.148', 'v539.0.0.54.69', 'v538.0.0.53.70',
      'v535.0.0.49.72', 'v534.0.0.56.76', 'v533.0.0.49.79', 'v518.0.0.66.86',
      'v497.0.0.47.36', 'v495.0.0.45.201', 'v484.0.0.0.50', 'v431.0.0.30.108',
    ],
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    versionCount: 10,
    logo: '/logos/snapchaticon.webp',
    versions: [
      'v14.31.0.56', 'v14.30.0.54', 'v14.29.0.50', 'v13.84.0.50',
      'v13.80.0.51', 'v13.79.0.44', 'v13.74.0.32', 'v13.37.0.45',
      'v13.22.0.61', 'v12.51.0.62',
    ],
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    versionCount: 16,
    logo: '/logos/X(Twitter)icon.webp',
    versions: [
      'v12.37.2-prod.01', 'v12.35.0-prod.01', 'v12.33.1-prod.01',
      'v12.25.0-prod.01', 'v12.17.0-release.0', 'v11.97.1-release.0',
      'v11.88.0-release.0', 'v11.71.0-release.0', 'v11.69.0-release.0',
      'v11.67.0-release.0', 'v11.55.0-alpha.3', 'v11.36.1-release.0',
      'v11.36.0-alpha.5', 'v11.8.0-release.0', 'v10.96.0-release.0',
      'v9.52.0-release.0',
    ],
  },
];

const iconById = new Map(apps.map((app) => [app.id, app]));
const CATALOG_STORAGE_KEY = 'phonefarm-app-catalog-session';

const sidebarSections = [
  { heading: 'PRINCIPAL', items: [{ label: 'Telefones', href: '/dashboard', icon: '▯' }, { label: 'Proxies', href: '/dashboard/proxies', icon: '◎' }] },
  { heading: 'DESCOBRIR', items: [{ label: 'Aplicações', href: '/dashboard/applications', icon: '▦' }, { label: 'Automação', href: '/dashboard/automation', icon: '◉' }, { label: 'Visão múltipla', href: '/dashboard/multi-view', icon: '⊞' }, { label: 'API & Claude', href: '/dashboard/api-claude', icon: '⚿' }] },
  { heading: 'EQUIPE', items: [{ label: 'Billing', href: '/dashboard/billing', icon: '▤' }, { label: 'Members', href: '/dashboard/members', icon: '♧' }, { label: 'Settings', href: '/dashboard/settings', icon: '⚙' }, { label: 'Contact', href: '/dashboard/contact', icon: '♡' }] },
];

function ApplicationsSidebar() {
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
                  className={`dashboard-nav-item ${item.label === 'Aplicações' ? 'dashboard-nav-item-active' : ''}`}
                  aria-current={item.label === 'Aplicações' ? 'page' : undefined}
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

export default function Applications() {
  const [tab, setTab] = useState<'store' | 'team' | 'mine'>('store');
  const [search, setSearch] = useState('');
  const [versions, setVersions] = useState<Record<string, string>>(() =>
    Object.fromEntries(apps.map((app) => [app.id, app.versions[0]])),
  );
  const [catalog, setCatalog] = useState<CatalogEntry[]>([]);
  const [catalogReady, setCatalogReady] = useState(false);
  const [notice, setNotice] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem(CATALOG_STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setCatalog(parsed.filter((entry): entry is CatalogEntry =>
            entry !== null
            && typeof entry === 'object'
            && 'appId' in entry
            && typeof entry.appId === 'string'
            && iconById.has(entry.appId)
            && 'version' in entry
            && typeof entry.version === 'string',
          ));
        }
      }
    } catch {
      setNotice('Could not load your app catalog from this browser session.');
    } finally {
      setCatalogReady(true);
    }
  }, []);

  useEffect(() => {
    if (!catalogReady) return;
    try {
      window.sessionStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(catalog));
    } catch {
      setNotice('Could not save your app catalog in this browser session.');
    }
  }, [catalog, catalogReady]);

  const filteredApps = useMemo(() => {
    const term = search.trim().toLowerCase();
    return term ? apps.filter((app) => app.name.toLowerCase().includes(term)) : apps;
  }, [search]);

  function addToCatalog(app: AppDefinition) {
    const version = versions[app.id];
    setCatalog((current) => {
      if (current.some((entry) => entry.appId === app.id && entry.version === version)) {
        setNotice(`${app.name} ${version} já está no catálogo.`);
        return current;
      }
      const next = [...current, { appId: app.id, version }];
      setNotice(`${app.name} ${version} foi adicionado ao catálogo desta sessão.`);
      return next;
    });
  }

  function handleUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.apk')) {
      setNotice('Selecione um arquivo .apk válido.');
      event.target.value = '';
      return;
    }
    setNotice(`${file.name} selecionado. O envio de APK ficará disponível quando o armazenamento do servidor for conectado.`);
    event.target.value = '';
  }

  const listedCatalog = catalog.filter((entry) => {
    const app = iconById.get(entry.appId);
    return app && app.name.toLowerCase().includes(search.trim().toLowerCase());
  });

  return (
    <main className="flex min-h-screen bg-[#f7f8fa] text-slate-800">
      <ApplicationsSidebar />
      <div className="min-w-0 flex-1">
        <div className="dashboard-mobile-header md:hidden">
          <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs text-white">PF</span>
            PhoneFarm
          </Link>
          <span className="text-sm font-medium text-slate-600">Applications</span>
        </div>

        <div className="dashboard-content mx-auto max-w-[1480px]">
          <header className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Applications</h1>
              <p className="mt-1 text-sm text-slate-500">
                Build your app catalog from the store or your own APK, then choose which apps install automatically on your phones.
              </p>
            </div>
            <button type="button" onClick={() => fileInput.current?.click()} className="dashboard-secondary-button">
              <span aria-hidden="true">↑</span> Upload APK
            </button>
            <input ref={fileInput} type="file" accept=".apk,application/vnd.android.package-archive" className="hidden" onChange={handleUpload} />
          </header>

          <aside className="mb-5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs leading-5 text-slate-700">
            <strong>Creating accounts?</strong> Install Instagram and other social apps from the Play Store. Open the phone, sign in to the Play Store with a Google account, and install the app from there.
            <span className="mt-1 block">Apps installed from this catalog don&apos;t come from Google Play. Instagram detects it and shows a captcha at sign-up. Use the catalog for your other apps and your own APKs.</span>
          </aside>

          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center rounded-lg border border-slate-200 bg-white p-1">
              {([
                ['store', 'App Store'],
                ['team', 'Team apps'],
                ['mine', 'My apps'],
              ] as const).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => { setTab(key); setNotice(''); }}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                    tab === key ? 'bg-slate-100 text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                  aria-pressed={tab === key}
                >
                  {label}
                </button>
              ))}
            </div>
            <label className="dashboard-search">
              <span aria-hidden="true">⌕</span>
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search apps" aria-label="Search apps" />
            </label>
          </div>

          {tab === 'store' ? (
            filteredApps.length > 0 ? (
              <section className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
                {filteredApps.map((app) => {
                  const added = catalog.some((entry) => entry.appId === app.id && entry.version === versions[app.id]);
                  return (
                    <article key={app.id} className="rounded-xl border border-slate-200 bg-white p-3.5">
                      <div className="mb-4 flex items-center gap-3">
                        <Image
                          src={app.logo}
                          alt=""
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-xl object-contain"
                        />
                        <div className="min-w-0">
                          <h2 className="truncate text-sm font-semibold text-slate-900">{app.name}</h2>
                          <p className="mt-0.5 text-[11px] text-slate-400">{app.versionCount} versions</p>
                        </div>
                      </div>

                      <label className="mb-2 block text-[9px] font-semibold uppercase tracking-wide text-slate-400">
                        Version
                        <select
                          className="mt-1.5 block h-9 w-full rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-normal normal-case tracking-normal text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          value={versions[app.id]}
                          onChange={(event) => setVersions((current) => ({ ...current, [app.id]: event.target.value }))}
                        >
                          {app.versions.map((version) => <option key={version} value={version}>{version}</option>)}
                        </select>
                      </label>

                      <button type="button" onClick={() => addToCatalog(app)} className={`mt-1 flex h-9 w-full items-center justify-center gap-2 rounded-lg text-xs font-semibold text-white transition ${added ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
                        <span aria-hidden="true">{added ? '✓' : '↓'}</span>
                        {added ? 'Added to catalog' : 'Add to catalog'}
                      </button>
                    </article>
                  );
                })}
              </section>
            ) : (
              <section className="dashboard-empty-state min-h-[220px]">
                <h2 className="text-base font-semibold text-slate-900">No apps found</h2>
                <p className="mt-1 text-sm text-slate-500">Try another search.</p>
              </section>
            )
          ) : (
            <section className="dashboard-empty-state min-h-[220px]">
              {tab === 'team' ? (
                <>
                  <h2 className="text-base font-semibold text-slate-900">Team apps</h2>
                  <p className="mt-1 text-center text-sm text-slate-500">Apps shared by your team will appear here.</p>
                </>
              ) : listedCatalog.length ? (
                <div className="w-full max-w-2xl">
                  <h2 className="mb-4 text-base font-semibold text-slate-900">My apps · {listedCatalog.length}</h2>
                  <ul className="divide-y divide-slate-100 rounded-lg border border-slate-200 bg-white text-left">
                    {listedCatalog.map((entry) => {
                      const app = iconById.get(entry.appId)!;
                      return (
                        <li key={`${entry.appId}-${entry.version}`} className="flex items-center gap-3 px-4 py-3">
                          <Image src={app.logo} alt="" width={32} height={32} className="h-8 w-8 rounded-lg object-contain" />
                          <span className="flex-1 text-sm font-medium text-slate-800">{app.name}</span>
                          <span className="text-xs text-slate-500">{entry.version}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : (
                <>
                  <h2 className="text-base font-semibold text-slate-900">No apps in your catalog</h2>
                  <p className="mt-1 text-center text-sm text-slate-500">Add one of the listed apps from the App Store tab.</p>
                </>
              )}
            </section>
          )}

          {notice && <p role="status" className="mt-4 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">{notice}</p>}
        </div>
      </div>
    </main>
  );
}
