import { getPosts } from '../../utils/fauna';

export default async function handler(req, res) {
  if(req.method !== 'GET') {
    return res.status(405);
  }

  try {
    const posts = await getPosts();
    return res.status(200).json(posts);
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
}