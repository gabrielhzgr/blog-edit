import "./CreatePost.css";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
//import { Editor } from "@tinymce/tinymce-react";
import api from "../../api/api.js";
import useAuth from "../../hooks/useAuth.jsx";
import Editor from "../../Components/Editor/Editor.jsx";
import Error from "../../Components/Error/Error.jsx";
function CreatePost() {
  const editorRef = useRef(null);
  const { user } = useAuth();
  const [title, setTitle] = useState();
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  async function createPost(content) {
    try {
      console.log(editorRef);

      const result = await api.post.create({
        title,
        content,
        authorId: user.id,
      });
      if (result.error) {
        setError(result.error);
        setPending(false);
      }

      if (result.post) {
        navigate("/posts");
      }
    } catch (err) {
      setError(error);
    }
  }

  function changeHandler(e) {
    setTitle(e.target.value);
  }

  async function savePost() {
    if (editorRef.current) {
      setPending(true);
      createPost(editorRef.current.getContent());
    }
  }
  return (
    <main className="create-post">
      {error && !isPending ? <Error error={error} /> : null}
      <h1>New post</h1>
      <form className="post">
        <label htmlFor="title">
          <h2>Title</h2>
          <input
            id="title"
            placeholder="My post"
            type="text"
            value={title}
            onChange={changeHandler}
            required
          />
        </label>
        <Editor
          editorRef={editorRef}
          initialValue="<p>This is the initial content of the editor.</p>"
        />
        {isPending ? (
          <button disabled onClick={savePost}>
            Save post
          </button>
        ) : (
          <button onClick={savePost}>Save post</button>
        )}
      </form>
    </main>
  );
}

export default CreatePost;
