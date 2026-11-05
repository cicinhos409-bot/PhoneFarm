
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Lang = 'pt' | 'es' | 'en';

type TranslationSet = {
  nav: { product: string; solutions: string; pricing: string; faq: string; signIn: string; getStarted: string };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    description: string;
    tryFree: string;
    bookDemo: string;
    deviceFarm: string;
    devicesOnline: string;
    last30Min: string;
    liveDevices: string;
    uptime: string;
  };
  stats: { value: string; label: string }[];
  cards: string[];
  featureRows: { title: string; text: string }[];
  values: string[];
  sections: {
    why: string;
    productTitle: string;
    controlTitle: string;
    controlText: string;
    useCasesTitle: string;
    faqTitle: string;
    ctaTitle: string;
    ctaText: string;
    footerTag: string;
  };
  faq: string[];
  pricing: { title: string; price: string; subtitle: string }[];
  footer: { product: string; solutions: string; pricing: string; docs: string; support: string };
};

const translations: Record<Lang, TranslationSet> = {
  pt: {
    nav: { product: 'Produto', solutions: 'Soluções', pricing: 'Preços', faq: 'FAQ', signIn: 'Entrar', getStarted: 'Começar' },
    hero: {
      badge: 'Confiável para equipes Android',
      titleLine1: 'Fazenda real de celulares Android.',
      titleLine2: 'Na nuvem. Totalmente isolada.',
      description: 'Execute telefones Android em ambientes isolados para testes, automação e acesso remoto, sem gargalos de hardware.',
      tryFree: 'Teste grátis',
      bookDemo: 'Agendar demo',
      deviceFarm: 'Fazenda de dispositivos',
      devicesOnline: '7 dispositivos online',
      last30Min: 'Últimos 30 min',
      liveDevices: 'Dispositivos ativos',
      uptime: 'Tempo de atividade',
    },
    stats: [
      { value: '100%', label: 'disponibilidade' },
      { value: '1000+', label: 'celulares prontos' },
      { value: '99.9%', label: 'uptime' },
      { value: '24/7', label: 'suporte' },
    ],
    cards: ['Totalmente isolado', 'Android 14', 'Root integrado', 'Streaming ao vivo', 'Automação pronta', 'Controle remoto'],
    featureRows: [
      { title: 'Depure e automatize em uma fazenda real de dispositivos', text: 'Teste aplicativos, automatize tarefas e valide comportamentos reais em um único painel com acesso remoto seguro.' },
      { title: 'Crie ambientes isolados para cada execução', text: 'Cada aparelho é dedicado, reprodutível e protegido para que os testes permaneçam confiáveis e consistentes.' },
    ],
    values: ['Infraestrutura sempre ativa', 'Provisionamento instantâneo', 'Acesso global com baixa latência', 'Escala flexível'],
    sections: {
      why: 'Por que equipes escolhem PhoneFarm',
      productTitle: 'Um celular Android real, mantido em nosso datacenter',
      controlTitle: 'Controle até 24 celulares em uma tela',
      controlText: 'Coordene testes automatizados, capture telas, inspecione logs e mantenha sessões isoladas com um único painel unificado.',
      useCasesTitle: 'Por que equipes confiam no PhoneFarm',
      faqTitle: 'Perguntas sobre fazenda de celulares Android',
      ctaTitle: 'Execute sua fazenda de celulares na nuvem sem o hardware.',
      ctaText: 'Dê à sua equipe acesso instantâneo a dispositivos Android reais, automação mais rápida e validação de release mais eficiente.',
      footerTag: 'Infraestrutura de dispositivos Android na nuvem',
    },
    faq: [
      'O que é a PhoneFarm?',
      'Como o PhoneFarm isola os dispositivos?',
      'Vocês suportam automação Android?',
      'Posso usar em dispositivos locais e na nuvem?',
      'É seguro para workloads de produção?',
      'Qual é a velocidade de onboarding?',
    ],
    pricing: [
      { title: 'Starter', price: 'R$ 29', subtitle: 'Para times pequenos' },
      { title: 'Growth', price: 'R$ 99', subtitle: 'Para squads de produto' },
      { title: 'Enterprise', price: 'Custom', subtitle: 'Para cobertura global' },
    ],
    footer: { product: 'Produto', solutions: 'Soluções', pricing: 'Preços', docs: 'Docs', support: 'Suporte' },
  },
  es: {
    nav: { product: 'Producto', solutions: 'Soluciones', pricing: 'Precios', faq: 'FAQ', signIn: 'Iniciar sesión', getStarted: 'Comenzar' },
    hero: {
      badge: 'Confiable para equipos Android',
      titleLine1: 'Granja real de teléfonos Android.',
      titleLine2: 'En la nube. Totalmente aislada.',
      description: 'Ejecute teléfonos Android en entornos aislados para pruebas, automatización y acceso remoto, sin cuellos de botella de hardware.',
      tryFree: 'Prueba gratis',
      bookDemo: 'Reservar demo',
      deviceFarm: 'Granja de dispositivos',
      devicesOnline: '7 dispositivos en línea',
      last30Min: 'Últimos 30 min',
      liveDevices: 'Dispositivos activos',
      uptime: 'Tiempo de actividad',
    },
    stats: [
      { value: '100%', label: 'disponibilidad' },
      { value: '1000+', label: 'teléfonos listos' },
      { value: '99.9%', label: 'uptime' },
      { value: '24/7', label: 'soporte' },
    ],
    cards: ['Completamente aislado', 'Android 14', 'Root integrado', 'Streaming en vivo', 'Automatización lista', 'Control remoto'],
    featureRows: [
      { title: 'Depura y automatiza en una granja real de dispositivos', text: 'Prueba apps, automatiza tareas y valida comportamientos reales desde un único panel con acceso remoto seguro.' },
      { title: 'Crea entornos aislados para cada ejecución', text: 'Cada dispositivo es dedicado, reproducible y protegido para que las pruebas sigan siendo confiables y consistentes.' },
    ],
    values: ['Infraestructura siempre activa', 'Provisionamiento instantáneo', 'Acceso global de baja latencia', 'Escalado flexible'],
    sections: {
      why: 'Por qué equipos eligen PhoneFarm',
      productTitle: 'Un teléfono Android real, mantenido en nuestro centro de datos',
      controlTitle: 'Controla hasta 24 teléfonos en una pantalla',
      controlText: 'Coordina pruebas automatizadas, toma capturas, inspecciona logs y mantiene sesiones aisladas con un solo panel unificado.',
      useCasesTitle: 'Por qué los equipos confían en PhoneFarm',
      faqTitle: 'Preguntas sobre la granja de teléfonos Android',
      ctaTitle: 'Ejecuta tu granja de teléfonos en la nube sin el hardware.',
      ctaText: 'Dale a tu equipo acceso instantáneo a dispositivos Android reales, automatización más rápida y validación de versiones más fluida.',
      footerTag: 'Infraestructura de dispositivos Android en la nube',
    },
    faq: [
      '¿Qué es PhoneFarm?',
      '¿Cómo aísla PhoneFarm los dispositivos?',
      '¿Soportan automatización Android?',
      '¿Puedo usarlo en dispositivos locales y en la nube?',
      '¿Es seguro para cargas de producción?',
      '¿Qué tan rápido es el onboarding?',
    ],
    pricing: [
      { title: 'Starter', price: '$29', subtitle: 'Para equipos pequeños' },
      { title: 'Growth', price: '$99', subtitle: 'Para squads de producto' },
      { title: 'Enterprise', price: 'Custom', subtitle: 'Para cobertura global' },
    ],
    footer: { product: 'Producto', solutions: 'Soluciones', pricing: 'Precios', docs: 'Docs', support: 'Soporte' },
  },
  en: {
    nav: { product: 'Product', solutions: 'Solutions', pricing: 'Pricing', faq: 'FAQ', signIn: 'Sign in', getStarted: 'Get started' },
    hero: {
      badge: 'Trusted by Android teams',
      titleLine1: 'Real Android phone farm.',
      titleLine2: 'In the cloud. Fully isolated.',
      description: 'Run Android phones in isolated environments for testing, automation, and remote access—without hardware bottlenecks.',
      tryFree: 'Try it free',
      bookDemo: 'Book a demo',
      deviceFarm: 'Device farm',
      devicesOnline: '7 devices online',
      last30Min: 'Last 30 min',
      liveDevices: 'Live devices',
      uptime: 'Uptime',
    },
    stats: [
      { value: '100%', label: 'availability' },
      { value: '1000+', label: 'phones ready' },
      { value: '99.9%', label: 'uptime' },
      { value: '24/7', label: 'support' },
    ],
    cards: ['Fully isolated', 'Android 14', 'Built-in root', 'Live streaming', 'Automation ready', 'Remote control'],
    featureRows: [
      { title: 'Debug and automate across a real device farm', text: 'Test apps, automate tasks, and validate real device behavior from one control plane with secure remote access.' },
      { title: 'Create isolated environments for every run', text: 'Each device is dedicated, reproducible, and protected from interference so your tests remain reliable and consistent.' },
    ],
    values: ['Always-on infrastructure', 'Instant provisioning', 'Global low-latency access', 'Flexible scaling'],
    sections: {
      why: 'Why teams choose PhoneFarm',
      productTitle: 'A real Android phone, kept in our datacenter',
      controlTitle: 'Control up to 24 phones from one screen',
      controlText: 'Coordinate automated tests, capture screenshots, inspect logs, and keep device sessions isolated with a single unified dashboard.',
      useCasesTitle: 'Why teams trust PhoneFarm',
      faqTitle: 'Android phone farm questions, answered',
      ctaTitle: 'Run your phone farm in the cloud without the hardware.',
      ctaText: 'Give your team instant access to real Android devices, faster automation, and smoother release validation.',
      footerTag: 'Cloud Android device infrastructure',
    },
    faq: [
      'What is PhoneFarm?',
      'How does PhoneFarm isolate devices?',
      'Do you support Android automation?',
      'Can I use it for both cloud and local devices?',
      'Is it secure for production workloads?',
      'How fast is onboarding?',
    ],
    pricing: [
      { title: 'Starter', price: '$29', subtitle: 'For small teams' },
      { title: 'Growth', price: '$99', subtitle: 'For product squads' },
      { title: 'Enterprise', price: 'Custom', subtitle: 'For global coverage' },
    ],
    footer: { product: 'Product', solutions: 'Solutions', pricing: 'Pricing', docs: 'Docs', support: 'Support' },
  },
};

export default function LandingPage() {
  const [lang, setLang] = useState<Lang>('pt');

  useEffect(() => {
    const stored = window.localStorage.getItem('phonefarm-lang') as Lang | null;
    if (stored && stored in translations) {
      setLang(stored);
      return;
    }

    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('es')) setLang('es');
    else if (browserLang.startsWith('en')) setLang('en');
  }, []);

  useEffect(() => {
    window.localStorage.setItem('phonefarm-lang', lang);
  }, [lang]);

  const copy = translations[lang];

  return (
    <main className="min-h-screen bg-[#f3f5f8] text-slate-900">
      <div className="section-shell pt-6 pb-16">
        <header className="rounded-full border border-slate-200 bg-white/80 px-5 py-3 shadow-[0_8px_30px_rgba(15,23,42,0.05)] backdrop-blur-sm">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">PF</div>
              <span className="text-sm font-semibold tracking-tight text-slate-900">PhoneFarm</span>
            </div>

            <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
              <a href="#product">{copy.nav.product}</a>
              <a href="#solutions">{copy.nav.solutions}</a>
              <a href="#pricing">{copy.nav.pricing}</a>
              <a href="#faq">{copy.nav.faq}</a>
            </nav>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-1">
                {(['pt', 'es', 'en'] as Lang[]).map((locale) => (
                  <button
                    key={locale}
                    type="button"
                    onClick={() => setLang(locale)}
                    className={`rounded-full px-2.5 py-1.5 text-xs font-semibold transition ${
                      lang === locale ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {locale.toUpperCase()}
                  </button>
                ))}
              </div>

              <Link href="/login" className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700">
                {copy.nav.signIn}
              </Link>
              <Link href="/signup" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-slate-300/50">
                {copy.nav.getStarted}
              </Link>
            </div>
          </div>
        </header>

        <section className="pt-16 text-center">
          <div className="mx-auto flex max-w-2xl flex-col items-center">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              {copy.hero.badge}
            </span>

            <h1 className="text-5xl font-black tracking-[-0.08em] text-slate-900 md:text-7xl">
              {copy.hero.titleLine1}
              <span className="mt-2 block text-slate-600">{copy.hero.titleLine2}</span>
            </h1>

            <p className="mt-6 max-w-xl text-base text-slate-600 md:text-lg">{copy.hero.description}</p>

            <div className="mt-8 flex items-center gap-4">
              <Link href="/signup" className="rounded-full bg-[#f4c95d] px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_10px_30px_rgba(244,201,93,0.35)] transition hover:-translate-y-0.5">
                {copy.hero.tryFree}
              </Link>
              <button className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800">
                {copy.hero.bookDemo}
              </button>
            </div>
          </div>

          <div className="relative mx-auto mt-14 max-w-5xl rounded-[32px] border border-slate-200 bg-white p-4 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
            <div className="rounded-[26px] bg-gradient-to-b from-[#eef3ff] via-white to-white p-4">
              <div className="flex items-center justify-between px-4 pb-4 pt-2 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em]">
                  {copy.hero.deviceFarm}
                </span>
              </div>

              <div className="rounded-[22px] bg-[#f9fafb] p-5">
                <div className="grid gap-4 md:grid-cols-[1.4fr_1fr]">
                  <div className="rounded-[20px] bg-white p-5 shadow-sm ring-1 ring-slate-200">
                    <div className="mb-5 flex items-center justify-between text-xs text-slate-500">
                      <span>{copy.hero.devicesOnline}</span>
                      <span>{copy.hero.last30Min}</span>
                    </div>
                    <div className="flex items-end gap-3">
                      {[42, 58, 68, 52, 80, 52, 70].map((h, idx) => (
                        <div key={idx} className="flex-1 rounded-t-xl bg-gradient-to-t from-[#cbd5e1] via-[#dfe9f6] to-[#eef3ff]" style={{ height: `${h}px` }} />
                      ))}
                    </div>
                    <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.12em] text-slate-400">
                      <span>mon</span>
                      <span>tue</span>
                      <span>wed</span>
                      <span>thu</span>
                      <span>fri</span>
                      <span>sat</span>
                      <span>sun</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="rounded-[20px] bg-[#edf4ff] p-4 ring-1 ring-[#dbe8ff]">
                      <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">{copy.hero.liveDevices}</div>
                      <div className="mt-3 flex items-center gap-2">
                        <div className="grid grid-cols-4 gap-2">
                          {['A', 'B', 'C', 'D'].map((v) => (
                            <div key={v} className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-xs font-bold text-slate-700 shadow-sm ring-1 ring-slate-200">
                              {v}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[20px] bg-slate-900 p-4 text-white shadow-xl">
                      <div className="text-[10px] uppercase tracking-[0.14em] text-slate-400">{copy.hero.uptime}</div>
                      <div className="mt-2 text-3xl font-black">99.9%</div>
                      <div className="mt-4 h-2 rounded-full bg-white/10">
                        <div className="h-full w-[80%] rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="grid gap-4 md:grid-cols-4">
            {copy.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="text-3xl font-black tracking-[-0.06em] text-slate-900">{stat.value}</div>
                <div className="mt-2 text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        <section id="product" className="mt-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{copy.sections.why}</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.06em] text-slate-900 md:text-5xl">{copy.sections.productTitle}</h2>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
              <div className="mb-8 flex flex-wrap gap-2">
                {copy.cards.map((label) => (
                  <span key={label} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600">
                    {label}
                  </span>
                ))}
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">✓</div>
                  <div>
                    <div className="font-semibold text-slate-900">{copy.cards[0]}</div>
                    <p className="mt-1 text-sm text-slate-600">
                      {lang === 'pt' ? 'Teste apps nas mesmas condições reais dos usuários em hardware Android físico.' : lang === 'es' ? 'Prueba apps en las mismas condiciones reales que los usuarios en hardware Android físico.' : 'Test apps under the same real conditions as users on physical Android hardware.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-700">✓</div>
                  <div>
                    <div className="font-semibold text-slate-900">{copy.cards[4]}</div>
                    <p className="mt-1 text-sm text-slate-600">
                      {lang === 'pt' ? 'Integre com pipelines CI e execute verificações visuais ou headless sem atritos.' : lang === 'es' ? 'Integra con pipelines CI y ejecuta verificaciones visuales o headless sin fricción.' : 'Integrate with CI pipelines and run visual or headless checks with no friction.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-4">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-700">✓</div>
                  <div>
                    <div className="font-semibold text-slate-900">{lang === 'pt' ? 'Zero setup local' : lang === 'es' ? 'Sin configuración local' : 'Zero local setup'}</div>
                    <p className="mt-1 text-sm text-slate-600">
                      {lang === 'pt' ? 'Provisionamento rápido de instâncias limpas, acesso remoto e produtividade imediata.' : lang === 'es' ? 'Provisiona instancias limpias, accede de forma remota y mejora la productividad desde el primer minuto.' : 'Provision clean instances, connect remotely, and get productive in minutes.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-gradient-to-b from-[#eef4ff] to-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
              <div className="mx-auto max-w-xs rounded-[28px] border border-slate-200 bg-slate-900 p-4 shadow-2xl">
                <div className="rounded-[20px] bg-[#dbeafe] p-4">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-slate-600">
                    <span>Phone</span>
                    <span>Online</span>
                  </div>
                  <div className="mt-5 flex items-center justify-center">
                    <div className="phone-shell">
                      <div className="phone-screen">
                        <div className="screen-header">
                          <span className="h-2 w-2 rounded-full bg-slate-800" />
                          <span className="h-2 w-2 rounded-full bg-slate-300" />
                          <span className="h-2 w-2 rounded-full bg-slate-300" />
                        </div>
                        <div className="screen-grid">
                          {Array.from({ length: 9 }).map((_, i) => (
                            <span key={i} className="app-icon" style={{ background: ['#fbbf24', '#60a5fa', '#34d399', '#e879f9', '#fb7185', '#f97316'][i % 6] }} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="solutions" className="mt-24">
          <div className="grid gap-8 lg:grid-cols-2">
            {copy.featureRows.map((item, index) => (
              <div key={item.title} className={`rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm ${index === 0 ? 'lg:row-span-2' : ''}`}>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-lg font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-bold tracking-[-0.04em] text-slate-900">{item.title}</h3>
                <p className="mt-4 text-base leading-7 text-slate-600">{item.text}</p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {copy.values.map((value) => (
                    <span key={value} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700">
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 rounded-[32px] border border-slate-200 bg-[#eef4ff] p-8 shadow-[0_18px_40px_rgba(15,23,42,0.04)] md:p-12">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{lang === 'pt' ? 'Controle escalável' : lang === 'es' ? 'Control escalable' : 'Scalable control'}</p>
              <h3 className="mt-4 text-4xl font-black tracking-[-0.06em] text-slate-900">{copy.sections.controlTitle}</h3>
              <p className="mt-4 max-w-lg text-base text-slate-600">{copy.sections.controlText}</p>
              <ul className="mt-8 space-y-4 text-slate-700">
                {[
                  lang === 'pt' ? 'Acesso remoto ao vivo' : lang === 'es' ? 'Acceso remoto en vivo' : 'Live remote access',
                  lang === 'pt' ? 'Automação paralela' : lang === 'es' ? 'Automatización paralela' : 'Parallel automation',
                  lang === 'pt' ? 'Isolamento por sessão' : lang === 'es' ? 'Aislamiento por sesión' : 'Session isolation',
                  lang === 'pt' ? 'Análise de atividade' : lang === 'es' ? 'Análisis de actividad' : 'Activity analytics',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs text-white">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-xl">
              <div className="rounded-[22px] bg-slate-900 p-4 text-white">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-slate-300">
                  <span>{lang === 'pt' ? 'Visão da fazenda' : lang === 'es' ? 'Vista de la granja' : 'Farm overview'}</span>
                  <span>24 / 24</span>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
                      <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-slate-300">
                        <span>{lang === 'pt' ? 'Dispositivo' : lang === 'es' ? 'Dispositivo' : 'Device'}</span>
                        <span>{i + 1}</span>
                      </div>
                      <div className="h-20 rounded-xl bg-gradient-to-br from-[#f8fafc] via-[#dbeafe] to-[#bfdbfe] p-2">
                        <div className="flex h-full items-center justify-center rounded-lg border border-slate-200 bg-white/70 text-xs font-bold text-slate-700">
                          {i + 1}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{lang === 'pt' ? 'Quem usa' : lang === 'es' ? 'Quién lo usa' : 'Who uses it'}</p>
            <h3 className="mt-4 text-4xl font-black tracking-[-0.06em] text-slate-900">{copy.sections.useCasesTitle}</h3>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              lang === 'pt' ? 'Validação mais rápida de release' : lang === 'es' ? 'Validación más rápida de releases' : 'Faster release validation',
              lang === 'pt' ? 'Cobertura melhor de automação' : lang === 'es' ? 'Mejor cobertura de automatización' : 'Better automation coverage',
              lang === 'pt' ? 'Depuração mais clara' : lang === 'es' ? 'Depuración más clara' : 'Clearer debugging',
              lang === 'pt' ? 'Isolamento seguro de testes' : lang === 'es' ? 'Aislamiento seguro de pruebas' : 'Secure test isolation',
              lang === 'pt' ? 'Visibilidade remota completa' : lang === 'es' ? 'Visibilidad remota completa' : 'Full remote visibility',
              lang === 'pt' ? 'Sem gargalo de hardware' : lang === 'es' ? 'Sin cuellos de botella de hardware' : 'Zero hardware bottleneck',
            ].map((item, idx) => (
              <div key={item} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">{idx + 1}</div>
                <p className="text-base font-semibold text-slate-800">{item}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{lang === 'pt' ? 'Mantenha a velocidade da equipe com infraestrutura feita para testes em dispositivos reais em escala.' : lang === 'es' ? 'Mantén la velocidad del equipo con una infraestructura pensada para pruebas reales en dispositivos a escala.' : 'Maintain team velocity with infrastructure designed for real-device testing at scale.'}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="pricing" className="mt-24 rounded-[32px] border border-slate-200 bg-[#f4f7fb] p-8 md:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{lang === 'pt' ? 'Preços simples' : lang === 'es' ? 'Precios simples' : 'Simple pricing'}</p>
              <h3 className="mt-4 text-4xl font-black tracking-[-0.06em] text-slate-900">{lang === 'pt' ? 'Acesso ilimitado para a equipe, incluído em todos os planos' : lang === 'es' ? 'Acceso ilimitado para el equipo, incluido en todos los planes' : 'Unlimited team access, included in every plan'}</h3>
              <p className="mt-4 max-w-lg text-base text-slate-600">{lang === 'pt' ? 'De times de QA pequenos a grandes organizações de produto, todos os planos foram pensados para colaboração e escala.' : lang === 'es' ? 'Desde pequeños equipos QA hasta grandes organizaciones de producto, todos los planes están pensados para colaboración y escala.' : 'From small QA teams to large product organizations, every plan is built for collaboration and scale.'}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {copy.pricing.map((plan) => (
                <div key={plan.title} className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="text-sm font-semibold text-slate-500">{plan.title}</div>
                  <div className="mt-4 text-3xl font-black tracking-[-0.06em] text-slate-900">{plan.price}</div>
                  <div className="mt-2 text-sm text-slate-500">{plan.subtitle}</div>
                  <Link href="/signup" className="mt-6 flex w-full justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                    {lang === 'pt' ? 'Começar' : lang === 'es' ? 'Comenzar' : 'Get started'}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">FAQ</p>
            <h3 className="mt-4 text-4xl font-black tracking-[-0.06em] text-slate-900">{copy.sections.faqTitle}</h3>
          </div>

          <div id="faq" className="mx-auto mt-10 max-w-3xl space-y-3">
            {copy.faq.map((item, idx) => (
              <div key={item} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium text-slate-800">{item}</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-sm text-slate-600">{idx + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 rounded-[32px] border border-slate-200 bg-gradient-to-r from-[#f5f7fb] to-[#edf3ff] p-8 shadow-[0_18px_40px_rgba(15,23,42,0.04)] md:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h3 className="text-4xl font-black tracking-[-0.06em] text-slate-900">{copy.sections.ctaTitle}</h3>
              <p className="mt-4 max-w-xl text-base text-slate-600">{copy.sections.ctaText}</p>
              <Link href="/signup" className="mt-8 inline-flex rounded-full bg-[#f4c95d] px-6 py-3 text-sm font-semibold text-slate-900 shadow-[0_10px_30px_rgba(244,201,93,0.35)]">
                {lang === 'pt' ? 'Começar agora' : lang === 'es' ? 'Comenzar ahora' : 'Get started now'}
              </Link>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl">
              <div className="mx-auto max-w-[220px] rounded-[24px] bg-gradient-to-b from-[#ffffff] to-[#e5eefb] p-4 ring-1 ring-slate-200">
                <div className="h-64 rounded-[18px] bg-gradient-to-b from-[#dbeafe] to-[#f8fafc] p-4">
                  <div className="flex h-full flex-col justify-between rounded-[14px] border border-slate-200 bg-white/70 p-3">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.12em] text-slate-500">
                      <span>{lang === 'pt' ? 'Dispositivo' : lang === 'es' ? 'Dispositivo' : 'Device'}</span>
                      <span>01</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="h-8 rounded-xl bg-gradient-to-br from-slate-200 to-slate-100" />
                      ))}
                    </div>
                    <div className="h-10 rounded-xl bg-slate-900 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-white flex items-center justify-center">
                      Live
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="mt-16 pb-12">
          <div className="rounded-[28px] border border-slate-200 bg-white px-6 py-8 shadow-sm">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">PF</div>
                <div>
                  <div className="text-base font-bold text-slate-900">PhoneFarm</div>
                  <div className="text-xs text-slate-500">{copy.sections.footerTag}</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-5 text-sm text-slate-600">
                <a href="#">{copy.footer.product}</a>
                <a href="#">{copy.footer.solutions}</a>
                <a href="#">{copy.footer.pricing}</a>
                <Link href="/terms">Termos de Uso</Link>
                <Link href="/privacy">Privacidade</Link>
                <Link href="/refund">Reembolso</Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
