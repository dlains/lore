import Head from 'next/head';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

import { getPost } from '../../../utils/postData';
import PostForm from '../../../components/PostForm';
import Layout from '../../../components/Layout';

export default function EditPost({ post }) {
  return (
    <Layout>
      <Head>
        <title>Edit Post</title>
      </Head>
      <main>
        <h1 className="text-2xl mb-4">Edit Post</h1>
        <PostForm post={post} />
      </main>
    </Layout>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    try {
      const id = context.params.id;
      const post = await getPost(id);
      return {
        props: { post }
      };
    } catch(error) {
      console.error(error);
      return { props: {} };
    }
  }
});