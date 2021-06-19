const fauna = require('faunadb'), q = fauna.query;
const client = new fauna.Client({ secret: process.env.FAUNA_SECRET });

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
  post.id = post.ref.id;
  delete post.ref;
  return post;
};

const getPostBySlug = async (slug) => {
  const post = await client.query(q.Get(q.Match(q.Index('post_by_slug'), [slug])));
  post.id = post.ref.id;
  delete post.ref;
  return post;
};

const createPost = async (title, slug, summary, content, published, userId) => {
  let publishedAt = null;
  if(published === true) {
    publishedAt = Date.now()
  }

  return await client.query(q.Create(q.Collection('posts'), {
    data: { title, slug, summary, content, published, publishedAt, userId }
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

const deletePost = async (id) => {
  return await client.query(q.Delete(q.Ref(q.Collection('posts'), id)));
}

module.exports = {
  getPosts,
  getPost,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost
}