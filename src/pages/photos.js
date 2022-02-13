import React from 'react';

import Seo from '../components/SEO';
import Title from '../components/photos/title';

const Photos = () => (
  <>
    <Seo />
    <div id='photos'>
      <Title />
      <section className='photos-list' />
    </div>
  </>
);

export default Photos;
