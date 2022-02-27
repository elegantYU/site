const { routes } = require('./config');
const { setSessionScroll, getSessionScroll } = require('./src/utils');

exports.onPreRouteUpdate = ({ location }) => {
  const clearList = routes.map((v) => v.path);

  if (!clearList.includes(location.pathname)) {
    setSessionScroll(location.pathname);
  }
  document.body.scrollTop = 0;
};

exports.onRouteUpdate = ({ location }) => {
  getSessionScroll(location?.pathname);
};
