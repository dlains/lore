import Head from 'next/head'
import Link from 'next/link'
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { useUser } from '@auth0/nextjs-auth0';

import { getPosts } from '../../utils/postData';
import Layout from '../../components/Layout';

export default function PostList({ posts }) {
  const { user } = useUser();

  return (
    <Layout>
      <Head>
        <title>Post List - David Lains</title>
      </Head>

      <main>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Published</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {posts && posts.map(post => (
            <tr key={post.id}>
              <td>
                {post.title}
              </td>
              <td>
                {post.published}
              </td>
              {user && user.sub === post.user_id && (
                <td>
                  <Link href={`/posts/edit/${post.id}`}>
                    <a className="text-gray-800 ml-2">Edit</a>
                  </Link>
                </td>
              )}
            </tr>
            ))}
          </tbody>
        </table>
      </main>

      <footer>
        <a href="/">Copyright &copy; 2021 David Lains</a>
      </footer>
    </Layout>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    try {
      let posts = await getPosts();

      // HACK: MySQL2 library creates some data that isn't serializable by the Next.js library.
      // The JSON object can serialize it properly though, so this does a round trip and the objects then work.
      // See: https://github.com/vercel/next.js/issues/11993
      posts = JSON.parse(JSON.stringify(posts));

      return {
        props: { posts }
      };
    } catch(error) {
      console.error(error);
      return { props: {} };
    }
  }
});