import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "/Image/IAMeetYou.png";
import { useDispatch } from "react-redux";
import { uploadPhotosThunk } from "../Redux/onboardingSlice";

const Photos = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [photos, setPhotos] = useState([]);
  const [previewPhotos, setPreviewPhotos] = useState([]);

  // HANDLE FILE UPLOAD
  const handleUpload = (e) => {

    const files = Array.from(e.target.files);

    // STORE REAL FILES
    setPhotos((prev) => [...prev, ...files]);

    // STORE PREVIEW URLS
    const previewUrls = files.map((file) =>
      URL.createObjectURL(file)
    );

    setPreviewPhotos((prev) => [...prev, ...previewUrls]);
  };

  // HANDLE CONTINUE
  const handleContinue = async () => {

    try {

      // CHECK MINIMUM 3 PHOTOS
      if (photos.length < 3) {
        alert("Please upload at least 3 photos");
        return;
      }

      const formData = new FormData();

      // IMPORTANT → FIELD NAME MUST BE "photos"
     photos.forEach((photo) => {
  formData.append("photos", photo);
});

      console.log("Uploading Photos:", photos);

      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const result = await dispatch(
        uploadPhotosThunk(formData)
      );

      console.log("RESULT:", result);

      // SUCCESS
      if (result.meta.requestStatus === "fulfilled") {

        alert("Photos Uploaded Successfully");

        navigate("/religion");
      }

      // ERROR
      else {

        console.log("UPLOAD FAILED");

        console.log(result.payload);

        alert("Upload Failed");
      }

    } catch (error) {

      console.log("PHOTO API ERROR:", error);

      alert("Something went wrong");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center  px-4">

  <div className="w-full max-w-md">

    {/* LOGO */}
    <div className="items-center mb-8 justify-center flex gap-2">
      <img
        src={logo}
        alt="logo"
        className="h-10 object-contain"
      />
    </div>

    {/* PROGRESS */}
    <div className="h-1 bg-[var(--border)] rounded-full mb-8">
      <div className="h-1 w-1/4 bg-orange-500 rounded-full"></div>
    </div>

    {/* CARD */}
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-lg p-8">

      <h2 className="text-3xl text-[var(--text-dim)] mb-2">
        Add your photos
      </h2>

      <p className="text-sm mb-4 text-[var(--text-dim2)]">
        Upload at least 3 photos
      </p>

      {/* PHOTO GRID */}
      <div className="grid grid-cols-3 gap-3 mb-4">

        {/* PREVIEW IMAGES */}
        {previewPhotos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt="preview"
            className="w-full h-24 object-cover rounded-lg"
          />
        ))}

        {/* UPLOAD BOX */}
        <label className="flex items-center justify-center border border-[var(--border)] bg-[var(--card)] rounded-lg h-24 cursor-pointer hover:opacity-80 transition text-[var(--text-dim)] text-3xl">

          +

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />

        </label>

      </div>

      {/* BUTTON */}
      <button
        onClick={handleContinue}
        className="w-full py-2 rounded-lg text-white bg-gradient-to-r from-[#D79098] to-[#5F7BF4]"
      >
        Continue
      </button>

    </div>
  </div>
</div>
  );
};

export default Photos;