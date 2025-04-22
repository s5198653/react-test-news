import { NewsCardsList } from './components/NewsCardsList/NewsCardsList';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <NewsCardsList />
      </main>
    </div>
  );
}
