import Settings from '../../../components/Settings';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings | PhoneFarm',
  description: 'Manage your PhoneFarm account, security, and preferences.',
};

export default function SettingsPage() {
  return <Settings />;
}
