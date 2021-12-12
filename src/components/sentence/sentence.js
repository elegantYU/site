import React from 'react';
import moment from 'moment/min/moment.min'

const Sentence = ({ data }) => {
  const { _id, title, content, createTime, latest } = data;
  const date = moment(createTime).format('MMM DD HH:mm')

  return (
    <section className='sentence-box'>
      <div className='sentence-box-title'>
        <h4>{title}</h4>
        <span>{date}</span>
      </div>
      <div className='sentence-box-desc' dangerouslySetInnerHTML={{__html: content}}></div>
    </section>
  );
};

export default Sentence;
