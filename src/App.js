import Routing from "./Routing";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from "./context/userContext";
import { ApplicantProvider } from "./context/applicantContext";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <UserProvider>
        <ApplicantProvider>
        <Routing />
        </ApplicantProvider>
      </UserProvider>
    </div>
  );
}

export default App;
