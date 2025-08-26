import React, { useState } from 'react';
import BackgroundDesgin from '../components/BackgroundDesgin';
import { Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {

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
            <form onSubmit={handleSignIn} className="space-y-6">
              <div>
                <input
                  type="email"
                  id="email"
                  className="w-full px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-input-bg text-gray-800 placeholder-input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <input
                  type="password"
                  id="password"
                  className="w-full px-5 py-3  rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-input-bg text-gray-800 placeholder-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <p className='text-primary text-right text-[14px] font-medium'>Forgot your password?</p>

              <button
                type="submit"
                className="w-full bg-primary text-[16px] text-white py-3 rounded-xl hover:bg-secondary transition duration-300 ease-in-out font-semibold text-lg drop-shadow-[0px_10px_20px_#CBD6FF]"
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