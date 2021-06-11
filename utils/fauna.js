const fauna = require('faunadb');
const client = new fauna.Client({
  secret: process.env.FAUNA_SECRET
});
const q = fauna.query;

const getPosts = async () => {
  const { data } = await client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('all_posts'))),
      q.Lambda('ref', q.Get(q.Var('ref')))
    )
  );

  return data;
};

const getPost = async (slug) => {
  // TODO: get post by slug
};

const createPost = async (title, slug, summary, content, published) => {
  let publishedAt = null;
  if(published === true) {
    publishedAt = Date.now()
  }

  return await client.query(q.Create(q.Collection('posts'), {
    data: { title, slug, summary, content, published, publishedAt }
  }))
};

const updatePost = async (post) => {
  // TODO: update a post
}

const deletePost = async (slug) => {
  // TODO: delete a post
}

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
}