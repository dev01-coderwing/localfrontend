import React, { useRef, useState, useCallback, useEffect } from "react";
import { ArrowLeft, Plus, X, Link2, Trash2 } from "lucide-react";
import Navbar from "../../Navbar/Navbar";
import Right from "../layout/Right";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile } from "../../Redux/profileSlice";
import { getProfileConfig } from "../../Redux/profileConfigSlice";

let idCounter = 0;
const nextId = (prefix) => `${prefix}-${Date.now()}-${idCounter++}`;

// Same base-URL derivation used in Navbar/ProfileHome, so relative photo
// paths coming back from the API resolve to a real image instead of a 404.
const IMAGE_BASE_URL = import.meta.env.VITE_API_URL?.trim()?.replace(
  /\/api\/v1\/?$/,
  ""
);

const resolvePhotoUrl = (url) => {
  if (!url) return url;
  // Already a full/data URL (freshly picked file) -> use as-is, otherwise
  // treat it as a relative path returned by the backend.
  return url.startsWith("http") || url.startsWith("data:")
    ? url
    : `${IMAGE_BASE_URL}/${url}`;
};

function Updateprofile() {
  const dispatch = useDispatch();

  // `profile`/`updateLoading` can legitimately be null/false on first render
  // (before getUserProfile resolves), so every field below is read with
  // optional chaining / fallbacks - never assume profile is defined.
  const { profile, updateLoading } = useSelector((state) => state.profile);
  const authUserId = useSelector((state) => state.auth?.user?.id);

  // Dropdown options + limits are backend-driven (see profileConfigSlice).
  // Nothing here is hardcoded in the component itself.
  const {
    genderOptions,
    lookingForOptions,
    maxPhotos,
    loaded: configLoaded,
    loading: configLoading,
  } = useSelector((state) => state.profileConfig);

  // ---- Local editable form state ----------------------------------------
  // All fields start "empty" (no hardcoded sample data). They are filled in
  // by the sync effect below once the Redux profile is available, and stay
  // fully editable from that point on.
  const [fullName, setFullName] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [photos, setPhotos] = useState([]); // always an array so .map/.length never throw
  const [interests, setInterests] = useState([]);
  const [isAddingInterest, setIsAddingInterest] = useState(false);
  const [newInterest, setNewInterest] = useState("");
  const [lookingFor, setLookingFor] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);

  const fileInputRef = useRef(null);
  const pendingSlotRef = useRef(null); // which slot triggered the picker

  // Fetch the profile if it isn't in the store yet (e.g. user opens this
  // page directly instead of navigating from a page that already loaded it).
  useEffect(() => {
    if (authUserId && !profile) {
      dispatch(getUserProfile(authUserId));
    }
  }, [dispatch, authUserId, profile]);

  // Load gender/looking-for options and the photo limit from the backend.
  useEffect(() => {
    if (!configLoaded && !configLoading) {
      dispatch(getProfileConfig());
    }
  }, [dispatch, configLoaded, configLoading]);

  // Sync Redux profile data -> local editable state whenever it (re)loads.
  // This is what makes the form dynamic instead of hardcoded.
  useEffect(() => {
    if (!profile) return;

    // Some slices in this app return the profile as `{ data: {...} }`,
    // others as the flat object itself - support both safely.
    const data = profile?.data ?? profile;

    setFullName(data.fullName || "");
    setGender(data.gender || "");
    setLocation(data.city || "");
    setBio(data.bio || "");
    setInterests(data.interests || []);
    setLookingFor(data.lookingFor || []);

    setSocialLinks(
      (data.socialLinks || []).map((link) =>
        typeof link === "string"
          ? { id: nextId("link"), url: link }
          : { id: link.id ?? nextId("link"), url: link.url ?? "" }
      )
    );

    setPhotos(
      (data.photos || []).map((photo) =>
        typeof photo === "string"
          ? { id: nextId("photo"), url: resolvePhotoUrl(photo) }
          : { id: photo.id ?? nextId("photo"), url: resolvePhotoUrl(photo.url) }
      )
    );
  }, [profile]);

  // Builds the PUT payload from current form state and dispatches the update.
  const handleUpdateProfile = () => {
    const data = profile?.data ?? profile;
    const userId = data?.id ?? authUserId;
    if (!userId) return;

    const payload = {
      fullName,
      gender,
      city: location,
      bio,
      interests,
      lookingFor,
      socialLinks: socialLinks.map((l) => l.url).filter(Boolean),
      photos: photos.map((p) => p.url),
    };

    dispatch(updateUserProfile({ userId, payload }));
  };

  const openFilePicker = (slotIndex) => {
    pendingSlotRef.current = slotIndex;
    fileInputRef.current?.click();
  };

  const handleFileChosen = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setPhotos((prev) => {
        const next = [...prev];
        const url = reader.result;
        const slot = pendingSlotRef.current;
        if (slot !== null && slot < next.length) {
          // replacing an existing photo (not used currently, but safe)
          next[slot] = { ...next[slot], url };
        } else {
          next.push({ id: nextId("photo"), url });
        }
        return next.slice(0, maxPhotos);
      });
      pendingSlotRef.current = null;
    };
    reader.readAsDataURL(file);
    // reset input so choosing the same file twice still fires onChange
    e.target.value = "";
  }, [maxPhotos]);

  const removePhoto = (id) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  // ---- Interests --------------------------------------------------------
  const removeInterest = (interest) => {
    setInterests((prev) => prev.filter((i) => i !== interest));
  };

  const commitNewInterest = () => {
    const trimmed = newInterest.trim();
    if (trimmed && !interests.some((i) => i.toLowerCase() === trimmed.toLowerCase())) {
      setInterests((prev) => [...prev, trimmed]);
    }
    setNewInterest("");
    setIsAddingInterest(false);
  };

  // ---- Looking for (multi-select) --------------------------------------
  const toggleLookingFor = (option) => {
    setLookingFor((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  // ---- Social links -------------------------------------------------------
  const updateSocialLink = (id, url) => {
    setSocialLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, url } : l))
    );
  };

  const removeSocialLink = (id) => {
    setSocialLinks((prev) => prev.filter((l) => l.id !== id));
  };

  const addSocialLink = () => {
    setSocialLinks((prev) => [...prev, { id: nextId("link"), url: "" }]);
  };

  // ---- Derived ------------------------------------------------------------
  const emptySlots = Math.max(0, maxPhotos - photos.length);
  return (
    <>
    <Navbar/>
    <div className="flex w-full justify-around bg-[var(--bg-background)]  ">
   

      <div className="max-w-2xl mx-auto mt-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-5">
          <button
            type="button"
            aria-label="Go back"
            className="w-9 h-9 rounded-full bg-[var(--bg-card)]/10 shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--text-dim)]" />
          </button>
          <h1 className="text-2xl font-bold text-[var(--text-dim)]">Setting</h1>
        </div>

        {/* Card */}
        <div className="bg-[var(--bg-card)]/10 rounded-3xl p-5 space-y-6">
          {/* Photos grid */}
          <div className="grid grid-cols-4 gap-3">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className={`relative rounded-2xl overflow-hidden  ${
                  index === 0 ? "row-span-2 col-span-1" : ""
                }`}
                style={{ aspectRatio: index === 0 ? "3/4" : "1/1" }}
              >
                <img
                  src={photo.url}
                  alt={index === 0 ? "Main profile photo" : `Profile photo ${index + 1}`}
                  className="w-full h-full object-cover "
                />
                {index === 0 && (
                  <span className="absolute top-2 left-2 bg-[var(--bg-card)]/10 text-[var(--text-dim2)] text-xs font-semibold px-3 py-1 rounded-full">
                    Main
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removePhoto(photo.id)}
                  aria-label="Remove photo"
                  className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-white text-red-500 flex items-center justify-center shadow hover:bg-red-50 transition-colors"
                >
                  <X className="w-3.5 h-3.5" strokeWidth={3} />
                </button>
              </div>
            ))}

            {Array.from({ length: emptySlots }).map((_, i) => (
              <button
                key={`empty-${i}`}
                type="button"
                onClick={() => openFilePicker(null)}
                aria-label="Add photo"
                className="rounded-2xl bg-white flex items-center justify-center hover:bg-gray-50 transition-colors"
                style={{ aspectRatio: photos.length === 0 && i === 0 ? "3/4" : "1/1" }}
              >
                <Plus className="w-6 h-6 text-gray-400" strokeWidth={2.5} />
              </button>
            ))}
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm text-[var(--text-dim2)] mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              rows={4}
              className="w-full rounded-2xl bg-[var(--bg-card)]/10 px-4 py-3 text-sm text-[var(--text-dim2)] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-violet-400 resize-none"
            />
          </div>

          {/* Interests */}
        

          {/* Basic Info */}
          <div className="bg-[var(--bg-card)]/10 rounded-2xl p-5">
            <h2 className="text-sm text-[var(--text-dim2)] mb-4">Basic Info</h2>

            <label
              htmlFor="fullName"
              className="block text-xs font-bold tracking-wide text-[var(--text-dim2)]  mb-1"
            >
              FULL NAME
            </label>
            <input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl bg-[var(--bg-card)]/10 px-4 py-2.5 text-sm text-[var(--text-dim2)] outline-none focus:ring-2 focus:ring-violet-400 mb-4"
            />

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label
                  htmlFor="gender"
                  className="block text-xs font-bold tracking-wide text-[var(--text-dim2)]  mb-1"
                >
                  GENDER
                </label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full rounded-xl bg-[var(--bg-card)]/10 px-4 py-2.5 text-sm text-[var(--text-dim2)] outline-none focus:ring-2 focus:ring-violet-400 appearance-none"
                >
                  {genderOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block text-xs font-bold tracking-wide text-[var(--text-dim2)]  mb-1"
                >
                  LOCATION
                </label>
                <input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full rounded-xl bg-[var(--bg-card)]/10 px-4 py-2.5 text-sm text-[var(--text-dim2)] outline-none focus:ring-2 focus:ring-violet-400"
                />
              </div>
            </div>

            <p className="text-sm text-[var(--text-dim2)] mb-3">What are you looking for</p>
            <div className="border border-[var(--border)] rounded-2xl p-4">
              <div className="flex flex-wrap gap-3">
                {lookingForOptions.map((option) => {
                  const selected = lookingFor.includes(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleLookingFor(option)}
                      className={`px-5 py-2.5 rounded-full text-sm font-bold border transition-colors ${
                        selected
                          ? "bg-[var(--primary)] border border-[var(--border)] text-[var(--text-dim2)]"
                          : "bg-[var(--bg-card)]/10 border border-[var(--border)] text-[var(--text-dim)]"
                      }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Social links */}
          <div className="bg-[var(--bg-card)]/10 rounded-2xl p-5">
            <h2 className="text-xs font-bold tracking-wide text-[var(--text-dim2)] mb-3">
              SOCIAL LINKS
            </h2>

            <div className="space-y-2">
              {socialLinks.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center gap-3 bg-[var(--bg-card)]/10 rounded-xl px-4 py-2.5"
                >
                  <Link2 className="w-4 h-4 text-[var(--text-dim)] shrink-0" />
                  <input
                    value={link.url}
                    onChange={(e) => updateSocialLink(link.id, e.target.value)}
                    placeholder="yourprofile.com/username"
                    className="flex-1 bg-transparent text-sm text-[var(--text-dim)] outline-none placeholder:text-[var(--text-dim2)]"
                  />
                  <button
                    type="button"
                    onClick={() => removeSocialLink(link.id)}
                    aria-label="Remove link"
                    className="text-red-500 hover:text-red-700 transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addSocialLink}
              className="w-full flex items-center justify-center gap-1.5 text-sm font-semibold text-[var(--text-dim)] mt-4 py-1 hover:text-[var(--text-dim2)] transition-colors"
            >
              <Plus className="w-4 h-4" strokeWidth={2.5} />
              Link another account
            </button>
          </div>

          {/* Save */}
          <button
            type="button"
            onClick={handleUpdateProfile}
            disabled={updateLoading}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#D79098] to-[#5F7BF4] text-white text-sm font-bold  transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {updateLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

   <div className="mt-6">
    <Right />
  </div>

    </div>
</>
  )

}

export default Updateprofile;
