import React from 'react';

const verseList = ['总有一些无病呻吟', '胜过白昼下的烂漫，或黑夜里的灿烂'];

const Title = () => {
	const index = Math.floor(Math.random() * verseList.length);
	const verse = verseList[index];

	return (
		<section className='sentence-title'>
			<h1>{verse}</h1>
		</section>
	);
};

export default Title;
