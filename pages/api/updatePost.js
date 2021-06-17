import { updatePost, getPost } from '../../utils/postData';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  const session = getSession(req, res);
  const userId = session.user.sub;
  const { id, title, slug, summary, content, published, publishedAt } = req.body;

  if(req.method !== 'PUT') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  const existingRecord = await getPost(id);
  if(!existingRecord || existingRecord.data.userId !== userId) {
    return res.status(404).json({ msg: 'Record not found.' });
  }

  try {
    const updatedPost = await updatePost(id, title, slug, summary, content, published, publishedAt);
    return res.status(200).json(updatedPost);
  } catch(error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong' });
  }
});