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

  const posts = data.map(post => {
    post.id = post.ref.id;
    delete post.ref;
    return post;
  });
  
  return data;
};

const getPost = async (id) => {
  const post = await client.query(q.Get(q.Ref(q.Collection('posts'), id)));
  post.id = post.ref.id
  delete post.ref;
  return post;
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

const updatePost = async (id, title, slug, summary, content, published, publishedAt) => {
  if(published === false) {
    publishedAt = null;
  }

  return await client.query(q.Update(q.Ref(q.Collection('posts'), id), {
    data: { title, slug, summary, content, published, publishedAt }
  }));
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