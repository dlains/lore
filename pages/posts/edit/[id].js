import Head from 'next/head';
import { getPost } from '../../../utils/fauna';
import PostForm from '../../../components/PostForm';

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

export async function getServerSideProps(context) {
  try {
    const id = context.params.id;
    const post = await getPost(id);
    return {
      props: { post }
    };
  } catch(error) {
    console.error(error);
    // context.res.statusCode = 302;
    // context.res.setHeader('Location', '/');
    return { props: {} };
  }
}