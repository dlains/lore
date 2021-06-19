import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm'

export default function PostSummary({ post }) {
  const published = new Date(post.data.publishedAt).toLocaleDateString();

  return (
    <div>
      <h1 className="text-2xl">
        {post.data.title}
      </h1>
      <time dateTime={post.data.publishedAt}>{published}</time>
      <ReactMarkdown remarkPlugins={[gfm]}>{post.data.content}</ReactMarkdown>
    </div>
  );
}