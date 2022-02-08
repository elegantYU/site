// 控制页面是否 100%
import React, { createContext, useState, useEffect } from 'react';
import { insertCss } from '../utils';

const ID = 'OVERFLOW_STYLE';

const changePageOverflow = () => {
  const style = `
    body {height: 100%;overflow: hidden;}
    #___gatsby {height: 100%;overflow: hidden;}
  `;

  insertCss(style, ID);
};

const OverContext = createContext();

export const OverProvider = ({ children }) => {
  const [isFull, setFull] = useState(false);

  const toggleFull = (f) => setFull(f);

  useEffect(() => {
    changePageOverflow();
  }, [isFull]);

  return <OverContext.Provider value={{ isFull, toggleFull }}>{children}</OverContext.Provider>;
};

export default OverContext;
