import { useNavigate, useOutletContext, useParams } from "react-router";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Editor from "../../Components/Editor/Editor.jsx";
import Error from "../../Components/Error/Error.jsx";
import "../Posts/Posts.css";
import api from "../../api/api.js";
import usePost from "../../hooks/usePost.jsx";

function EditPost() {
  const { id } = useParams();
  const { setRefetch } = useOutletContext();
  const { post, isPending, error } = usePost(id);
  const [title, setTitle] = useState("");
  const titleRef = useRef(null);

  const [isPendingSave, setPendingSave] = useState();
  const [errorSave, setErrorSave] = useState(null);

  const navigate = useNavigate();

  const editorRef = useRef(null);

  useEffect(() => {
    if (post) {
      titleRef.current.value = post.title;
    }
  }, [post]);

  async function saveEdit(id, title, content) {
    try {
      const result = await api.post.updatePost(id, { title, content });
      if (result.error) {
        setErrorSave(result.error);
        setPendingSave(false);
      }

      if (result.post) {
        setRefetch(true);
        navigate(`/posts/${id}`);
      }
    } catch (error) {
      setErrorSave(error);
      setPendingSave(null);
    }
  }

  function editPost(e) {
    if (editorRef.current) {
      setPendingSave(true);
      setErrorSave(null);
      saveEdit(id, title, editorRef.current.getContent());
    }
  }

  function changeHandler(e) {
    setTitle(e.target.value);
  }

  return (
    <section className="post">
      {errorSave ? <Error error={errorSave} /> : null}
      {error ? <Error error={error} /> : null}
      <h1>Edit Post </h1>
      <form>
        <label htmlFor="title">
          <h2>Title</h2>
          <input
            id="title"
            ref={titleRef}
            placeholder="My post"
            type="text"
            value={title}
            onChange={changeHandler}
            required
          />
        </label>
        <Editor
          editorRef={editorRef}
          initialValue={
            isPending
              ? "Loading post content"
              : post
                ? post.content
                : error
                  ? "Error loading post content"
                  : null
          }
        />
        {isPending || isPendingSave ? (
          <button disabled onClick={editPost}>
            Save
          </button>
        ) : (
          <button onClick={editPost}>Save</button>
        )}
      </form>
    </section>
  );
}

export default EditPost;
