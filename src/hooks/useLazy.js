/*
 * @Date: 2021-07-02 14:24:21
 * @LastEditors: elegantYu
 * @LastEditTime: 2022-03-03 20:00:00
 * @Description: IntersectionObserver 做图片懒加载 hook
 */
import { useState, useEffect, useRef } from 'react';
import { loadImage } from '../utils';

const useLazy = ({ src }) => {
  const imgEl = useRef(null);
  const [currSrc] = useState(src);
  const [start, setStart] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const instance = new IntersectionObserver(
    async (entries) => {
      const [item] = entries;
      if (item.intersectionRatio <= 0) return;

      const { target } = item;
      const src = target?.dataset?.src || currSrc;

      console.log('???????', target, currSrc);
      loadImage(src)
        .then(() => {
          target.src = src;
        })
        .finally(() => {
          instance.unobserve(target);
          setLoaded(true);
        });
    },
    { threshold: [0.01], rootMargin: '40px 0px 0px 0px' },
  );

  const onload = () => setStart(true);

  useEffect(() => {
    if (imgEl.current && start) {
      instance.observe(imgEl.current);
    }
  }, [imgEl.current, start, currSrc]);

  return {
    imgEl,
    onload,
    loaded,
  };
};

export default useLazy;
