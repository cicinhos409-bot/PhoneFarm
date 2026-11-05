import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PhoneFarm',
  description: 'Gerencie até 30 dispositivos Android reais na nuvem ou local.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}