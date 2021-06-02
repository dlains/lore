import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout';
import swr from 'swr';

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
          <p key={post.id}>{post.title}</p>
        ))}
        <ul>
          <li>
            Read{' '}
            <Link href="/posts/first-post">
              <a>this page!</a>
            </Link>
          </li>
        </ul>
      </main>

      <footer>
        <a href="/">Copyright &copy; 2021 David Lains</a>
      </footer>
    </Layout>
  )
}
