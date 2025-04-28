import NewLayout from './Components/NewLayout';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
    return (
      <GoogleOAuthProvider clientId="36725386391-t09kkkhma2tkfamqqgreshpg411s4002.apps.googleusercontent.com">
        <div className="App">
            <NewLayout />
        </div>
      </GoogleOAuthProvider>
        
  );
}

export default App;
