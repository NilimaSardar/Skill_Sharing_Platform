// import React, { useState } from "react";

// const RightSidebar = ({ users }) => {
//     const [visibleCount, setVisibleCount] = useState(5); // initially show 5 users

//     const handleViewMore = () => {
//       setVisibleCount((prev) => prev + 5); // show 5 more on each click
//     };

//   return (
// <aside className="w-64 bg-white shadow-sm h-screen flex flex-col items-center py-6 px-4">
//       <h2 className="font-semibold text-lg mb-4">Highly Rated Users</h2>

//       <div className="w-full space-y-4 flex-1">
//         {users.slice(0, visibleCount).map((user) => (
//           <div
//             key={user.id}
//             className="flex items-center gap-3 bg-gray-50 p-2 rounded-md w-full"
//           >
//             <img
//               src={user.profilePhoto}
//               alt={user.name}
//               className="w-10 h-10 rounded-full object-cover"
//             />
//             <div>
//               <p className="font-medium text-gray-800">{user.name}</p>
//               <p className="text-sm text-gray-500">{user.rating} ⭐</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {visibleCount < users.length && (
//         <button
//           onClick={handleViewMore}
//           className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
//         >
//           View More
//         </button>
//       )}
//     </aside>
//   );
// };

// export default RightSidebar;



import React, { useState } from "react";

const RightSidebar = () => {
  // Dummy demo data
  const demoUsers = [
    { id: 1, name: "Alice", rating: 5, profilePhoto: "https://i.pravatar.cc/40?img=1" },
    { id: 2, name: "Bob", rating: 4.8, profilePhoto: "https://i.pravatar.cc/40?img=2" },
    { id: 3, name: "Charlie", rating: 4.7, profilePhoto: "https://i.pravatar.cc/40?img=3" },
    { id: 4, name: "David", rating: 4.6, profilePhoto: "https://i.pravatar.cc/40?img=4" },
    { id: 5, name: "Eva", rating: 4.5, profilePhoto: "https://i.pravatar.cc/40?img=5" },
    { id: 6, name: "Frank", rating: 4.4, profilePhoto: "https://i.pravatar.cc/40?img=6" },
    { id: 7, name: "Grace", rating: 4.3, profilePhoto: "https://i.pravatar.cc/40?img=7" },
  ];

  const [visibleCount, setVisibleCount] = useState(5);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <aside className="w-80 bg-white shadow-sm h-screen flex flex-col items-center py-6 px-4">
        <div className="flex w-full justify-between border border-border items-center p-1">
            <h2 className="font-[550] text-[15px]">Highly Rated Users</h2>
            {visibleCount < demoUsers.length && (
                <button
                onClick={handleViewMore}
                className=" bg-primary flex items-center text-white text-xs py-3 px-2 h-6 hover:bg-blue-700"
                >
                View More
                </button>
            )}
        </div>

      <div className="w-full space-y-4 flex-1">
        {demoUsers.slice(0, visibleCount).map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-3 bg-gray-50 p-2 rounded-md w-full"
          >
            <img
              src={user.profilePhoto}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-500">{user.rating} ⭐</p>
            </div>
          </div>
        ))}
      </div>

      
    </aside>
  );
};

export default RightSidebar;

