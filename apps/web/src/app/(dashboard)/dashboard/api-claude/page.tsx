import ApiClaude from '../../../components/ApiClaude';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'API & Claude | PhoneFarm',
  description: 'Learn about controlling your cloud phones with the API and Claude connector.',
};

export default function ApiClaudePage() {
  return <ApiClaude />;
}
