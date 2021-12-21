import React, { useCallback, useEffect, useRef, useState } from 'react';
import UserInfo from '@/components/UserInfo';
import ErrorBlock from 'antd-mobile/es/components/error-block';
import { IArticle } from '@/types';
import { withRouter } from 'react-router';
import InfiniteScroll from 'antd-mobile/es/components/infinite-scroll';
import { Get } from '@/api/request';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.locale('zh-cn');
dayjs.extend(relativeTime);

export const ArticleHeader = React.memo(
  (props: {
    articleId: string;
    title?: string;
    time?: number | string;
    readTime?: number;
    style?: any;
    children?: React.ReactNode;
    onClickHandle?: (id: string) => void;
  }) => {
    const { title, time, readTime = 1, onClickHandle, articleId } = props;

    const coffeeNum = useCallback((number: number = 0) => {
      if (!number || number <= 5) return <>☕️</>;
      if (number <= 25) return <>☕️☕️</>;
      return <>☕️☕️☕️</>;
    }, []);
    return (
      <header>
        <h3
          onClick={() => {
            onClickHandle && onClickHandle(articleId);
          }}
          className='text-3xl mb-2	mt-12 font-black text-pink-800 dark:text-pink-300'
          style={{ ...props.style }}
        >
          {title}
        </h3>
        <small className='text-sm font-mono dark:text-gray-300'>
          {dayjs(time).format('MMM D, YYYY')} • {coffeeNum(readTime)} {readTime}{' '}
          min read
        </small>
        {props.children}
      </header>
    );
  }
);

const Article = React.memo(
  (props: { article: IArticle; onClickArticle: (id: string) => void }) => {
    const { article } = props;
    const headerProps = {
      title: article.title,
      time: article.publishTime,
      readTime: article.readTime,
      articleId: article.articleId,
      onClickHandle: props.onClickArticle
    };
    return (
      <div className='article'>
        <ArticleHeader {...headerProps} />
        <p className='mb-7 text-base mt-1 dark:text-gray-400'>
          {article.brief}
        </p>
      </div>
    );
  }
);

const initParam = {
  pageSize: 5,
  current: 1
};

const Home = (props: any) => {
  const param = useRef({ ...initParam });

  const [data, setData] = useState<IArticle[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    return () => {
      param.current = initParam;
    };
  }, []);

  const loadMore = useCallback(async () => {
    const urlSearchParams = new URLSearchParams(props.location.search);
    const urlParams = Object.fromEntries(urlSearchParams.entries());
    try {
      const data = (await Get('/api/article/queryAllPublish', {
        ...param.current,
        ...urlParams,
        current: param.current.current++
      })) as { list: IArticle[] };
      const { list } = data;
      setData((val) => [...val, ...list]);
      setHasMore(list.length > 0);
    } catch (error) {
      setError(true);
    }
  }, [props]);

  const onClickArticle = (articleId: string) => {
    props.history.push('/post/' + articleId);
  };

  if (isError) {
    return <ErrorBlock fullPage />;
  }

  return (
    <div>
      <UserInfo />
      {data.map((article: IArticle) => {
        return (
          <Article
            key={article.articleId}
            article={article}
            onClickArticle={onClickArticle}
          />
        );
      })}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={10} />
    </div>
  );
};

export default withRouter(Home);
