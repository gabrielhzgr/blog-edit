import { createBrowserRouter } from "react-router";

import Home from "./routes/Home/Home.jsx";
import { Login } from "./routes/Login/Login.jsx";
import ErrorPage from "./routes/ErrorPage/ErrorPage.jsx";
import CreateBlog from "./routes/CreateBlog/CreateBlog.jsx";
import { Posts, ViewPost } from "./routes/Posts/Posts.jsx";
import IsAuthorized from "./Components/IsAuthorized.jsx/IsAuthorized.jsx";
import EditPost from "./routes/EditPost/EditPost.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "posts",
        element: (
          <IsAuthorized>
            <Posts></Posts>
          </IsAuthorized>
        ),
        children: [
          { index: true, element: <>Select a post</> },
          {
            path: ":index",
            children: [
              { index: true, element: <ViewPost /> },
              { path: "edit", element: <EditPost /> },
            ],
          },
        ],
      },
    ],
  },
  {},
  { path: "login", element: <Login /> },
]);

export default router;
