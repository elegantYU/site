/*
 * @Date: 2021-07-02 14:24:21
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-09-30 15:20:12
 * @Description: IntersectionObserver 做图片懒加载 hook
 */
import { useState } from 'react';
import { loadImage } from '../utils';

const useLazy = ({ refs }) => {
	const [loaded, setLoaded] = useState(false);

	const instance = new IntersectionObserver(
		async (entries) => {
			const [item] = entries;
			if (item.intersectionRatio <= 0) return;

			const { target } = item;
			const { src } = target.dataset;

			loadImage(src)
				.then(() => {
					target.src = src;
					instance.unobserve(target);
					setLoaded(true);
				})
				.catch(() => {
					instance.unobserve(target);
					setLoaded(true);
				});
		},
		{ threshold: [0.01] },
	);

	const onload = () => instance.observe(refs.current);

	return {
		onload,
		loaded,
	};
};

export default useLazy;
