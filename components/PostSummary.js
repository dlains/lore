import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm'

export default function PostSummary({ post }) {
  const published = new Date(post.data.publishedAt).toLocaleDateString();
  const { user } = useUser();

  return (
    <div>
      <h1 className="text-2xl">
        <Link href={`/posts/${post.data.slug}`}>
          <a>{post.data.title}</a>
        </Link>
      </h1>
      <time dateTime={post.data.publishedAt}>{published}</time>
      {user && user.sub === post.data.userId && (
        <Link href={`/posts/edit/${post.id}`}>
          <a className="text-gray-800 ml-2">Edit</a>
        </Link>
      )}
      <ReactMarkdown remarkPlugins={[gfm]}>{post.data.summary}</ReactMarkdown>
    </div>
  );
}