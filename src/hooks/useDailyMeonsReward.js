import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  claimDailyMeonsRewardThunk,
  getMeonBalanceThunk,
} from "../Components/Redux/meonsSlice";

/**
 * Daily Meons Reward mapping — must stay in sync with the subscription plan
 * names in src/locales/*.json (subscription.plan1/2/3.name) and with
 * subscription.plan1/2/3.feature6 ("+2/3/4 Daily Meons Reward").
 */
export const DAILY_MEONS_REWARD_MAP = {
  "Dégustation": 2,
  "Privilège": 3,
  "Cercle Privé": 4,
};

/**
 * Runs once per session launch (when an authenticated user with an eligible
 * subscription plan is available) and claims today's Daily Meons Reward from
 * the backend.
 *
 * NOTE: There is no client-side "already claimed today" storage anymore —
 * see the TODO(backend) block below. The backend is the source of truth for
 * eligibility; this hook only guards against firing the claim more than
 * once per app session (e.g. re-renders/remounts).
 */
export function useDailyMeonsReward() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const planName = user?.subscriptionPlan;
  const rewardAmount = DAILY_MEONS_REWARD_MAP[planName] ?? 0;
  const isEligible = Boolean(token && user && rewardAmount > 0);

  const [claimed, setClaimed] = useState(false);
  const hasAttemptedRef = useRef(false);

  useEffect(() => {
    if (!isEligible || hasAttemptedRef.current) return;
    hasAttemptedRef.current = true;

    // TODO(backend): This dispatches claimDailyMeonsRewardThunk, which posts
    // to POST /meons/daily-reward/claim (see Components/Redux/meonsSlice.js).
    // That endpoint does not exist in the backend yet, so this call will
    // currently 404/reject. Once the backend team implements the Daily Login
    // reward API, this wiring needs no further changes on the frontend side.
    dispatch(claimDailyMeonsRewardThunk({ planName, amount: rewardAmount }))
      .unwrap()
      .then(() => {
        setClaimed(true);
        // Refresh wallet + Meons balance after a successful claim. This app
        // has a single balance endpoint (GET /meons/balance) that backs both
        // the Meons balance and the wallet balance shown on WalletPage, so
        // one refresh covers both.
        dispatch(getMeonBalanceThunk());
      })
      .catch(() => {
        // Backend not available yet / user already claimed today / network
        // error. Allow a retry on the next full app session launch.
        hasAttemptedRef.current = false;
      });
  }, [isEligible, planName, rewardAmount, dispatch]);

  return { planName, rewardAmount, isEligible, claimed };
}
