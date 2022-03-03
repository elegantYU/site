import React, { useState, useEffect, useContext } from 'react';
import OverContext from '../context/overflowContext';
import AudioContext from '../context/audioContext';

import Seo from '../components/SEO';
import MusicBox from '../components/music/musicBox';
import SongItem from '../components/music/songItem';
import { getArtistInfoXHR } from '../api/music';

const Music = () => {
  const { toggleFull } = useContext(OverContext);
  const { list, shuffleList } = useContext(AudioContext);

  const renderItemJSX = () => list.map((d, i) => <SongItem data={d} key={i} />);

  useEffect(() => {
    toggleFull(true);
    return () => toggleFull(false);
  }, []);

  return (
    <>
      <Seo />
      <div id='music'>
        <MusicBox />
        <section className='list-wrap'>
          <section className='music-list'>{renderItemJSX()}</section>
        </section>
        <button onClick={shuffleList}>随机</button>
      </div>
    </>
  );
};

export default Music;
