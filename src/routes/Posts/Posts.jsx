import "./Posts.css";
import {
  Link,
  Outlet,
  useNavigate,
  useOutlet,
  useOutletContext,
  useParams,
} from "react-router";
import { createContext, useContext, useState, useEffect } from "react";
import Error from "../../Components/Error/Error.jsx";
import usePost from "../../hooks/usePost.jsx";
import usePosts from "../../hooks/usePosts.jsx";

const PostsContext = createContext();

function ListPosts() {
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const { posts, setPosts, error, isPending, setPending, setRefetch } =
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
  const { posts } = useOutletContext();
  const { post, isPending, error } = usePost(id);

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
