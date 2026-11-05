'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useMemo, useState } from 'react';

type ProxyType = 'SOCKS5' | 'HTTP' | 'HTTPS';
type IpQuery = 'IP2Location' | 'ip-api';

type ProxyEntry = {
  id: string;
  type: ProxyType;
  host: string;
  port: string;
  username: string;
  password: string;
  changeIpUrl: string;
  remarks: string;
  group: string;
};

const STORAGE_KEY = 'phonefarm-proxies-session';
const MAX_PROXY_COUNT = 100;

const sidebarGroups = [
  { heading: 'PRINCIPAL', links: [['Telefones', '/dashboard'], ['Proxies', '/dashboard/proxies']] },
  { heading: 'DESCOBRIR', links: [['Aplicações', '/dashboard/applications'], ['Automação', '/dashboard/automation'], ['Visão múltipla', '/dashboard/multi-view'], ['API & Claude', '/dashboard/api-claude']] },
  { heading: 'EQUIPE', links: [['Billing', '/dashboard/billing'], ['Members', '/dashboard/members'], ['Settings', '/dashboard/settings'], ['Contact', '/dashboard/contact']] },
];

function ProxySidebar() {
  return (
    <aside className="dashboard-sidebar hidden md:flex">
      <Link href="/" className="flex h-[72px] items-center gap-2.5 border-b border-slate-200 px-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 text-sm font-bold text-white">PF</span>
        <span className="text-[17px] font-bold tracking-tight text-slate-900">PhoneFarm</span>
      </Link>
      <nav className="dashboard-nav" aria-label="Menu principal">
        {sidebarGroups.map((group) => (
          <section key={group.heading} className="mb-5">
            <h2 className="mb-2 px-4 text-[10px] font-semibold tracking-[0.12em] text-slate-400">{group.heading}</h2>
            <div className="space-y-1">
              {group.links.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className={`dashboard-nav-item ${label === 'Proxies' ? 'dashboard-nav-item-active' : ''}`}
                  aria-current={label === 'Proxies' ? 'page' : undefined}
                >
                  <span className="w-4 text-center" aria-hidden="true">{label === 'Proxies' ? '◎' : label === 'Telefones' ? '▯' : '·'}</span>
                  <span>{label}</span>
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
      <Link href="/dashboard/proxies" className="text-sm font-medium text-slate-600">Proxies</Link>
    </div>
  );
}

function canonicalProxyKey(proxy: ProxyEntry) {
  return `${proxy.type.toLowerCase()}|${proxy.host.toLowerCase()}|${proxy.port}|${proxy.username.toLowerCase()}`;
}

function parseProxyLine(line: string, defaultType: ProxyType, group: string): ProxyEntry | null {
  const value = line.trim();
  if (!value) return null;

  const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const schemeMatch = value.match(/^([a-z0-9]+):\/\//i);
  if (schemeMatch) {
    const protocol = schemeMatch[1].toLowerCase();
    if (!['socks5', 'http', 'https'].includes(protocol)) return null;
    try {
      const parsed = new URL(value);
      if (!parsed.hostname || !parsed.port) return null;
      return {
        id,
        type: protocol.toUpperCase() as ProxyType,
        host: parsed.hostname,
        port: parsed.port,
        username: decodeURIComponent(parsed.username),
        password: decodeURIComponent(parsed.password),
        changeIpUrl: '',
        remarks: '',
        group,
      };
    } catch {
      return null;
    }
  }

  const colonMatch = value.match(/^([^:\s]+):(\d{1,5})(?::([^:]*):([^[]*))?(?:\[([^\]]*)\])?(?:\[([^\]]*)\])?$/);
  if (!colonMatch) return null;

  const port = Number(colonMatch[2]);
  if (port < 1 || port > 65535) return null;

  return {
    id,
    type: defaultType,
    host: colonMatch[1],
    port: colonMatch[2],
    username: colonMatch[3] ?? '',
    password: colonMatch[4] ?? '',
    changeIpUrl: colonMatch[5] ?? '',
    remarks: colonMatch[6] ?? '',
    group,
  };
}

export function ProxiesList() {
  const [proxies, setProxies] = useState<ProxyEntry[]>([]);
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState('');
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) setProxies(parsed as ProxyEntry[]);
      } catch {
        setNotice('Não foi possível carregar a lista de proxies desta sessão.');
      }
    }
  }, []);

  const visibleProxies = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return proxies;
    return proxies.filter((proxy) =>
      [proxy.type, proxy.host, proxy.port, proxy.username, proxy.remarks, proxy.group]
        .join(' ')
        .toLowerCase()
        .includes(normalized),
    );
  }, [proxies, query]);

  function removeProxy(id: string) {
    const next = proxies.filter((proxy) => proxy.id !== id);
    setProxies(next);
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }

  function checkProxies() {
    setChecking(true);
    setNotice('A verificação de conexão precisa ser implementada no backend. Nenhuma conexão externa foi iniciada.');
    setChecking(false);
  }

  return (
    <main className="flex min-h-screen bg-[#f7f8fa] text-slate-800">
      <ProxySidebar />
      <div className="min-w-0 flex-1">
        <MobileHeader />
        <div className="dashboard-content mx-auto max-w-[1480px]">
          <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Proxies</h1>
              <p className="mt-1 text-sm text-slate-500">Residential, datacenter or custom proxies to bind to your phones.</p>
            </div>
            <Link href="/dashboard/proxies/new" className="dashboard-primary-button">＋ <span>Add proxy</span></Link>
          </header>

          {proxies.length === 0 ? (
            <section className="dashboard-empty-state min-h-[268px]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-lg text-blue-600" aria-hidden="true">◎</div>
              <h2 className="mt-4 text-base font-semibold text-slate-900">No proxies added</h2>
              <p className="mt-1.5 max-w-md text-center text-sm leading-5 text-slate-500">
                Add a SOCKS5, HTTP or HTTPS proxy to route your phone traffic through a specific location.
              </p>
              <Link href="/dashboard/proxies/new" className="dashboard-primary-button mt-5">＋ <span>Add proxy</span></Link>
            </section>
          ) : (
            <>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <label className="dashboard-search">
                  <span aria-hidden="true">⌕</span>
                  <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search proxies" aria-label="Search proxies" />
                </label>
                <button type="button" onClick={checkProxies} disabled={checking} className="dashboard-secondary-button">
                  {checking ? 'Checking…' : 'Check proxies'}
                </button>
              </div>
              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table className="w-full min-w-[760px] text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>{['Type', 'Proxy host', 'Port', 'Username', 'Remarks', 'Proxy group', 'Action'].map((heading) => <th key={heading} className="px-4 py-3 font-semibold">{heading}</th>)}</tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {visibleProxies.map((proxy) => (
                      <tr key={proxy.id}>
                        <td className="px-4 py-3 font-medium text-slate-700">{proxy.type}</td>
                        <td className="px-4 py-3">{proxy.host}</td>
                        <td className="px-4 py-3">{proxy.port}</td>
                        <td className="px-4 py-3">{proxy.username || '—'}</td>
                        <td className="px-4 py-3">{proxy.remarks || '—'}</td>
                        <td className="px-4 py-3">{proxy.group || 'Ungrouped'}</td>
                        <td className="px-4 py-3"><button type="button" onClick={() => removeProxy(proxy.id)} className="font-medium text-red-600 hover:text-red-700">Remove</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {visibleProxies.length === 0 && <p className="px-4 py-8 text-center text-sm text-slate-500">No matching proxies.</p>}
              </div>
              <p className="mt-3 text-xs text-slate-400">Added proxy: {proxies.length} · Stored only for this browser session; not sent to a server.</p>
            </>
          )}

          {notice && <p role="status" className="mt-4 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">{notice}</p>}
        </div>
      </div>
    </main>
  );
}

export function NewProxy() {
  const [proxyType, setProxyType] = useState<ProxyType>('SOCKS5');
  const [ipQuery, setIpQuery] = useState<IpQuery>('IP2Location');
  const [group, setGroup] = useState('');
  const [rawLines, setRawLines] = useState('');
  const [notice, setNotice] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const lines = rawLines.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  const parsed = lines
    .map((line) => parseProxyLine(line, proxyType, group.trim()))
    .filter((proxy): proxy is ProxyEntry => proxy !== null);
  const seen = new Set<string>();
  const uniqueParsed = parsed.filter((proxy) => {
    const key = canonicalProxyKey(proxy);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  const duplicates = parsed.length - uniqueParsed.length;
  const invalidCount = lines.length - parsed.length;
  const tooMany = lines.length > MAX_PROXY_COUNT;
  const preview = tooMany ? uniqueParsed.slice(0, MAX_PROXY_COUNT) : uniqueParsed;
  const placeholder = proxyType === 'SOCKS5'
    ? 'socks5://host:port\\nsocks5://username:password@host:port\\nhost:port:username:password[Change IP URL][Remarks]'
    : `${proxyType.toLowerCase()}://host:port\\n${proxyType.toLowerCase()}://username:password@host:port\\nhost:port:username:password[Change IP URL][Remarks]`;

  function checkProxy() {
    setIsChecking(true);
    setNotice('A verificação de proxy requer um serviço backend. Nenhuma conexão externa foi iniciada.');
    setIsChecking(false);
  }

  function saveProxies(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!preview.length || invalidCount > 0 || tooMany) return;

    try {
      const previousRaw = window.sessionStorage.getItem(STORAGE_KEY);
      const previous = previousRaw ? JSON.parse(previousRaw) as ProxyEntry[] : [];
      const known = new Set(previous.map(canonicalProxyKey));
      const additions = preview.filter((proxy) => !known.has(canonicalProxyKey(proxy)));
      const next = [...previous, ...additions];
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setNotice(`${additions.length} proxy${additions.length === 1 ? '' : 'ies'} added to this browser session.`);
      window.location.assign('/dashboard/proxies');
    } catch {
      setNotice('Could not save proxies in this browser session. No proxy data was sent to a server.');
    }
  }

  return (
    <main className="flex min-h-screen bg-[#f7f8fa] text-slate-800">
      <ProxySidebar />
      <div className="min-w-0 flex-1">
        <MobileHeader />
        <div className="dashboard-content mx-auto max-w-[1480px]">
          <div className="mb-5 flex items-center gap-2 text-xs">
            <Link href="/dashboard/proxies" className="font-medium text-slate-500 hover:text-blue-700">← Back</Link>
            <span className="text-slate-300">/</span>
            <span className="font-semibold text-slate-800">Bulk add</span>
          </div>

          <form onSubmit={saveProxies}>
            <div className="grid items-start gap-5 xl:grid-cols-[270px_minmax(250px,1fr)_minmax(330px,1.15fr)]">
              <section className="rounded-xl border border-slate-200 bg-white p-4 text-xs leading-5 text-slate-600">
                <h1 className="text-sm font-semibold text-slate-900">Format:</h1>
                <pre className="mt-2 whitespace-pre-wrap font-sans text-[11px] leading-5 text-slate-500">
{`Proxy type://Host:Port
Proxy type://Username:Password@Host:Port

To add a change IP URL and remarks:
Host:Port:Username:Password[Change IP URL][Remarks]`}
                </pre>
                <h2 className="mt-4 font-semibold text-slate-800">Notes:</h2>
                <ol className="mt-1 list-decimal space-y-1 pl-4 text-[11px] leading-4 text-slate-500">
                  <li>Only HTTP, HTTPS and Socks5 are supported.</li>
                  <li>Enter one proxy per line. You can add up to 100 proxies at once.</li>
                </ol>
              </section>

              <section className="space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-700">IP query channel</span>
                  <select value={ipQuery} onChange={(event) => setIpQuery(event.target.value as IpQuery)} className="new-phone-input">
                    <option>IP2Location</option>
                    <option>ip-api</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-700">Proxy group</span>
                  <input value={group} onChange={(event) => setGroup(event.target.value)} className="new-phone-input" placeholder="Ungrouped" />
                </label>
                <p className="text-[11px] text-slate-400">Group name is optional. Leave blank to use Ungrouped.</p>
              </section>

              <section>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold text-slate-700">Type</span>
                  <select value={proxyType} onChange={(event) => setProxyType(event.target.value as ProxyType)} className="new-phone-input">
                    <option value="SOCKS5">SOCKS5</option>
                    <option value="HTTP">HTTP</option>
                    <option value="HTTPS">HTTPS</option>
                  </select>
                </label>
                <label className="mt-3 block">
                  <span className="sr-only">Proxy lines</span>
                  <textarea
                    value={rawLines}
                    onChange={(event) => setRawLines(event.target.value)}
                    className="new-phone-input min-h-32 resize-y py-3 font-mono text-[11px]"
                    placeholder={placeholder}
                    spellCheck={false}
                  />
                </label>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px] text-slate-500">
                    Added proxy: {preview.length} {duplicates > 0 ? `· ${duplicates} duplicate${duplicates === 1 ? '' : 's'} skipped` : ''}
                  </span>
                  <button type="button" onClick={checkProxy} disabled={isChecking || !preview.length} className="dashboard-secondary-button">
                    {isChecking ? 'Checking…' : 'Check proxy'}
                  </button>
                </div>
              </section>
            </div>

            <section className="mt-5 overflow-hidden rounded-xl border border-slate-200 bg-white">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[940px] text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500">
                    <tr>{['Type', 'Proxy host', 'Port', 'Username', 'Password', 'Remarks', 'Proxy group', 'Check'].map((heading) => <th key={heading} className="px-3 py-3 font-semibold">{heading}</th>)}</tr>
                  </thead>
                  {preview.length > 0 && (
                    <tbody className="divide-y divide-slate-100">
                      {preview.map((proxy) => (
                        <tr key={proxy.id}>
                          <td className="px-3 py-3">{proxy.type}</td>
                          <td className="px-3 py-3">{proxy.host}</td>
                          <td className="px-3 py-3">{proxy.port}</td>
                          <td className="max-w-32 truncate px-3 py-3">{proxy.username || '—'}</td>
                          <td className="px-3 py-3">{proxy.password ? '••••••••' : '—'}</td>
                          <td className="max-w-36 truncate px-3 py-3">{proxy.remarks || '—'}</td>
                          <td className="px-3 py-3">{proxy.group || 'Ungrouped'}</td>
                          <td className="px-3 py-3 text-slate-400">Not checked</td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
                {preview.length === 0 && (
                  <div className="flex min-h-40 flex-col items-center justify-center px-4 text-center">
                    <span className="text-3xl text-slate-300" aria-hidden="true">▤</span>
                    <p className="mt-2 text-xs text-slate-400">Paste lines above to preview proxies.</p>
                  </div>
                )}
              </div>
            </section>

            <div className="mt-3 flex min-h-7 flex-wrap items-center gap-3">
              {invalidCount > 0 && <p role="alert" className="text-xs text-red-600">{invalidCount} invalid line{invalidCount === 1 ? '' : 's'}; use a supported format and check the port.</p>}
              {tooMany && <p role="alert" className="text-xs text-red-600">You can add up to 100 proxies at once.</p>}
              {notice && <p role="status" className="text-xs text-blue-700">{notice}</p>}
            </div>

            <div className="mt-4 flex gap-2">
              <Link href="/dashboard/proxies" className="dashboard-secondary-button">Cancel</Link>
              <button type="submit" disabled={!preview.length || invalidCount > 0 || tooMany} className="dashboard-primary-button disabled:cursor-not-allowed disabled:opacity-50">
                Add proxies
              </button>
            </div>
            <p className="mt-3 max-w-3xl text-[11px] leading-5 text-slate-400">
              Proxy credentials are kept only in this browser tab’s session storage. They are not uploaded or checked against external services; connect a backend before using proxies with phones.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
