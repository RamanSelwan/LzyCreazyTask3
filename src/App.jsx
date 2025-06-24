import "./App.css";
import EnquireForm from "./pages/EnquireForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Services from "./pages/service";
function App() {
  return (
    <div>
    
        <Routes>
          <Route path="/" element={<Services />} />
          <Route path="/enquire" element={<EnquireForm />} />
          {/* Add more service routes here if needed */}
        </Routes>
   
    </div>
  );
}

export default App;
