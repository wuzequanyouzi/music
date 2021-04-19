import styles from './HomeLayout.module.css'
import Container from '@/view/home/Container/index.js';
const HomeLayout = () => {
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        header
      </header>
      <div className={styles.container}>
        <Container />
      </div>
      <footer className={styles.footer}>
        footer
      </footer>
    </div>
  );
}

export default HomeLayout;