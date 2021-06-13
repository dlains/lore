import Head from 'next/head';
import { getPost } from '../../../utils/fauna';
import PostForm from '../../../components/PostForm';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default function Home({ post }) {
  return (
    <div>
      <Head>
        <title>Edit Post</title>
      </Head>
      <main className="max-w-lg mx-auto">
        <h1 className="text-red-100 text-2xl mb-4">Edit Post</h1>
        <PostForm post={post} />
      </main>
    </div>
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
})