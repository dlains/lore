import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  const meta = {
    title: 'David Lains',
    description: 'Hello, I\'m David Lains, Builder of things, framework explorer and project simplifier.',
    image: '/images/photo.jpg'
  };

  return (
    <div className="container mx-auto">
      <Head>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yourname" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <title>David Lains</title>
        <link rel="icon" href="/favicon.ico" />
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
    </div>
  )
}
