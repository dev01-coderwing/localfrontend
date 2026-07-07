import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { sessionStartThunk } from "../Components/Redux/authSlice";
import { setMeonsBalance } from "../Components/Redux/meonsSlice";

/**
 * Calls POST /user/session-start exactly once per app launch, only when an
 * authentication token already exists in localStorage. Handles the
 * dailyCheckIn reward in the response, if any, by updating the Meon balance
 * directly from newBalance (no extra balance refetch) and showing a toast.
 */
export function useSessionStart() {
  const dispatch = useDispatch();
  const hasRunRef = useRef(false);

  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    const token = localStorage.getItem("token");
    if (!token) return;

    dispatch(sessionStartThunk())
      .unwrap()
      .then((data) => {
        const dailyCheckIn = data?.dailyCheckIn;
        if (dailyCheckIn?.rewarded) {
          dispatch(setMeonsBalance(dailyCheckIn.newBalance));
          toast.success(`+${dailyCheckIn.meonsEarned} Meons! Daily reward collected ✅`);
        }
      })
      .catch(() => {});
  }, [dispatch]);
}
