import React from "react";
import Navbar from "./components/Navbar";
import Modal from "react-modal";
Modal.setAppElement("#root");
const App = (props) => {
  return (
    <div>
      <Navbar />
    </div>
  );
};

export default App;
