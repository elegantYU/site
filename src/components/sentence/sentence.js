import React from 'react';
import dayjs from 'dayjs';

const Sentence = ({ data, style }) => {
  const { title, content, createTime } = data;
  const date = dayjs(createTime).format('Y/M/D HH:mm');

  return (
    <section className='sentence-box' style={style}>
      <div className='sentence-box-title'>
        <h4>{title}</h4>
        <span>{date}</span>
      </div>
      <div className='sentence-box-desc' dangerouslySetInnerHTML={{ __html: content }}></div>
    </section>
  );
};

export default Sentence;
