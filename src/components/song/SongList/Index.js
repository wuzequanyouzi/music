import { useState, useEffect, useRef } from 'react';
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
      time: listItem.dt
    }
  });
  console.log(resultList);
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

const SongList = (props) => {
  const [data, setData] = useState(props.songList);
  const [isShowContextMenu, setIsShowContextMenu] = useState(false);
  const [contextMenuTop, setContextMenuTop] = useState(0);
  const [contextMenuLeft, setContextMenuLeft] = useState(0);
  useEffect(() => {
    console.log(props.songList)
    setData(translator(props.songList));
  }, [props.songList]);

  // 右键事件回调
  const handleClickContextMenu = (e) => {
    setContextMenuTop(e.clientY);
    setContextMenuLeft(e.clientX);
    setIsShowContextMenu(isShowContextMenu => !isShowContextMenu);
    console.log(e);
  };
  return (
    <div className={styles.song_list_box}>
      <Table size="small" columns={columns} dataSource={data} pagination={false} onRow={record => {
        return {
          onContextMenu: (e) => handleClickContextMenu(e)
        }
      }} />
      <ContextMenu isShow={isShowContextMenu} top={contextMenuTop} left={contextMenuLeft} />
    </div>
  )
};

export default SongList;