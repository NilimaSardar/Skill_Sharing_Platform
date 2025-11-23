import React, { useState, useEffect } from "react";
import { useAuth } from "../../store/auth";

const AddCategory = () => {
  const { API } = useAuth();
  const token = localStorage.getItem("adminToken");

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", imageFile: null });
  const [categories, setCategories] = useState([]);
  const [existingImage, setExistingImage] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  const entriesPerPage = 6;

  // Fetch all categories from backend
  const fetchCategories = async () => {
    if (!token) {
      console.warn("No token found, please login.");
      return;
    }

    try {
      const res = await fetch(`${API}/api/skills`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        console.warn("Unauthorized. Token may be invalid or expired.");
        setCategories([]);
        return;
      }

      const data = await res.json();
      setCategories(data.categories || []);
    } catch (err) {
      console.error("Fetch categories error:", err);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [token]);

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategory({ name: category.name, imageFile: null });
    setExistingImage(category.image ? `http://localhost:8000/${category.image}` : null);
    setIsModalOpen(true);
  };  

  const handleSaveCategory = async () => {
    if (!newCategory.name && !editingCategory) {
      alert("Please provide category name");
      return;
    }
  
    const formData = new FormData();
    formData.append("name", newCategory.name);
    if (newCategory.imageFile) formData.append("image", newCategory.imageFile);
  
    try {
      const url = editingCategory
        ? `${API}/api/skills/${editingCategory._id}`
        : `${API}/api/skills`;
      const method = editingCategory ? "PUT" : "POST";
  
      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      const data = await res.json();
      if (res.ok) {
        fetchCategories();
        setNewCategory({ name: "", imageFile: null });
        setEditingCategory(null);
        setIsModalOpen(false);
      } else {
        alert(data.message || "Failed to save category");
      }
    } catch (err) {
      console.error("Save category error:", err);
    }
  };  

  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
  
    try {
      const res = await fetch(`${API}/api/skills/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await res.json();
      if (res.ok) {
        // Refresh categories after delete
        fetchCategories();
      } else {
        alert(data.message || "Failed to delete category");
      }
    } catch (err) {
      console.error("Delete category error:", err);
    }
  };  

  // Pagination logic
  const filteredCategories = (categories || []).filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredCategories.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentCategories = filteredCategories.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => setCurrentPage(1), [searchTerm]);

  return (
    <div className="min-h-full bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Add Category</h1>
          <p className="text-gray-600 mt-2">Manage all categories</p>
        </div>

        {/* Search + Add */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            New Category
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentCategories.map((cat, index) => (
                  <tr key={cat._id || index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">
                      {cat.image && <img src={`http://localhost:8000/${cat.image}`} alt={cat.name} className="w-12 h-12 object-cover rounded" />}
                    </td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-600">{cat.name}</td>
                    <td className="px-6 py-2 whitespace-nowrap text-sm text-gray-600"> 
                      <div className="flex items-center gap-4"> 
                        <button onClick={() => handleEditCategory(cat)} className="flex items-center">
                          <img src="../../images/tabler_edit.svg" alt="Edit" />
                        </button>
                        <button onClick={() => handleDeleteCategory(cat._id)} className="flex items-center">
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
            Showing {startIndex + 1} to {Math.min(endIndex, filteredCategories.length)} of {filteredCategories.length} results
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
              <h2 className="text-xl font-semibold mb-4">
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h2>
              <input
                type="text"
                placeholder="Category Name"
                className="w-full mb-4 px-3 py-2 border rounded"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
              <input
                type="file"
                accept="image/*"
                className="w-full mb-4 px-3 py-2 border rounded"
                onChange={(e) => setNewCategory({ ...newCategory, imageFile: e.target.files[0] })}
              />
              {newCategory.imageFile ? (
                <div className="mb-4">
                  <img
                    src={URL.createObjectURL(newCategory.imageFile)}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded"
                  />
                </div>
              ) : existingImage ? (
                <div className="mb-4">
                  <img
                    src={existingImage}
                    alt="Current"
                    className="w-32 h-32 object-cover rounded"
                  />
                </div>
              ) : null}

              <div className="flex justify-end gap-3">
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
                <button
                  onClick={handleSaveCategory}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {editingCategory ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCategory; 