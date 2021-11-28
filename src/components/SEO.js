import React from 'react';
import Helmet from 'react-helmet';
import config from '../../config/index';

const Seo = ({ title, description, image, article }) => {
	const seo = {
		title: title ? `${title}-${config.title}` : config.title,
		description: description || config.description,
		image,
		article,
	};

	return (
		<Helmet>
			<title>{seo.title}</title>
			<meta name='author' content={config.username} />
			<meta name='description' content={seo.description} />
			<meta name='keywords' content={config.keywords} />
			<meta property='og:title' content={seo.title} />
			<meta property='og:url' content={seo.title} />
			<meta property='og:description' content={seo.description} />
			<meta property='og:type' content='object' />
			<meta name='color-scheme' content='dark light' />
			<meta name='robots' content='all' />
		</Helmet>
	);
};

export default Seo;
