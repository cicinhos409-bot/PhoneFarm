import Automation from '../../../components/Automation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Automation | PhoneFarm',
  description: 'Authorized app QA and automation logs.',
};

export default function AutomationPage() {
  return <Automation />;
}
