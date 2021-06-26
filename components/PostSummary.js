import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm'

export default function PostSummary({ post }) {
  const published = new Date(post.published_at).toLocaleDateString();
  const { user } = useUser();

  return (
    <div>
      <h1 className="text-2xl">
        <Link href={`/posts/${post.slug}`}>
          <a>{post.title}</a>
        </Link>
      </h1>
      <time dateTime={post.published_at}>{published}</time>
      {user && user.sub === post.user_id && (
        <Link href={`/posts/edit/${post.id}`}>
          <a className="text-gray-800 ml-2">Edit</a>
        </Link>
      )}
      <ReactMarkdown remarkPlugins={[gfm]}>{post.summary}</ReactMarkdown>
    </div>
  );
}