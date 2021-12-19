import React, { useCallback } from 'react';
import UserInfo from '@/components/UserInfo';
import { useAsync } from '@/Hooks/useAsync';
import ErrorBlock from 'antd-mobile/es/components/error-block';
import { Loading } from 'antd-mobile/es/components/loading/loading';
import { IArticle } from '@/types';
// import { Button } from 'antd-mobile';
import { withRouter } from 'react-router';
// import Header from '@/components/Header';

export const ArticleHeader = React.memo(
  (props: {
    articleId: string;
    title?: string;
    time?: number | string;
    readTime?: number;
    style?: any;
    onClickHandle?: (id: string) => void;
  }) => {
    const { title, time, readTime = 1, onClickHandle, articleId } = props;

    const coffeeNum = useCallback((number: number = 0) => {
      if (!number || number <= 5) return <>☕️</>;
      if (number <= 10) return <>☕️☕️</>;
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
          {time} • {coffeeNum(readTime)} {readTime} 分钟
        </small>
      </header>
    );
  }
);

const Article = React.memo(
  (props: { article: IArticle; onClickArticle: (id: string) => void }) => {
    const { article } = props;
    const headerProps = {
      title: article.title,
      time: article.title,
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

const Home = (props: any) => {
  const { state } = useAsync(
    '/api/article/queryAllPublish',
    {
      pageSize: 5,
      current: 1
    },
    'GET'
  );
  const { data, isLoading, isError } = state;

  const onClickArticle = (articleId: string) => {
    props.history.push('/post/' + articleId);
  };

  if (isError) {
    return <ErrorBlock fullPage />;
  }

  if (isLoading) {
    return (
      <span style={{ fontSize: 14 }}>
        <Loading />
      </span>
    );
  }

  return (
    <div>
      <UserInfo />
      {data?.list?.map((article: IArticle, index: number) => {
        return (
          <Article
            key={article.articleId}
            article={article}
            onClickArticle={onClickArticle}
          />
        );
      })}
      {/* <Button loading color='primary' loadingText='加载中'>
        Loading
      </Button> */}
    </div>
  );
};

export default withRouter(Home);
