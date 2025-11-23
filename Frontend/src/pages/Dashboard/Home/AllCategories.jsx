import React from "react";
import { useNavigate } from "react-router-dom";

const AllCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/skills", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        const data = await res.json();
        setCategories(data.categories || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className='flex items-center justify-between px-[20px] py-5 bg-primary text-white'>
        <div 
          onClick={() => navigate(-1)} 
          className="w-[35px] h-[35px] flex items-center justify-center cursor-pointer"
        >
          <img src="../../images/BackArrow.svg" alt="back" className='w-[25px] h-[25px]'/>
        </div>
        <h3 className='font-serif w-full text-center text-xl mr-5'>All Categories</h3>
      </div>

      {/* Category List */}
      <div className="grid grid-cols-4 gap-4 mx-[28px] py-5">
        {categories.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate("/dashboard/home/categories", { state: item })}
            className="w-[70px] h-[65px] p-[10px] bg-icon-bg-hover flex flex-col 
                       items-center justify-center gap-1 rounded-lg cursor-pointer"
          >
            <img src={`http://localhost:8000/${item.image}`} alt={item.name} className="w-[24px] h-[24px]" />
            <p className="text-[14px] text-center font-medium">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategories;
