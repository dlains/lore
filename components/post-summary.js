import Link from 'next/link';

export default function PostSummary(props) {
  debugger;
  return (
    <div>
      <h1 className="text-2xl">
        <Link href="/posts/first-post">
          <a>{props.post.data.title}</a>
        </Link>
      </h1>
      <time dateTime="{props.post.data.publishedAt['@date']">{props.post.data.publishedAt['@date']}</time>
      <p>{props.post.data.summary}</p>
    </div>
  );
}