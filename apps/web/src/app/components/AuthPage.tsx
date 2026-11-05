'use client';

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';

type Language = 'pt' | 'es' | 'en';
type AuthMode = 'login' | 'signup';

const translations = {
  pt: {
    login: {
      title: 'Bem-vindo de volta',
      subtitle: 'Entre para gerenciar seus celulares na nuvem.',
      google: 'Continuar com o Google',
      divider: 'ou',
      email: 'E-mail',
      password: 'Senha',
      forgot: 'Esqueceu a senha?',
      submit: 'Entrar',
      switchText: 'Ainda não tem uma conta?',
      switchLink: 'Crie sua conta',
      notice: 'A autenticação ainda não está conectada ao servidor.',
      googleNotice: 'O acesso com Google ainda não está configurado.',
      forgotNotice: 'A recuperação de senha ainda não está configurada.',
    },
    signup: {
      title: 'Crie sua conta',
      subtitle: 'Configure seu primeiro telefone Android em segundos.',
      google: 'Continuar com o Google',
      googleTerms: 'Ao continuar com o Google, você concorda com nossos',
      terms: 'Termos de Serviço',
      and: 'e',
      privacy: 'Política de Privacidade',
      divider: 'ou',
      name: 'Nome completo',
      email: 'E-mail',
      password: 'Senha',
      passwordHint: 'Use pelo menos 10 caracteres, incluindo uma letra maiúscula, uma letra minúscula e um dígito.',
      agreement: 'Concordo com os Termos de Serviço e a Política de Privacidade.',
      agreementPrefix: 'Concordo com os',
      submit: 'Criar uma conta',
      switchText: 'Já tem uma conta?',
      switchLink: 'Iniciar sessão',
      notice: 'O cadastro ainda não está conectado ao servidor.',
      googleNotice: 'O cadastro com Google ainda não está configurado.',
    },
    brand: 'Infraestrutura Android na nuvem',
    language: 'Idioma',
    back: 'Voltar para o início',
    showPassword: 'Mostrar senha',
    hidePassword: 'Ocultar senha',
  },
  es: {
    login: {
      title: 'Te damos la bienvenida',
      subtitle: 'Inicia sesión para administrar tus teléfonos en la nube.',
      google: 'Continuar con Google',
      divider: 'o',
      email: 'Correo electrónico',
      password: 'Contraseña',
      forgot: '¿Olvidaste tu contraseña?',
      submit: 'Iniciar sesión',
      switchText: '¿Aún no tienes una cuenta?',
      switchLink: 'Crea tu cuenta',
      notice: 'La autenticación aún no está conectada al servidor.',
      googleNotice: 'El acceso con Google aún no está configurado.',
      forgotNotice: 'La recuperación de contraseña aún no está configurada.',
    },
    signup: {
      title: 'Crea tu cuenta',
      subtitle: 'Configura tu primer teléfono Android en segundos.',
      google: 'Continuar con Google',
      googleTerms: 'Al continuar con Google, aceptas nuestros',
      terms: 'Términos del servicio',
      and: 'y la',
      privacy: 'Política de privacidad',
      divider: 'o',
      name: 'Nombre completo',
      email: 'Correo electrónico',
      password: 'Contraseña',
      passwordHint: 'Usa al menos 10 caracteres, incluida una mayúscula, una minúscula y un número.',
      agreement: 'Acepto los Términos del servicio y la Política de privacidad.',
      agreementPrefix: 'Acepto los',
      submit: 'Crear una cuenta',
      switchText: '¿Ya tienes una cuenta?',
      switchLink: 'Iniciar sesión',
      notice: 'El registro aún no está conectado al servidor.',
      googleNotice: 'El registro con Google aún no está configurado.',
    },
    brand: 'Infraestructura Android en la nube',
    language: 'Idioma',
    back: 'Volver al inicio',
    showPassword: 'Mostrar contraseña',
    hidePassword: 'Ocultar contraseña',
  },
  en: {
    login: {
      title: 'Welcome back',
      subtitle: 'Sign in to manage your cloud phones.',
      google: 'Continue with Google',
      divider: 'or',
      email: 'Email',
      password: 'Password',
      forgot: 'Forgot password?',
      submit: 'Sign in',
      switchText: 'New to PhoneFarm?',
      switchLink: 'Create an account',
      notice: 'Authentication is not connected to a server yet.',
      googleNotice: 'Google sign-in is not configured yet.',
      forgotNotice: 'Password recovery is not configured yet.',
    },
    signup: {
      title: 'Create your account',
      subtitle: 'Set up your first Android phone in seconds.',
      google: 'Continue with Google',
      googleTerms: 'By continuing with Google, you agree to our',
      terms: 'Terms of Service',
      and: 'and',
      privacy: 'Privacy Policy',
      divider: 'or',
      name: 'Full name',
      email: 'Email',
      password: 'Password',
      passwordHint: 'Use at least 10 characters, including an uppercase letter, a lowercase letter, and a number.',
      agreement: 'I agree to the Terms of Service and Privacy Policy.',
      agreementPrefix: 'I agree to the',
      submit: 'Create an account',
      switchText: 'Already have an account?',
      switchLink: 'Sign in',
      notice: 'Registration is not connected to a server yet.',
      googleNotice: 'Google sign-up is not configured yet.',
    },
    brand: 'Cloud Android infrastructure',
    language: 'Language',
    back: 'Back to home',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
  },
} as const;

export default function AuthPage({ mode }: { mode: AuthMode }) {
  const [language, setLanguage] = useState<Language>('pt');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const isSignup = mode === 'signup';
  const copy = translations[language][mode];

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem('phonefarm-lang');
    const browserLanguage = window.navigator.language.toLowerCase();
    const initialLanguage: Language =
      savedLanguage === 'pt' || savedLanguage === 'es' || savedLanguage === 'en'
        ? savedLanguage
        : browserLanguage.startsWith('es')
          ? 'es'
          : browserLanguage.startsWith('en')
            ? 'en'
            : 'pt';

    setLanguage(initialLanguage);
    document.documentElement.lang =
      initialLanguage === 'pt' ? 'pt-BR' : initialLanguage === 'es' ? 'es' : 'en';
  }, []);

  function changeLanguage(nextLanguage: Language) {
    setLanguage(nextLanguage);
    window.localStorage.setItem('phonefarm-lang', nextLanguage);
    document.documentElement.lang =
      nextLanguage === 'pt' ? 'pt-BR' : nextLanguage === 'es' ? 'es' : 'en';
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(copy.notice);
  }

  return (
    <main className="auth-page min-h-screen px-4 py-6 text-slate-900 sm:px-8">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <Link href="/" aria-label="PhoneFarm home" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 text-sm font-bold text-white shadow-md shadow-blue-900/15">
            PF
          </span>
          <span className="text-lg font-bold tracking-tight">PhoneFarm</span>
        </Link>

        <label className="sr-only" htmlFor="auth-language">{translations[language].language}</label>
        <select
          id="auth-language"
          value={language}
          onChange={(event) => changeLanguage(event.target.value as Language)}
          className="rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-sm font-medium text-slate-700 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
        >
          <option value="pt">Português</option>
          <option value="es">Español</option>
          <option value="en">English</option>
        </select>
      </header>

      <div className="flex min-h-[calc(100vh-88px)] items-center justify-center py-10">
        <section className="w-full max-w-[440px] rounded-2xl border border-white/80 bg-white px-7 py-8 shadow-[0_20px_65px_rgba(27,48,84,0.12)] sm:px-9 sm:py-9">
          <div className="mb-7 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{copy.title}</h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">{copy.subtitle}</p>
          </div>

          <button
            type="button"
            onClick={() => setMessage(copy.googleNotice)}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-blue-100"
          >
            <span aria-hidden="true" className="text-base font-black text-blue-600">G</span>
            {copy.google}
          </button>

          {isSignup && (
            <p className="mt-4 text-center text-xs leading-5 text-slate-500">
              {translations[language].signup.googleTerms}{' '}
              <Link href="/terms" className="font-medium text-blue-600 hover:underline">{translations[language].signup.terms}</Link>{' '}
              {translations[language].signup.and}{' '}
              <Link href="/privacy" className="font-medium text-blue-600 hover:underline">{translations[language].signup.privacy}</Link>.
            </p>
          )}

          <div className="my-6 flex items-center gap-3 text-xs font-medium uppercase tracking-wide text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            {copy.divider}
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignup && (
              <div>
                <label htmlFor="full-name" className="mb-1.5 block text-sm font-medium text-slate-700">
                  {translations[language].signup.name}
                </label>
                <input
                  id="full-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="auth-input"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">{copy.email}</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="auth-input"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-slate-700">{copy.password}</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isSignup ? 'new-password' : 'current-password'}
                  minLength={isSignup ? 10 : undefined}
                  pattern={isSignup ? '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{10,}' : undefined}
                  required
                  className="auth-input pr-16"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute inset-y-0 right-3 text-xs font-medium text-slate-500 hover:text-slate-800"
                  aria-label={showPassword ? translations[language].hidePassword : translations[language].showPassword}
                >
                  {showPassword ? translations[language].hidePassword : translations[language].showPassword}
                </button>
              </div>
              {isSignup && <p className="mt-2 text-xs leading-5 text-slate-500">{translations[language].signup.passwordHint}</p>}
            </div>

            {!isSignup && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setMessage(translations[language].login.forgotNotice)}
                  className="text-xs font-medium text-slate-500 hover:text-blue-600"
                >
                  {translations[language].login.forgot}
                </button>
              </div>
            )}

            {isSignup && (
              <label className="flex cursor-pointer items-start gap-2.5 pt-1 text-xs leading-5 text-slate-600">
                <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-blue-600" />
                <span>
                  {translations[language].signup.agreementPrefix}{' '}
                  <Link href="/terms" className="font-medium text-blue-600 hover:underline">{translations[language].signup.terms}</Link>{' '}
                  {translations[language].signup.and}{' '}
                  <Link href="/privacy" className="font-medium text-blue-600 hover:underline">{translations[language].signup.privacy}</Link>.
                </span>
              </label>
            )}

            <button type="submit" className="auth-submit">
              {copy.submit}
            </button>
          </form>

          {message && (
            <p role="status" className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-sm text-amber-800">
              {message}
            </p>
          )}

          <p className="mt-6 text-center text-sm text-slate-500">
            {copy.switchText}{' '}
            <Link href={isSignup ? '/login' : '/signup'} className="font-semibold text-blue-600 hover:text-blue-700 hover:underline">
              {copy.switchLink}
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
