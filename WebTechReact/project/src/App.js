
import { Routes, Route, BrowserRouter } from "react-router-dom";
import DatatablePage2 from "./CampTable";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DatatablePage2 />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
