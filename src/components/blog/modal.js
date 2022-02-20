/*
 * @Date: 2022-02-18 17:34:53
 * @LastEditors: elegantYu
 * @LastEditTime: 2022-02-20 22:26:42
 * @Description: 模态框
 */
import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import Btn from '../button';

const arrowMap = {
  ArrowUp: 's',
  ArrowDown: 'x',
  ArrowLeft: 'z',
  ArrowRight: 'y',
};
const key = 'ssxxzyzy';

const Modal = (props) => {
  const { pwd, visible, onCancel, onDone } = props;
  const [active, setActive] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [err, setErr] = useState(false);
  const [errCount, setErrCount] = useState(0);
  const [keyAction, setKeyAction] = useState('');
  const inputEl = useRef(null);
  const modalClass = visible ? 'in' : 'out';
  const inputClass = `${keywords ? 'active' : ''} ${err ? 'error' : ''}`;
  const closeClass = keywords ? 'show' : '';

  const handleKeyup = (e) => {
    const { value } = inputEl.current;
    const temp = keyAction + arrowMap[e.code];
    setKeywords(value);

    if (arrowMap[e.code] && key.includes(temp)) {
      setKeyAction(temp);
    } else {
      setKeyAction('');
    }

    if (e.code === 'Enter' || temp === key) {
      handleDone();
    }
  };

  const handleDone = () => {
    if (err) return;
    if (keywords == pwd || key.includes(keyAction)) {
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
    setKeywords('');
    setKeyAction('');
    if (inputEl?.current?.value) {
      inputEl.current.value = '';
    }
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
    recordErr();
  }, [errCount]);

  useEffect(() => {
    if (!visible) {
      setTimeout(() => setActive(false), 300);
    } else {
      setActive(true);
    }
  }, [visible]);

  useEffect(() => {
    if (active) {
      inputEl?.current?.focus();
    }
    return () => {
      handleClear();
    };
  }, [active]);

  return (
    <>
      {active ? (
        <div className='modal'>
          <div className={`modal-mask ${modalClass}`}></div>
          <div className={`modal-box ${modalClass}`}>
            <div className='modal-header'>上了锁</div>
            <div className='modal-body'>
              <div className={`modal-body-input ${inputClass}`}>
                <input ref={inputEl} placeholder='输入密码' onKeyUp={handleKeyup} />
                <span
                  className={`modal-body-input-close iconfont icon-close ${closeClass}`}
                  onClick={handleClear}
                ></span>
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
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
