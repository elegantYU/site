import React from 'react';

import Layout from '../layout';
import Seo from '../components/SEO';
import Title from '../components/sentence/title';
import Sentence from '../components/sentence/sentence';

const Daily = () => (
	<Layout>
		<Seo />
		<div id='sentence'>
			<Title />
			<section className='sentence-list'>
				<Sentence />
				<Sentence />
				<Sentence />
			</section>
		</div>
	</Layout>
);

export default Daily;
