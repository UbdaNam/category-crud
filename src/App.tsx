import { useState } from "react";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";

function App() {
  const [scale, setScale] = useState(100);

  return (
    <div className="App">
      <Header setZoom={setScale} zoomPercent={scale} />
      <Home zoomPercent={scale} />
    </div>
  );
}

export default App;
