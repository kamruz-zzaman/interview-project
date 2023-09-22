import { Routes, Route } from "react-router-dom";
import Problem1 from "./components/Problem-1.jsx";
import Menu from "./components/Menu.jsx";
import Problem2 from "./components/Problem-2.jsx";
import Index from "./components/Index.jsx";
import axios from "axios";
import AllContacts from "./components/AllContacts.jsx";
import UsContacts from "./components/USContacts.jsx";

function App() {
  axios.defaults.baseURL = "https://contact.mediusware.com/api";
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/" element={<Menu />}>
          <Route path="problem-1" element={<Problem1 />} />
          <Route path="problem-2" element={<Problem2 />} />
        </Route>
        <Route path="/all-contacts" element={<AllContacts />} />
        <Route path="/us-contacts" element={<UsContacts />} />
      </Routes>
    </>
  );
}

export default App;
