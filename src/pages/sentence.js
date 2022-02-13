import React, { useEffect, useState } from 'react';
import { getPageListXHR } from '../api/sentence';
import toast, { Toaster } from 'react-hot-toast';

import Seo from '../components/SEO';
import Title from '../components/sentence/title';
import Sentence from '../components/sentence/sentence';
import useLoadMore from '../hooks/useLoadMore';

const verseList = [
  '总有一些无病呻吟',
  '胜过白昼下的烂漫 或黑夜里的灿烂',
  '骚话不加双引号，像话吗?',
  '太阳很大 但是透不进来',
  '总是梦见云层之上飞过子午线',
  '我们迷失着在这条路的两端',
  '比你聪明的人阿 都在努力往前 我无力的闭上眼',
  '等一个自然而然的晴天 我想要带你去海边',
  '还未如愿见着不朽 就把自己先搞丢',
];

const renderSentenceJSX = (list) =>
  list.map((v, i) => <Sentence data={v} key={v._id} style={{ animationDelay: `${i * 100}ms` }} />);

const Daily = () => {
  const [pageParams, setPageParams] = useState({ page: 1, size: 20 });
  const [dailyData, setDailyData] = useState([]);
  const [isLoadAll, setLoadAll] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { canLoad } = useLoadMore({});

  const getPageList = async () => {
    if (isLoadAll || isLoading) {
      return toast('他底裤都被你看完啦!', { icon: '🐒' });
    }

    toast('Loading...');
    setLoading(true);
    getPageListXHR(pageParams)
      .then(({ data }) => {
        const { success, list } = data;
        if (!success) {
          return new Error('错了错了');
        }

        if (!list.length || list.length < pageParams.size) {
          setLoadAll(true);
        }

        setDailyData([...dailyData, ...list]);
      })
      .catch((_) => toast('加载失败,真遗憾'))
      .finally((_) => setLoading(false));
  };

  const handleScroll = (e) => {
    if (canLoad) {
      const { page, size } = pageParams;
      setPageParams({ page: page + 1, size });
    }
  };

  useEffect(() => {
    handleScroll();
  }, [canLoad]);

  useEffect(() => {
    getPageList();
  }, [pageParams]);

  return (
    <>
      <Seo />
      <div id='sentence'>
        <Title data={verseList} />
        <section className='sentence-list'>{renderSentenceJSX(dailyData)}</section>
      </div>
      <Toaster position='bottom-center' toastOptions={{ className: 'toast-my', duration: 2000 }} />
    </>
  );
};

export default Daily;
