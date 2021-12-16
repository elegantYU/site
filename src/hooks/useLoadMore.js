// 滚动加载
import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

const useLoadMore = ({ offset = 230 }) => {
  const [canLoad, setCanLoad] = useState(false);

  const scrollHandle = debounce((e) => {
    const { height } = document.body.getBoundingClientRect();
    const { scrollY } = window;
    const innerHeight = window.innerHeight;
    const tempFlag = height - offset < scrollY + innerHeight;

    setCanLoad(tempFlag);
  }, 300);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandle);

    return () => window.removeEventListener('scroll', scrollHandle);
  }, []);

  return {
    canLoad,
  };
};

export default useLoadMore;
