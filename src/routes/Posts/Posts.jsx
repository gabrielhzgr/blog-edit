import useAuth from "../../hooks/useAuth";
import "./Posts.css";

import { Link, Outlet, useOutletContext, useParams } from "react-router";
import { useEffect, useState } from "react";

function ListPosts() {
  const posts = [{ id: 1, title: "blah", content: "fork" }];

  useEffect(() => {});

  return (
    <section className="posts">
      <aside>
        <h1>All your posts</h1>
        {posts.map((post, index) => {
          return <Link to={`${index}`}>{post.title}</Link>;
        })}
      </aside>
      <Outlet context={{ posts }}></Outlet>
    </section>
  );
}

function Post() {
  const { posts } = useOutletContext();
  const { index } = useParams();

  let post = posts[index];

  return (
    <article>
      <ul className="action-menu">
        <Link to="edit">Edit</Link>
        <Link to="delete">Delete</Link>
        {!post.is_published ? (
          <Link to="publish">Publish</Link>
        ) : (
          <Link to="unpublish">Unpublish</Link>
        )}
      </ul>
      <p className="content">{posts[index].content}</p>
    </article>
  );
}

function DefaultPost() {
  return <article>Select a post</article>;
}

export { ListPosts, Post, DefaultPost };
