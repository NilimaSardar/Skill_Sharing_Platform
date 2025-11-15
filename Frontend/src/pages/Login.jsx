import React, { useState } from 'react';
import BackgroundDesgin from '../components/BackgroundDesgin';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

export default function Login() {
  const [userInput, setUserInput] = useState({
    email: '',
    password_hash: '',
  });

  const navigate = useNavigate();
  const { storeTokenInLS, API } = useAuth(); // no need for isLoggedIn

  const handleInput = (e) => { 
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userInput.email,
          password: userInput.password_hash,
        }),
      });

      const res_data = await response.json();

      if (response.ok) {
        await storeTokenInLS(res_data.token); // fetches user immediately
        setUserInput({ email: "", password_hash: "" });
        alert("Login Successful..");
        navigate("/dashboard"); // navigate immediately after login
      } else {
        toast(res_data.extraDetails || res_data.message);
      }

    } catch (error) {
      console.log("login", error);
      toast("Internal server error");
    }
  };

  return (
    <div className="min-h-screen bg-white px-[40px] flex items-center justify-center relative overflow-hidden">

      <BackgroundDesgin/>
        <div className="z-10 flex flex-col justify-center gap-[40px] w-full sm:bg-white sm:w-[500px] sm:shadow-2xl sm:p-10 sm:rounded-3xl">
          <div>
            <h2 className="text-[28px] text-center font-semibold text-primary mb-3">
              Login here
            </h2>
            <p className="text-black  text-[16px] font-medium text-center">
              Welcome back you’ve <br /> been missed!
            </p>
          </div>

          <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={userInput.email}
              onChange={handleInput}
              className="w-full px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-input-bg text-gray-800 placeholder-input"
              required
            />

            <input
              type="password"
              name="password_hash"
              placeholder="Password"
              value={userInput.password_hash}
              onChange={handleInput}
              className="w-full px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-input-bg text-gray-800 placeholder-input"
              required
            />

            <p className='text-primary text-right text-[14px] font-medium'>Forgot your password?</p>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-xl hover:bg-secondary transition duration-300 font-semibold"
            >
              Sign in
            </button>
          </form>

            <p className="text-center text-text text-[16px] font-medium mt-8">
              <Link to='/register'>Create new account</Link>
            </p>
          </div>

          <div className="">
            <p className="text-center text-primary text-[16px] font-medium mb-3">
              Or continue with
            </p>
            <div className="flex justify-center space-x-4">

              <button className="flex items-center justify-center w-[60px] h-[44px] bg-icon-bg rounded-[10px] hover:bg-icon-bg-hover transition duration-300 ease-in-out">
                <img src="images/Google.svg" alt="" className='text-3xl'/>
              </button>

              <button className="flex items-center justify-center w-[60px] h-[44px] bg-icon-bg rounded-[10px] hover:bg-icon-bg-hover transition duration-300 ease-in-out">
                <img src="images/Facebook.svg" alt="" className='text-3xl'/>
              </button>

              <button className="flex items-center justify-center w-[60px] h-[44px] bg-icon-bg rounded-[10px] hover:bg-icon-bg-hover transition duration-300 ease-in-out">
                <img src="images/Apple.svg" alt="" className='text-3xl'/>
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}