import { useState, useEffect } from "react";
import api from "../api/api.js";

function usePost(id) {
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
    if (isPending) {
      getPost();
    }
  }, [id, isPending]);

  return { post, setPost, isPending, error, setPending };
}

export default usePost;
