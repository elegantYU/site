/*
 * @Date: 2022-01-21 11:11:06
 * @LastEditors: elegantYu
 * @LastEditTime: 2022-03-01 14:19:25
 * @Description: 懒加载的图片啊
 */
import React from 'react';
import useLazy from '../hooks/useLazy';
import { randomColor } from '../utils';

const LazyImage = ({ src, alt, className }) => {
  const { loaded, onload, imgEl } = useLazy();

  const cName = `l-real ${loaded ? 'active' : ''} ${className ?? ''}`;
  const style = {
    background: randomColor(),
  };

  return (
    <div className='lazy-box' style={style}>
      <img className='l-fake' src='' onError={onload} alt='' />
      <img className={cName} ref={imgEl} data-src={src} alt={alt} />
    </div>
  );
};

export default LazyImage;
