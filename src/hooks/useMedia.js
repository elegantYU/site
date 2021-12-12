/*
 * @Date: 2021-12-12 19:03:03
 * @LastEditors: elegantYu
 * @LastEditTime: 2021-12-12 19:07:40
 * @Description: 瀑布流专用
 */
import { useState, useEffect } from 'react';

const useMedia = (queries = [], values = [], defaultValue) => {
  const match = () => values[queries.findIndex((q) => matchMedia(q).matches)] || defaultValue;
  const [value, set] = useState(match);

  useEffect(() => {
    const handler = () => set(match);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
};

export default useMedia;
