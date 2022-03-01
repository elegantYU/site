import React, { useState, useRef } from 'react';

import LazyImage from '../lazyImage';
import Ripple, { calcOffset } from '../ripple';

const SongItem = ({ data }) => {
  const { name, cover, album, artists } = data;
  const [isStart, setStart] = useState(false);
  const [rippleData, setRippleData] = useState({});
  const sectionEl = useRef(null);

  const handleMouseDown = (e) => {
    const originData = calcOffset(e);
    setRippleData(originData);
    setStart(true);
  };

  const handleMouseUp = () => setStart(false);

  return (
    <section
      className='song-item'
      ref={sectionEl}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseOut={handleMouseUp}
      onBlur={handleMouseUp}
    >
      <Ripple data={rippleData} active={isStart} />
      <div className='song-item-pic'>
        <LazyImage src={cover} />
      </div>
      <div className='song-item-detail'>
        <h5>{name}</h5>
        <span>{artists[0].nickname}</span>
      </div>
    </section>
  );
};

export default SongItem;
