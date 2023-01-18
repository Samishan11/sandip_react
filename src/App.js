import Routing from "./Routing";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from "./context/userContext";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <UserProvider>
        <Routing />
      </UserProvider>
    </div>
  );
}

export default App;
