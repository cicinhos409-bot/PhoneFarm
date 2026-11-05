import Link from 'next/link';

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

type LegalPageProps = {
  title: string;
  updated: string;
  intro?: string[];
  sections: LegalSection[];
  notice?: { title: string; text: string };
};

export default function LegalPage({
  title,
  updated,
  intro = [],
  sections,
  notice,
}: LegalPageProps) {
  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex min-h-[72px] w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link href="/" className="flex items-center gap-2.5" aria-label="PhoneFarm - início">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 text-sm font-bold text-white">
              PF
            </span>
            <span className="text-lg font-bold tracking-tight text-slate-900">PhoneFarm</span>
          </Link>
          <Link href="/" className="text-sm font-medium text-slate-600 transition hover:text-blue-700">
            <span aria-hidden="true">←</span> De volta para o início
          </Link>
        </div>
      </header>

      <article className="mx-auto w-full max-w-[680px] px-5 py-12 sm:px-8 sm:py-14">
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
        <p className="mt-2 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-400">
          Última atualização: {updated}
        </p>

        {notice && (
          <aside className="mt-6 rounded-lg border border-red-300 bg-red-50 px-4 py-4 text-sm leading-6 text-slate-700">
            <h2 className="font-bold uppercase tracking-wide text-red-600">{notice.title}</h2>
            <p className="mt-1">{notice.text}</p>
          </aside>
        )}

        <div className="mt-6 space-y-5 text-[15px] leading-7 text-slate-600">
          {intro.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>

        <div className="mt-8 space-y-7">
          {sections.map((section, index) => (
            <section key={section.title}>
              <h2 className="text-[19px] font-semibold tracking-tight text-slate-900">
                {index + 1}. {section.title}
              </h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="mt-2 text-[14px] leading-[1.7] text-slate-600">
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] leading-[1.7] text-slate-600">
                  {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              )}
            </section>
          ))}
        </div>

        <footer className="mt-12 border-t border-slate-200 pt-5 text-sm text-slate-500">
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy" className="hover:text-blue-700">Privacidade</Link>
            <Link href="/terms" className="hover:text-blue-700">Termos</Link>
            <Link href="/refund" className="hover:text-blue-700">Reembolso</Link>
          </div>
          <p className="mt-4">© 2026 PhoneFarm</p>
        </footer>
      </article>
    </main>
  );
}
