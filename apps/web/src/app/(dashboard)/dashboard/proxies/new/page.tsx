import { NewProxy } from '../../../../components/Proxies';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add proxies | PhoneFarm',
  description: 'Bulk add HTTP, HTTPS and SOCKS5 proxies.',
};

export default function NewProxyPage() {
  return <NewProxy />;
}
