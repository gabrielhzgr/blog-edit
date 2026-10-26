import { createBrowserRouter } from "react-router";

import Home from "./routes/Home/Home.jsx";
import { Login } from "./routes/Login/Login.jsx";
import ErrorPage from "./routes/ErrorPage/ErrorPage.jsx";
import CreatePost from "./routes/CreatePost/CreatePost.jsx";
import { ListPosts, DefaultPost, Post } from "./routes/Posts/Posts.jsx";
import IsAuthenticated from "./Components/IsAuthenticated.jsx/IsAuthenticated.jsx";
import IsAuthorized from "./Components/IsAuthorized/IsAuthorized.jsx";
import EditPost from "./routes/EditPost/EditPost.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "posts",
        element: (
          <IsAuthenticated>
            <IsAuthorized>
              <QueryClientProvider client={queryClient}>
                <ListPosts></ListPosts>
              </QueryClientProvider>
            </IsAuthorized>
          </IsAuthenticated>
        ),
        children: [
          { index: true, element: <DefaultPost message="Select a post" /> },
          {
            path: ":id",

            children: [
              { index: true, element: <Post /> },
              { path: "edit", element: <EditPost /> },
            ],
          },
        ],
      },
      {
        path: "new-post",
        element: <CreatePost />,
      },
    ],
  },

  {
    path: "login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

export default router;
