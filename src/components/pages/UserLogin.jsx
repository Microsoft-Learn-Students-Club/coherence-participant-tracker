import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../authentication/firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log(user);

      // Redirect to the dashboard
      nav('/dashboard');
    } catch (error) {
      const errorMessage = error.message;
      console.error(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center">
      <section className="bg-white shadow-md rounded-md p-8 max-w-md w-full text-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">MLSC Coherence 1.0 Participants Tracker</h1>
          <form>
            <div className="mb-4">
              <label htmlFor="email-address" className="block text-gray-600">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            <div>
              <button onClick={onLogin} className="bg-blue-500 text-white py-2 px-4 rounded-md">
                Login
              </button>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}
          </form>
        </div>
      </section>
    </main>
  );
};

export default Login;
