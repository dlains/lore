import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm'

import PostTitle from './PostTitle';

export default function PostSummary({ post }) {
  const published = new Date(post.published_at).toLocaleDateString();
  const { user } = useUser();

  return (
    <div>
      <PostTitle>
        <Link href={`/posts/${post.slug}`}>
          <a>{post.title}</a>
        </Link>
      </PostTitle>
      <time dateTime={post.published_at}>{published}</time>
      <ReactMarkdown remarkPlugins={[gfm]}>{post.summary}</ReactMarkdown>
    </div>
  );
}