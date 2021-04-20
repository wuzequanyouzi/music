import styles from './HomeLayout.module.css'
import Header from '@/view/home/Header/index.js';
import Container from '@/view/home/Container/index.js';
const HomeLayout = (props) => {
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <Header />
      </header>
      <div className={styles.container}>
        <Container {...props} />
      </div>
      <footer className={styles.footer}>
        footer
      </footer>
    </div>
  );
}

export default HomeLayout;