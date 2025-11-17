import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";


const ProfileSetting = () => {
    const navigate = useNavigate();
    
  return (
    <div>
        <div className='flex items-center justify-between px-[28px] py-5 bg-primary text-white'>
            <div onClick={() => navigate(-1)} className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer">
              <img src="../../images/BackArrow.svg" alt="notification bell" className='w-[25px] h-[25px]'/>
            </div>
          <h3 className='font-serif w-full text-center text-xl mr-5'>Settings</h3>
        </div>

        <div className='mx-[28px] py-2'>
            {/* profile */}
            <div className="flex flex-col justify-center">
                <div className="flex flex-col items-center">
                    <div className="relative w-[85px] h-[85px] flex items-center justify-center cursor-pointer">
                    <img
                    src="../../profile/Nilima.jpeg"
                    alt=""
                    className="w-[80px] h-[80px] rounded-full object-cover border-2 border-primary-light shadow"
                    />
                    {/* Edit button */}
                    <img src="../../images/Edit.svg" alt="" className="absolute bottom-1 right-1 border-1 border-white rounded-full"/>
                    </div>
                    <p className="text-[18px] text-center font-medium mt-2">Nilima Sardar</p>
                    <p className='text-[#737373]'>nilima@gmail.com</p>
                </div>

            </div>

            {/* All Settings */}
            <div className='mt-4 mb-28'>
                {/* Personal & Account */}
                <div className='mt-3'>
                    <h2 className='text-text text-lg'>Personal & Account</h2>
                    <div className='flex flex-col gap-1 py-2'>
                        <div className='flex justify-between items-center w-full border-b border-[rgba(217,217,217,0.4)] py-2'>
                            <div className='flex gap-3'>
                                <img src="../../profileSettings/editInformation.svg" alt="" className='w-[23px] h-[23px]'/>
                                <p className='text-[#737373] text-[15px]'>Edit Information</p>
                            </div>
                            <img src="../../profileSettings/GoTo.svg" alt="" className='w-[15px] h-[15px]'/>
                        </div>
                        
                        <div className='flex justify-between items-center w-full border-b border-[rgba(217,217,217,0.4)] py-2'>
                            <div className='flex gap-3'>
                                <img src="../../profileSettings/ChangePassword.svg" alt="" className='w-[23px] h-[23px]'/>
                                <p className='text-[#737373] text-[15px]'>Change Password</p>
                            </div>
                            <img src="../../profileSettings/GoTo.svg" alt="" className='w-[15px] h-[15px]'/>
                        </div>

                        <div className='flex justify-between items-center w-full py-2'>
                            <div className='flex gap-3'>
                                <img src="../../profileSettings/email.svg" alt="" className='w-[23px] h-[23px]'/>
                                <p className='text-[#737373] text-[15px]'>Email & Phone Number</p>
                            </div>
                            <img src="../../profileSettings/GoTo.svg" alt="" className='w-[15px] h-[15px]'/>
                        </div>
                    </div>
                </div>

                {/* App Peference */}
                <div className='mt-3'>
                    <h2 className='text-text text-lg'>App Preference</h2>
                    <div className='flex flex-col gap-1 py-2'>
                        <div className='flex justify-between items-center w-full border-b border-[rgba(217,217,217,0.4)] py-2'>
                            <div className='flex gap-3'>
                                <img src="../../profileSettings/notification.svg" alt="" className='w-[23px] h-[23px]'/>
                                <p className='text-[#737373] text-[15px]'>Push Notification</p>
                            </div>

                            {/* Toggle Switch */}
                            <label className='relative inline-flex items-center cursor-pointer'>
                                <input type='checkbox' className='sr-only peer' />
                                <div className='w-10 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-500 after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5'></div>
                            </label>
                        </div>
                        
                        <div className='flex justify-between items-center w-full border-b border-[rgba(217,217,217,0.4)] py-2'>
                            <div className='flex gap-3'>
                                <img src="../../profileSettings/darkmode.svg" alt="" className='w-[23px] h-[23px]'/>
                                <p className='text-[#737373] text-[15px]'>Dark Mode</p>
                            </div>
                            
                            {/* Toggle Switch */}
                            <label className='relative inline-flex items-center cursor-pointer'>
                                <input type='checkbox' className='sr-only peer' />
                                <div className='w-10 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-500 after:content-[""] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5'></div>
                            </label>
                        </div>

                        <div className='flex justify-between items-center w-full py-2'>
                            <div className='flex gap-3'>
                                <img src="../../profileSettings/location.svg" alt="" className='w-[23px] h-[23px]'/>
                                <p className='text-[#737373] text-[15px]'>Location</p>
                            </div>
                            <img src="../../profileSettings/GoTo.svg" alt="" className='w-[15px] h-[15px]'/>
                        </div>
                    </div>
                </div>

                {/* Safety & Security */}
                <div className='mt-3'>
                    <h2 className='text-text text-lg'>Safety & Security</h2>
                    <div className='flex flex-col gap-1 py-2'>
                        <div className='flex justify-between items-center w-full border-b border-[rgba(217,217,217,0.4)] py-2'>
                            <div className='flex gap-3'>
                                <img src="../../profileSettings/verification.svg" alt="" className='w-[23px] h-[23px]'/>
                                <p className='text-[#737373] text-[15px]'>Verification Settings</p>
                            </div>
                            <img src="../../profileSettings/GoTo.svg" alt="" className='w-[15px] h-[15px]'/>
                        </div>
                        
                        <div className='flex justify-between items-center w-full border-b border-[rgba(217,217,217,0.4)] py-2'>
                            <div className='flex gap-3'>
                                <img src="../../profileSettings/block.svg" alt="" className='w-[23px] h-[23px]'/>
                                <p className='text-[#737373] text-[15px]'>Block/Report Users</p>
                            </div>
                            <img src="../../profileSettings/GoTo.svg" alt="" className='w-[15px] h-[15px]'/>
                        </div>

                        <div className='flex justify-between items-center w-full py-2'>
                            <div className='flex gap-3'>
                                <img src="../../profileSettings/safety.svg" alt="" className='w-[23px] h-[23px]'/>
                                <p className='text-[#737373] text-[15px]'>Safety Guidelines</p>
                            </div>
                            <img src="../../profileSettings/GoTo.svg" alt="" className='w-[15px] h-[15px]'/>
                        </div>
                    </div>
                </div>

                {/* Support & Legal */}
                <div className='mt-3'>
                    <h2 className='text-text text-lg'>Support & Legal</h2>
                    <div className='flex flex-col gap-1 py-2'>
                        <div className='flex justify-between items-center w-full border-b border-[rgba(217,217,217,0.4)] py-2'>
                            <div className='flex gap-3'>
                                <img src="../../profileSettings/privacy.svg" alt="" className='w-[23px] h-[23px]'/>
                                <p className='text-[#737373] text-[15px]'>Privacy Policy</p>
                            </div>
                            <img src="../../profileSettings/GoTo.svg" alt="" className='w-[15px] h-[15px]'/>
                        </div>
                        
                        <div className='flex justify-between items-center w-full border-b border-[rgba(217,217,217,0.4)] py-2'>
                            <div className='flex gap-3'>
                                <img src="../../profileSettings/help.svg" alt="" className='w-[23px] h-[23px]'/>
                                <p className='text-[#737373] text-[15px]'>Help & Support</p>
                            </div>
                            <img src="../../profileSettings/GoTo.svg" alt="" className='w-[15px] h-[15px]'/>
                        </div>

                        <div className='flex justify-between items-center w-full py-2'>
                            <div className='flex gap-3'>
                                <img src="../../profileSettings/terms.svg" alt="" className='w-[23px] h-[23px]'/>
                                <p className='text-[#737373] text-[15px]'>Terms of Service</p>
                            </div>
                            <img src="../../profileSettings/GoTo.svg" alt="" className='w-[15px] h-[15px]'/>
                        </div>
                    </div>
                </div>

                {/* logout button */}
                <NavLink to="../../logout" className='border border-border rounded-lg p-1 mt-5 flex justify-center cursor-pointer'>
                    <p className='text-red-500'>Logout</p>
                </NavLink>
            </div>
        </div>
    </div>
  )
}

export default ProfileSetting