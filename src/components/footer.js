import React from 'react';
import config from '../../config/index';

const renderShareLinkJSX = (list) =>
  list.map(({ name, link, icon }) => (
    <a href={link} target='_blank' key={name} title={name}>
      <i className={`iconfont ${icon} ${name}`} />
    </a>
  ));

const Footer = () => {
  return (
    <footer>
      <div className='footer-share'>{renderShareLinkJSX(config.social)}</div>
      <div className='footer-copyright'>
        <a href="https://beian.miit.gov.cn" target="_blank">皖ICP备2020019930号</a>
      </div>
    </footer>
  );
};

export default Footer;
