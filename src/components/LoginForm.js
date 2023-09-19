import React, { useState } from 'react';
import { auth } from '../auth'; // Imported the firebase.js file you created in your src folder
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import React Toastify components and functions
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for React Toastify

function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [buttonLoader, setButtonLoader] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail('');
        setButtonLoader(false);
        toast.success('Login successful!', {
          autoClose: 2000,
          onClose: () => {
            navigate('/gallery');
          },
        });
      })
      .catch(() => {
        setPassword('');
        setButtonLoader(false);
        toast.error('Wrong email or password', {
          autoClose: 3000,
        });
      });
  };

  return (
    <div>
      <ToastContainer /> {/* Add the ToastContainer component */}
      <form className="form" onSubmit={handleSubmit}>
        <label>Email
          <input
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <label>
          Password
          <input
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <br />
        <div className="button-container">
          <button
            type="submit"
            className={`${buttonLoader ? 'buttonLoader' : 'button'}`}
            disabled={buttonLoader}
          >
            {buttonLoader ? 'Logging in...' : 'LOG IN'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
