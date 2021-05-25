import Link from 'next/link';

export default function FirstPost() {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl">First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home.</a>
        </Link>
      </h2>
    </div>
  );
}