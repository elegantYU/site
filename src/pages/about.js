import React from 'react';

import Layout from '../layout';
import Seo from '../components/SEO';
import Title from '../components/photos/title';

const About = () => (
	<Layout>
		<Seo />
		<div id='about'>
			<Title />
			<section className='about-list' />
		</div>
	</Layout>
);

export default About;
