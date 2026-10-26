import "./CreatePost.css";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import api from "../../api/api.js";
import useAuth from "../../hooks/useAuth.jsx";
function CreatePost() {
  const editorRef = useRef(null);
  const { user } = useAuth();
  const [title, setTitle] = useState();
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const [content, setContent] = useState(null);

  const navigate = useNavigate();

  console.log(content);

  useEffect(() => {
    async function createPost() {
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
        setContent(null);
        navigate("/posts");
      }
    }

    if (isPending) {
      createPost();
    }
  }, [isPending]);

  function changeHandler(e) {
    setTitle(e.target.value);
  }

  const savePost = async () => {
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      setContent(content);
      setPending(true);
    }
  };
  return (
    <main className="create-post">
      <h1>New post</h1>
      <section>
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
          apiKey={import.meta.env.VITE_TINY_API_KEY}
          onInit={(evt, editor) => (editorRef.current = editor)}
          initialValue="<p>This is the initial content of the editor.</p>"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        {isPending ? (
          <button disabled onClick={savePost}>
            Save post
          </button>
        ) : (
          <button onClick={savePost}>Save post</button>
        )}
      </section>
    </main>
  );
}

export default CreatePost;
