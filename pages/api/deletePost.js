import { deletePost } from '../../utils/fauna';

export default async function handler(req, res) {
  if(req.method !== 'DELETE') {
    return res.status(405).json({ msg: 'Method not allowed.' });
  }

  const { id } = req.body;
  try {
    const deletedPost = await deletePost(id);
    return res.status(200).json(deletedPost);
  } catch(error) {
    console.error(err);
    res.status(500).json({ msg: 'Something went wrong.' });
  }
}