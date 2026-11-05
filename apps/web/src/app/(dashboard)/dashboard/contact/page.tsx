import Contact from '../../../components/Contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | PhoneFarm',
  description: 'Get in touch with the PhoneFarm team.',
};

export default function ContactPage() {
  return <Contact />;
}
