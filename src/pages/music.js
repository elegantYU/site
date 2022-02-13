import React, { useState, useEffect, useContext } from 'react';
import OverContext from '../context/overflowContext';

import Seo from '../components/SEO';
import SongItem from '../components/music/songItem';
import { getMusicListXHR, getArtistInfoXHR } from '../api/music';

const Music = () => {
  const { toggleFull } = useContext(OverContext);
  const [musicParams, setMusicParams] = useState({ page: 1, size: 20 });
  const [list, setList] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  const init = async () => {
    const {
      data: { data },
    } = await getMusicListXHR(musicParams);
    setList(data);
    console.log('data', data);
  };

  const renderItemJSX = () => list.map((d, i) => <SongItem data={d} key={i} />);

  useEffect(() => {
    init();
    toggleFull(true);
    return () => toggleFull(false);
  }, []);

  return (
    <>
      <Seo />
      <div id='music'>
        <section className='music-list'>{renderItemJSX()}</section>
      </div>
    </>
  );
};

export default Music;
