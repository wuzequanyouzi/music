import styles from './HomeLayout.module.scss'
import Header from '@/view/home/Header/Index.js';
import Container from '@/view/home/Container/Index.js';
const HomeLayout = (props) => {
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <Header {...props} />
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