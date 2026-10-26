import { useOutletContext, useParams } from "react-router";
import "../Posts/Posts.css";
function EditPost() {
  const { id } = useParams();

  return <article>Edit post</article>;
}

export default EditPost;
