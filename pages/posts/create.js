import Head from 'next/head';
import PostForm from '../../components/PostForm';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default function CreatePost() {
    return (
        <div>
            <Head>
                <title>Create Post</title>
            </Head>

            <main className="max-w-lg mx-auto">
                <h1 className="text-2xl mb-4">Create Post</h1>
                <PostForm />
            </main>
        </div>
    );
}

export const getServerSideProps = withPageAuthRequired();