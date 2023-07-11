import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Itemlist from "./pages/Itemlist";
import Editproduct from "./pages/Editproduct";
import Addproduct from "./pages/Addproduct";
import Removeproduct from "./pages/Removeproduct";

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Itemlist />} />
        <Route path="/edit-product/:id" element={<Editproduct />} />
        <Route path="/removeproduct" element={<Removeproduct />} />
        <Route path="/addproduct" element={<Addproduct />} />
      </Routes>
    </>
  );
};

export default App;
