import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router';
import Editor from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { ThemeContext } from '@/context/theme';
import { ArticleHeader } from '../home';
// import request from '@/utils/http';
import { IArticle } from '@/types';
import Loader from 'react-spinners/BeatLoader';
import { Get } from '@/api/request';

// const markdown = `### Overview
// ## Table of contents`;

const Post = (props: any) => {
  const {
    match: { params }
  } = props;
  const [isDark] = useContext(ThemeContext);
  const [post, setPost] = React.useState<IArticle>();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data: IArticle = (await Get(
          `/api/article/${params.id}`,
          {}
        )) as IArticle;
        setPost(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, [params.id]);

  if (loading) {
    return (
      <div className='text-base text-center	'>
        <Loader loading={loading} color='gray' css='mt-16' size={15} />
      </div>
    );
  }

  return (
    <div style={{ overflow: 'hidden' }}>
      <ArticleHeader
        style={{ fontSize: '2rem' }}
        articleId='1'
        title={post?.title}
        readTime={post?.readTime}
        time={post?.publishTime}
      />
      <Editor
        modelValue={post?.content?.content}
        previewOnly
        theme={isDark ? 'dark' : 'light'}
        previewTheme={'github'}
        style={{ background: isDark ? '#1F2937' : '' }}
      />
    </div>
  );
};

export default withRouter(Post);
