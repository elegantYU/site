import React, { useEffect, useContext } from 'react';
import Helmet from 'react-helmet';
import config from '../../config/index';
import ThemeContext, { ThemeProvider } from '../context/themeContext';
import OverContext, { OverProvider } from '../context/overflowContext';

import Navigation from '../components/navigation';
import Footer from '../components/footer';
import favicon from '../images/favicon.png';
import '../styles/main.scss';

const Layout = ({ children, ...rest }) => {
  const { dark } = useContext(ThemeContext);
  const darkClass = dark ? 'dark' : '';
  const iconfontCss = `https://at.alicdn.com/t/${config.iconfont}.css`;
  const iconfontJs = `https://at.alicdn.com/t/${config.iconfont}.js`;

  useEffect(() => {
    document.addEventListener('gesturestart', (e) => e.preventDefault());
  }, []);

  return (
    <OverProvider>
      <ThemeProvider>
        <Helmet
          bodyAttributes={{
            className: darkClass,
          }}
        >
          <html lang='zh-CN' />
          <meta
            name='viewport'
            content='width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0'
          />
          <meta httpEquiv='cleartype' content='on' />
          {/* 网页淡入淡出 */}
          <meta httpEquiv='Page-Enter' content='blendTrans(Duration=1.0)' />
          <meta httpEquiv='Page-Exit' content='blendTrans(Duration=1.0)' />
          {/* google 相关 */}
          <meta httpEquiv='X-UA-Compatible' content='chrome=1' />
          <meta name='google' value='notranslate' />
          {/* ios */}
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <link rel='shortcut icon' type='image/png' href={favicon} />
          <link rel='stylesheet' href={iconfontCss} />
          <script src={iconfontJs} type='text/javascript' />
        </Helmet>
        <Navigation hide={rest?.noHead} routes={config.routes} />
        <main id='main'>{children}</main>
        <Footer hide={rest?.noFooter} />
      </ThemeProvider>
    </OverProvider>
  );
};

export default Layout;
