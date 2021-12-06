import React,{ useEffect, useState } from 'react';
import { getPageListXHR } from '../api/sentence'

import Layout from '../layout';
import Seo from '../components/SEO';
import Title from '../components/sentence/title';
import Sentence from '../components/sentence/sentence';

const Daily = () => {
	const [pageParams, setPageParams] = useState({ page: 1, size: 20 })

	const getPageList = async () => {
		getPageListXHR(pageParams)
			.then(({ data }) => {
				console.log('data', data)
				// if (!data.success) {
				// 	return new Error('错了错了')
				// }

				// if (data.list)
			})
	}

	useEffect(() => {
		getPageList()
	}, [])

	return (
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
}

export default Daily;
