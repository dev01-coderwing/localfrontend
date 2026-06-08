import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { Search, Settings, Plus, Minus, Navigation, Radio, X, Sparkles, Medal, ChevronRight } from 'lucide-react';
import Setting from './Setting';
import SoulmapLocation from './SoulmapLocation';
import SoulProfile from './SoulProfile';
import Alignment from './Alignment';
import Globe from 'globe.gl';
import * as THREE from 'three';
 
// Leaflet Imports
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
 
// Fix for default Leaflet icon not showing with Vite/React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});
 
// Helper component to update Map view programmatically
const MapController = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true });
  }, [center, zoom, map]);
  return null;
};
 
 
const Soulmap = () => {
  const globeContainerRef = useRef(null);
  const globeInstanceRef = useRef(null);
  const [showMap, setShowMap] = useState(false);
  const [mapCenter, setMapCenter] = useState([0, 20]); // Leaflet uses [lat, lng] array
  const [mapZoom, setMapZoom] = useState(13);
 
  // Subscription States
  const [hasSubscription, setHasSubscription] = useState(false); // Change to true to test geolocation
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLocationResults, setShowLocationResults] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showAlignment, setShowAlignment] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentLocationName, setCurrentLocationName] = useState("Detecting...");
 
  const handleViewProfile = (user) => {
    setSelectedUser(user);
    setShowProfile(true);
  };
 
  const handleCloseModals = () => {
    setShowLocationResults(false);
    setShowProfile(false);
    setShowAlignment(false);
    setSelectedUser(null);
  };
 
  // Update city name whenever mapCenter changes
  useEffect(() => {
    if (mapCenter) {
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${mapCenter[0]}&lon=${mapCenter[1]}`)
        .then(res => res.json())
        .then(data => {
          const city = data.address.city || data.address.town || data.address.village || data.address.suburb || "Unknown Location";
          setCurrentLocationName(city);
        })
        .catch(() => setCurrentLocationName("Current Location"));
    }
  }, [mapCenter]);
 
  useEffect(() => {
    if (!globeContainerRef.current) return;
 
    // --- Globe.gl Initialization ---
    const world = Globe()(globeContainerRef.current)
      .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
      .bumpImageUrl('https://unpkg.com/three-globe/example/img/earth-topology.png')
      .backgroundImageUrl(null) // Transparent/Black background
      .backgroundColor('rgba(0,0,0,0)')
      .showAtmosphere(false)
      .width(500)
      .height(500);
 
    globeInstanceRef.current = world;
 
    // --- Add Cloud Layer ---
    const CLOUDS_IMG_URL = 'https://unpkg.com/three-globe/example/img/earth-clouds.png';
    const CLOUDS_ALT = 0.004;
    const CLOUDS_ROTATION_SPEED = -0.006; // deg/frame
 
    new THREE.TextureLoader().load(CLOUDS_IMG_URL, cloudsTexture => {
      const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(world.getGlobeRadius() * (1 + CLOUDS_ALT), 75, 75),
        new THREE.MeshPhongMaterial({ map: cloudsTexture, transparent: true })
      );
      world.scene().add(clouds);
 
      (function rotateClouds() {
        clouds.rotation.y += CLOUDS_ROTATION_SPEED * Math.PI / 180;
        requestAnimationFrame(rotateClouds);
      })();
    });
 
    // --- Configure Controls & Animation ---
    const controls = world.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.35;
    controls.enableZoom = false; // Keep it focused as a backdrop
 
    // Initial camera position
    world.pointOfView({ lat: 0, lng: 20, altitude: 2.5 });
 
    // Cleanup
    return () => {
      if (globeInstanceRef.current) {
        // Globe.gl doesn't have a formal destroy method that cleans up everything,
        // but we can stop the animation and clear the container.
        const container = globeContainerRef.current;
        if (container) {
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
        }
      }
    };
  }, [showMap]);
 
  const handleZoomIn = () => {
    if (showMap) {
      setMapZoom(prev => Math.min(prev + 1, 20));
      return;
    }
 
    if (globeInstanceRef.current) {
      const { lat, lng, altitude } = globeInstanceRef.current.pointOfView();
 
      // Threshold for Map Transition: If zooming in closer than 0.6 altitude
      if (altitude <= 0.6) {
        setMapCenter([lat, lng]);
        setShowMap(true);
      } else {
        globeInstanceRef.current.pointOfView({
          altitude: Math.max(0.2, altitude - 0.4)
        }, 600);
      }
    }
  };
 
  const handleZoomOut = () => {
    if (showMap) {
      setMapZoom(prev => Math.max(prev - 1, 1));
      return;
    }
 
    if (globeInstanceRef.current) {
      const currentPov = globeInstanceRef.current.pointOfView();
      globeInstanceRef.current.pointOfView({
        altitude: Math.min(8, currentPov.altitude + 0.4)
      }, 600);
    }
  };
 
  const handleGetCurrentLocation = () => {
    // 1. Subscription Check
    if (!hasSubscription) {
      setShowPremiumModal(true);
      return;
    }
 
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
 
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newCoords = [latitude, longitude];
 
        // 1. Update Map States
        setMapCenter(newCoords);
        setMapZoom(16); // Detailed zoom for current location
 
        // 2. Animate Globe Zoom (if not already in map view)
        if (!showMap && globeInstanceRef.current) {
          globeInstanceRef.current.pointOfView({
            lat: latitude,
            lng: longitude,
            altitude: 0.5 // Transition altitude
          }, 1500);
 
          // 3. Trigger map view after animation starts
          setTimeout(() => setShowMap(true), 1200);
 
          // 4. Reverse Geocoding to get City Name
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(res => res.json())
            .then(data => {
              const city = data.address.city || data.address.town || data.address.village || data.address.suburb || "New York";
              setCurrentLocationName(city);
            })
            .catch(err => {
              console.error("Geocoding error:", err);
              setCurrentLocationName("Current Location");
            });
        } else {
          // Just switch map center and zoom if already in map view
          setShowMap(true);
        }
      },
      (error) => {
        console.error("Error detecting location:", error);
        alert("Could not get your location. Please check your browser permissions.");
      },
      { enableHighAccuracy: true }
    );
  };
 
 
  return (
    <div className="min-h-screen text-white font-sans overflow-hidden relative">
      <Navbar />
 
      {/* Hero Map Area */}
    <main className="relative w-full h-[calc(100vh-140px)] flex items-center justify-center bg-[#0F041B]">
 
        {/* --- Globe.gl 3D Earth Container --- */}
        {!showMap ? (
          <div className="relative w-[500px] h-[500px] flex items-center justify-center z-10 transition-transform duration-1000 ease-out animate-in fade-in zoom-in-50">
            {/* The Globe Host Element */}
            <div
              ref={globeContainerRef}
              className="relative w-full h-full rounded-full overflow-hidden bg-transparent"
            >
              {/* Globe canvas will render here */}
              <style>{`
                .scene-container canvas {
                  border-radius: 9999px !important;
                  outline: none !important;
                }
              `}</style>
            </div>
 
            {/* Overlay Glow for extra premium feel */}
            <div className="absolute inset-0 rounded-full pointer-events-none z-20"></div>
          </div>
        ) : (
          <div className="absolute inset-0 z-10 animate-in fade-in zoom-in-110 duration-700">
            <MapContainer
              center={mapCenter}
              zoom={mapZoom}
              style={{ width: '100%', height: '100%', background: '#050505' }}
              zoomControl={false}
              attributionControl={false}
            >
              <MapController center={mapCenter} zoom={mapZoom} />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker
                position={mapCenter}
                eventHandlers={{
                  click: () => setShowLocationResults(true),
                }}
              />
            </MapContainer>
 
            {/* Exit Map Button */}
            <button
              onClick={() => setShowMap(false)}
              className="absolute top-10 right-10 z-[1000] flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A1A2E]/80 backdrop-blur-md text-white hover:bg-purple-600/30 transition-all shadow-2xl active:scale-95 group"
            >
              <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
              <span className="text-[10px] font-bold tracking-widest uppercase">Back to Soulmap</span>
            </button>
          </div>
        )}
 
 
        {/* --- Center-Left Scan Modal --- */}
        <div className="absolute z-30 top-[60%] left-10 -translate-y-1/2 w-[320px] p-6 rounded-3xl bg-[#0F0A1F]/80 backdrop-blur-xl border border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.2)] flex items-center gap-4 pointer-events-auto animate-in slide-in-from-left duration-700">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-purple-400 tracking-widest uppercase">Live Scan</span>
              <div className="flex-1 h-[1px] bg-purple-500/30"></div>
            </div>
            <h3 className="text-[17px] font-bold text-white mb-1 leading-tight">Scanning the planet for your equal</h3>
            <p className="text-[11px] text-gray-400 leading-relaxed">Globe frequency synchronization in progress</p>
          </div>
 
          {/* Pulsing Radar Icon */}
          <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/40">
            <div className="absolute inset-0 rounded-2xl bg-purple-500/20 animate-ping opacity-30"></div>
            <Radio className="w-6 h-6 text-purple-400 animate-pulse" />
          </div>
        </div>
 
        {/* --- Top Left: Satellite & Search --- */}
        <div className="absolute top-10 left-10 flex flex-col gap-5 z-30">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1A2E]/60 backdrop-blur-md border border-white/10 w-fit shadow-lg">
            <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)] animate-pulse"></div>
            <span className="text-[10px] font-bold text-gray-300 tracking-wider">SATELLITE LINKED</span>
          </div>
 
          <div className="group relative w-72">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search coordinates..."
              className="w-full bg-[#1A1A2E]/60 backdrop-blur-md border border-white/10 group-hover:border-purple-500/50 rounded-2xl py-3.5 pl-12 pr-4 text-sm outline-none transition-all focus:ring-1 focus:ring-purple-500/50"
            />
          </div>
        </div>
 
 
        {/* --- Top Right: Settings --- */}
        <div className="absolute top-10 right-10 z-30">
          <button
            onClick={() => setShowSettings(true)}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1A1A2E]/60 backdrop-blur-md border border-white/10 hover:bg-purple-500/20 active:scale-95 transition-all shadow-lg group"
          >
            <Settings className="w-5 h-5 text-gray-300 group-hover:text-white group-hover:rotate-45" />
          </button>
        </div>
 
        {/* --- Bottom Right: Controls --- */}
        <div className="absolute bottom-10 right-10 flex flex-col gap-3 z-30">
          <div className="flex flex-col rounded-2xl bg-[#1A1A2E]/60 backdrop-blur-md overflow-hidden shadow-lg">
            <button
              onClick={handleZoomOut}
              className="w-12 h-12 flex items-center justify-center hover:bg-white/5 border-b border-white/5 active:bg-white/10 transition-colors"
              title="Zoom Out"
            >
              <Minus className="w-5 h-5 text-gray-300" />
            </button>
            <button
              onClick={handleZoomIn}
              className="w-12 h-12 flex items-center justify-center hover:bg-white/5 active:bg-white/10 transition-colors"
              title="Zoom In"
            >
              <Plus className="w-5 h-5 text-gray-300" />
            </button>
          </div>
 
          <button
            onClick={handleGetCurrentLocation}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-600 hover:bg-purple-500 active:scale-95 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] group"
            title="My current location"
          >
            <Navigation className="w-5 h-5 text-white" />
          </button>
        </div>
      </main>
 
      {/* --- Premium Upgrade Popup (Same to Same Design) --- */}
      {showPremiumModal && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-6 animate-in fade-in duration-300">
          {/* Backdrop Blur */}
          <div
            className="absolute inset-0 bg-[#050505]/60 backdrop-blur-md"
            onClick={() => setShowPremiumModal(false)}
          ></div>
 
          {/* Main Card */}
          <div className="relative w-full max-w-[420px] bg-[#0A0514] rounded-[32px] p-8 pb-10 shadow-[0_30px_100px_rgba(0,0,0,0.8),0_0_40px_rgba(168,85,247,0.1)] flex flex-col items-center text-center animate-in zoom-in-95 slide-in-from-bottom-10 duration-500">
 
            {/* Close Button (added for UX) */}
            <button
              onClick={() => setShowPremiumModal(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
 
            {/* Top Badge */}
            <div className="mt-2 mb-8 px-4 py-2 rounded-full flex items-center gap-2 bg-[#1A0B2E]/40">
              <Sparkles className="w-4 h-4 text-purple-400 fill-purple-400/20" />
              <span className="text-[10px] font-bold text-white tracking-[0.1em] uppercase">
                Astra-Emotional Sync Required
              </span>
            </div>
 
            {/* Heading */}
            <h2 className="text-[26px] font-bold text-white leading-[1.2] tracking-tight mb-6">
              Less than 0.1% of people on <br /> Earth can reach you.
            </h2>
 
            {/* Body Text */}
            <p className="text-[14px] text-gray-300 leading-relaxed px-2 mb-8 font-light">
              To maintain the highest standard of connect, the Soul Map is only visible to
              those who share an <span className="font-bold underline cursor-help text-white">+70% Astral and Emotional</span> compatibility score.
            </p>
 
            {/* Italic Text */}
            <p className="text-[14px] italic text-gray-400 mb-10 font-light">
              *Are you ready to see where you heart <br /> beats on this planets?*
            </p>
 
            {/* Gradient Button */}
            <button className="relative w-full group overflow-hidden rounded-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#6d28d9] via-[#db2777] to-[#fca5a1] opacity-50 group-hover:opacity-80 transition-opacity blur-md"></div>
              <div className="relative w-full py-4 rounded-full bg-gradient-to-r from-[#6d28d9] via-[#db2777] to-[#fca5a1] flex items-center justify-center gap-3 transition-all duration-300 group-hover:scale-[1.02] active:scale-95 shadow-2xl">
                <Medal className="w-6 h-6 text-white fill-white/10" />
                <span className="text-[17px] font-bold text-white tracking-tight">
                  Upgrade to Elite +
                </span>
              </div>
            </button>
 
            {/* Footer Link */}
            <button
              onClick={() => {
                setShowPremiumModal(false);
                setHasSubscription(true);
                setTimeout(handleGetCurrentLocation, 100);
              }}
              className="mt-8 flex items-center gap-1.5 text-gray-400 hover:text-white transition-all group"
            >
              <span className="text-[13px] font-medium tracking-wide">What is Soul Map ?</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
 
          </div>
        </div>
      )}
 
      {/* --- Soul Profile Settings Modal --- */}
      <Setting
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
 
        {/* Soulmap Location Results & Profile Modal Overlay */}
        {(showLocationResults || showProfile || showAlignment) && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-[#050505]/60"
              onClick={handleCloseModals}
            ></div>
           
            <div className="relative w-full max-w-[540px] animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 flex justify-center">
              {showAlignment ? (
                <Alignment
                  onProfileView={() => {
                    setShowAlignment(false);
                    setShowProfile(true);
                  }}
                  onInvite={handleCloseModals}
                  onMaybeLater={handleCloseModals}
                />
              ) : showProfile ? (
                <SoulProfile
                  user={selectedUser}
                  onClose={() => setShowProfile(false)}
                  onInvite={() => {
                    setShowProfile(false);
                    setShowAlignment(true);
                  }}
                />
              ) : (
                <SoulmapLocation
                  onClose={() => setShowLocationResults(false)}
                  locationName={currentLocationName}
                  onViewProfile={handleViewProfile}
                />
              )}
            </div>
          </div>
        )}
    </div>
  );
};
 
export default Soulmap;