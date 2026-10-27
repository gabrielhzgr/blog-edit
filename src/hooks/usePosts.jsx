import { useState, useEffect } from "react";
import api from "../api/api.js";

function usePosts(page) {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setPending] = useState(true);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    async function getPosts() {
      try {
        const result = await api.post.getPosts(page);

        if (refetch) {
          setRefetch(false);
        }
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

    getPosts();
  }, [page, refetch]);

  return { posts, setPosts, error, isPending, setPending, setRefetch };
}

export default usePosts;
