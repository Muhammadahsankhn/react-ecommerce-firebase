import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { doSignInWithEmailAndPassword, doSignInWithGoogle, doCreateUserWithEmailAndPassword } from '../../Firebase/auth';
import { useAuth } from '../../context/authContext';
import { db } from '../../Firebase/firebase';
import { setDoc, doc } from 'firebase/firestore';


const LoginSignup = () => {
  useAuth();
  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isSigningIn) {
      setIsSigningIn(true);

      try {
        if (isRegistering) {
          const userCredential = await doCreateUserWithEmailAndPassword(email, password);
          const user = userCredential.user;

          // Save user info to Firestore
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            name: name,
            email: user.email,
            createdAt: new Date()
          });

          // Show success alert
          alert('User registered successfully!');
          navigate('/home');
        } else {
          await doSignInWithEmailAndPassword(email, password);
          
          // Show success alert
          alert('Login successful!');
          navigate('/home');
        }
      } catch (err) {
        setError(err.message);
      }

      setIsSigningIn(false);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    if (!isSigningIn) {
      setIsSigningIn(true);

      try {
        await doSignInWithGoogle();

        // Show success alert
        alert('Login successful with Google!');
        navigate('/home');
      } catch (err) {
        setError(err.message);
        setIsSigningIn(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          {isRegistering ? 'Register' : 'Login'}
        </h2>

        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        <div className="space-y-4">
          {isRegistering && (
            <div className="flex items-center border rounded-lg px-3 py-2 gap-2">
              <PersonIcon className="text-gray-500" />
              <input
                className="w-full outline-none"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="flex items-center border rounded-lg px-3 py-2 gap-2">
            <EmailIcon className="text-gray-500" />
            <input
              className="w-full outline-none"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center border rounded-lg px-3 py-2 gap-2">
            <LockIcon className="text-gray-500" />
            <input
              className="w-full outline-none"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition duration-200"
        >
          {isRegistering ? 'Register' : 'Login'}
        </button>

        <button
          onClick={handleGoogleSignIn}
          className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition duration-200"
        >
          Continue with Google
        </button>

        <div className="flex justify-center space-x-6 mt-6">
          <button
            type="button"
            className={`px-6 py-2 rounded-lg transition duration-200 ${
              isRegistering
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setIsRegistering(true)}
          >
            Sign Up
          </button>

          <button
            type="button"
            className={`px-6 py-2 rounded-lg transition duration-200 ${
              !isRegistering
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => setIsRegistering(false)}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginSignup;
