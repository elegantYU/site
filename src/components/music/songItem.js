import React, { useState } from 'react';
import { StaticImage } from 'gatsby-plugin-image';

const SongItem = ({ data }) => {
  const { name, cover, album, artists } = data;

  return (
    <section className='song-item'>
      <div className='song-item-pic'>
        {/* <StaticImage src={cover} alt={album.name} /> */}
        <img src={cover} />
      </div>
      <div className='song-item-detail'>
        <h5>{name}</h5>
        <span>{artists[0].nickname}</span>
      </div>
    </section>
  );
};

export default SongItem;
