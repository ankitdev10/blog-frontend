import Home from "./pages/home/Home";
import Topbar from "./components/topbar/Topbar";
import Login from "./pages/login/Login";
import Register from "./pages/resgister/Register";
import Setting from "./pages/settings/Setting";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { Context } from "./context/Context";
import { useContext } from "react";

function App() {
  const {user} = useContext(Context)
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route exact path = "/" element ={<Home />} />
        <Route path = "/register" element ={user ? <Home /> : <Register />} />
        <Route path = "/login" element ={user? <Home /> : <Login />} />
        <Route path = "/logout" element ={user? <Home /> : <Login />} />
        <Route path = "/write" element ={user ? <Write /> : <Login />} />
        <Route path = "/settings" element ={user ? <Setting /> : <Login />} />
        <Route path = "/post/:postID" element ={ <Single /> } />
      </Routes>
    </Router>
  );
}

export default App;
