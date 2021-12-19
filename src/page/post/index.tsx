import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router';
import Editor from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import { ThemeContext } from '@/context/theme';
import { ArticleHeader } from '../home';
import request from '@/utils/http';
import { IArticle } from '@/types';

// const markdown = `### Overview
// ## Table of contents`;

const Post = (props: any) => {
  const {
    match: { params }
  } = props;
  const [isDark] = useContext(ThemeContext);
  const [post, setPost] = React.useState<IArticle>();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res: any = await request.get(`/api/article/${params.id}`);
        const { code, data, msg } = res;
        if (code === 0) {
          setPost(data);
        } else {
          console.warn(msg);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, [params.id]);
  return (
    <div>
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
