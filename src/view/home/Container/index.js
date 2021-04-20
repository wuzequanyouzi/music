import { renderRoutes } from 'react-router-config';
import Menu from './Menu/Index.js';
import styles from './container.module.css';
const Container = (props) => {
  const { route } = props;
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Menu />
      </div>
      <div className={styles.right}>
        {renderRoutes(route.routes)}
      </div>
    </div>
  )
}

export default Container;