import styles from './Tag.module.scss';

const Tag = (props) => {
  const {
    label = null,
    children = null,
    onClick = () => { }
  } = props;
  return (
    <div className={styles.tag} onClick={onClick}>
      {
        label && <span>{label}</span>
      }
      {children}
    </div>
  )
};

export default Tag;