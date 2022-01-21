// 控制页面是否 100%
import React, { createContext, useState, useEffect } from 'react';

const changePageOverflow = () => {
  const style = 'height: 100%;';

  document.body;
};

const OverContext = createContext();

export const OverProvider = ({ children }) => {
  const [isFull, setFull] = useState(false);

  const toggleFull = (f) => setFull(f);

  useEffect(() => {}, [isFull]);

  return (
    <OverContext.Provider value={{ isFull }} toggleFull={toggleFull}>
      {children}
    </OverContext.Provider>
  );
};

export default OverContext;
