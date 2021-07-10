import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

export default function PostForm({ post }) {
  if(post) {
    post = JSON.parse(post);
  }

  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: post ? post.title : '',
      slug: post ? post.slug : '',
      banner: post ? post.banner : '',
      summary: post ? post.summary : '',
      content: post ? post.content : '',
      published: post ? post.published : false
    },
  });

  const uploadBanners = async (files) => {
    try {
      for(let i = 0; i < files.length; i++) {
        const file = files.item(i);
        const filename = encodeURIComponent(file.name);
        const response = await fetch(`/api/uploadUrl?file=${filename}&type=${file.type}`);
        const { url, fields } = await response.json();
        const formData = new FormData();
    
        Object.entries({ ...fields, file }).forEach(([key, value]) => {
          formData.append(key, value);
        });
    
        const upload = await fetch(url, {
          method: 'POST',
          body: formData
        });

        // Probably need to send a response back to the function
        // so it can handle success and error states.
        if(upload.ok) {
          console.log('Uploded banner successfully.');
        } else {
          console.error('Upload banner failed.');
        }
      };
    } catch(error) {
      console.error(error);
    }
  };

  const createPost = async (data) => {
    const { title, slug, banner, summary, content, published } = data;

    let filename = null;
    if(banner) {
      await uploadBanners(banner);
      filename = encodeURIComponent(banner[0].name);
    }

    try {
      await fetch('/api/createPost', {
        method: 'POST',
        body: JSON.stringify({ title, slug, banner: filename, summary, content, published }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      router.push('/');
    } catch(error) {
      console.error(error);
    }
  };

  const updatePost = async (data) => {
    console.log(data);
    const { title, slug, summary, content, published } = data;
    const id = post.id;
    const publishedChanged = published !== post.published;

    try {
      await fetch('/api/updatePost', {
        method: 'PUT',
        body: JSON.stringify({ id, title, slug, summary, content, published, publishedChanged }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      router.push('/');
    } catch(error) {
      console.error(error);
    }
  };

  const deletePost = async () => {
    console.log(`Deleting post ${post.id}.`);
    try {
        await fetch('/api/deletePost', {
            method: 'DELETE',
            body: JSON.stringify({ id: post.id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        router.push('/');
    } catch (err) {
        console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(post ? updatePost : createPost)}>
      <div className="mb-4">
        <label htmlFor="title" className="text-gray-700">Title</label>
        <input
            type="text"
            id="title"
            name="title"
            className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            placeholder="Post title"
            {...register("title", { required: true })}
        />
        {errors.title && (
            <p className="font-bold text-red-900">Title is required</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="slug" className="text-gray-700">Slug</label>
        <input
            type="text"
            id="slug"
            name="slug"
            className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            placeholder="Unique identifier for the Post"
            {...register("slug", { required: true })}
        />
        {errors.slug && (
          <p className="font-bold text-red-900">Slug is required</p>
        )}
      </div>
      <div className="mb-4">
          <label htmlFor="banner" className="text-gray-700">Banner</label>
          <input
            type="file"
            id="banner"
            name="banner"
            className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            placeholder="Banner image for the Post"
            {...register("banner")}
          />
      </div>
      <div className="mb-4">
        <label htmlFor="summary" className="text-gray-700">Summary</label>
        <textarea
            name="summary"
            id="summary"
            rows="2"
            className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            placeholder="A short summary of the Post content."
            {...register("summary", { required: true })}
          ></textarea>
          {errors.summary && (
            <p className="font-bold text-red-900">
              Summary is required.
            </p>
          )}
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="text-gray-700">Content</label>
        <textarea
            name="content"
            id="content"
            rows="6"
            className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
            placeholder="The Post content."
            {...register("content", { required: true })}
          ></textarea>
          {errors.content && (
            <p className="font-bold text-red-900">
              Post content is required.
            </p>
          )}
      </div>
      <div className="mb-4">
        <input
            type="checkbox"
            name="published"
            id="published"
            className="rounded bg-gray-200 border-transparent focus:border-transparent focus:bg-gray-200 text-gray-700 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500"
            {...register("published")}
          ></input>
        <label htmlFor="published" className="text-gray-700 ml-2">Published</label>
      </div>
      <button
        className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
        type="submit"
      >
        Save
      </button>
      <Link href="/">
        <a className="mt-3 inline-block bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
          Cancel
        </a>
      </Link>
      {post && (
        <button
            className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            type="button"
            onClick={deletePost}
        >
          Delete
        </button>
      )}
    </form>
  );
}