import React, { useState } from 'react';

import Layout from '../layout';
import Seo from '../components/SEO';
import SongItem from '../components/music/songItem';

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
  const [list, setList] = useState(mock.map((v) => ({ ...v, active: false })));
  const [currentSong, setCurrentSong] = useState(null);

  const renderItemJSX = () => list.map((d, i) => <SongItem data={d} key={i} />);

  return (
    <Layout noHead noFooter>
      <Seo />
      <div id='music'>
        <section className='music-list'>{renderItemJSX()}</section>
      </div>
    </Layout>
  );
};

export default Music;
