import { updatePost } from '../../utils/fauna';

export default async function handler(req, res) {
  const { id, title, slug, summary, content, published, publishedAt } = req.body;
  if(req.method !== 'PUT') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  try {
    const updatedPost = await updatePost(id, title, slug, summary, content, published, publishedAt);
    return res.status(200).json(updatedPost);
  } catch(error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong' });
  }
}