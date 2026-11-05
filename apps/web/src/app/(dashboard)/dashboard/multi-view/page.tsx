import MultiView from '../../../components/MultiView';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Multi-view | PhoneFarm',
  description: 'View cloud phone profiles side by side.',
};

export default function MultiViewPage() {
  return <MultiView />;
}
