import React, { useContext, useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import Editor from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { ThemeContext } from '@/context/theme';
import { ArticleHeader } from '../home';
// import request from '@/utils/http';
import { IArticle } from '@/types';
import Loader from 'react-spinners/BeatLoader';
import { Get } from '@/api/request';
import { NavLink } from 'react-router-dom';
import { Space } from 'antd-mobile';
import UserInfo from '@/components/UserInfo';

// const markdown = `### Overview
// ## Table of contents`;

enum LINK_TYPE {
  TAG = 'tagId',
  LABEL = 'labelId'
}

const TagLink = ({
  name,
  value,
  type
}: {
  name: string;
  value: string;
  type: LINK_TYPE;
}) => {
  const url = `/home?${type}=${value}`;
  return (
    <NavLink
      className='text-base	font-medium text-pink-800 dark:text-pink-300 underline'
      to={url}
    >
      {type !== LINK_TYPE.TAG ? '#' : ''}
      {name}
    </NavLink>
  );
};

const TagList = ({ data, type }: { data: any[]; type: LINK_TYPE }) => {
  return (
    <Space>
      {data
        .filter((i: any) => i.status === 'on')
        .map(({ labelId, title }) => {
          return (
            <TagLink key={labelId} value={labelId} name={title} type={type} />
          );
        })}
    </Space>
  );
};

const Post = (props: any) => {
  const {
    match: { params }
  } = props;
  const [isDark] = useContext(ThemeContext);
  const [post, setPost] = React.useState<IArticle>();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    let didCancel = false;
    setLoading(true);
    const fetchPost = async () => {
      try {
        const data: IArticle = (await Get(
          `/api/article/${params.id}`,
          {}
        )) as IArticle;
        if (!didCancel) {
          setPost(data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
    return () => {
      didCancel = true;
    };
  }, [params.id]);

  if (loading) {
    return (
      <div className='text-base text-center	'>
        <Loader loading={loading} color='gray' css='mt-16' size={15} />
      </div>
    );
  }

  return (
    <>
      <ArticleHeader
        style={{ fontSize: '2rem' }}
        articleId='1'
        title={post?.title}
        readTime={post?.readTime}
        time={post?.publishTime}
      >
        {post?.tag ? (
          <span className='text-sm	mt-1.5'>
            <span>&nbsp;• &nbsp;</span>
            <TagLink
              value={post?.tag.tagId}
              name={post?.tag.title}
              type={LINK_TYPE.TAG}
            />
          </span>
        ) : (
          <></>
        )}
      </ArticleHeader>

      <div className='mt-4'>
        <Editor
          modelValue={post?.content?.content}
          previewOnly
          theme={isDark ? 'dark' : 'light'}
          previewTheme={'github'}
          style={{ background: isDark ? '#1F2937' : '' }}
        />
        {post?.label && post?.label.length > 0 && (
          <div className='text-base mt-7 dark:text-gray-400'>
            标签：
            <TagList data={post?.label || []} type={LINK_TYPE.LABEL} />
          </div>
        )}
      </div>
      <div className='my-18 mt-12'>
        <UserInfo />
      </div>
      <div className='my-8 mt-7 text-red-400 text-lg underline p-3 flex-wrap flex justify-between	'>
        <div className='mb-3'>
          {post?.previous && (
            <NavLink
              className='text-pink-800 dark:text-pink-300 '
              to={`/post/${post?.previous.articleId}`}
            >
              👈{post?.previous.title}
            </NavLink>
          )}
        </div>
        {post?.next && (
          <NavLink
            className=' text-pink-800 dark:text-pink-300 '
            to={`/post/${post?.next.articleId}`}
          >
            {post?.next.title}👉👉
          </NavLink>
        )}
      </div>
    </>
  );
};

export default withRouter(Post);
