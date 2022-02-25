/*
 * @Date: 2022-02-25 17:06:47
 * @LastEditors: elegantYu
 * @LastEditTime: 2022-02-25 17:26:32
 * @Description: 记录该记录的滚动距离
 */
import React, { useEffect } from 'react';

import config from '../../config';

// 默认几个页面需要清除
const clearList = config.routes.map((v) => v.path);

const useRestoreScroll = () => {
  useEffect(() => {}, []);
};

export default useRestoreScroll;
