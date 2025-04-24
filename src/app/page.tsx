import { redirect } from 'next/navigation';

export default function HomePage() {
  redirect('/news');
  return null;
}
