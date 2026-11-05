import NewPhone from '../../../../components/NewPhone';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Novo telefone | PhoneFarm',
  description: 'Configure seu telefone Android na nuvem.',
};

export default function NewPhonePage() {
  return <NewPhone />;
}
