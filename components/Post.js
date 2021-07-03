import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm'

import PostTitle from './PostTitle';

export default function PostSummary({ post }) {
  post = JSON.parse(post);
  const published = new Date(post.published_at).toLocaleDateString();

  return (
    <div>
      <PostTitle>
        {post.title}
      </PostTitle>
      <time dateTime={post.published_at}>{published}</time>
      <ReactMarkdown remarkPlugins={[gfm]}>{post.content}</ReactMarkdown>
    </div>
  );
}