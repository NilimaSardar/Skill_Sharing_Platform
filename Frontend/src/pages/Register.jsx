import React, { useState } from 'react';
import BackgroundDesgin from '../components/BackgroundDesgin';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    // In a real application, you would handle the signup logic here,
    // such as sending data to an API and performing client-side validation.
    console.log('Sign up attempt:', { email, password, confirmPassword });
    if (password !== confirmPassword) {
      // For a production app, use a more user-friendly modal or error message display
      console.error("Passwords do not match!");
      return;
    }
    // Simulate an API call or success message
    alert("Sign up successful! (This is a mock message)");
    // Clear form fields after successful submission
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="min-h-screen bg-white px-[31px] flex items-center justify-center font-inter relative overflow-hidden">

    <BackgroundDesgin/>
      <div className="z-10 flex flex-col justify-center gap-[30px] w-full sm:w-[500px] sm:shadow-2xl sm:p-10 sm:rounded-3xl">
        <div>
          <h2 className="text-[28px] text-center font-bold text-primary mb-3">
            Create Account
          </h2>
          <p className="text-black  text-[16px] font-medium text-center">
          Create an account so you can explore <br /> all the existing jobs
          </p>
        </div>

        <div>
          <form onSubmit={handleSignUp} className="space-y-6">
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
                className="w-full px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-input-bg text-gray-800 placeholder-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                type="password"
                id="confirm-password"
                className="w-full px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-input-bg text-gray-800 placeholder-input"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-[16px] bg-primary text-white py-3 rounded-xl hover:bg-secondary transition duration-300 ease-in-out font-semibold text-lg drop-shadow-[0px_10px_20px_#CBD6FF]"
            >
              Sign up
            </button>
          </form>

          <p className="text-center text-text text-[16px] font-medium mt-8">
            Already have an account
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