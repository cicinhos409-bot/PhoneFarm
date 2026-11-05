'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type IconName =
  | 'phone'
  | 'globe'
  | 'apps'
  | 'automation'
  | 'grid'
  | 'cloud'
  | 'card'
  | 'users'
  | 'settings'
  | 'chat'
  | 'monitor'
  | 'plus'
  | 'search'
  | 'chevron'
  | 'refresh'
  | 'trash'
  | 'logout'
  | 'menu';

function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  const paths: Record<IconName, React.ReactNode> = {
    phone: <><rect x="7" y="2.5" width="10" height="19" rx="2" /><path d="M10 18.5h4" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></>,
    apps: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    automation: <><path d="M12 3v3m0 12v3M3 12h3m12 0h3M5.64 5.64l2.12 2.12m8.48 8.48 2.12 2.12m0-12.72-2.12 2.12m-8.48 8.48-2.12 2.12" /><circle cx="12" cy="12" r="4" /></>,
    grid: <><rect x="3" y="3" width="8" height="8" rx="1.5" /><rect x="13" y="3" width="8" height="8" rx="1.5" /><rect x="3" y="13" width="8" height="8" rx="1.5" /><rect x="13" y="13" width="8" height="8" rx="1.5" /></>,
    cloud: <path d="M7 18h10a4 4 0 0 0 .4-8A6 6 0 0 0 6 9a4.5 4.5 0 0 0 1 9Z" />,
    card: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.8 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.8-1l-1.7.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.8-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.8 1l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1 0 2Z" /></>,
    chat: <><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z" /></>,
    monitor: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8m-4-4v4" /></>,
    plus: <><path d="M12 5v14M5 12h14" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    chevron: <path d="m7 10 5 5 5-5" />,
    refresh: <><path d="M20 7v5h-5M4 17v-5h5" /><path d="M5.6 9a7 7 0 0 1 11.6-2L20 12M4 12l2.8 5a7 7 0 0 0 11.6-2" /></>,
    trash: <><path d="M3 6h18M8 6V4h8v2m3 0-1 14H6L5 6" /><path d="M10 11v5m4-5v5" /></>,
    logout: <><path d="M10 17l5-5-5-5m5 5H3" /><path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7" /></>,
    menu: <><path d="M4 6h16M4 12h16M4 18h16" /></>,
  };

  return (
    <svg
      aria-hidden="true"
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

const navigation: { group: string; items: { label: string; icon: IconName; badge?: string }[] }[] = [
  {
    group: 'PRINCIPAL',
    items: [
      { label: 'Telefones', icon: 'phone' },
      { label: 'Proxies', icon: 'globe' },
    ],
  },
  {
    group: 'DESCOBRIR',
    items: [
      { label: 'Aplicações', icon: 'apps' },
      { label: 'Automação', icon: 'automation' },
      { label: 'Visão múltipla', icon: 'grid' },
      { label: 'API & Claude', icon: 'cloud', badge: 'NOVO' },
    ],
  },
  {
    group: 'EQUIPE',
    items: [
      { label: 'Billing', icon: 'card' },
      { label: 'Membros', icon: 'users' },
      { label: 'Configurações', icon: 'settings' },
      { label: 'Contato', icon: 'chat', badge: 'NOVO' },
    ],
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [activeItem, setActiveItem] = useState('Telefones');
  const [showTrash, setShowTrash] = useState(false);
  const [search, setSearch] = useState('');
  const [notice, setNotice] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isPhones = activeItem === 'Telefones';
  const pageTitle = showTrash && isPhones ? 'Lixo' : activeItem;

  function chooseItem(label: string) {
    if (label === 'Proxies') {
      router.push('/dashboard/proxies');
      return;
    }
    if (label === 'Aplicações') {
      router.push('/dashboard/applications');
      return;
    }
    if (label === 'Automação') {
      router.push('/dashboard/automation');
      return;
    }
    if (label === 'Visão múltipla') {
      router.push('/dashboard/multi-view');
      return;
    }
    if (label === 'API & Claude') {
      router.push('/dashboard/api-claude');
      return;
    }
    if (label === 'Billing') {
      router.push('/dashboard/billing');
      return;
    }
    if (label === 'Membros') {
      router.push('/dashboard/members');
      return;
    }
    if (label === 'Configurações') {
      router.push('/dashboard/settings');
      return;
    }
    if (label === 'Contato') {
      router.push('/dashboard/contact');
      return;
    }
    setActiveItem(label);
    setShowTrash(false);
    setMobileMenuOpen(false);
    setNotice('');
  }

  function requestPhone() {
    router.push('/dashboard/phones/new');
  }

  return (
    <main className="flex min-h-screen bg-[#f7f8fa] text-slate-800">
      <aside className={`dashboard-sidebar ${mobileMenuOpen ? 'dashboard-sidebar-open' : ''}`}>
        <Link href="/" className="flex h-[72px] items-center gap-2.5 border-b border-slate-200 px-5" aria-label="PhoneFarm - início">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 text-sm font-bold text-white">
            PF
          </span>
          <span className="text-[17px] font-bold tracking-tight text-slate-900">PhoneFarm</span>
        </Link>

        <nav className="dashboard-nav" aria-label="Menu principal">
          {navigation.map((group) => (
            <section key={group.group} className="mb-5">
              <h2 className="mb-2 px-4 text-[10px] font-semibold tracking-[0.12em] text-slate-400">{group.group}</h2>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const selected = activeItem === item.label && !showTrash;
                  return (
                    <button
                      type="button"
                      key={item.label}
                      onClick={() => chooseItem(item.label)}
                      aria-current={selected ? 'page' : undefined}
                      className={`dashboard-nav-item ${selected ? 'dashboard-nav-item-active' : ''}`}
                    >
                      <Icon name={item.icon} className="h-[16px] w-[16px] shrink-0" />
                      <span className="truncate">{item.label}</span>
                      {item.badge && <span className="dashboard-badge">{item.badge}</span>}
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </nav>

        <div className="dashboard-sidebar-bottom">
          <div className="mb-3 rounded-xl border border-slate-200 bg-white p-3">
            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1"><Icon name="phone" className="h-3 w-3" /> 0 telefones</span>
              <span className="flex items-center gap-1"><Icon name="users" className="h-3 w-3" /> Equipe</span>
            </div>
            <div className="my-3 h-1.5 rounded-full bg-slate-100">
              <div className="h-full w-0 rounded-full bg-blue-600" />
            </div>
            <button type="button" onClick={() => chooseItem('Billing')} className="w-full rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700">
              Billing
            </button>
          </div>
          <button type="button" className="flex w-full items-center gap-2.5 rounded-lg px-1 py-1.5 text-left hover:bg-slate-100">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-[11px] font-semibold text-blue-700">PF</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-xs font-medium text-slate-800">Conta PhoneFarm</span>
              <span className="block truncate text-[10px] text-slate-400">Configurações da conta</span>
            </span>
            <Icon name="logout" className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="dashboard-mobile-header">
          <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs text-white">PF</span>
            PhoneFarm
          </Link>
          <button type="button" aria-label="Abrir menu" onClick={() => setMobileMenuOpen((open) => !open)} className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600">
            <Icon name="menu" />
          </button>
        </div>

        <div className="dashboard-content">
          <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900">{pageTitle}</h1>
              <p className="mt-1 text-sm text-slate-500">
                {isPhones ? 'Gerencie seus telefones Android na nuvem.' : `Gerencie ${activeItem.toLowerCase()} da sua equipe.`}
              </p>
            </div>
            {isPhones && !showTrash && (
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => chooseItem('Visão múltipla')} className="dashboard-secondary-button">
                  <Icon name="monitor" className="h-4 w-4" />
                  <span>Visão múltipla</span>
                </button>
                <button type="button" onClick={requestPhone} className="dashboard-primary-button">
                  <Icon name="plus" className="h-4 w-4" />
                  <span>Novo telefone</span>
                </button>
              </div>
            )}
          </header>

          {isPhones ? (
            <>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex min-w-0 flex-wrap gap-2">
                  {!showTrash && (
                    <>
                      <label className="dashboard-search">
                        <Icon name="search" className="h-4 w-4 shrink-0 text-slate-400" />
                        <input
                          type="search"
                          value={search}
                          onChange={(event) => setSearch(event.target.value)}
                          placeholder="Pesquisar por nome ou número"
                          aria-label="Pesquisar telefones por nome ou número"
                        />
                      </label>
                      <button type="button" className="dashboard-filter">
                        <Icon name="apps" className="h-4 w-4 text-slate-500" />
                        <span>Todos os grupos</span>
                        <Icon name="chevron" className="h-3.5 w-3.5 text-slate-400" />
                      </button>
                      <button type="button" className="dashboard-filter">
                        <span className="text-slate-500">◇</span>
                        <span>Todas as etiquetas</span>
                        <Icon name="chevron" className="h-3.5 w-3.5 text-slate-400" />
                      </button>
                    </>
                  )}
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setNotice('Lista atualizada.')} className="dashboard-secondary-button">
                    <Icon name="refresh" className="h-4 w-4" />
                    <span>Atualizar</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowTrash((value) => !value); setNotice(''); }}
                    className={`dashboard-secondary-button ${showTrash ? 'border-blue-200 bg-blue-50 text-blue-700' : ''}`}
                  >
                    <Icon name="trash" className="h-4 w-4" />
                    <span>{showTrash ? 'Voltar aos telefones' : 'Lixo'}</span>
                  </button>
                </div>
              </div>

              <section className="dashboard-empty-state">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
                  <Icon name={showTrash ? 'trash' : 'phone'} className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-base font-semibold text-slate-900">
                  {showTrash ? 'O lixo está vazio.' : search ? 'Nenhum telefone encontrado.' : 'Ainda não há telefones.'}
                </h2>
                <p className="mt-1.5 max-w-md text-center text-sm leading-5 text-slate-500">
                  {showTrash
                    ? 'Os telefones excluídos aparecerão aqui.'
                    : search
                      ? 'Tente outra pesquisa ou crie seu primeiro telefone Android na nuvem.'
                      : 'Crie seu primeiro telefone Android na nuvem. Ele fica pronto para você gerenciar por aqui.'}
                </p>
                {!showTrash && (
                  <button type="button" onClick={requestPhone} className="dashboard-primary-button mt-5">
                    <Icon name="plus" className="h-4 w-4" />
                    <span>Novo telefone</span>
                  </button>
                )}
              </section>

              {notice && <p role="status" className="mt-3 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-800">{notice}</p>}

              <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
                <span>Total: 0 registros</span>
                <span>20 / página</span>
              </div>
            </>
          ) : (
            <section className="dashboard-empty-state min-h-[280px]">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600">
                <Icon name={navigation.flatMap((group) => group.items).find((item) => item.label === activeItem)?.icon ?? 'grid'} />
              </div>
              <h2 className="mt-4 text-base font-semibold text-slate-900">{activeItem}</h2>
              <p className="mt-1.5 max-w-md text-center text-sm leading-5 text-slate-500">Esta área estará disponível em breve.</p>
              <button type="button" onClick={() => chooseItem('Telefones')} className="dashboard-secondary-button mt-5">
                Voltar para Telefones
              </button>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
