/*
 * @Date: 2022-02-18 17:34:53
 * @LastEditors: elegantYu
 * @LastEditTime: 2022-02-18 17:47:29
 * @Description: 模态框
 */
import React, { useState } from 'react';

const Modal = ({ children }) => {
  const [active, setActive] = useState(false);

  return (
    <div className='modal'>
      <div className='modal-mask'></div>
      {children}
    </div>
  );
};

export default Modal;
