import * as React from 'react';
import Seo from '../components/SEO';

// markup
const IndexPage = () => {
  console.log('首页');

  return (
    <>
      <Seo />
      <div className='home'>
        <section className='home-banner' />
      </div>
    </>
  );
};

export default IndexPage;
