import React, { useState } from 'react';

import LazyImage from '../lazyImage';

const SongItem = ({ data }) => {
  const { name, cover, album, artists } = data;

  return (
    <section className='song-item'>
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
