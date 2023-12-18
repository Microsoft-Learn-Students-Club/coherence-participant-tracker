import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../authentication/firebase";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Coherence_Logo.png";

const Login = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Signed in successfully", user);

      // Redirect to the dashboard
      nav("/dashboard");
    } catch (error) {
      const errorMessage = error.message;
      console.error(errorMessage);
      setError(errorMessage);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-950">
      <section className="bg-transparent rounded-md p-8 max-w-md w-full text-center">
        <div className="flex flex-col items-center justify-center">
          <img
            src={Logo} // Replace with the actual path to your logo image
            alt="Logo"
            className="mb-4"
            style={{ width: "425px", height: "200px" }} // Adjust the width and height as needed
          />
          <h1 className="text-4xl font-semibold text-white">Participant Tracker</h1><br />
          <form>
            <div className="mb-4">
              <label htmlFor="email-address" className="block text-white">
                Email address
              </label>
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
              <label htmlFor="password" className="block text-white">
                Password
              </label>
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
              <button
                onClick={onLogin}
                className="bg-purple-800 text-white py-2 px-4 rounded-md"
              >
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
