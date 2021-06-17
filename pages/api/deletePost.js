import { deletePost, getPost } from '../../utils/postData';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  const session = getSession(req, res);
  const userId = session.user.sub;

  if(req.method !== 'DELETE') {
    return res.status(405).json({ msg: 'Method not allowed.' });
  }

  const { id } = req.body;
  const existingRecord = await getPost(id);
  if(!existingRecord || existingRecord.data.userId !== userId) {
    return res.status(404).json({ msg: 'Record not found.' });
  }
  
  try {
    const deletedPost = await deletePost(id);
    return res.status(200).json(deletedPost);
  } catch(error) {
    console.error(err);
    res.status(500).json({ msg: 'Something went wrong.' });
  }
});