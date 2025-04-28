import { HighlightedTextarea } from '@/app/components/HighlightedTextarea/HighlightedTextarea';
import styles from './page.module.css';

export default function NewsPage() {
  return (
    <main className={styles.main}>
      <HighlightedTextarea />
    </main>
  );
}
