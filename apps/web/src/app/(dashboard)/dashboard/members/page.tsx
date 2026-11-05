import Members from '../../../components/Members';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Members | PhoneFarm',
  description: 'Invite teammates to operate your cloud phones.',
};

export default function MembersPage() {
  return <Members />;
}
