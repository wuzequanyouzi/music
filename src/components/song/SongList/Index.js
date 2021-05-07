import { useState, useEffect, useRef, forwardRef } from 'react';
import { Table } from 'antd';
import ContextMenu from '../ContextMenu/Index.js';

import styles from './SongList.module.scss';

const translator = (lists) => {
  const resultList = lists.map((listItem, index) => {
    const countIndex = index + 1;
    return {
      key: index,
      index: (new Array(2).fill(0).join('') + countIndex).slice(-2),
      like: false,
      download: 'D',
      songTitle: listItem.name,
      singer: listItem.ar.map(item => item.name).join('/'),
      album: listItem.al.name,
      time: listItem.dt,
      songInfo: listItem
    }
  });
  return resultList;
}

const columns = [
  {
    title: '',
    dataIndex: 'index'
  },
  {
    title: '',
    dataIndex: 'like'
  },
  {
    title: '',
    dataIndex: 'download'
  },
  {
    title: '音乐标题',
    dataIndex: 'songTitle'
  },
  {
    title: '歌手',
    dataIndex: 'singer'
  },
  {
    title: '专辑',
    dataIndex: 'album'
  },
  {
    title: '时长',
    dataIndex: 'time'
  },
];

const NewContextMenu = forwardRef((props, ref) => <ContextMenu grandref={ref}  {...props} />)

const SongList = (props) => {
  const [data, setData] = useState(props.songList);
  const [isShowContextMenu, setIsShowContextMenu] = useState(false);
  const [contextMenuTop, setContextMenuTop] = useState(0);
  const [contextMenuLeft, setContextMenuLeft] = useState(0);
  const [songInfo, setSongInfo] = useState({});
  const contextMenuRef = useRef(null);
  useEffect(() => {
    setData(translator(props.songList));
  }, [props.songList]);

  useEffect(() => {
    const checkoutSide = (e) => {
      const inSide = document.getElementsByClassName('ant-table-tbody')[0].contains(e.target) || contextMenuRef.current.contains(e.target);
      !inSide && setIsShowContextMenu(inSide);

      // 点击到菜单
      if (contextMenuRef.current.contains(e.target)) {
        setTimeout(() => {
          setIsShowContextMenu(false);
        }, 100);
      }
    };
    document.addEventListener('mousedown', checkoutSide);
    return () => {
      document.removeEventListener('mousedown', checkoutSide);
    }
  }, []);

  // 右键事件回调
  const handleClickContextMenu = (e, row) => {
    setContextMenuTop(e.clientY);
    setContextMenuLeft(e.clientX + 10);
    setSongInfo(row);
    setIsShowContextMenu(true);
  };
  return (
    <div
      className={styles.song_list_box}
    >
      <Table size="small" columns={columns} dataSource={data} pagination={false} onRow={record => {
        return {
          onContextMenu: (e) => handleClickContextMenu(e, record)
        }
      }} />

      <NewContextMenu
        ref={contextMenuRef}
        isShow={isShowContextMenu}
        top={contextMenuTop}
        left={contextMenuLeft}
        songInfo={songInfo} />
    </div>
  )
};

export default SongList;