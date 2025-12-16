import {  Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import AddNewSponsors from "../api-files/SponsorAPIs/AddNewSponsors";
import WebsiteLoader from "../Loader/WebsiteLoader";
import SponsorFetcher from "../api-files/SponsorAPIs/SponsorFetcher";
import { API_URL } from "../NwConfig";

export default function Sponsors({ userRole }) {
  const [sponsors, setSponsors] = useState([
    { image: null, title: "", link: "",imagePreview:"" },
  ]);
  const [loading,setloading]=useState(false)
  const urlToFile = async (url, filename) => {
  const response = await fetch(url);
  const blob = await response.blob();

  return new File([blob], filename, {
    type: blob.type,
    lastModified: Date.now(),
  });
};
  async function getsponsors() {
    setloading(true)
    const res=await SponsorFetcher()
    // console.log(res)
    if (res?.success && res?.sponsors?.length > 0) {
      const mappedsponsors = await Promise.all(
        res?.sponsors.map(async (sponsor) => {
          let imageFile = null;
          let imagePreview = null;
    
          if (sponsor.image) {
            const imageUrl = `${API_URL}/${sponsor.image}`;
            const filename = sponsor.image.split("/").pop();
    
            // 🔥 Convert backend image URL → REAL File
            imageFile = await urlToFile(imageUrl, filename);
            imagePreview = URL.createObjectURL(imageFile);
          }
    
          return {
            ...sponsor,
            image: imageFile,
            imagePreview,
          };
        })
      );
    
      setSponsors(mappedsponsors);
    }
    setloading(false)
  }
useEffect(()=>{
getsponsors()
},[])
  const addSponsor = () => {
    setSponsors([...sponsors, { image: null, title: "", link: "",imagePreview:"" }]);
  };

  const removeSponsor = (index) => {
    setSponsors(sponsors.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...sponsors];
    updated[index][field] = value;
    setSponsors(updated);
  };

  const handleFileChange = (index, file) => {
  if (!file) return;

  const maxSize = 4 * 1024 * 1024; // 2MB in bytes

  if (file.size > maxSize) {
    alert("File size must be less than 4MB!");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const updated = [...sponsors];
    updated[index].image = file;
    updated[index].imagePreview = reader.result;
    setSponsors(updated);
  };
  reader.readAsDataURL(file);
};


  const handleSubmit = async() => {
    setloading(true)
    const formdata=new FormData()
    sponsors.map((item,index)=>{
        formdata.append("title",item.title)
        formdata.append("link",item.link)
        formdata.append("sponsorimage",item.image)
    })
    // console.log("Sponsor Data:", sponsors);
    const res=await AddNewSponsors(formdata)
    if(res?.success){
        alert("Sponsors Addedd SuccessFully")
        setloading(false)
    }
    setloading(false)
    console.log(res)
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">
        Sponsors
      </h1>
      {
        loading && <WebsiteLoader/>
      }

      <div className="space-y-6">
        {sponsors.map((sponsor, index) => (
          <div
            key={index}
            className="relative bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
          >
            {/* Remove button */}
            {sponsors.length > 1 && (
              <button
                onClick={() => removeSponsor(index)}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500"
              >
                <Trash2 className="text-red-500"/>
              </button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
              {/* Image Upload + Preview */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-600">
                  Sponsor Logo
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileChange(index, e.target.files[0])
                  }
                  className="text-sm"
                />

                {sponsor.image && (
                  <div className="mt-2">
                    <img
                      src={sponsor.imagePreview}
                      alt="Preview"
                      className="h-24 w-auto object-contain rounded border border-slate-200 bg-slate-50"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Click above to change image
                    </p>
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-600">
                  Sponsor Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. TechCorp"
                  value={sponsor.title}
                  onChange={(e) =>
                    handleChange(index, "title", e.target.value)
                  }
                  className="border border-slate-300 rounded-lg px-3 py-2
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Link */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-600">
                  Website Link
                </label>
                <input
                  type="text"
                  placeholder="https://example.com"
                  value={sponsor.link}
                  onChange={(e) =>
                    handleChange(index, "link", e.target.value)
                  }
                  className="border border-slate-300 rounded-lg px-3 py-2
                    focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={addSponsor}
          className="px-5 py-2 rounded-lg bg-slate-800 text-white
            hover:bg-slate-700 transition"
        >
          + Add Sponsor
        </button>

        <button
          onClick={handleSubmit}
          className="px-6 py-2 rounded-lg bg-green-600 text-white
            hover:bg-green-500 transition"
        >
          Submit Sponsors
        </button>
      </div>
    </div>
  );
}
