import { renderRoutes } from 'react-router-config';
import styles from './container.module.css';
const Container = (props) => {
  const { route } = props;
  return (
    <div className={styles.container}>
      <div className={styles.left}>

      </div>
      <div className={styles.right}>
        {renderRoutes(route.routes)}
      </div>
    </div>
  )
}

export default Container;