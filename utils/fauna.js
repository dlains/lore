const fauna = require('faunadb');
const client = new fauna.Client({
  secret: process.env.FAUNA_SECRET
});
const query = fauna.query;

const getPosts = async () => {
  const { data } = await client.query(
    query.Map(
      query.Paginate(query.Documents(query.Collection('posts'))),
      query.Lambda('ref', query.Get(query.Var('ref')))
    )
  );

  const posts = data.map(post => {
    post.id = post.ref.id;
    delete post.ref;
    return post;
  });

  return posts;
};

const getPost = async (slug) => {
  // TODO: get post by slug
};

const createPost = async (post) => {
  // TODO: create a new post
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