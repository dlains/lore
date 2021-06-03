import Head from 'next/head'
import Link from 'next/link'
import swr from 'swr';

import Layout from '../components/layout';
import PostSummary from '../components/post-summary';

export default function Home() {
  const { data: posts } = swr('/api/posts');

  return (
    <Layout>
      <Head>
        <title>Home - David Lains</title>
      </Head>

      <main>
        <h1 className="text-4xl">
          David Lains
        </h1>
        {posts && posts.map(post => (
          <PostSummary key={post.id} post={post} />
        ))}
      </main>

      <footer>
        <a href="/">Copyright &copy; 2021 David Lains</a>
      </footer>
    </Layout>
  )
}
