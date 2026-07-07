import { useCallback, useEffect, useState } from "react";
import { MapPin, LockKeyhole, Loader2, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { applyFilterThunk } from "../Redux/filterSlice";

const MIN_AGE = 18;
const MAX_AGE = 60;
const DEFAULT_AGE_RANGE = [22, 32];

const MIN_DISTANCE = 0;
const MAX_DISTANCE = 100;
const DEFAULT_DISTANCE = 50;

const DEFAULT_INTEREST = "Women";
const INTEREST_OPTIONS = ["Women", "Men", "Everyone"];

const NOMINATIM_REVERSE_URL = "https://nominatim.openstreetmap.org/reverse";

const getSliderBackground = (value, min, max) => {
  const percentage = ((value - min) / (max - min)) * 100;
  return `linear-gradient(to right, #FFB4A0 ${percentage}%, #e5e7eb ${percentage}%)`;
};

const Filter = ({ onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading, error, appliedFilter } = useSelector((state) => state.filter);

  const [distance, setDistance] = useState(
    () => appliedFilter?.searchRadius ?? DEFAULT_DISTANCE,
  );
  const [ageRange, setAgeRange] = useState(() => [
    appliedFilter?.ageMin ?? DEFAULT_AGE_RANGE[0],
    appliedFilter?.ageMax ?? DEFAULT_AGE_RANGE[1],
  ]);
  const [interest, setInterest] = useState(
    () => appliedFilter?.interestedIn ?? DEFAULT_INTEREST,
  );

  const [location, setLocation] = useState({ lat: null, lng: null });
  const [geoStatus, setGeoStatus] = useState("loading");
  const [locationLabel, setLocationLabel] = useState("");
  const [addressLoading, setAddressLoading] = useState(false);

  const fetchLocationLabel = useCallback(
    async (lat, lng) => {
      setAddressLoading(true);
      try {
        const response = await fetch(
          `${NOMINATIM_REVERSE_URL}?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`,
        );
        if (!response.ok) throw new Error("Reverse geocoding failed");

        const data = await response.json();
        const address = data.address || {};
        const city =
          address.city ||
          address.town ||
          address.village ||
          address.suburb ||
          address.municipality ||
          address.county;
        const state = address.state || address.state_district || address.region;
        const label = [city, state].filter(Boolean).join(", ");

        setLocationLabel(label || t("filter.location_unknown", "Current location"));
      } catch (geocodeError) {
        console.error("Reverse geocoding failed:", geocodeError);
        setLocationLabel(t("filter.location_unknown", "Current location"));
      } finally {
        setAddressLoading(false);
      }
    },
    [t],
  );

  const detectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoStatus("unsupported");
      return;
    }

    setGeoStatus("loading");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        setGeoStatus("success");
        fetchLocationLabel(latitude, longitude);
      },
      (geoError) => {
        console.error("Geolocation error:", geoError.code, geoError.message);
        if (geoError.code === geoError.PERMISSION_DENIED) {
          setGeoStatus("denied");
        } else {
          setGeoStatus("unavailable");
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    detectLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMinAgeChange = (value) => {
    const nextMin = Number(value);
    setAgeRange((prev) => [Math.min(nextMin, prev[1]), prev[1]]);
  };

  const handleMaxAgeChange = (value) => {
    const nextMax = Number(value);
    setAgeRange((prev) => [prev[0], Math.max(nextMax, prev[0])]);
  };

  const isLocationReady =
    geoStatus === "success" && location.lat !== null && location.lng !== null;
  const isAgeRangeValid = ageRange[0] <= ageRange[1];
  const canApply = isLocationReady && isAgeRangeValid && !loading;

  const handleApply = async () => {
    if (!canApply) return;

    const payload = {
      searchRadius: Number(distance),
      ageMin: ageRange[0],
      ageMax: ageRange[1],
      interestedIn: interest,
      autoDetect: true,
      currentLocation: {
        lat: location.lat,
        lng: location.lng,
      },
      relocationCities: [],
    };

    try {
      await dispatch(applyFilterThunk(payload)).unwrap();
      onClose();
    } catch {
      // error is captured in redux state and rendered below
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end ">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>

      {/* Right Side Panel */}
      <div className="relative z-10 w-[350px] h-full p-5 shadow-xl animate-slide-in overflow-y-auto bg-[var(--bg-background)] text-[var(--text-dim)]">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">{t("filter.header")}</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Location */}
        <div className="p-4 rounded-xl mb-4 bg-[var(--bg-card)]/10 border border-[var(--border)]">
          <p className="text-sm text-[var(--text-dim)]">{t("filter.location")}</p>
          <div className="flex items-center gap-2 text-[var(--text-dim2)] mt-1">
            <MapPin className="size-6 shrink-0" />

            {geoStatus === "loading" && (
              <p className="flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" />
                {t("filter.location_detecting", "Detecting your location...")}
              </p>
            )}

            {geoStatus === "success" && (
              <p>
                {addressLoading
                  ? t("filter.location_resolving", "Resolving address...")
                  : locationLabel}
              </p>
            )}

            {geoStatus === "denied" && (
              <p className="text-red-400">
                {t("filter.location_denied", "Location permission denied")}
              </p>
            )}

            {geoStatus === "unavailable" && (
              <p className="text-red-400">
                {t("filter.location_unavailable", "Location unavailable")}
              </p>
            )}

            {geoStatus === "unsupported" && (
              <p className="text-red-400">
                {t("filter.location_unsupported", "Geolocation is not supported by your browser")}
              </p>
            )}
          </div>

          {(geoStatus === "denied" || geoStatus === "unavailable") && (
            <button
              onClick={detectLocation}
              className="mt-2 text-xs underline text-[var(--text-dim2)]"
            >
              {t("filter.retry_location", "Retry")}
            </button>
          )}
        </div>

        {/* Relocation */}
        <div className="p-4 rounded-xl mb-4 flex justify-between items-center bg-[var(--bg-card)]/10 border border-[var(--border)]">
          <div>
            <p className="font-medium">
              <LockKeyhole /> {t("filter.relocation_locked")}
            </p>
            <p className="text-sm text-[var(--text-dim2)]">
              {t("filter.relocation_desc")}
            </p>
            <button
              className="mt-2 px-4 py-1 rounded-full text-white"
              style={{
                background: "linear-gradient(90deg, #7133A8, #E4678C, #FC9A86)",
              }}
            >
              {t("filter.upgrade")}
            </button>
          </div>

          <div className="w-16 h-16 bg-black rounded-xl"></div>
        </div>

        {/* Distance */}
        <div className="p-4 rounded-xl mb-4 bg-[var(--bg-card)]/10 border border-[var(--border)]">
          <div className="flex justify-between  ">
            <p className="text-sm">{t("filter.max_distance")}</p>
            <p className="text-sm">
              {distance} {t("filter.miles")}
            </p>
          </div>

          <input
            type="range"
            min={MIN_DISTANCE}
            max={MAX_DISTANCE}
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="w-full mt-2 appearance-none h-1 rounded-lg"
            style={{
              background: getSliderBackground(distance, MIN_DISTANCE, MAX_DISTANCE),
            }}
          />
        </div>

        {/* Age Range */}
        <div className="p-4 rounded-xl mb-4 bg-[var(--bg-card)]/10 border border-[var(--border)]">
          <div className="flex justify-between">
            <p className="text-sm">{t("filter.age_range")}</p>
            <p className="text-sm">
              {ageRange[0]} - {ageRange[1]}
            </p>
          </div>

          <div className="flex flex-col gap-3 mt-2">
            <div>
              <p className="text-xs text-[var(--text-dim2)] mb-1">
                {t("filter.min_age", "Min Age")}
              </p>
              <input
                type="range"
                min={MIN_AGE}
                max={ageRange[1]}
                value={ageRange[0]}
                onChange={(e) => handleMinAgeChange(e.target.value)}
                className="w-full appearance-none h-1 rounded-lg"
                style={{ background: getSliderBackground(ageRange[0], MIN_AGE, ageRange[1]) }}
              />
            </div>

            <div>
              <p className="text-xs text-[var(--text-dim2)] mb-1">
                {t("filter.max_age", "Max Age")}
              </p>
              <input
                type="range"
                min={ageRange[0]}
                max={MAX_AGE}
                value={ageRange[1]}
                onChange={(e) => handleMaxAgeChange(e.target.value)}
                className="w-full appearance-none h-1 rounded-lg"
                style={{ background: getSliderBackground(ageRange[1], ageRange[0], MAX_AGE) }}
              />
            </div>
          </div>
        </div>

        {/* Interest */}
        <div className="p-4 rounded-xl mb-4 bg-[var(--bg-card)]/10 border border-[var(--border)]">
          <p className="text-sm mb-2">{t("filter.interested_in")}</p>

          {INTEREST_OPTIONS.map((item) => (
            <div
              key={item}
              className="flex justify-between py-2 border-b last:border-none"
              style={{ borderColor: "var(--border)" }}
            >
              <span>
                {item === "Women"
                  ? t("filter.women")
                  : item === "Men"
                    ? t("filter.men")
                    : t("filter.everyone")}
              </span>
              <input
                type="radio"
                name="interest"
                checked={interest === item}
                onChange={() => setInterest(item)}
                className="accent-[#FFB4A0]"
              />
            </div>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 text-sm text-red-400 mb-3">
            <AlertCircle className="size-4 shrink-0" />
            <p>{error.message || t("filter.apply_error", "Something went wrong")}</p>
          </div>
        )}

        {/* Button */}
        <button
          onClick={handleApply}
          disabled={!canApply}
          className="w-full py-3 rounded-xl text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{
            background: "linear-gradient(to right, #f43f5e, #6366f1)",
          }}
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          {loading ? t("filter.applying", "Applying...") : t("filter.apply")}
        </button>
      </div>
    </div>
  );
};

export default Filter;
