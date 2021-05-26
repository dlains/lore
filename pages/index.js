import Head from 'next/head'
import Link from 'next/link'
import Layout from '../components/layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Home - David Lains</title>
      </Head>

      <main>
        <h1 className="text-4xl">
          David Lains
        </h1>
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
