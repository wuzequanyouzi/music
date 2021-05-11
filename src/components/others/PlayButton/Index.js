import styles from './PlayButton.module.scss';

const PlayButton = (props) => {
  const {
    iconfontsize = '30px'
  } = props;
  return (
    <div className={styles.play_btn} {...props} style={{ width: iconfontsize, height: iconfontsize }}>
      <i className={'iconfont icon-musicplay1'} style={{ fontSize: iconfontsize, color: '#EEE' }}></i>
    </div>
  )
};

export default PlayButton;