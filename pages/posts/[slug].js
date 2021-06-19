import Head from 'next/head';
import Post from '../../components/Post';
import { getPostBySlug } from '../../utils/postData';

export default function ViewPost({ post }) {
  return (
    <div>
      <Head>
        <title>View Post</title>
      </Head>
      <main className="max-w-lg mx-auto">
        <Post post={post} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const slug = context.params.slug;
    const post = await getPostBySlug(slug);
    return {
      props: { post }
    };
  } catch(error) {
    console.error(error);
    return { props: {} };
  }
}
