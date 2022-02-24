/*
 * @Date: 2022-02-22 16:49:56
 * @LastEditors: elegantYu
 * @LastEditTime: 2022-02-24 23:07:03
 * @Description: 这是我最后的波纹了！JOJO！
 */
import React from 'react';
import { animated, useTransition, easings } from 'react-spring';

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
  const trans = useTransition(active, {
    from: { ...data, transform: 'scale(0)', opacity: 0 },
    enter: { ...data, transform: 'scale(3)', opacity: 1 },
    leave: { ...data, transform: 'scale(3)', opacity: 0 },
    config: { duration: 400, easings: easings.easeInOutBack },
  });

  return trans((s, t) => t && <animated.div style={s} className='ripple' />);
};

export default Ripple;
