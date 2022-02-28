/*
 * @Date: 2022-02-18 17:34:53
 * @LastEditors: elegantYu
 * @LastEditTime: 2022-02-28 20:02:23
 * @Description: 模态框
 */
import React, { useState, useRef, useEffect } from 'react';
import { animated, useTransition, config } from 'react-spring';
import toast from 'react-hot-toast';
import { STORAGE_TOKEN } from '../../utils/constant';
import Btn from '../button';

const arrowMap = {
  ArrowUp: { text: '↑', cls: 'up' },
  ArrowDown: { text: '↓', cls: 'down' },
  ArrowLeft: { text: '←', cls: 'left' },
  ArrowRight: { text: '→', cls: 'right' },
};
const passKey = '↑↑↓↓←→←→';

const Modal = (props) => {
  const { pwd, visible, onCancel, onDone } = props;
  const [isFocus, setFocus] = useState(false);
  const [err, setErr] = useState(false);
  const [errCount, setErrCount] = useState(0);
  const [keyAction, setKeyAction] = useState('');
  const [modalCls, setModalCls] = useState('');
  const inputEl = useRef(null);
  const inputClass = `${isFocus ? 'active' : ''} ${err ? 'error' : ''}`;

  const rootTrans = useTransition(visible, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 300, ...config.stiff },
    exitBeforeEnter: true,
  });
  const modalTrans = useTransition(visible, {
    from: { opacity: 0, translateY: -20 },
    enter: { opacity: 1, translateY: 0 },
    leave: { opacity: 0, translateY: 20 },
    config: { duration: 300, ...config.stiff },
    exitBeforeEnter: true,
  });

  const handleFocus = () => setFocus(true);
  const handleBlur = () => setFocus(false);

  const handleKeydown = (e) => {
    const code = arrowMap[e.code]?.text || e.code;
    const temp = keyAction + code;

    if (arrowMap[e.code]) {
      shakeOnce(arrowMap[e.code].cls);
    }

    if (temp.includes(passKey)) {
      toast('触发「远古密令」，获得永久令牌');
      localStorage.setItem(STORAGE_TOKEN, '奥利给!');
      onDone?.();
      onCancel?.();
      return;
    }

    if (code === 'Enter') {
      handleDone();
    }

    setKeyAction(temp);
  };

  const handleDone = () => {
    if (err) return;
    if (inputEl.current.value === pwd) {
      onDone?.();
      onCancel?.();
      return;
    }

    setErr(true);
    setErrCount(errCount + 1);
    setTimeout(() => setErr(false), 400);
  };

  const handleClear = () => {
    setErrCount(0);
    setKeyAction('');
    if (inputEl?.current?.value) {
      inputEl.current.value = '';
    }
  };

  const handleEscListener = (e) => {
    if (e.code === 'Escape') {
      onCancel?.();
    }
  };

  const shakeOnce = (cls) => {
    setModalCls(cls);
    setTimeout(() => setModalCls(''), 200);
  };

  const recordErr = () => {
    const errMap = new Map([
      [5, { text: '别猜啦', icon: '😅' }],
      [10, { text: '木大木大木大木大木大...', icon: '👊👊' }],
      [15, { text: '就非要看?', icon: '🤨' }],
      [20, { text: '牛哇牛哇,继续不要停', icon: '🥺' }],
      [50, { text: '加油!点满100下有惊喜哦!', icon: '🤡' }],
      [100, { text: '不是吧阿Sir,这你也信?!', icon: '🤣' }],
      [200, { text: '↑↑↓↓←→←→', icon: '🥵' }],
    ]);

    const info = errMap.get(errCount);
    info && toast(info.text, { icon: info.icon });
  };

  useEffect(() => {
    document.body.addEventListener('keydown', handleEscListener);
    return () => {
      document.body.removeEventListener('keydown', handleEscListener);
      handleClear();
    };
  }, []);

  useEffect(() => {
    recordErr();
  }, [errCount]);

  return rootTrans(
    (style, state) =>
      state && (
        <animated.div className='modal' style={style}>
          <animated.div className='modal-mask' style={style} onClick={onCancel} />
          {modalTrans(
            (styles, state) =>
              state && (
                <animated.div className={`modal-box ${modalCls}`} style={styles}>
                  <div className='modal-header'>上了锁</div>
                  <div className='modal-body'>
                    <div className={`modal-body-input ${inputClass}`}>
                      <input
                        ref={inputEl}
                        placeholder='输入密码'
                        onKeyDown={handleKeydown}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <Btn className='btn-cancel' onClick={onCancel}>
                      算了
                    </Btn>
                    <Btn className='btn-done' onClick={handleDone}>
                      试试
                    </Btn>
                  </div>
                </animated.div>
              ),
          )}
        </animated.div>
      ),
  );
};

export default Modal;
