import Applications from '../../../components/Applications';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Applications | PhoneFarm',
  description: 'Choose app versions for your PhoneFarm catalog.',
};

export default function ApplicationsPage() {
  return <Applications />;
}
