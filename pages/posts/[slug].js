import Head from 'next/head';

import Post from '../../components/Post';
import { getPostBySlug } from '../../utils/postData';
import Layout from '../../components/Layout';

export default function ViewPost({ post }) {
  return (
    <Layout>
      <Head>
        <title>View Post</title>
      </Head>
      <main>
        <Post post={post} />
      </main>
    </Layout>
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
