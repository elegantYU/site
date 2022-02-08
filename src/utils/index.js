// 图片加载
export const loadImage = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = resolve;
    img.onerror = reject;
    if (img.complete) resolve();
  });

// 滚啊
export const moveToView = (el) => {
  if (!el?.scrollIntoView) return;

  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
};

// 生活需要色彩
export const randomColor = () => {
  const colorList = [
    '#CCFFFF',
    '#CCFF66',
    '#FFCCCC',
    '#CC3333',
    '#CCCCFF',
    '#FF99CC',
    '#99CCFF',
    '#66CCFF',
    '#FF6600',
    '#339999',
    '#CCCC99',
    '#336699',
    '#FFFF66',
    '#0099CC',
    '#CCCCCC',
    '#003300',
    '#FF9966',
  ];

  return colorList[Math.floor(Math.random() * colorList.length)];
};

// 插入样式
export const insertCss = (text, id) => {
  const style = document.createElement('style');
  style.id = id;
  style.innerText = text;
  document.head.append(style);
};
