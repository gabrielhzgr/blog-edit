import { createBrowserRouter } from "react-router";

import Home from "./routes/Home/Home.jsx";
import { Login } from "./routes/Login/Login.jsx";
import ErrorPage from "./routes/ErrorPage/ErrorPage.jsx";
import CreatePost from "./routes/CreatePost/CreatePost.jsx";
import { ListPosts, Post, DefaultPost } from "./routes/Posts/Posts.jsx";
import IsAuthorized from "./Components/IsAuthorized.jsx/IsAuthorized.jsx";
import EditPost from "./routes/EditPost/EditPost.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "posts",
        element: (
          <IsAuthorized>
            <ListPosts></ListPosts>
          </IsAuthorized>
        ),
        children: [
          { index: true, element: <DefaultPost /> },
          {
            path: ":index",
            children: [
              { index: true, element: <Post /> },
              { path: "edit", element: <EditPost /> },
            ],
          },
        ],
      },
      { path: "new-post", element: <CreatePost /> },
    ],
  },

  { path: "login", element: <Login />, errorElement: <ErrorPage /> },
]);

export default router;
