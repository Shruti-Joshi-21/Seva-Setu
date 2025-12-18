import React, { useState, useRef, useEffect } from "react";
import { FaBell, FaCheckCircle, FaTimesCircle, FaExclamationCircle, FaCamera, FaUpload, FaMapMarkerAlt, FaTrash, FaBullhorn, FaSchool, FaSeedling, FaHandsHelping } from "react-icons/fa";

type PhotoType = "before" | "after";

const FieldReportsDashboard: React.FC = () => {
  const [activity, setActivity] = useState<string | null>(null);

  /* ---------------- PHOTO STATES ---------------- */
  const [activePhotoType, setActivePhotoType] = useState<PhotoType | null>(null);
  const [showCamera, setShowCamera] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);

  /* ---------------- CAMERA LOGIC ---------------- */
  useEffect(() => {
    if (!showCamera) return;

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(() => {
        alert("Camera access denied");
        setShowCamera(false);
      });

    return () => stopCamera();
  }, [showCamera]);

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
  };

  const capturePhoto = () => {
    if (!canvasRef.current || !videoRef.current || !activePhotoType) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx?.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/png");

    if (activePhotoType === "before") setBeforeImage(imageData);
    if (activePhotoType === "after") setAfterImage(imageData);

    stopCamera();
    setShowCamera(false);
    setActivePhotoType(null);
  };

  const cancelCamera = () => {
    stopCamera();
    setShowCamera(false);
    setActivePhotoType(null);
  };

  /* ---------------- FILE UPLOAD ---------------- */
  const handleUploadClick = (type: PhotoType) => {
    setActivePhotoType(type);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activePhotoType) return;

    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (activePhotoType === "before") setBeforeImage(reader.result as string);
      if (activePhotoType === "after") setAfterImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    e.target.value = "";
    setActivePhotoType(null);
  };

  return (
    <div className="min-h-screen bg-[#F1F8E9] text-[#212121]">
      {/* Header */}
      <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-[#246427]">Seva Setu</h1>
          <p className="text-sm text-[#616161]">Field Operations</p>
        </div>
        <div className="flex items-center gap-4">
          <FaBell className="text-[#616161]" />
          <div className="text-right">
            <p className="font-medium">Rahul Sharma</p>
            <p className="text-xs text-[#616161]">Field Worker</p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="p-6 w-full">
        {/* Title */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Field Reports</h2>
            <p className="text-[#616161]">Submit daily field work reports with photo verification</p>
          </div>
          <p className="text-sm text-[#616161]">Today: March 15, 2024</p>
        </div>

        {/* Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Task Selection */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow">
            <h3 className="font-semibold mb-4 text-[#246427]">Task Selection</h3>
            <label className="text-sm text-[#616161]">Select Task</label>
            <select className="w-full mt-1 mb-4 border rounded-md p-2">
              <option>Choose today's assigned task...</option>
            </select>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <textarea className="border rounded-md p-3 text-sm" placeholder="Task description will appear here..." />
              <textarea className="border rounded-md p-3 text-sm" placeholder="Location address will appear here..." />
            </div>
            <div className="mt-4 bg-[#FFF8E1] border border-[#F8AC3B] text-sm p-3 rounded-md text-[#616161]">
              Task must be selected before enabling image uploads
            </div>
          </div>

          {/* Validation Status */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="font-semibold mb-4 text-[#246427]">Validation Status</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">Task Selected <FaTimesCircle className="text-red-500" /></li>
              <li className="flex justify-between">Before Image Uploaded <FaTimesCircle className="text-red-500" /></li>
              <li className="flex justify-between">After Image Uploaded <FaTimesCircle className="text-red-500" /></li>
              <li className="flex justify-between">Face & Image Validated <FaExclamationCircle className="text-[#F8AC3B]" /></li>
              <li className="flex justify-between">GPS Verified <FaCheckCircle className="text-green-600" /></li>
            </ul>
            <div className="mt-4 bg-red-50 border border-red-200 text-red-600 p-3 rounded-md text-sm">
              Complete all required fields to enable submission
            </div>
          </div>
        </div>

        {/* Photo Documentation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow">
            <h3 className="font-semibold mb-4 text-[#246427]">Photo Documentation</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Before Task Image", type: "before" as PhotoType, image: beforeImage },
                { title: "After Task Image", type: "after" as PhotoType, image: afterImage }
              ].map(({ title, type, image }) => (
                <div key={type} className="border-2 border-dashed rounded-lg p-4 text-center">
                  {image ? (
                    <img src={image} alt={title} className="mx-auto mb-3 rounded-md max-h-48" />
                  ) : (
                    <FaCamera className="mx-auto text-3xl text-[#616161] mb-2" />
                  )}
                  <p className="font-medium">{title}</p>
                  <button 
                    className="mt-3 w-full bg-[#246427] text-white py-2 rounded-md flex justify-center items-center gap-2"
                    onClick={() => {
                      setActivePhotoType(type);
                      setShowCamera(true);
                    }}
                  >
                    <FaCamera /> Capture Photo
                  </button>
                  <button 
                    className="mt-2 w-full border py-2 rounded-md flex justify-center items-center gap-2 text-sm"
                    onClick={() => handleUploadClick(type)}
                  >
                    <FaUpload /> Upload from Device
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reports */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h3 className="font-semibold mb-4 text-[#246427]">Recent Reports</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">Sector 12 Cleanup <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Approved</span></li>
              <li className="flex justify-between">Recycling Drive <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">Pending</span></li>
              <li className="flex justify-between">Awareness Campaign <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs">Rejected</span></li>
            </ul>
            <button className="mt-4 text-[#246427] text-sm font-medium">View All Reports</button>
          </div>
        </div>

        {/* Field Activity */}
        <div className="bg-white rounded-xl p-6 shadow mt-6">
          <h3 className="font-semibold mb-4 text-[#246427]">Field Activity Details</h3>
          <p className="text-sm text-[#616161] mb-4">Type of Field Activity *</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[{ label: 'Waste Collection', icon: <FaTrash /> }, { label: 'Awareness Drive', icon: <FaBullhorn /> }, { label: 'School / Community Visit', icon: <FaSchool /> }, { label: 'Survey / Data Collection', icon: <FaHandsHelping /> }, { label: 'Plantation / Cleanliness Drive', icon: <FaSeedling /> }, { label: 'Other Social Work', icon: <FaHandsHelping /> }].map((item) => (
              <button
                key={item.label}
                onClick={() => setActivity(item.label)}
                className={`border rounded-lg p-4 flex items-center gap-3 ${activity === item.label ? 'border-[#246427] bg-[#E8F5E9]' : ''}`}
              >
                <span className="text-[#246427]">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
          <textarea className="w-full border rounded-md p-3 mt-4" placeholder="Add any additional observations..." />
          <button className="mt-4 bg-[#246427] text-white px-4 py-2 rounded-md">Save Activity</button>
        </div>

        {/* Location */}
        <div className="bg-white rounded-xl p-6 shadow mt-6">
          <h3 className="font-semibold mb-4 text-[#246427]">Location Verification</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="bg-gray-100 rounded-md p-6 text-center text-sm">Live Map Preview<br />GPS Location Loading...</div>
            <input className="border rounded-md p-2" value="28.7041, 77.1025" readOnly />
            <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-md flex items-center gap-2">
              <FaMapMarkerAlt /> GPS Verified - Location matches task area
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-[#616161]">Progress: 2/6 completed</p>
          <div className="flex gap-3">
            <button className="border px-4 py-2 rounded-md">Save as Draft</button>
            <button className="bg-[#246427] text-white px-4 py-2 rounded-md">Submit Field Report</button>
          </div>
        </div>
      </main>

      {/* CAMERA MODAL */}
      {showCamera && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 w-[90%] max-w-md">
            <video ref={videoRef} autoPlay className="w-full rounded-md" />
            <canvas ref={canvasRef} className="hidden" />

            <div className="flex gap-3 mt-4">
              <button
                onClick={capturePhoto}
                className="flex-1 bg-[#246427] text-white py-2 rounded-md"
              >
                Capture
              </button>
              <button
                onClick={cancelCamera}
                className="flex-1 border py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HIDDEN FILE INPUT */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FieldReportsDashboard;