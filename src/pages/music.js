import React from 'react';

import Layout from '../layout';
import Seo from '../components/SEO';
import Title from '../components/photos/title';

const Music = () => (
	<Layout>
		<Seo />
		<div id='music'>
			<Title />
			<section className='music-list' />
		</div>
	</Layout>
);

export default Music;
