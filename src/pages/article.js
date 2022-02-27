import React, { useState, useEffect, useRef, useCallback } from 'react';
import { graphql, navigate } from 'gatsby';
import { moveToView } from '../utils';

import Seo from '../components/SEO';
import BlogGrid from '../components/blog/blogGrid';
import Modal from '../components/blog/modal';

const Article = ({ data }) => {
  const {
    allMdx: { nodes },
  } = data;
  const [list, setList] = useState(nodes);
  const [keywords, setKeywords] = useState('');
  const [cate, setCate] = useState([]);
  const [currentCate, setCurrentCate] = useState('All');
  const [currentInfo, setCurrentInfo] = useState('');
  const [isModalShow, setModalShow] = useState(false);
  const inputEl = useRef(null);
  const closeClass = keywords ? 'show' : '';

  const filterCategories = (ns) => {
    const cs = ns.reduce((arr, { frontmatter: { categories } }) => {
      categories.map((c) => arr.add(c));

      return arr;
    }, new Set());

    setCate(['All', ...cs]);
  };

  const changeCategories = (curr) => {
    setCurrentCate(curr !== currentCate ? curr : '');
  };

  const filterArticle = () => {
    const tempNodes = nodes.filter((node) => {
      const {
        frontmatter: { categories, title, excerpt, tags },
      } = node;
      if (currentCate === 'All' || categories.includes(currentCate)) {
        if (keywords) {
          if (
            categories.includes(keywords) ||
            title.includes(keywords) ||
            tags.includes(keywords) ||
            excerpt?.includes(keywords)
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      }
      return false;
    });

    setList(tempNodes);
  };

  const handleKeyUp = (e) => {
    const { value } = inputEl.current;
    setKeywords(value);

    if (e.code === 'Enter') {
      filterArticle();
    }
  };

  const handleSearchClean = () => {
    inputEl.current.value = '';
    setKeywords('');
  };

  const evokeSearch = (e) => {
    if (inputEl.current === document.activeElement) return;

    if (e.code === 'Slash') {
      moveToView(inputEl.current);
      setTimeout(() => {
        inputEl.current.focus();
      }, 1000);
    }
  };

  const showPwdModal = useCallback((info) => {
    setModalShow(true);
    setCurrentInfo(info);
  }, []);
  const hidePwdModal = useCallback(() => setModalShow(false), []);

  const handleModalDone = () => {
    navigate(currentInfo.slug, {
      state: { hasPass: true },
    });
  };

  const renderCategoriesJSX = () =>
    cate.map((v) => (
      <div
        key={v}
        className={`article-categories-item ${currentCate === v ? 'active' : ''}`}
        onClick={() => changeCategories(v)}
      >
        {v}
      </div>
    ));

  const renderListJSX = () =>
    list.map((v, i) => (
      <BlogGrid data={v} key={v.id} style={{ animationDelay: `${i * 100}ms` }} showPwdModal={showPwdModal} />
    ));

  useEffect(() => {
    filterCategories(nodes);
  }, []);

  useEffect(() => {
    filterArticle();
  }, [currentCate]);

  useEffect(() => {
    window.addEventListener('keyup', evokeSearch);
    return () => window.removeEventListener('keyup', evokeSearch);
  }, []);

  return (
    <>
      <Seo />
      <div id='article'>
        <div className='article-search'>
          <span className='article-search-glass iconfont icon-search'></span>
          <input ref={inputEl} placeholder='What You Want To Know...' onKeyUp={handleKeyUp} />
          <span className={`article-search-close iconfont icon-close ${closeClass}`} onClick={handleSearchClean}></span>
        </div>
        <div className='article-categories'>{renderCategoriesJSX()}</div>
        {list.length ? (
          <section className='style-grid'>{renderListJSX(list)}</section>
        ) : (
          <section className='article-empty'>
            <p>似乎没有这种文章...</p>
          </section>
        )}
      </div>
      <Modal visible={isModalShow} onCancel={hidePwdModal} onDone={handleModalDone} pwd={currentInfo.pwd} />
    </>
  );
};

export const pageQuery = graphql`
  query NormalQuery {
    allMdx(sort: { order: DESC, fields: frontmatter___date }, limit: 1000) {
      nodes {
        id
        frontmatter {
          pwd
          tags
          title
          date(formatString: "MMMM DD,YYYY")
          thumbnail {
            childImageSharp {
              gatsbyImageData(jpgOptions: { progressive: true, quality: 90 })
            }
          }
          excerpt
          categories
        }
        fields {
          slug
        }
      }
      totalCount
    }
  }
`;

export default Article;
