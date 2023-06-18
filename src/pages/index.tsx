import type { NextPage } from "next";
import Header from "../components/Header";
import PostForm from "../components/PostForm";
import PostsFeed from "../components/posts/PostsFeed";

const Home: NextPage = () => {
  return (
    <>
      <Header label={"Home"} />
      <PostForm placeholder="What's happening ?" />
      <PostsFeed />
    </>
  );
};

export default Home;
