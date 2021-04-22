// import { renderRoutes } from 'react-router-config';
import Menu from './Menu/Index.js';
import styles from './container.module.css';
const Container = (props) => {
  const { children } = props;
  console.log(props)
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Menu />
      </div>
      <div className={styles.right}>
        {children}
      </div>
    </div>
  )
}

export default Container;