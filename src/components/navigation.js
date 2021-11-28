import React from 'react';
import { Link } from 'gatsby';
import { useLocation } from '@reach/router';
import Logo from './logo';

const renderMenuJSX = (routes) =>
  routes.map(({ path, name, visible }) =>
    visible ? (
      <div className='menu-link' key={path}>
        <Link to={path}>{name}</Link>
      </div>
    ) : null,
  );

const Navigation = ({ routes }) => {
  const { pathname } = useLocation();
  const currentPage = routes.find(({ path }) => path === pathname);
  const { name: pageName } = currentPage ?? { name: '首页' };
  let headerClass = 'show';

  return (
    <header className={headerClass}>
      <nav>
        <section className='nav-default'>
          <section className='menu'>{renderMenuJSX(routes)}</section>
          <Logo />
        </section>
        <section className='nav-page'>
          <h1>{pageName}</h1>
        </section>
      </nav>
    </header>
  );
};

export default Navigation;
