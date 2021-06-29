import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import PostForm from '../../components/PostForm';
import Layout from '../../components/Layout';

export default function CreatePost() {
  return (
    <Layout>
      <Head>
        <title>Create Post</title>
      </Head>

      <main>
        <h1 className="text-2xl mb-4">Create Post</h1>
        <PostForm />
      </main>
    </Layout>
  );
}

export const getServerSideProps = withPageAuthRequired();