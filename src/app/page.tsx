import { Menu } from '@/app/components/Menu/Menu';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.main}>
      <Menu />
    </main>
  );
}
