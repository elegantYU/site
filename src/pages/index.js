import * as React from 'react';
import Layout from '../layout';
import Seo from '../components/SEO';

// markup
const IndexPage = () => {
	console.log('首页');

	return (
		<Layout>
			<Seo />
			<div className='home'>
				<section className='home-banner' />
			</div>
		</Layout>
	);
};

export default IndexPage;
