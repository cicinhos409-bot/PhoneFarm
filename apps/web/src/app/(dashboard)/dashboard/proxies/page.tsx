import { ProxiesList } from '../../../components/Proxies';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Proxies | PhoneFarm',
  description: 'Manage proxies for your cloud phones.',
};

export default function ProxiesPage() {
  return <ProxiesList />;
}
