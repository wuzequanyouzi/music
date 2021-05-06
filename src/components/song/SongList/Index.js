import { useState, useEffect, useRef } from 'react';
import { Table } from 'antd';

import styles from './SongList.module.scss';

const SongList = () => {
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
  const [data, setData] = useState([
    {
      index: '01',
      songTitle: 'John Brown',
      singer: '王哲钊',
      album: 'AC',
      time: 300,
    },
  ])
  return (
    <div className={styles.song_list_box}>
      <Table columns={columns} dataSource={data} pagination={{ position: ['none', 'none'] }} />
    </div>
  )
};

export default SongList;