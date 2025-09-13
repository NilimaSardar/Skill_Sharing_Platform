import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BackgroundDesgin from '../components/BackgroundDesgin';
import { useAuth } from '../store/auth';

export default function Register() {
  const [user, setUser] = useState({
    email: '',
    password_hash: '',
    confirm_Password: '',
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => { 
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password_hash !== user.confirm_Password) {
      // toast.error("Passwords do not match");
      alert("Passwords do not match");
      return;
    }

    try {
      // console.log(user);
      
      const response = await fetch(`http://localhost:8000/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          password: user.password_hash,
        }),
      });
      // console.log(response);
      

      const res_data = await response.json();

      if (response.ok) {
        // console.log("response from server",res_data);
        storeTokenInLS(res_data.token);

        setUser({ email: "", password_hash: "", confirm_Password: "" });
        // toast.success("Registration Successful..");
        alert("Registration Successful..");
      
        navigate("/dashboard");
      } else {
        // toast.error(res_data.extraDetails || res_data.message);
        alert(res_data.extraDetails || res_data.message);
      }
    } catch (error) {
      console.log("register", error);
    }
  }
  return (
    <div className="min-h-screen bg-white px-[40px] flex items-center justify-center font-inter relative overflow-hidden">

    <BackgroundDesgin/>
      <div className="z-10 flex flex-col justify-center gap-[30px] w-full sm:bg-white sm:w-[500px] sm:shadow-2xl sm:p-10 sm:rounded-3xl">
        <div>
          <h2 className="text-[28px] text-center font-semibold text-primary mb-3">
            Create Account
          </h2>
          <p className="text-black  text-[16px] font-medium text-center">
          Create an account so you can <br />explore all the existing jobs
          </p>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                id="email"
                name='email'
                className="w-full px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-input-bg text-gray-800 placeholder-input"
                placeholder="Email"
                value={user.email}
                autoComplete='off'
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <input
                type="password"
                id="password"
                name='password_hash'
                className="w-full px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-input-bg text-gray-800 placeholder-input"
                placeholder="Password"
                value={user.password_hash}
                autoComplete='off'
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <input
                type="password"
                id="confirm-password"
                name='confirm_Password'
                className="w-full px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-input-bg text-gray-800 placeholder-input"
                placeholder="Confirm Password"
                value={user.confirm_Password}
                autoComplete='off'
                onChange={handleInput}
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
            <Link to='/login'>Already have an account</Link>
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