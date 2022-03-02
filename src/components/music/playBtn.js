import React from 'react';

const PlayBtn = ({ active, clickEvent }) => {
  const className = active ? 'active' : '';

  return (
    <div className={`music-play-outer ${className}`} onClick={clickEvent}>
      <span></span>
    </div>
  );
};

export default PlayBtn;
