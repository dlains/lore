import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm'

export default function PostSummary({ post }) {
  post = JSON.parse(post);
  const published = new Date(post.published_at).toLocaleDateString();

  return (
    <div>
      <h1 className="text-2xl">
        {post.title}
      </h1>
      <time dateTime={post.published_at}>{published}</time>
      <ReactMarkdown remarkPlugins={[gfm]}>{post.content}</ReactMarkdown>
    </div>
  );
}