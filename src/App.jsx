import { Toaster } from "react-hot-toast";
import { HomePage } from "./pages/HomePage/HomePage";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <HomePage />
    </>
  );
}

export default App;
