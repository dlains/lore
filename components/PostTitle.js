const PostTitle = ({ children })  => {
  return (
    <h1 className="text-2xl text-gray-600 tracking-wider leading-loose">
      { children }
    </h1>
  );
}

export default PostTitle;