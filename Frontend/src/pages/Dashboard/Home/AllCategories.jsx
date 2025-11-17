import React from "react";
import { useNavigate } from "react-router-dom";

const allCategories = [
  { name: "Arts", icon: "../../SkillCategories/arts.svg" },
  { name: "Music", icon: "../../SkillCategories/music.svg" },
  { name: "Fitness", icon: "../../SkillCategories/fitness.svg" },
  { name: "Tech", icon: "../../SkillCategories/technology.svg" },
  { name: "Crafty", icon: "../../SkillCategories/crafty.svg" },
  { name: "Link", icon: "../../SkillCategories/link.svg" },
  { name: "Bakery", icon: "../../SkillCategories/bakery.svg" },
  { name: "Sports", icon: "../../SkillCategories/sports.svg" },
  { name: "Cooking", icon: "../../SkillCategories/cooking.svg" },
  { name: "Photography", icon: "../../SkillCategories/photo.svg" },
];

const AllCategories = () => {
    const navigate = useNavigate();

  return (
    <div className="">
        <div className='flex items-center justify-between px-[20px] py-5 bg-primary text-white'>
            <div onClick={() => navigate(-1)} className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer">
              <img src="../../images/BackArrow.svg" alt="notification bell" className='w-[25px] h-[25px]'/>
            </div>
          <h3 className='font-serif w-full text-center text-xl mr-5'>All Categories</h3>
        </div>
      
      <div className="grid grid-cols-4 gap-4 mx-[28px] py-5">
        {allCategories.map((item, index) => (
          <div
            key={index}
            className="w-[70px] h-[65px] p-[10px] bg-icon-bg-hover flex flex-col items-center justify-center gap-1 rounded-lg cursor-pointer"
          >
            <img src={item.icon} alt={item.name} className="w-[24px] h-[24px]" />
            <p className="text-[14px] text-center font-medium">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategories;
