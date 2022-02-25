const { routes } = require('./config');

exports.onPreRouteUpdate = ({ location, prevLocation }) => {
  const clearList = routes.map((v) => v.path);

  if (!clearList.includes(location?.pathname)) {
    console.log('保存 scrolltop');
  }
  document.body.scrollTop = 0;
  console.log('清除 scrolltop');
  console.log('new', location.pathname);
  console.log('old', prevLocation?.pathname);
};
