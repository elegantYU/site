import React, { useState } from 'react';

const Title = ({ data=[] }) => {
	const [index] = useState(() => Math.floor(Math.random() * data.length));
	const verse = data[index];

	return (
		<section className='sentence-title'>
			<h1>{verse}</h1>
		</section>
	);
};

export default Title;
