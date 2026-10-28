import "./Posts.css";
import {
  Link,
  Outlet,
  useNavigate,
  useOutlet,
  useOutletContext,
  useParams,
  useLocation,
} from "react-router";
import { createContext, useContext, useState, useEffect } from "react";
import Error from "../../Components/Error/Error.jsx";
import usePost from "../../hooks/usePost.jsx";
import usePosts from "../../hooks/usePosts.jsx";
import api from "../../api/api.js";

const PostsContext = createContext();

function ListPosts() {
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const { posts, setPosts, error, isPending, setPending, refetch, setRefetch } =
    usePosts(page);
  const navigate = useNavigate();

  function handleLoadMore(e) {
    setPage(page + 1);
    setPending(true);
  }

  return (
    <section className="posts">
      <aside>
        {error ? <Error error={error} /> : null}
        <h1>All your posts</h1>

        {isPending || refetch ? (
          <ul className="links">
            <li className="loading"></li>
            <li className="loading"></li>
            <li className="loading"></li>
            <li className="loading"></li>
            <li className="loading"></li>
            <li className="loading"></li>
          </ul>
        ) : posts ? (
          <ul className="links">
            {posts.map((post, index) => {
              const link = `/posts/${post.id}`;
              return (
                <PostTitle
                  link={link}
                  title={posts[index].title}
                  key={posts[index].id}
                  clickHandler={(e) => {
                    e.preventDefault();
                    setSelected(index);
                    navigate(link);
                  }}
                />
              );
            })}
          </ul>
        ) : null}
        {isPending && posts.length == 0 ? null : isPending ? (
          <button disabled onClick={handleLoadMore}>
            Load more
          </button>
        ) : (
          <button onClick={handleLoadMore}>Load more</button>
        )}
      </aside>
      <Outlet
        context={{ posts, setPosts, selected, setSelected, setRefetch }}
      ></Outlet>
    </section>
  );
}

function PostTitle({ link, title, clickHandler }) {
  return (
    <li>
      <a href={link} onClick={clickHandler}>
        {title}
      </a>
    </li>
  );
}

function Post() {
  const { id } = useParams();
  const { posts, setRefetch } = useOutletContext();
  const { post, setPost, isPending, setPending, error } = usePost(id);
  const [pendingAction, setPendingAction] = useState("");
  const [errorAction, setErrorAction] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  async function deletePost(e) {
    async function remove() {
      const result = await api.post.deletePost(id);
      setPendingAction("");
      if (result.error) {
        setErrorAction(result.error);
      }
      if (result.post) {
        setRefetch(true);
        navigate("/posts");
      }
    }

    setPendingAction("delete");
    remove();
  }

  async function pubStatusPost(e) {
    async function change() {
      const result = await api.post.updatePost(id, {
        ...post,
        isPublished: !post.isPublished,
      });
      setPendingAction("");
      if (result.error) {
        setErrorAction(result.error);
      }
      if (result.post) {
        setPending(true);
        setPost(null);
      }
    }

    setPendingAction("pub");
    setErrorAction(false);
    change();
  }

  return (
    <>
      {error ? <Error error={error} /> : null}
      {errorAction ? <Error error={error} /> : null}
      {isPending ? (
        <section className="post">
          <article className="post loading">
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
            {pendingAction == "delete" ? (
              <button className="delete" onClick={deletePost} disabled>
                Delete
              </button>
            ) : (
              <button className="delete" onClick={deletePost}>
                Delete
              </button>
            )}
            {pendingAction == "pub" ? (
              <button
                className={post.isPublished ? "unpub" : "pub"}
                onClick={pubStatusPost}
                disabled
              >
                {post.isPublished ? "Unpublish" : "Publish"}
              </button>
            ) : (
              <button
                className={post.isPublished ? "unpub" : "pub"}
                onClick={pubStatusPost}
              >
                {post.isPublished ? "Unpublish" : "Publish"}
              </button>
            )}
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
