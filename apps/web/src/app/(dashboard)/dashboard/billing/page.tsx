import Billing from '../../../components/Billing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Billing | PhoneFarm',
  description: 'Manage your PhoneFarm subscriptions, wallet, and usage.',
};

export default function BillingPage() {
  return <Billing />;
}
