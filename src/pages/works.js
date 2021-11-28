import React from 'react';

import Layout from '../layout';
import Seo from '../components/SEO';
import Title from '../components/photos/title';

const Works = () => (
	<Layout>
		<Seo />
		<div id='works'>
			<Title />
			<section className='works-list' />
		</div>
	</Layout>
);

export default Works;
