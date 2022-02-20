/*
 * @Date: 2022-02-19 22:41:38
 * @LastEditors: elegantYu
 * @LastEditTime: 2022-02-20 16:20:57
 * @Description: 波纹疾走
 */
import React, { useState, useRef, useEffect } from 'react';

const Btn = (props) => {
  const { children, ...rest } = props;
  const [isStart, setStart] = useState(false);
  const [styleData, setStyleData] = useState({});
  const btnEl = useRef(null);
  const rippleClass = isStart ? 'active' : '';
  const style = {
    ...styleData,
  };

  const handleClick = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = btnEl.current?.getBoundingClientRect();
    const size = Math.max(width, height);
    const offset = {
      width: size,
      height: size,
      left: clientX - left - size / 2,
      top: clientY - top - size / 2,
    };

    setStyleData(offset);
    setStart(true);

    props?.onClick?.();
  };

  useEffect(() => {
    let timer;
    if (isStart) {
      timer = setTimeout(() => setStart(false), 600);
    }
    return () => {
      timer && clearTimeout(timer);
    };
  }, [isStart]);

  return (
    <button {...rest} ref={btnEl} onClick={handleClick}>
      {isStart ? <div className={`ripple ${rippleClass}`} style={style}></div> : null}
      {children}
    </button>
  );
};

export default Btn;
