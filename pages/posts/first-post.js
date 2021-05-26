import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout';


export default function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>First Post - David Lains</title>
      </Head>
      <h1 className="text-4xl">First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home.</a>
        </Link>
      </h2>
    </Layout>
  );
}