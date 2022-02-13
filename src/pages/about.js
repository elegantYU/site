import React from 'react';

import Seo from '../components/SEO';
import Title from '../components/photos/title';

const About = () => (
  <>
    <Seo />
    <div id='about'>
      <Title />
      <section className='about-list' />
    </div>
  </>
);

export default About;
