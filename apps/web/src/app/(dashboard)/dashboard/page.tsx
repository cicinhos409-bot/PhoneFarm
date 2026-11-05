import Dashboard from '../../components/Dashboard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | PhoneFarm',
  description: 'Gerencie seus telefones Android e sua equipe.',
};

export default function DashboardPage() {
  return <Dashboard />;
}
