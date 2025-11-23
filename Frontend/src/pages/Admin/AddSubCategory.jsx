import React, { useState, useEffect } from "react";
import { useAuth } from "../../store/auth";

const AddSubCategory = () => {
const { API } = useAuth();
const token = localStorage.getItem("adminToken");

const [searchTerm, setSearchTerm] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const [isModalOpen, setIsModalOpen] = useState(false);
const [categories, setCategories] = useState([]);
const [subCategories, setSubCategories] = useState([]);
const [editingSubCategory, setEditingSubCategory] = useState(null);
const [newSubCategory, setNewSubCategory] = useState({ categoryId: "", name: "" });

const entriesPerPage = 5;

// Fetch all categories for dropdown
const fetchCategories = async () => {
try {
const res = await fetch(`${API}/api/skills`, {
headers: { Authorization: `Bearer ${token}` },
});
const data = await res.json();
setCategories(data.categories || []);
} catch (err) {
console.error("Fetch categories error:", err);
setCategories([]);
}
};

// Fetch all subcategories
const fetchSubCategories = async () => {
try {
const res = await fetch(`${API}/api/skills`, {
headers: { Authorization: `Bearer ${token}` },
});
const data = await res.json();
// Flatten subcategories with parent category
const subs = [];
(data.categories || []).forEach((cat) => {
(cat.subcategories || []).forEach((sub) => {
subs.push({
_id: sub._id,
name: sub.name,
categoryId: cat._id,
categoryName: cat.name,
});
});
});
setSubCategories(subs);
} catch (err) {
console.error("Fetch subcategories error:", err);
setSubCategories([]);
}
};

useEffect(() => {
fetchCategories();
fetchSubCategories();
}, [token]);

const handleEditSubCategory = (sub) => {
setEditingSubCategory(sub);
setNewSubCategory({ categoryId: sub.categoryId, name: sub.name });
setIsModalOpen(true);
};

const handleSaveSubCategory = async () => {
  if (!newSubCategory.categoryId || !newSubCategory.name) {
    alert("Please select category and provide subcategory name");
    return;
  }

  try {
    const category = categories.find(c => c._id === newSubCategory.categoryId);

    // Make a copy of existing subcategories or empty array
    let updatedSubs = category.subcategories ? [...category.subcategories] : [];

    if (editingSubCategory) {
      // Find the index of subcategory to edit
      const idx = updatedSubs.findIndex(sub => sub.name === editingSubCategory.name);
      if (idx !== -1) {
        updatedSubs[idx].name = newSubCategory.name;
      } else {
        alert("Subcategory not found in this category");
        return;
      }      
    } else {
      // Add new subcategory
      updatedSubs.push({ name: newSubCategory.name });
    }

    const res = await fetch(`${API}/api/skills/${category._id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subcategories: updatedSubs }),
    });

    const data = await res.json();
    if (res.ok) {
      fetchSubCategories();
      setNewSubCategory({ categoryId: "", name: "" });
      setEditingSubCategory(null);
      setIsModalOpen(false);
    } else {
      alert(data.message || "Failed to save subcategory");
    }
  } catch (err) {
    console.error("Save subcategory error:", err);
  }
};

const handleDeleteSubCategory = async (sub) => {
  if (!window.confirm("Are you sure you want to delete this subcategory?")) return;

  try {
    const category = categories.find(c => c._id === sub.categoryId);
    const updatedSubs = category.subcategories.filter(s => s._id !== sub._id);

    const res = await fetch(`${API}/api/skills/${category._id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ subcategories: updatedSubs })
    });

    const data = await res.json();
    if (res.ok) {
      fetchSubCategories();
    } else {
      alert(data.message || "Failed to delete subcategory");
    }
  } catch (err) {
    console.error("Delete subcategory error:", err);
  }
};


// Pagination
const filteredSubs = subCategories.filter(sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase()));
const totalPages = Math.ceil(filteredSubs.length / entriesPerPage);
const startIndex = (currentPage - 1) * entriesPerPage;
const endIndex = startIndex + entriesPerPage;
const currentSubs = filteredSubs.slice(startIndex, endIndex);

const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };
const handlePreviousPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };

useEffect(() => setCurrentPage(1), [searchTerm]);

return ( <div className="min-h-full bg-gray-50 p-6"> <div className="max-w-7xl mx-auto"> <div className="mb-8"> <h1 className="text-2xl font-bold text-gray-900">Add SubCategory</h1> <p className="text-gray-600 mt-2">Manage all subcategories</p> </div>

    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">  
      <div className="relative flex-1 max-w-md">  
        <input  
          type="text"  
          placeholder="Search subcategories..."  
          value={searchTerm}  
          onChange={(e) => setSearchTerm(e.target.value)}  
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"  
        />  
      </div>  
      <button  
        onClick={() => setIsModalOpen(true)}  
        className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"  
      >  
        New SubCategory  
      </button>  
    </div>  

    {/* Table */}  
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-6">  
      <div className="overflow-x-auto">  
        <table className="w-full">  
          <thead className="bg-gray-50 border-b border-gray-200">  
            <tr>  
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>  
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>  
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subcategory</th>  
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>  
            </tr>  
          </thead>  
          <tbody className="bg-white divide-y divide-gray-200">  
            {currentSubs.map((sub, index) => (  
              <tr key={sub._id || index} className="hover:bg-gray-50 transition-colors">  
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">{startIndex + index + 1}</td>  
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-600">{sub.categoryName}</td>  
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-600">{sub.name}</td>  
                <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-600">  
                  <div className="flex items-center gap-4">  
                    <button onClick={() => handleEditSubCategory(sub)} className="flex items-center">  
                      <img src="../../images/tabler_edit.svg" alt="Edit" />  
                    </button>  
                    <button onClick={() => handleDeleteSubCategory(sub)} className="flex items-center">  
                      <img src="../../images/delete.svg" alt="Delete" />  
                    </button>  
                  </div>  
                </td>  
              </tr>  
            ))}  
          </tbody>  
        </table>  
      </div>  
    </div>  

    {/* Pagination */}  
    <div className="flex items-center justify-between mt-6 px-4">  
      <div className="text-sm text-gray-700">  
        Showing {startIndex + 1} to {Math.min(endIndex, filteredSubs.length)} of {filteredSubs.length} results  
      </div>  
      <div className="flex items-center gap-2">  
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-3 py-1 border rounded disabled:opacity-50">Previous</button>  
        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-3 py-1 border rounded disabled:opacity-50">Next</button>  
      </div>  
    </div>  

    {/* Modal */}  
    {isModalOpen && (  
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">  
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">  
          <h2 className="text-xl font-semibold mb-4">{editingSubCategory ? "Edit SubCategory" : "Add New SubCategory"}</h2>  

          <select  
            className="w-full mb-4 px-3 py-2 border rounded"  
            value={newSubCategory.categoryId}  
            onChange={(e) => setNewSubCategory({ ...newSubCategory, categoryId: e.target.value })}  
          >  
            <option value="">Select Category</option>  
            {categories.map(cat => (  
              <option key={cat._id} value={cat._id}>{cat.name}</option>  
            ))}  
          </select>  

          <input  
            type="text"  
            placeholder="Subcategory Name"  
            className="w-full mb-4 px-3 py-2 border rounded"  
            value={newSubCategory.name}  
            onChange={(e) => setNewSubCategory({ ...newSubCategory, name: e.target.value })}  
          />  

          <div className="flex justify-end gap-3">  
            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>  
            <button onClick={handleSaveSubCategory} className="px-4 py-2 bg-blue-600 text-white rounded">{editingSubCategory ? "Update" : "Save"}</button>  
          </div>  
        </div>  
      </div>  
    )}  
  </div>  
</div>  

);
};

export default AddSubCategory;
