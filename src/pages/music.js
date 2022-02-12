import React, { useState, useEffect } from 'react';

import Layout from '../layout';
import Seo from '../components/SEO';
import SongItem from '../components/music/songItem';
import { getMusicListXHR, getArtistInfoXHR } from '../api/music';

const Music = () => {
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
  }, []);

  return (
    <Layout noFooter>
      <Seo />
      <div id='music'>
        <section className='music-list'>{renderItemJSX()}</section>
      </div>
    </Layout>
  );
};

export default Music;
