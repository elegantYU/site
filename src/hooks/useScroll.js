import { useState, useEffect } from 'react';

const useScroll = () => {
	const [top, setScrollTop] = useState(0);
	const [isDown, setDirection] = useState(false);
	let prevTop = 0;

	const scrollListener = () => {
		const { scrollTop } = document.documentElement;
		const offset = scrollTop - prevTop;
		prevTop = scrollTop;

		setScrollTop(scrollTop);
		setDirection(offset > 0);
	};

	useEffect(() => {
		document.addEventListener('scroll', scrollListener, false);

		return () => {
			document.removeEventListener('scroll', scrollListener);
		};
	}, []);

	useEffect(() => {}, [top]);

	return {
		top,
		isDown,
	};
};

export default useScroll;
