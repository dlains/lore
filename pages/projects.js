import Head from 'next/head'

import Layout from '../components/Layout';

export default function Projects() {
  return (
    <Layout>
      <Head>
        <title>Projects - David Lains</title>
      </Head>

      <main>
        <h1>My Projects</h1>
      </main>

      <footer>
        <a href="/">Copyright &copy; 2021 David Lains</a>
      </footer>
    </Layout>
  )
}
