import useAuth from "../../hooks/useAuth";
import "./Posts.css";
import Fallback from "../Fallback/Fallback";
import { Link, Outlet, useOutletContext, useParams } from "react-router";
import { useEffect, useState } from "react";

function Posts() {
  const { user } = useAuth();

  const posts = [{ id: 1, title: "blah", content: "fork" }];

  return (
    <section>
      <aside>
        {posts.map((post, index) => {
          return <Link to={`${index}`}>{post.title}</Link>;
        })}
      </aside>
      <Outlet context={{ posts }}></Outlet>
    </section>
  );
}

function ViewPost() {
  const { posts } = useOutletContext();
  const { postId } = useParams();

  console.log(posts);

  return <article>{posts[postId].content}</article>;
}

export { Posts, ViewPost };
