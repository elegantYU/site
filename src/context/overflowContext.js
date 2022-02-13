// 控制页面是否 100%
import React, { createContext, useState, useEffect } from 'react';
import { insertCss } from '../utils';

const OVERFLOW_STYLE = 'OVERFLOW_STYLE';

const setPageOverflow = () => {
  const style = `
    body {height: 100%;overflow: hidden;}
    #___gatsby {height: 100%;overflow: hidden;}
  `;

  insertCss(style, OVERFLOW_STYLE);
};

const removePageOverflow = () => {
  const dom = document.getElementById(OVERFLOW_STYLE);
  dom && document.head.removeChild(dom);
};

const OverContext = createContext();

export const OverProvider = ({ children }) => {
  const [isFull, setFull] = useState(false);

  const toggleFull = (f) => setFull(f);

  useEffect(() => {
    if (!isFull) {
      removePageOverflow();
    } else {
      setPageOverflow();
    }
  }, [isFull]);

  return <OverContext.Provider value={{ isFull, toggleFull }}>{children}</OverContext.Provider>;
};

export default OverContext;
