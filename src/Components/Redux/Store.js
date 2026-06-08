import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import languageReducer from "./bordingSlice";
import supportReducer from "./supportSlice";
import onboardingReducer from "./onboardingSlice";
import gameReducer from "./gameSlice";
import meonReducer from "./meonsSlice";
import compatibilityReducer from "../Redux/compatibilitySlice";
import verifyReducer from "../Redux/verifySlice";
import profileReducer from "./profileSlice";
import chatRequestReducer from "./chatRequestSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    language: languageReducer,
    support: supportReducer,
    onboarding: onboardingReducer,
    game: gameReducer,
    meon: meonReducer,
    compatibility: compatibilityReducer,
    verify: verifyReducer,
    profile: profileReducer,
    chatRequests: chatRequestReducer,

  },
});