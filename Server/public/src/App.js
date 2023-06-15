import Login from './Login/Login.js';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import SignUp from './Signup/SignUp.js';
import Chats from './Chats/Chats.js';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" Component= {Login}></Route>
      <Route path="/SignUp" Component= {SignUp}></Route>
      <Route path="/Chats" Component= {Chats}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
