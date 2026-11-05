'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

const androidVersions = ['Android 10', 'Android 11', 'Android 12', 'Android 13', 'Android 14', 'Android 15', 'Android 16'];
const dataCenters = ['Auto', 'Cingapura', 'Estados Unidos', 'China (continente)'];
const languages = [
  'Com base em proxy',
  'Inglês (Estados Unidos)',
  'Inglês (Reino Unido)',
  'Francês (França)',
  'Espanhol (Espanha)',
  'Espanhol (México)',
  'Alemão (Alemanha)',
  'Italiano (Itália)',
  'Português (Brasil)',
  'Português (Portugal)',
  'Árabe (Arábia Saudita)',
  'Russo (Rússia)',
  'Japonês (Japão)',
  'Coreano (Coreia do Sul)',
  'Hindi (Índia)',
];

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="min-w-0">
      <label className="mb-1.5 block text-xs font-semibold text-slate-700">{label}</label>
      {children}
      {hint && <p className="mt-1.5 text-[11px] leading-4 text-slate-400">{hint}</p>}
    </div>
  );
}

export default function NewPhone() {
  const [name, setName] = useState('');
  const [android, setAndroid] = useState('Android 14');
  const [dataCenter, setDataCenter] = useState('Auto');
  const [group, setGroup] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [network, setNetwork] = useState<'Wi-Fi' | 'Celular'>('Celular');
  const [deviceLanguage, setDeviceLanguage] = useState(languages[0]);
  const [notice, setNotice] = useState('');

  function addTag() {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) setTags((current) => [...current, tag]);
    setTagInput('');
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice('O formulário está pronto, mas o serviço de provisionamento ainda não está conectado. Nenhum telefone foi criado.');
  }

  return (
    <main className="flex min-h-screen bg-[#f7f8fa] text-slate-800">
      <aside className="dashboard-sidebar hidden md:flex">
        <Link href="/" className="flex h-[72px] items-center gap-2.5 border-b border-slate-200 px-5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 text-sm font-bold text-white">PF</span>
          <span className="text-[17px] font-bold tracking-tight text-slate-900">PhoneFarm</span>
        </Link>
        <nav className="dashboard-nav" aria-label="Menu principal">
          <div className="mb-5">
            <h2 className="mb-2 px-4 text-[10px] font-semibold tracking-[0.12em] text-slate-400">PRINCIPAL</h2>
            <Link href="/dashboard" className="dashboard-nav-item dashboard-nav-item-active">▯ <span>Telefones</span></Link>
            <Link href="/dashboard/proxies" className="dashboard-nav-item">◎ <span>Proxies</span></Link>
          </div>
          <div className="mb-5">
            <h2 className="mb-2 px-4 text-[10px] font-semibold tracking-[0.12em] text-slate-400">DESCOBRIR</h2>
            <Link href="/dashboard/applications" className="dashboard-nav-item">▦ <span>Aplicações</span></Link>
            <Link href="/dashboard/automation" className="dashboard-nav-item">◉ <span>Automação</span></Link>
            <Link href="/dashboard/multi-view" className="dashboard-nav-item">⊞ <span>Visão múltipla</span></Link>
            <Link href="/dashboard/api-claude" className="dashboard-nav-item">⚿ <span>API &amp; Claude</span></Link>
          </div>
          <div>
            <h2 className="mb-2 px-4 text-[10px] font-semibold tracking-[0.12em] text-slate-400">EQUIPE</h2>
            <Link href="/dashboard/billing" className="dashboard-nav-item">▤ <span>Billing</span></Link>
            <Link href="/dashboard/members" className="dashboard-nav-item">♧ <span>Members</span></Link>
            <Link href="/dashboard/settings" className="dashboard-nav-item">⚙ <span>Settings</span></Link>
            <Link href="/dashboard/contact" className="dashboard-nav-item">♡ <span>Contact</span></Link>
          </div>
        </nav>
        <div className="dashboard-sidebar-bottom">
          <div className="mb-3 rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-[11px] text-slate-500">0 telefones</p>
            <Link href="/dashboard/billing" className="mt-3 block w-full rounded-lg bg-blue-600 px-3 py-2 text-center text-xs font-semibold text-white">Billing</Link>
          </div>
          <div className="text-xs font-medium text-slate-700">Conta PhoneFarm</div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="dashboard-mobile-header md:hidden">
          <Link href="/" className="flex items-center gap-2 font-bold text-slate-900">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-xs text-white">PF</span>
            PhoneFarm
          </Link>
          <Link href="/dashboard" className="text-sm font-medium text-slate-600">Telefones</Link>
        </div>
        <div className="dashboard-content mx-auto max-w-[1480px]">
          <Link href="/dashboard" className="mb-5 inline-flex items-center gap-2 text-xs font-medium text-slate-500 hover:text-blue-700">
            <span aria-hidden="true">←</span> Todos os telefones
          </Link>

          <header className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Novo telefone</h1>
            <p className="mt-1 text-sm text-slate-500">Configure seu telefone Android na nuvem antes que ele seja provisionado.</p>
          </header>

          <aside className="mb-5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-4 text-[13px] leading-5 text-slate-700">
            <div className="flex gap-3">
              <span className="mt-0.5 text-amber-600" aria-hidden="true">⚠</span>
              <div>
                <p><strong>Este é um telefone de teste gratuito.</strong> Ele vem com <strong>5 minutos de tempo de uso</strong> e é removido automaticamente assim que esses minutos forem utilizados ou 24 horas após a sua criação — o que ocorrer primeiro.</p>
                <p className="mt-1.5">Adicione fundos ou escolha um plano antes disso e o telefone será seu para sempre. Seu saldo e seus outros telefones não serão afetados.</p>
                <Link href="/dashboard" className="mt-1 inline-block font-semibold text-blue-700 underline underline-offset-2">Veja os planos</Link>
              </div>
            </div>
          </aside>

          <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_290px]">
            <form onSubmit={submit} className="space-y-5">
              <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
                <h2 className="text-sm font-semibold text-slate-900">Configurações de perfil</h2>
                <p className="mt-1 text-xs text-slate-500">Informações básicas sobre este telefone — apenas o nome é necessário.</p>

                <div className="mt-5 space-y-4">
                  <Field label="Nome">
                    <input
                      className="new-phone-input focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      value={name}
                      maxLength={100}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Ex.: Conta principal — teste QA"
                      required
                    />
                    <span className="mt-1 block text-[11px] text-slate-400">{name.length} / 100</span>
                  </Field>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Grupo" hint="Selecione um existente ou digite um novo.">
                      <input className="new-phone-input" list="phone-groups" value={group} onChange={(event) => setGroup(event.target.value)} placeholder="Não agrupados" />
                      <datalist id="phone-groups"><option value="Não agrupados" /></datalist>
                    </Field>
                    <Field label="Versão Android" hint="Configuração padrão para testes de compatibilidade.">
                      <select className="new-phone-input" value={android} onChange={(event) => setAndroid(event.target.value)}>
                        {androidVersions.map((version) => <option key={version}>{version}</option>)}
                      </select>
                    </Field>
                  </div>

                  <Field label="Centro de dados" hint={dataCenter === 'Auto' ? 'Selecione automaticamente o melhor centro de dados.' : `Região selecionada: ${dataCenter}.`}>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {dataCenters.map((center) => (
                        <button
                          key={center}
                          type="button"
                          onClick={() => setDataCenter(center)}
                          aria-pressed={dataCenter === center}
                          className={`rounded-lg border px-3 py-2.5 text-xs font-medium transition ${
                            dataCenter === center
                              ? 'border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-100'
                              : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                          }`}
                        >
                          {center}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field label="Etiquetas" hint="Digite a tag e pressione Enter para adicionar. Novas tags são criadas automaticamente.">
                    <div className="flex min-h-10 flex-wrap items-center gap-2 rounded-lg border border-slate-200 px-2.5 py-1.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
                      {tags.map((tag) => (
                        <button key={tag} type="button" onClick={() => setTags((current) => current.filter((value) => value !== tag))} className="rounded-md bg-blue-50 px-2 py-1 text-xs text-blue-700">
                          {tag} <span aria-label="Remover etiqueta">×</span>
                        </button>
                      ))}
                      <input
                        className="min-w-[140px] flex-1 border-0 py-1 text-xs outline-none"
                        value={tagInput}
                        onChange={(event) => setTagInput(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') { event.preventDefault(); addTag(); }
                        }}
                        placeholder="Digite uma etiqueta e pressione Enter."
                      />
                    </div>
                  </Field>

                  <Field label="Observação" hint="Opcional, visível apenas para você.">
                    <textarea className="new-phone-input min-h-20 resize-y py-2" placeholder="Nota interna" maxLength={500} />
                  </Field>
                </div>
              </section>

              <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
                <h2 className="text-sm font-semibold text-slate-900">Rede</h2>
                <p className="mt-1 text-xs text-slate-500">Escolha o tipo de conexão usado pelo telefone.</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {(['Wi-Fi', 'Celular'] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setNetwork(value)}
                      aria-pressed={network === value}
                      className={`rounded-lg border px-4 py-2.5 text-sm font-medium ${
                        network === value ? 'border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-100' : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-3 text-xs leading-5 text-slate-600">
                  Proxy personalizado não está disponível nesta tela. O tráfego usa a conexão padrão do ambiente de teste.
                </div>
              </section>

              <details className="group rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span>
                    <span className="block text-sm font-semibold text-slate-900">Avançado</span>
                    <span className="mt-1 block text-xs text-slate-500">Preferências de rede e idioma para testes.</span>
                  </span>
                  <span className="text-slate-400 transition group-open:rotate-180" aria-hidden="true">⌄</span>
                </summary>
                <div className="mt-5 grid gap-4 border-t border-slate-100 pt-5 md:grid-cols-2">
                  <Field label="Localização">
                    <select className="new-phone-input" defaultValue="Auto">
                      <option>Auto</option>
                      <option>Desativada</option>
                    </select>
                  </Field>
                  <Field label="Idioma do dispositivo">
                    <select className="new-phone-input" value={deviceLanguage} onChange={(event) => setDeviceLanguage(event.target.value)}>
                      {languages.map((language) => <option key={language}>{language}</option>)}
                    </select>
                  </Field>
                  <div className="md:col-span-2 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-3 text-xs leading-5 text-slate-600">
                    O modelo, a marca e os identificadores do dispositivo são definidos pelo ambiente e não podem ser personalizados aqui.
                  </div>
                </div>
              </details>

              <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
                <h2 className="text-sm font-semibold text-slate-900">Custos do dispositivo</h2>
                <div className="mt-3 space-y-2 text-xs leading-5 text-slate-600">
                  <p>Sua assinatura reserva o espaço do telefone — ele permanece reservado 24 horas por dia, 7 dias por semana.</p>
                  <p>O uso é cobrado a US$ 0,012 por minuto, somente enquanto o telefone estiver em funcionamento.</p>
                  <p>Desligue o telefone a qualquer momento para pausar a cobrança. Telefones bloqueados não custam nada além da assinatura mensal.</p>
                </div>
              </section>

              <div className="flex flex-wrap items-center justify-end gap-3 pb-5">
                <Link href="/dashboard" className="dashboard-secondary-button">Cancelar</Link>
                <button type="submit" className="dashboard-primary-button">Criar telefone</button>
              </div>
              {notice && <p role="status" className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">{notice}</p>}
            </form>

            <aside className="sticky top-6 hidden rounded-xl border border-slate-200 bg-white p-4 xl:block">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Visão geral</h2>
              <div className="mx-auto mt-4 flex h-[210px] w-[120px] items-center justify-center rounded-[22px] border border-slate-200 bg-gradient-to-b from-slate-50 to-white text-slate-300">
                <span className="text-3xl" aria-hidden="true">▯</span>
              </div>
              <dl className="mt-4 divide-y divide-slate-100 text-xs">
                <div className="flex justify-between gap-3 py-2"><dt className="text-slate-400">Nome</dt><dd className="max-w-[155px] truncate text-right font-medium text-slate-700">{name || '—'}</dd></div>
                <div className="flex justify-between gap-3 py-2"><dt className="text-slate-400">Android</dt><dd className="text-right font-medium text-slate-700">{android}</dd></div>
                <div className="flex justify-between gap-3 py-2"><dt className="text-slate-400">Grupo</dt><dd className="max-w-[155px] truncate text-right font-medium text-slate-700">{group || 'Não agrupados'}</dd></div>
                <div className="flex justify-between gap-3 py-2"><dt className="text-slate-400">Etiquetas</dt><dd className="max-w-[155px] truncate text-right font-medium text-slate-700">{tags.join(', ') || '—'}</dd></div>
                <div className="flex justify-between gap-3 py-2"><dt className="text-slate-400">Rede</dt><dd className="text-right font-medium text-slate-700">{network}</dd></div>
                <div className="flex justify-between gap-3 py-2"><dt className="text-slate-400">Data center</dt><dd className="text-right font-medium text-slate-700">{dataCenter}</dd></div>
                <div className="flex justify-between gap-3 py-2"><dt className="text-slate-400">Idioma</dt><dd className="max-w-[155px] truncate text-right font-medium text-slate-700">{deviceLanguage}</dd></div>
                <div className="flex justify-between gap-3 py-2"><dt className="text-slate-400">Proxy</dt><dd className="text-right font-medium text-slate-700">Padrão</dd></div>
              </dl>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
