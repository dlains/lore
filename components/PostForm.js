import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

export default function PostForm({ post }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      title: post ? post.data.title : '',
      slug: post ? post.data.slug : '',
      summary: post ? post.data.summary : '',
      content: post ? post.data.content : '',
    },
  });

  const createPost = async (data) => {
    console.log(data);
  };

  const updatePost = async (data) => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(post ? updatePost : createPost)}>
      <div className="mb-4">
        <label
          className="block text-sm font-bold mb-1"
          htmlFor="title"
        >
          Title
        </label>
        <input
            type="text"
            id="title"
            name="title"
            className="w-full border bg-white rounded px-3 py-2 outline-none text-gray-700"
            placeholder="Post title"
            {...register("title", { required: true })}
        />
        {errors.title && (
            <p className="font-bold text-red-900">Title is required</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-bold mb-1"
          htmlFor="slug"
        >
          Slug
        </label>
        <input
            type="text"
            id="slug"
            name="slug"
            className="w-full border bg-white rounded px-3 py-2 outline-none text-gray-700"
            placeholder="Unique identifier for the Post"
            {...register("slug", { required: true })}
        />
        {errors.slug && (
          <p className="font-bold text-red-900">Slug is required</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="block text-sm font-bold mb-1"
          htmlFor="summary"
        >
          Summary
        </label>
        <textarea
            name="summary"
            id="summary"
            rows="2"
            className="resize-none w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
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
        <label
          className="block text-sm font-bold mb-1"
          htmlFor="content"
        >
          Content
        </label>
        <textarea
            name="content"
            id="content"
            rows="6"
            className="resize-none w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            placeholder="The Post content."
            {...register("content", { required: true })}
          ></textarea>
          {errors.content && (
            <p className="font-bold text-red-900">
              Post content is required.
            </p>
          )}
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
    </form>
  );
}