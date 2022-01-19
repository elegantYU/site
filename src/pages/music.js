import React, { useState, useEffect } from 'react';

import Layout from '../layout';
import Seo from '../components/SEO';
import SongItem from '../components/music/songItem';
import { getMusicListXHR, getArtistInfoXHR } from '../api/music';

const mock = [
  {
    name: '百年孤寂',
    album: '只爱陌生人',
    pic: 'http://p4.music.126.net/EMaPiyf7GOhu8bcc1Fd63w==/109951166214524967.jpg',
    author: { name: '王菲', avatar: 'http://p2.music.126.net/1KQVD6XWbs5IAV0xOj1ZIA==/18764265441342019.jpg' },
  },
  {
    name: '百年孤寂',
    album: '只爱陌生人',
    pic: 'http://p4.music.126.net/EMaPiyf7GOhu8bcc1Fd63w==/109951166214524967.jpg',
    author: { name: '王菲', avatar: 'http://p2.music.126.net/1KQVD6XWbs5IAV0xOj1ZIA==/18764265441342019.jpg' },
  },
  {
    name: '百年孤寂',
    album: '只爱陌生人',
    pic: 'http://p4.music.126.net/EMaPiyf7GOhu8bcc1Fd63w==/109951166214524967.jpg',
    author: { name: '王菲', avatar: 'http://p2.music.126.net/1KQVD6XWbs5IAV0xOj1ZIA==/18764265441342019.jpg' },
  },
  {
    name: '百年孤寂',
    album: '只爱陌生人',
    pic: 'http://p4.music.126.net/EMaPiyf7GOhu8bcc1Fd63w==/109951166214524967.jpg',
    author: { name: '王菲', avatar: 'http://p2.music.126.net/1KQVD6XWbs5IAV0xOj1ZIA==/18764265441342019.jpg' },
  },
  {
    name: '百年孤寂',
    album: '只爱陌生人',
    pic: 'http://p4.music.126.net/EMaPiyf7GOhu8bcc1Fd63w==/109951166214524967.jpg',
    author: { name: '王菲', avatar: 'http://p2.music.126.net/1KQVD6XWbs5IAV0xOj1ZIA==/18764265441342019.jpg' },
  },
  {
    name: '百年孤寂',
    album: '只爱陌生人',
    pic: 'http://p4.music.126.net/EMaPiyf7GOhu8bcc1Fd63w==/109951166214524967.jpg',
    author: { name: '王菲', avatar: 'http://p2.music.126.net/1KQVD6XWbs5IAV0xOj1ZIA==/18764265441342019.jpg' },
  },
  {
    name: '百年孤寂',
    album: '只爱陌生人',
    pic: 'http://p4.music.126.net/EMaPiyf7GOhu8bcc1Fd63w==/109951166214524967.jpg',
    author: { name: '王菲', avatar: 'http://p2.music.126.net/1KQVD6XWbs5IAV0xOj1ZIA==/18764265441342019.jpg' },
  },
  {
    name: '百年孤寂',
    album: '只爱陌生人',
    pic: 'http://p4.music.126.net/EMaPiyf7GOhu8bcc1Fd63w==/109951166214524967.jpg',
    author: { name: '王菲', avatar: 'http://p2.music.126.net/1KQVD6XWbs5IAV0xOj1ZIA==/18764265441342019.jpg' },
  },
  {
    name: '百年孤寂',
    album: '只爱陌生人',
    pic: 'http://p4.music.126.net/EMaPiyf7GOhu8bcc1Fd63w==/109951166214524967.jpg',
    author: { name: '王菲', avatar: 'http://p2.music.126.net/1KQVD6XWbs5IAV0xOj1ZIA==/18764265441342019.jpg' },
  },
  {
    name: '百年孤寂',
    album: '只爱陌生人',
    pic: 'http://p4.music.126.net/EMaPiyf7GOhu8bcc1Fd63w==/109951166214524967.jpg',
    author: { name: '王菲', avatar: 'http://p2.music.126.net/1KQVD6XWbs5IAV0xOj1ZIA==/18764265441342019.jpg' },
  },
];

const Music = () => {
  const [musicParams, setMusicParams] = useState({ page: 1, size: 20 });
  const [list, setList] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);

  const init = async () => {
    const { data } = await getMusicListXHR(musicParams);
    console.log('data', data);
  };

  const renderItemJSX = () => list.map((d, i) => <SongItem data={d} key={i} />);

  useEffect(() => {
    init();
    return () => {};
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
