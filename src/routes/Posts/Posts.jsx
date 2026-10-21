import useAuth from "../../hooks/useAuth";
import "./Posts.css";

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
  const { index } = useParams();

  let post = posts[index];

  return (
    <article>
      <Link to="edit">Edit</Link>
      <Link to="delete">Delete</Link>
      {!post.is_published ? (
        <Link to="publish">Publish</Link>
      ) : (
        <Link to="unpublish">Unpublish</Link>
      )}
      <Link to=""></Link>

      {posts[index].content}
    </article>
  );
}

export { Posts, ViewPost };
