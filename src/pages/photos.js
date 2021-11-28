import React from 'react';

import Layout from '../layout';
import Seo from '../components/SEO';
import Title from '../components/photos/title';

const Photos = () => (
	<Layout>
		<Seo />
		<div id='photos'>
			<Title />
			<section className='photos-list' />
		</div>
	</Layout>
);

export default Photos;
