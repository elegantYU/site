/*
 * @Date: 2022-03-01 16:39:55
 * @LastEditors: elegantYu
 * @LastEditTime: 2022-03-01 20:07:46
 * @Description: u know that
 */
import React from 'react';

import LazyImage from '../lazyImage';

const MusicBox = ({ banner }) => {
  const image = banner || 'https://p2.music.126.net/cRhojMzb0lz1VoxdACNGvg==/109951166608206977.jpg';

  return (
    <div className='music-box'>
      <div className='music-box-banner'>
        <LazyImage src={image} />
      </div>
      <div className='music-box-detail'>
        <p className='music-box-detail-title'>哈哈啊哈哈哈哈哈哈</p>
        <p className='music-box-detail-desc'>39 首音乐 - 45 小时</p>
      </div>
    </div>
  );
};

export default MusicBox;
