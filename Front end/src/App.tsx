import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostPage from "./pages/PostPage";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import MyPosts from "./pages/MyPosts";
import TagPosts from "./pages/TagPosts";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/posts/:id"
          element={<PostPage />}
        />

        <Route
          path="/create"
          element={<CreatePost />}
        />

        <Route
          path="/edit/:id"
          element={<EditPost />}
        />

        <Route
          path="/my-posts"
          element={<MyPosts />}
        />

        <Route
          path="/tags/:id"
          element={<TagPosts />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;