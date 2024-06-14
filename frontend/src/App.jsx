import Login from "./pages/login/Login";
import SignUp from "./pages/signup/Signup";
import { Route,Routes, } from "react-router-dom";

function App() {
  return (
    <div className="h-screen flex items-center justify-center p-4">
      <SignUp />
    </div>
  );
}

export default App;
