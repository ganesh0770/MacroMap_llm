import { useState, useRef } from 'react';

export default function Manager() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadHistory, setUploadHistory] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      e.target.value = '';
    }
  };

  const handleBoxClick = () => {
    if (!selectedFile) fileInputRef.current.click();
  };

  const handleCancel = () => {
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setUploading(true);

    // 1. Pack the binary file into a FormData layout
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // 2. Fetch from your local FastAPI backend server instead of using mock code
      const response = await fetch('http://127.0.0.1:8000/api/extract', {
        method: 'POST',
        body: formData,
      });
      console.log("response to frontend", response)

      if (response.ok) {
        const data = await response.json();
        console.log("data", Array(data))
        console.log("data", data)
        console.error("Backend Error Details:", data);

        // alert('Image successfully processed by backend!');
        console.log("Image successfully processed by backend")
        // Convert the object { calories: 200, protein: 5... } into an array
        const nutritionArray = Object.entries(data).map(([key, value]) => ({
          name: key.charAt(0).toUpperCase() + key.slice(1), // Capitalizes 'calories' to 'Calories'
          value: value,
          unit: key === 'calories' ? 'kcal' : 'g' // Adds the correct metric unit
        }));

        const newHistoryItem = {
          id: Date.now(),
          fileName: selectedFile.name,
          imageThumb: previewUrl,
          nutrition: nutritionArray // Now this is a real array that satisfies .map()
        };

        // // 3. Inject the live nutrition data from the backend into the state history
        // const newHistoryItem = {
        //   id: Date.now(),
        //   fileName: selectedFile.name,
        //   imageThumb: previewUrl,
        //   nutrition: data // Reads the real array directly from main.py
        // };

        setUploadHistory((prevHistory) => [...prevHistory, newHistoryItem]);
        setSelectedFile(null);
        setPreviewUrl(null);
      } else {
        alert('Backend failed to process image.');
      }

    } catch (error) {
      console.error("Upload failed", error);
      alert('Network error connecting to API server.');
    } finally {
      setUploading(false);
    }
  };

  const allNutritionNames = Array.from(
    new Set(uploadHistory.flatMap(item => item.nutrition.map(n => n.name)))
  );
  // console.log("all",allNutritionNames)
  // console.log("aldl",uploadHistory)


  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-8 bg-slate-50 ">

      {/* UPLOADER CONTAINER */}
      <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_10px_30px_rgba(146,19,239,0.04)] border border-purple-50 max-w-md mx-auto w-full">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">Analyze Nutrition</h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">Upload food images to compare raw data properties.</p>
        </div>

        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />

        <div onClick={handleBoxClick} className={`group relative mt-4 border-2 border-dashed rounded-xl overflow-hidden transition-all duration-300 ${selectedFile ? 'border-[#9213ef]' : 'border-purple-200 bg-purple-50/20 text-[#9213ef] cursor-pointer'}`}>
          {selectedFile && previewUrl ? (
            <div className="relative aspect-video w-full flex items-center justify-center bg-slate-50">
              <img src={previewUrl} alt="Preview" className="w-full h-full object-contain p-2" />
            </div>
          ) : (
            <div className="py-10 flex flex-col items-center justify-center gap-2">
              <span className="text-sm font-semibold">Choose an image</span>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-4">
          <button type="button" onClick={handleCancel} disabled={uploading || !selectedFile} className="w-1/2 py-2.5 border border-slate-200 text-xs sm:text-sm font-medium rounded-lg disabled:opacity-40 transition-colors">Cancel</button>
          <button type="button" onClick={handleUpload} disabled={uploading || !selectedFile} className="w-1/2 py-2.5 bg-[#9213ef] text-white text-xs sm:text-sm font-semibold rounded-lg disabled:opacity-40 hover:bg-[#7e10cc] transition-colors">{uploading ? 'Processing...' : 'Analyze'}</button>
        </div>
      </section>

      {/* COMPARISON MATRIX */}
      {uploadHistory.length > 0 && (
        <section className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-100 transition-all duration-300">
          <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-4 sm:mb-6">Nutrition Comparison Dashboard per 100 gm</h3>

          {/* DESKTOP VIEW */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-xs font-semibold uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-[220px]">Analyzed Item</th>
                  {allNutritionNames.map((name) => (
                    <th key={name} className="py-3.5 px-4">{name}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                {uploadHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-purple-50/20 transition-colors">
                    <td className="py-4 px-4 flex items-center gap-3 font-medium text-slate-700">
                      <img src={item.imageThumb} alt="thumb" className="w-10 h-10 rounded-lg object-cover border border-purple-100 flex-shrink-0" />
                      <span className="max-w-[140px] truncate block text-xs sm:text-sm">{item.fileName}</span>
                    </td>
                    {allNutritionNames.map((name) => {
                      const targetData = item.nutrition.find((n) => n.name.toLowerCase() === name.toLowerCase());

                      return (
                        <td key={name} className="py-4 px-4 font-mono text-xs sm:text-sm text-slate-800 font-semibold">
                          {targetData ? `${targetData.value} ${targetData.unit}` : '—'}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE VIEW */}
          <div className="block md:hidden flex flex-col gap-6">
            {uploadHistory.map((item) => (
              <div key={item.id} className="border border-slate-100 rounded-xl p-4 bg-slate-50/50 flex flex-col gap-4">
                <div className="w-full flex flex-col items-center gap-2">
                  <div className="w-full max-w-[240px] aspect-video bg-white rounded-lg overflow-hidden border border-purple-100 shadow-sm">
                    <img src={item.imageThumb} alt="Food item" className="w-full h-full object-contain p-1" />
                  </div>
                  <span className="text-xs font-bold text-slate-700 truncate max-w-[240px] mt-1">{item.fileName}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 w-full">
                  {allNutritionNames.map((name) => {
                    const targetData = item.nutrition.find(n => n.name === name);
                    return (
                      <div key={name} className="bg-white border border-slate-100 rounded-lg p-2.5 flex flex-col justify-center">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{name}</span>
                        <span className="text-xs sm:text-sm font-semibold text-slate-700 font-mono mt-0.5">                          {targetData ? `${targetData.value} ${targetData.unit}` : '—'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
