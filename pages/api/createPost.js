import { createPost } from '../../utils/fauna';

export default async function handler(req, res) {
  const { title, slug, summary, content, published } = req.body;
  if(req.method !== 'POST') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  try {
    const createdPost = await createPost(title, slug, summary, content, published);
    return res.status(200).json(createdPost);
  } catch(error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong' });
  }
}