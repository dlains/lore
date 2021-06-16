import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm'

export default function PostSummary(props) {
  const published = new Date(props.post.data.publishedAt).toLocaleDateString();
  const { user } = useUser();

  return (
    <div>
      <h1 className="text-2xl">
        <Link href={`/posts/${props.post.data.slug}`}>
          <a>{props.post.data.title}</a>
        </Link>
      </h1>
      <time dateTime={props.post.data.publishedAt}>{published}</time>
      {user && user.sub === props.post.data.userId && (
        <Link href={`/posts/edit/${props.post.id}`}>
          <a className="text-gray-800 ml-2">Edit</a>
        </Link>
      )}
      <ReactMarkdown remarkPlugins={[gfm]}>{props.post.data.summary}</ReactMarkdown>
    </div>
  );
}