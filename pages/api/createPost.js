import { createPost } from '../../utils/fauna';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withApiAuthRequired(async function handler(req, res) {
  const session = getSession(req, res);
  const userId = session.user.sub;
  const { title, slug, summary, content, published } = req.body;
  if(req.method !== 'POST') {
    return res.status(405).json({ msg: 'Method not allowed' });
  }

  try {
    const createdPost = await createPost(title, slug, summary, content, published, userId);
    return res.status(200).json(createdPost);
  } catch(error) {
    console.error(error);
    res.status(500).json({ msg: 'Something went wrong' });
  }
});