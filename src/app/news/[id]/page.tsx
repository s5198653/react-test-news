import { News } from '@/app/components/News/News';
import styles from './page.module.css';

interface PageProps {
  params: Promise<{ id: string }>;
}

const newsIds = ['260855433', '260855435', '260855434'];

export async function generateStaticParams() {
  return newsIds.map((id) => ({ id }));
}

export default async function NewsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return (
    <main className={styles.main}>
      <News id={Number(id)} />
    </main>
  );
}
