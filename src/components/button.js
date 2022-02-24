/*
 * @Date: 2022-02-19 22:41:38
 * @LastEditors: elegantYu
 * @LastEditTime: 2022-02-24 23:07:44
 * @Description: 波纹疾走
 */
import React, { useState, useRef } from 'react';
import Ripple, { calcOffset } from './ripple';

const Btn = (props) => {
  const { children, ...rest } = props;
  const [isStart, setStart] = useState(false);
  const [rippleData, setRippleData] = useState({});
  const btnEl = useRef(null);

  const handleMouseDown = (e) => {
    const originData = calcOffset(e);
    setRippleData(originData);
    setStart(true);
  };

  const handleMouseUp = () => setStart(false);

  return (
    <button
      {...rest}
      ref={btnEl}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseOut={handleMouseUp}
    >
      <Ripple data={rippleData} active={isStart} />
      {children}
    </button>
  );
};

export default Btn;
