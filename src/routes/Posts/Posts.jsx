import useAuth from "../../hooks/useAuth";
import "./Posts.css";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/api";
import {
  Link,
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router";
import { useEffect, useLayoutEffect, useState } from "react";
import Nav from "../../Components/Nav/Nav.jsx";
import Error from "../../Components/Error/Error.jsx";

function ListPosts() {
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setPending] = useState(true);

  useEffect(() => {
    async function getPosts() {
      try {
        const result = await api.post.getPosts(page);
        if (result.error) {
          setError(error);
          setPending(false);
        }

        if (result.posts) {
          if (page == 1) {
            setPosts(result.posts);
            setPending(false);
          } else {
            setPosts([...posts, ...result.posts]);
            setPending(false);
          }
        }
      } catch (err) {
        setPending(false);
        setError(err);
      }
    }
    if (isPending) {
      getPosts();
    }
  }, [page, error, isPending]);

  function handleLoadMore(e) {
    setPage(page + 1);
    setPending(true);
  }

  return (
    <section className="posts">
      <aside>
        {error ? <Error error={error} /> : null}
        <h1>All your posts</h1>
        <ul className="links">
          {posts.map((post, index) => {
            return (
              <PostTitle
                link={`/posts/${post.id}`}
                title={posts[index].title}
              />
            );
          })}
        </ul>
        {isPending ? (
          <span className="loading">
            Loading...
            <span className="material-symbols-outlined">autorenew</span>
          </span>
        ) : null}
        {isPending && posts.length == 0 ? null : isPending ? (
          <button disabled onClick={handleLoadMore}>
            Load more
          </button>
        ) : (
          <button onClick={handleLoadMore}>Load more</button>
        )}
      </aside>
      <Outlet></Outlet>
    </section>
  );
}

function PostTitle({ link, title }) {
  return (
    <li>
      <Link to={link}>{title}</Link>
    </li>
  );
}

function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [isPending, setPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getPost() {
      try {
        const result = await api.post.getPost(id);
        if (result.error) {
          setError(result.error);
          setPending(false);
        }

        if (result.post) {
          setPost(result.post);
          setPending(false);
        }
      } catch (err) {
        setPending(false);
        setError(err);
      }
    }

    getPost();

    return () => {
      setPending(true);
      setPost(null);
    };
  }, [id]);

  return (
    <>
      {error ? <Error error={error} /> : null}
      {isPending ? (
        <section className="post">
          <article className="post">
            Loading...
            <span className="material-symbols-outlined">autorenew</span>
          </article>
        </section>
      ) : null}
      {post ? (
        <section className="post">
          <nav className="actions">
            <Link className="edit" to="edit">
              Edit
            </Link>
            <Link className="delete" to="delete">
              Delete
            </Link>
            <Link
              className={post.isPublished ? "unpublish" : "publish"}
              to={`${post.isPublished ? "unpublish" : "publish"}`}
            >
              {post.isPublished ? "Unpublish" : "Publish"}
            </Link>
          </nav>
          <article
            className="post"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></article>
        </section>
      ) : null}
    </>
  );
}

function DefaultPost({ message }) {
  return (
    <section className="post">
      <article>{message}</article>
    </section>
  );
}

export { ListPosts, DefaultPost, Post };
