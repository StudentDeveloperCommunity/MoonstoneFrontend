import { Trash2, Plus, Save, Upload, X, Edit2 } from "lucide-react";
import { useEffect, useState } from "react";
import AddNewSponsors from "../api-files/SponsorAPIs/AddNewSponsors";
import UpdateSponsor from "../api-files/SponsorAPIs/UpdateSponsor";
import DeleteSponsor from "../api-files/SponsorAPIs/DeleteSponsor";
import WebsiteLoader from "../Loader/WebsiteLoader";
import SponsorFetcher from "../api-files/SponsorAPIs/SponsorFetcher";
import { API_URL } from "../NwConfig";

export default function Sponsors({ userRole }) {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingSponsor, setEditingSponsor] = useState(null);
  const [newSponsor, setNewSponsor] = useState({
    title: "",
    link: "",
    image: null,
    imagePreview: ""
  });

  
  const fetchSponsors = async () => {
    setLoading(true);
    try {
      const res = await SponsorFetcher();
      console.log("Backend response:", res);
      if (res?.success && res?.sponsors?.length > 0) {
        const mappedSponsors = await Promise.all(
          res.sponsors.map(async (sponsor) => {
            // IMPORTANT:
            // Do NOT fetch existing images as blobs here.
            // In production, /uploads may not send CORS headers, so fetch() will fail.
            // For preview, a direct <img src="..."> works fine without CORS.
            const imageUrl = sponsor.image || sponsor.logo;
            const imagePreview = imageUrl ? `${API_URL}/${imageUrl.replace(/^uploads\//, '')}` : null;
            const title = sponsor.title || sponsor.name || "";
            const link = sponsor.link || sponsor.website || "";

            return {
              _id: sponsor._id,
              title,
              link,
              // Only set a File when user uploads a new one
              image: null,
              imagePreview,
              createdAt: sponsor.createdAt
            };
          })
        );
        setSponsors(mappedSponsors);
      } else {
        setSponsors([]);
      }
    } catch (error) {
      console.error("Error fetching sponsors:", error);
      setSponsors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []); // Only fetch once on mount

  const handleFileChange = (file, isEdit = false) => {
    if (!file) return;

    const maxSize = 4 * 1024 * 1024; // 4MB
    if (file.size > maxSize) {
      alert("File size must be less than 4MB!");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (isEdit && editingSponsor) {
        setEditingSponsor({
          ...editingSponsor,
          image: file,
          imagePreview: reader.result
        });
      } else {
        setNewSponsor({
          ...newSponsor,
          image: file,
          imagePreview: reader.result
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddSponsor = async () => {
    if (!newSponsor.title || !newSponsor.link || !newSponsor.image) {
      alert("Please fill in all fields and upload a logo");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("titles", newSponsor.title);
      formData.append("links", newSponsor.link);
      formData.append("logo", newSponsor.image);

      const res = await AddNewSponsors(formData);
      if (res?.success) {
        alert("Sponsor added successfully!");
        setNewSponsor({ title: "", link: "", image: null, imagePreview: "" });
        setShowAddForm(false);
        fetchSponsors();
      } else {
        alert(res?.message || "Failed to add sponsor");
      }
    } catch (error) {
      console.error("Error adding sponsor:", error);
      alert("Error adding sponsor. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditSponsor = (sponsor) => {
    setEditingSponsor({
      ...sponsor,
      originalImage: sponsor.image,
      originalImagePreview: sponsor.imagePreview
    });
    setShowAddForm(true);
  };

  const handleUpdateSponsor = async () => {
    if (!editingSponsor.title || !editingSponsor.link) {
      alert("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("titles", editingSponsor.title);
      formData.append("links", editingSponsor.link);

      // Only send new logo if user selected a different file
      if (
        editingSponsor.image &&
        editingSponsor.image !== editingSponsor.originalImage
      ) {
        formData.append("logo", editingSponsor.image);
      }

      const res = await UpdateSponsor(editingSponsor._id, formData);
      if (res?.success) {
        alert("Sponsor updated successfully!");
        setEditingSponsor(null);
        setShowAddForm(false);
        fetchSponsors();
      } else {
        alert(res?.message || "Failed to update sponsor");
      }
    } catch (error) {
      console.error("Error updating sponsor:", error);
      alert("Error updating sponsor. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteSponsor = async (sponsorId) => {
    if (!confirm("Are you sure you want to delete this sponsor? This action cannot be undone.")) return;
    
    try {
      const res = await DeleteSponsor(sponsorId);
      if (res?.success) {
        alert("Sponsor deleted successfully!");
        fetchSponsors();
      } else {
        alert(res?.message || "Failed to delete sponsor");
      }
    } catch (error) {
      console.error("Error deleting sponsor:", error);
      alert("Error deleting sponsor. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setEditingSponsor(null);
    setNewSponsor({ title: "", link: "", image: null, imagePreview: "" });
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white">Sponsor Management</h1>
              <p className="mt-2 text-blue-100">Manage your event sponsors and their information</p>
            </div>
            <button
              onClick={() => {
                  setEditingSponsor(null);
                  setNewSponsor({ title: "", link: "", image: null, imagePreview: "" });
                  setShowAddForm(!showAddForm);
                }}
              className="flex items-center gap-2 px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors shadow-md"
            >
              <Plus className="w-5 h-5" />
              Add New Sponsor
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Sponsor Form */}
      {showAddForm && (
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className={`${editingSponsor ? 'bg-yellow-50 border-2 border-yellow-300' : 'bg-blue-50 border-2 border-blue-300'} rounded-lg p-6 shadow-lg`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-lg font-semibold ${editingSponsor ? 'text-yellow-900' : 'text-blue-900'}`}>
                {editingSponsor ? 'Edit Sponsor' : 'Add New Sponsor'}
              </h3>
              <button
                onClick={handleCancelEdit}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Logo Upload */}
                <div className="lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sponsor Logo *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                    {(editingSponsor ? editingSponsor.imagePreview : newSponsor.imagePreview) ? (
                      <div className="relative">
                        <img
                          src={editingSponsor ? editingSponsor.imagePreview : newSponsor.imagePreview}
                          alt="Logo preview"
                          className="w-full h-32 object-contain rounded"
                        />
                        <button
                          onClick={() => {
                            if (editingSponsor) {
                              setEditingSponsor({ ...editingSponsor, image: null, imagePreview: "" });
                            } else {
                              setNewSponsor({ ...newSponsor, image: null, imagePreview: "" });
                            }
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <label className="cursor-pointer">
                          <span className="text-blue-600 hover:text-blue-700">Choose file</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileChange(e.target.files[0], !!editingSponsor)}
                            className="hidden"
                          />
                        </label>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 4MB</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sponsor Details */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sponsor Name *
                    </label>
                    <input
                      type="text"
                      value={editingSponsor ? editingSponsor.title : newSponsor.title}
                      onChange={(e) => {
                        if (editingSponsor) {
                          setEditingSponsor({ ...editingSponsor, title: e.target.value });
                        } else {
                          setNewSponsor({ ...newSponsor, title: e.target.value });
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. TechCorp Industries"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website URL *
                    </label>
                    <input
                      type="url"
                      value={editingSponsor ? editingSponsor.link : newSponsor.link}
                      onChange={(e) => {
                        if (editingSponsor) {
                          setEditingSponsor({ ...editingSponsor, link: e.target.value });
                        } else {
                          setNewSponsor({ ...newSponsor, link: e.target.value });
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={editingSponsor ? handleUpdateSponsor : handleAddSponsor}
                  disabled={submitting || !(editingSponsor ? editingSponsor.title : newSponsor.title) || !(editingSponsor ? editingSponsor.link : newSponsor.link)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  {submitting ? 'Saving...' : (editingSponsor ? 'Update Sponsor' : 'Add Sponsor')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sponsors List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <WebsiteLoader />
          </div>
        ) : sponsors.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Upload className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No sponsors yet</h3>
            <p className="text-gray-500 mb-4">Add your first sponsor to get started</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" />
              Add Your First Sponsor
            </button>
          </div>
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Existing Sponsors ({sponsors.length})</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Logo
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sponsor Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Website
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Added Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sponsors.map((sponsor) => (
                    <tr key={sponsor._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {sponsor.imagePreview ? (
                          <img
                            src={sponsor.imagePreview}
                            alt={sponsor.title}
                            className="h-12 w-12 object-contain rounded"
                          />
                        ) : (
                          <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-500">No logo</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{sponsor.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={sponsor.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-900"
                        >
                          {sponsor.link}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {sponsor.createdAt ? new Date(sponsor.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditSponsor(sponsor)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit sponsor"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSponsor(sponsor._id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete sponsor"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
