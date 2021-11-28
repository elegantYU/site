import React, { useState, useEffect } from 'react';

const Typewriter = ({ list, delay = 10000, during = 200 }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [showVerse, setShowVerse] = useState('');

	const typeWords = (i = 0) => {
		const currentVerse = list[currentIndex];
		const letter = currentVerse[i];
		const sentenece = `${showVerse}${letter}`;
		const nextIdx = i + 1;

		setShowVerse(sentenece);

		if (nextIdx === currentVerse.length - 1) return;

		setTimeout(() => {
			typeWords(nextIdx);
		}, during);
	};

	const switchSentence = () => {
		const currentVerse = list[currentIndex];
		const currentTime = (currentVerse.length - 1) * during + delay;
		const nextIdx = currentIndex + 1;

		setTimeout(() => {
			setCurrentIndex(nextIdx);
		}, currentTime);
	};

	useEffect(() => {
		switchSentence();
	}, []);

	useEffect(() => {
		typeWords();
	}, [currentIndex]);

	return <div>{showVerse}</div>;
};

export default Typewriter;
