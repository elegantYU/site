/*
 * @Date: 2022-02-22 16:49:56
 * @LastEditors: elegantYu
 * @LastEditTime: 2022-02-23 10:42:58
 * @Description: 这是我最后的波纹了！JOJO！
 */
import React, { useEffect, useState } from 'react';

export const calcOffset = (e) => {
  const { clientX, clientY } = e;
  const { left, top, width, height } = e.target.getBoundingClientRect();
  const size = Math.max(width, height);

  return {
    width: size,
    height: size,
    left: clientX - left - size / 2,
    top: clientY - top - size / 2,
  };
};

const Ripple = ({ data, active }) => {
  return <div style={data} className={`ripple ${active ? 'active' : ''}`} />;
};

export default Ripple;
