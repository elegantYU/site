import React, { createContext, useState, useEffect, useCallback } from 'react';
import shuffle from 'lodash.shuffle';
import { getMusicListXHR } from '../api/music';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const [current, setCurrent] = useState(null);

  const init = async () => {
    const {
      data: { data },
    } = await getMusicListXHR({ page: 1, size: 200 });
    setList(data);
  };

  const shuffleList = useCallback(() => {
    const filterList = current?.id ? list.filter((v) => v.id !== current.id) : list;
    const resList = current?.id ? shuffle(filterList).unshift(current) : shuffle(filterList);

    setList(resList);
  }, [current, list]);

  useEffect(() => {
    init();
  }, []);

  return <AudioContext.Provider value={{ list, shuffleList, setCurrent }}>{children}</AudioContext.Provider>;
};

export default AudioContext;
