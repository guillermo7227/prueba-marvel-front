import 'assets/App.css';
import Comic from "features/comic/components/Comic";
import Favorite from "features/favorite/components/Favorite"
import Auth from "features/auth/components/Auth"
import Home from "features/home/components/Home"
import Layout from "features/layout/components/Layout"
import Toast from "components/Toast";

import {Routes , Route } from "react-router-dom"; 
import NotFound from "components/NotFound"; 
import {default as HG} from "helpers/helpers";


function App() {

  return (
    <div className="App text-white">


      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="comic" element={<Comic />} />
          <Route path="favorite" element={<Favorite />} />
          <Route path="auth" element={<Auth />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>


      <Toast/>
    </div>
  );
}

export default App;
