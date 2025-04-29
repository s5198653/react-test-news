import { HighlightedTextarea } from '@/app/components/HighlightedTextarea/HighlightedTextarea';
import styles from './page.module.css';

export default function NewsPage() {
  return (
    <main className={styles.main}>
      <HighlightedTextarea width={500} />
      <HighlightedTextarea resize="none" showCount />
      <HighlightedTextarea resize="both" showCount maxLength={15} />
    </main>
  );
}
