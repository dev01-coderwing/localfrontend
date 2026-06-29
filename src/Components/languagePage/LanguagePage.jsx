// import { useState, useRef, useEffect } from "react";

// const languages = [
//     { code: "en", name: "English", flag: "🇺🇸", native: "English" },
//     { code: "es", name: "Spanish", flag: "🇪🇸", native: "Español" },
//     { code: "fr", name: "French", flag: "🇫🇷", native: "Français" },
//     { code: "de", name: "German", flag: "🇩🇪", native: "Deutsch" },
//     { code: "ja", name: "Japanese", flag: "🇯🇵", native: "日本語" },
//     { code: "zh", name: "Chinese", flag: "🇨🇳", native: "中文" },
//     { code: "ar", name: "Arabic", flag: "🇸🇦", native: "العربية" },
//     { code: "pt", name: "Portuguese", flag: "🇧🇷", native: "Português" },
//     { code: "hi", name: "Hindi", flag: "🇮🇳", native: "हिन्दी" },
//     { code: "ko", name: "Korean", flag: "🇰🇷", native: "한국어" },
//     { code: "it", name: "Italian", flag: "🇮🇹", native: "Italiano" },
//     { code: "ru", name: "Russian", flag: "🇷🇺", native: "Русский" },
// ];
// import Navbar from '../Navbar/Navbar'

// function LanguagePage() {
//     const [selected, setSelected] = useState(null);
//     const [isOpen, setIsOpen] = useState(false);
//     const [confirmed, setConfirmed] = useState(false);
//     const [search, setSearch] = useState("");
//     const [mounted, setMounted] = useState(false);
//     const dropdownRef = useRef(null);
//     const searchRef = useRef(null);

//     useEffect(() => {
//         setMounted(true);
//     }, []);

//     useEffect(() => {
//         if (isOpen && searchRef.current) {
//             searchRef.current.focus();
//         }
//     }, [isOpen]);

//     useEffect(() => {
//         const handleClickOutside = (e) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//                 setIsOpen(false);
//                 setSearch("");
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     const filtered = languages.filter(
//         (l) =>
//             l.name.toLowerCase().includes(search.toLowerCase()) ||
//             l.native.toLowerCase().includes(search.toLowerCase())
//     );

//     const handleConfirm = () => {
//         if (!selected) return;
//         setConfirmed(true);
//         setTimeout(() => setConfirmed(false), 2500);
//     };

//     return (
//         <>
//             <Navbar />
//             <div className='var(--bg-soft) text-[var(--text)] min-h-screen w-full '>
//                 <div
//                     style={{ fontFamily: "Poppins, sans-serif" }}
//                     className="min-h-screen flex items-center justify-center p-4"

//                 >
//                     <style>{`

//         * { box-sizing: border border-gray-300-box; }

//         body {
//           min-height: 100vh;
//           font-family: Poppins;
//         }

//         .card {
//           background: var(--card);
//   border border-[var(--border)]
//           backdrop-filter: blur(20px);

//         }

//         .globe-icon {
//           background: linear-gradient(135deg, #ffd6d6 0%, #ffc3b3 100%);
//           box-shadow: 0 8px 24px rgba(255, 120, 100, 0.25);
//         }

//         .confirm-btn {
//            background: linear-gradient(#D79098,#5F7BF4);
//           background-size: 200% auto;
//           transition: background-position 0.4s ease, transform 0.15s ease, box-shadow 0.2s ease, opacity 0.2s ease;
//           box-shadow: 0 6px 28px rgba(155, 127, 232, 0.45);
//         }

//         .confirm-btn:hover:not(:disabled) {
//           background-position: right center;
//           transform: translateY(-1px);
//           box-shadow: 0 10px 36px rgba(155, 127, 232, 0.55);
//         }

//         .confirm-btn:active:not(:disabled) {
//           transform: translateY(0px);
//         }

//         .confirm-btn:disabled {
//           opacity: 0.5;
//           cursor: not-allowed;
//           box-shadow: none;
//         }

//         .dropdown-trigger {
//   border: 1.5px solid var(--border);
//           transition: border border-[var(--border)] 0.2s ease, box-shadow 0.2s ease;
//         }

//         .dropdown-trigger:hover {
//           border border-[var(--border)]: #c4b0e8;
//         }

//         .dropdown-trigger.open {
//           border border-[var(--border)]: #9b7fe8;
//           box-shadow: 0 0 0 3px rgba(155, 127, 232, 0.12);
//         }

//         .dropdown-list {
// border: 1.5px solid var(--border);
//           box-shadow: 0 12px 40px rgba(100, 80, 180, 0.15);
//           animation: dropIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
//         }

//         @keyframes dropIn {
//           from { opacity: 0; transform: translateY(-8px) scale(0.97); }
//           to { opacity: 1; transform: translateY(0) scale(1); }
//         }

//         .lang-item {
//           transition: background 0.12s ease;
//         }

//         .lang-item:hover {
//        background: rgba(255, 255, 255, 0.05);
//         }

//         .lang-item.active {
//           background: #ede7ff;
//         }

//         .chevron {
//           transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
//         }

//         .chevron.rotated {
//           transform: rotate(180deg);
//         }

//         .fade-in {
//           animation: fadeIn 0.5s ease forwards;
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(16px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         .success-toast {
//           animation: slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
//         }

//         @keyframes slideUp {
//           from { opacity: 0; transform: translateX(-50%) translateY(20px); }
//           to { opacity: 1; transform: translateX(-50%) translateY(0); }
//         }

//         .search-input {
//           outline: none;
//   border-bottom: 1.5px solid var(--border);
//         }

//         .search-input:focus {
//   border-bottom-color: var(--border);
//         }
//       `}</style>

//                     <div
//                         className={`card rounded-3xl p-10 w-full max-w-md relative ${mounted ? "fade-in" : "opacity-0"}`}
//                         style={{ maxWidth: "480px" }}
//                     >
//                         {/* Globe Icon */}
//                         <div className="flex justify-center mb-8">
//                             <div className="globe-icon w-20 h-20 rounded-2xl flex items-center justify-center">
//                                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
//                                     <circle cx="12" cy="12" r="10" stroke="#e05a40" strokeWidth="1.8" />
//                                     <path d="M12 2C12 2 8 7 8 12C8 17 12 22 12 22" stroke="#e05a40" strokeWidth="1.8" strokeLinecap="round" />
//                                     <path d="M12 2C12 2 16 7 16 12C16 17 12 22 12 22" stroke="#e05a40" strokeWidth="1.8" strokeLinecap="round" />
//                                     <path d="M2 12H22" stroke="#e05a40" strokeWidth="1.8" strokeLinecap="round" />
//                                     <path d="M3.5 7H20.5M3.5 17H20.5" stroke="#e05a40" strokeWidth="1.8" strokeLinecap="round" />
//                                 </svg>
//                             </div>
//                         </div>

//                         {/* Title */}
//                         <div className="text-center mb-8">
//                             <h1
//                                 style={{ fontFamily: "Poppins", fontSize: "2.1rem",  letterSpacing: "-0.02em" }}
//                                 className="font-medium text-[var(--text)]"
//                             >
//                                 Choose your language
//                             </h1>
//                             <p style={{  fontSize: "1rem" }} className="font-medium opacity-70">
//                                 Select your preferred language
//                             </p>
//                         </div>

//                         {/* Dropdown */}
//                         <div className={`relative ${isOpen ? "mb-12" : "mb-8"}`} ref={dropdownRef}>
//                             <button
//                                 onClick={() => { setIsOpen(!isOpen); setSearch(""); }}
//                                 className={`dropdown-trigger w-full rounded-2xl px-5 py-4 flex items-center justify-between bg-[var(--bg)] cursor-pointer ${isOpen ? "open" : ""}`}
//                             >
//                                 {selected ? (
//                                     <span className="flex items-center gap-3">
//                                         <span style={{ fontSize: "1.4rem" }}>{selected.flag}</span>
//                                         <span style={{  fontWeight: 600, fontSize: "0.95rem" }} className="text-[var(--text)]">
//                                             {selected.name}
//                                             <span style={{ color: "#9b7fe8", marginLeft: "6px", fontWeight: 400 }}>— {selected.native}</span>
//                                         </span>
//                                     </span>
//                                 ) : (
//                                     <span style={{  fontWeight: 500, fontSize: "" }} className="text-[var(--text)]">
//                                         Select language
//                                     </span>
//                                 )}
//                                 <svg
//                                     className={`chevron ${isOpen ? "rotated" : ""}`}
//                                     width="18" height="18" viewBox="0 0 24 24" fill="none"
//                                 >
//                                     <path d="M6 9L12 15L18 9" stroke="#9b7fe8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
//                                 </svg>
//                             </button>

//                             {isOpen && (
//                                 <div className="dropdown-list mt-2 bg-[var(--bg)] rounded-2xl overflow-hidden">
//                                     {/* Search */}
//                                     <div className="px-4 pt-3 pb-2">
//                                         <input
//                                             ref={searchRef}
//                                             type="text"
//                                             value={search}
//                                             onChange={(e) => setSearch(e.target.value)}
//                                             placeholder="Search language..."
//                                             className="search-input  text-[var(--text)] w-full bg-transparent px-1 py-2 text-sm"
//                                             style={{  fontFamily: "'DM Sans', sans-serif" }}
//                                         />
//                                     </div>

//                                     {/* List */}
//                                     <div style={{ maxHeight: "240px", overflowY: "auto" }}>
//                                         {filtered.length === 0 ? (
//                                             <div className="px-5 py-4 text-center" style={{ color: "#b0a0c8", fontSize: "0.9rem" }}>
//                                                 No languages found
//                                             </div>
//                                         ) : (
//                                             filtered.map((lang) => (
//                                                 <button
//                                                     key={lang.code}
//                                                     onClick={() => { setSelected(lang); setIsOpen(false); setSearch(""); }}
//                                                     className={`lang-item w-full px-5 py-3 flex items-center gap-3 text-left ${selected?.code === lang.code ? "active" : ""}`}
//                                                 >
//                                                     <span style={{ fontSize: "1.3rem" }}>{lang.flag}</span>
//                                                     <span>
//                                                         <span style={{  fontWeight: 600, fontSize: "0.92rem", display: "block" }} className="text-[var(--text)]">{lang.name}</span>
//                                                         <span style={{ color: "#a090c0", fontSize: "0.8rem" }}>{lang.native}</span>
//                                                     </span>
//                                                     {selected?.code === lang.code && (
//                                                         <span className="ml-auto" style={{ color: "#9b7fe8" }}>
//                                                             <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                                                                 <path d="M5 12L10 17L20 7" stroke="#9b7fe8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
//                                                             </svg>
//                                                         </span>
//                                                     )}
//                                                 </button>
//                                             ))
//                                         )}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Confirm Button */}
//                         <button
//                             className="confirm-btn w-full py-4 rounded-2xl text-[var(--text)] font-semibold text-base tracking-wide"
//                             onClick={handleConfirm}
//                             disabled={!selected}
//                         >
//                             {confirmed ? `✓ ${selected?.name} confirmed!` : "Confirm"}
//                         </button>


//                     </div>
//                 </div>
//             </div>


//         </>
//     )
// }

// export default LanguagePage



import { useState, useRef, useEffect } from "react";
import Animation from "../Animation/Animation";
import { useDispatch, useSelector } from "react-redux";
import i18n from "../../i18n";
import { updateLanguage } from "../../Components/Redux/bordingSlice";
import { useTranslation } from "react-i18next";
const languages = [
    { code: "en", name: "English", flag: "🇺🇸", native: "English" },
    { code: "es", name: "Spanish", flag: "🇪🇸", native: "Español" },
    { code: "fr", name: "French", flag: "🇫🇷", native: "Français" },
    { code: "de", name: "German", flag: "🇩🇪", native: "Deutsch" },
    { code: "it", name: "Italian", flag: "🇮🇹", native: "Italiano" },
    { code: "ja", name: "Japanese", flag: "🇯🇵", native: "日本語" },
    { code: "ko", name: "Korean", flag: "🇰🇷", native: "한국어" },
    { code: "pt", name: "Portuguese", flag: "🇧🇷", native: "Português" },
    { code: "zh", name: "Chinese", flag: "🇨🇳", native: "中文" },
];
import Navbar from '../Navbar/Navbar'
import { useNavigate } from "react-router-dom";
function LanguagePage() {
    const [selected, setSelected] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [search, setSearch] = useState("");
    const [mounted, setMounted] = useState(false);
    const dropdownRef = useRef(null);
    const searchRef = useRef(null);
    const dispatch = useDispatch();
const navigate = useNavigate();
    const { loading } = useSelector((state) => state.language);
    const { user } = useSelector((state) => state.auth);
    const { t } = useTranslation();
    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (isOpen && searchRef.current) {
            searchRef.current.focus();
        }
    }, [isOpen]);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
                setSearch("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filtered = languages.filter(
        (l) =>
            l.name.toLowerCase().includes(search.toLowerCase()) ||
            l.native.toLowerCase().includes(search.toLowerCase())
    );
  const handleConfirm = async () => {
    if (!selected) return;

    try {
        // Get user ID from Redux state
        const userId = user?.id;

        console.log("USER ID =", userId);

        // Agar login nahi hai
        if (!userId) {
            navigate("/login");
            return;
        }

        const result = await dispatch(
            updateLanguage({
                userId,
                language: selected.code,
            })
        );

        console.log(result);

        if (updateLanguage.fulfilled.match(result)) {

   // i18next language change
            i18n.changeLanguage(selected.code);

    // optional
            localStorage.setItem("i18nextLng", selected.code);

            setConfirmed(true);

            setTimeout(() => {
                setConfirmed(false);

                navigate("/intro");

            }, 1000);

            console.log("Language Updated");
        }

    } catch (error) {
        console.log(error);
    }
};
    return (
        <>
            <Navbar />
            <div className='bg-[var(--bg)] text-[var(--text)] min-h-screen w-full '>

                <div
                    style={{ fontFamily: "Poppins, sans-serif" }}
                    className="min-h-screen flex items-center justify-center p-4"

                >
                    <style>{`

        * { box-sizing: border border-gray-300-box; }

        body {
          min-height: 100vh;
          font-family: Poppins;
        }

        .card {
          background: var(--card);
border: 1px solid var(--border);
          backdrop-filter: blur(20px);

        }

        .globe-icon {
          background: linear-gradient(135deg, #ffd6d6 0%, #ffc3b3 100%);
          box-shadow: 0 8px 24px rgba(255, 120, 100, 0.25);
        }

        .confirm-btn {
           background: linear-gradient(to right, #C97F3A, #5E70F7);
          transition: background-position 0.4s ease, transform 0.15s ease, box-shadow 0.2s ease, opacity 0.2s ease;
          box-shadow: 0 6px 28px rgba(155, 127, 232, 0.45);
        }

        .confirm-btn:hover:not(:disabled) {
          background-position: right center;
          transform: translateY(-1px);
        }

        .confirm-btn:active:not(:disabled) {
          transform: translateY(0px);
        }

        .confirm-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          box-shadow: none;
        }

        .dropdown-trigger {
     border: 1px solid var(--border);
          transition: border border-[var(--border)] 0.2s ease, box-shadow 0.2s ease;
        }

        .dropdown-trigger:hover {
            border: 1px solid var(--border);
        }

        .dropdown-trigger.open {
          border: 1px solid var(--border);
          box-shadow: 0 0 0 3px rgba(155, 127, 232, 0.12);
        }

        .dropdown-list {
border: 1.5px solid var(--border);
          box-shadow: 0 12px 40px rgba(100, 80, 180, 0.15);
          animation: dropIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .lang-item {
          transition: background 0.12s ease;
        }

        .lang-item:hover {
       background: rgba(255, 255, 255, 0.05);
        }

     

        .chevron {
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .chevron.rotated {
          transform: rotate(180deg);
        }

        .fade-in {
          animation: fadeIn 0.5s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .success-toast {
          animation: slideUp 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .search-input {
          outline: none;
border: 1px solid var(--border);
        }

        .search-input:focus {
border: 1px solid var(--border);
        }
      `}</style>

                    <div
                        className={`card rounded-3xl p-10 w-full max-w-md relative ${mounted ? "fade-in" : "opacity-0"}`}
                        style={{ maxWidth: "480px" }}
                    >
                        {/* Globe Icon */}
                        <div className="flex justify-center mb-8">
                            <div className="globe-icon w-20 h-20 rounded-2xl flex items-center justify-center">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="#e05a40" strokeWidth="1.8" />
                                    <path d="M12 2C12 2 8 7 8 12C8 17 12 22 12 22" stroke="#e05a40" strokeWidth="1.8" strokeLinecap="round" />
                                    <path d="M12 2C12 2 16 7 16 12C16 17 12 22 12 22" stroke="#e05a40" strokeWidth="1.8" strokeLinecap="round" />
                                    <path d="M2 12H22" stroke="#e05a40" strokeWidth="1.8" strokeLinecap="round" />
                                    <path d="M3.5 7H20.5M3.5 17H20.5" stroke="#e05a40" strokeWidth="1.8" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>

                        {/* Title */}
                        <div className="text-center mb-8">
                            <h1
                                style={{ fontFamily: "Poppins", fontSize: "2.1rem", letterSpacing: "-0.02em" }}
                                className="font-medium text-[var(--text-dim)]"
                            >
                              {t("choose_language")}
                            </h1>
                            <p style={{ fontSize: "1rem" }} className="font-medium opacity-70 text-[var(--text-dim2)]">
                              {t("select_preferred_language")}
                            </p>
                        </div>

                        {/* Dropdown */}
                        <div className={`relative ${isOpen ? "mb-12" : "mb-8"}`} ref={dropdownRef}>
                            <button
                                onClick={() => { setIsOpen(!isOpen); setSearch(""); }}
                                className={`dropdown-trigger w-full rounded-2xl px-5 py-4 flex items-center justify-between bg-[var(--bg)] cursor-pointer ${isOpen ? "open" : ""}`}
                            >
                                {selected ? (
                                    <span className="flex items-center gap-3">
                                        <span className="text-[var(--text-dim)]" style={{ fontSize: "1.4rem" }}>{selected.flag}</span>
                                        <span   className="text-[var(--text-dim)]" style={{ fontWeight: 600, fontSize: "0.95rem" }} >
                                            {selected.name}
                                            <span className="text-[var(--text-dim2)]"  style={{ marginLeft: "6px", fontWeight: 400 }}>— {selected.native}</span>
                                        </span>
                                    </span>
                                ) : (
                                    <span style={{ fontWeight: 500, fontSize: "" }} className="text-[var(--text-dim2)]">
                                     {t("select_language")}
                                    </span>
                                )}
                                <svg
                                    className={`chevron ${isOpen ? "rotated" : ""}`}
                                    width="18" height="18" viewBox="0 0 24 24" fill="none"
                                >
                                    <path d="M6 9L12 15L18 9" stroke="#9b7fe8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            {isOpen && (
                                <div className="dropdown-list mt-2 bg-[var(--bg)] rounded-2xl overflow-hidden">
                                    {/* Search */}
                                    <div className="px-4 pt-3 pb-2">
                                        <input
                                            ref={searchRef}
                                            type="text"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                          placeholder={t("search_language")}
                                            className="search-input  text-[var(--text-dim2)] w-full bg-transparent px-1 py-2 text-sm"
                                            style={{ fontFamily: "'DM Sans', sans-serif" }}
                                        />
                                    </div>

                                    {/* List */}
                                    <div style={{ maxHeight: "240px", overflowY: "auto" }}>
                                        {filtered.length === 0 ? (
                                            <div className="px-5 py-4 text-center" style={{ color: "#b0a0c8", fontSize: "0.9rem" }}>
                                         {t("no_languages_found")}
                                            </div>
                                        ) : (
                                            filtered.map((lang) => (
                                                <button
                                                    key={lang.code}
                                                    onClick={() => { setSelected(lang); setIsOpen(false); setSearch(""); }}
                                                    className={`lang-item w-full px-5 py-3 flex items-center gap-3 text-left ${selected?.code === lang.code ? "active" : ""}`}
                                                >
                                                    <span style={{ fontSize: "1.3rem" }} className="text-[var(--text-dim2)]">{lang.flag}</span>
                                                    <span>
                                                        <span style={{ fontWeight: 600, fontSize: "0.92rem", display: "block" }} className="text-[var(--text-dim2)]">{lang.name}</span>
                                                        <span style={{ fontSize: "0.8rem" }} className="text-[var(--text-dim)]">{lang.native}</span>
                                                    </span>
                                                    {selected?.code === lang.code && (
                                                        <span className="ml-auto text-[var(--text-dim)]" >
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                                <path d="M5 12L10 17L20 7" stroke="#9b7fe8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </span>
                                                    )}
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Button */}
                        <button
                            className="confirm-btn w-full py-4 rounded-2xl text-white font-semibold text-base tracking-wide"
                            onClick={handleConfirm}
                            disabled={!selected || loading}
                        >
                            {
                                loading
                                    ? t("updating")
                                    : confirmed
                                        ? `✓ ${selected?.name} confirmed!`
                                        : t("confirm")
                            }
                            </button>
                    </div>
                </div>

            </div>


        </>
    )
}

export default LanguagePage

