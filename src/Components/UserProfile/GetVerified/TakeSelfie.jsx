import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  SunMedium,
  CameraOff,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { uploadSelfie } from "../../Redux/verifySlice";
import Navbar from "../../Navbar/Navbar";
import { useTranslation } from "react-i18next";

function TakeSelfie() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const dispatch = useDispatch();

  const { loading, error } = useSelector(
    (state) => state.verify
  );
  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream =
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
          },
          audio: false,
        });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Camera Error:", error);
    }
  };

const stopCamera = () => {
  const mediaStream =
    videoRef.current?.srcObject;

  if (mediaStream) {
    mediaStream
      .getTracks()
      .forEach((track) =>
        track.stop()
      );
  }
};
  const capturePhoto = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      video,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const image = canvas.toDataURL("image/png");

    setCapturedImage(image);

    try {
      const blob = await (await fetch(image)).blob();

      const file = new File(
        [blob],
        "selfie.png",
        {
          type: "image/png",
        }
      );

      await dispatch(uploadSelfie(file)).unwrap();

      stopCamera();

      navigate("/identify");
    } catch (error) {
    }
  };

  const retakePhoto = async () => {
    setCapturedImage(null);
    await startCamera();
  };
  return (
    <div className="relative h-dvh bg-[var(--bg-background)] overflow-hidden">
      {/* <Navbar /> */}
      {/* Back Button */}
      <button
        onClick={() => navigate("/getverified")}
        className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center"
      >
        <ChevronLeft size={18} />
      </button>

      <div className="max-w-sm mx-auto  flex flex-col px-5 pt-8 pb-3   bg-[var(--bg-card)]/10   border border-[var(--border)]">

        {/* Header */}
        <div className="text-center">
          <p className="text-[11px] text-[var(--text-dim2)]">
            {t('takeSelfie.step_1_of_2')}
          </p>

          <h1 className="text-[28px] font-bold text-[var(--text-dim)] mt-1">
            {t('takeSelfie.take_a_selfie')}
          </h1>

          <p className="text-sm text-[var(--text-dim2)] mt-2">
            {t('takeSelfie.compare_note')}
          </p>

          <div className="mt-2 inline-flex items-center px-4 py-2 rounded-full bg-[#DFF2D8] text-[#4A9A4A] text-xs font-medium">
            {t('takeSelfie.face_detection')}
          </div>
        </div>

        {/* Camera Section */}
        <div className="flex flex-col items-center mt-3">

          <div className="relative w-[55vw] max-w-[190px] min-w-[160px] aspect-[4/5]">

            {/* Corner Guides */}
            <div className="absolute top-0 left-0 w-10 h-10 border-l-2 border-t-2 border-gray-500 rounded-tl-3xl z-10" />
            <div className="absolute top-0 right-0 w-10 h-10 border-r-2 border-t-2 border-gray-500 rounded-tr-3xl z-10" />
            <div className="absolute bottom-0 left-0 w-10 h-10 border-l-2 border-b-2 border-gray-500 rounded-bl-3xl z-10" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-r-2 border-b-2 border-gray-500 rounded-br-3xl z-10" />

            <div className="w-full h-full bg-white rounded-[28px] overflow-hidden shadow-md p-2">
              {capturedImage ? (
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-full h-full object-cover rounded-[22px]"
                />
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover rounded-[22px]"
                />
              )}
            </div>
          </div>

          <canvas ref={canvasRef} className="hidden" />

          <div className="mt-3 bg-[var(--bg-background)] px-4 py-2 rounded-full text-xs text-[var(--text-dim)]">
            {t('takeSelfie.center_face')}
          </div>

          <div className="flex gap-10 mt-3 mb-4">
            <button className="w-11 h-11 rounded-full bg-white shadow flex items-center justify-center">
              <SunMedium size={18} />
            </button>

            <button className="w-11 h-11 rounded-full bg-white shadow flex items-center justify-center">
              <CameraOff size={18} />
            </button>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="mt-2">

          {capturedImage ? (
            <button
              onClick={retakePhoto}
              className="w-full h-11 rounded-lg bg-gray-800 text-white font-medium"
            >
              {t('takeSelfie.retake_photo')}
            </button>
          ) : (
            <button
              onClick={capturePhoto}
              disabled={loading}
              className="w-full h-11 rounded-lg text-white font-medium bg-gradient-to-r from-[#D58AA2] to-[#566CF5]"
            >
              {loading ? t('takeSelfie.uploading') : t('takeSelfie.capture')}
            </button>
          )}{error && (
            <p className="text-red-500 text-xs text-center mt-2">
              {error?.message || error || t('takeSelfie.upload_failed')}
            </p>
          )}

          <p className="text-center text-[11px] text-[var(--text-dim)] mt-2">
            {t('takeSelfie.focus_note')}
          </p>

        </div>

      </div>
    </div>
  );
}

export default TakeSelfie;
