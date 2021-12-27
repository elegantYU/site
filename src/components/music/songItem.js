import React, { useState } from 'react';

const SongItem = ({ data }) => {
  const { name, pic, album, author } = data;

  return (
    <section className='song-item'>
      <div className='song-item-pic'>
        <img src={pic} />
      </div>
      <div className='song-item-detail'>
        <h5>{name}</h5>
        <span>{author.name}</span>
      </div>
    </section>
  );
};

export default SongItem;
