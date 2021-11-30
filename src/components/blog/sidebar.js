import React from 'react';
import Gitalk from 'gatsby-plugin-gitalk';

import useScroll from '../../hooks/useScroll'

const Sidebar = ({ data, active }) => {
  const { top } = useScroll()
  const className = `sidebar ${active ? 'sidebar-open' : ''}`
  const topStyle = {
    top: top > 80 ? 0 : `${80 - top}px`
  }

  return (
    <div className={className} style={topStyle}>
      <Gitalk options={data} />
    </div>
  );
};

export default Sidebar;
