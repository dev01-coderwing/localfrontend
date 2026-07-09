import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeAuth } from "./Components/Redux/authSlice";
import { connectSocket, joinUserRoom } from "./socket";
import { useSessionStart } from "./hooks/useSessionStart";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LanguagePage from "./Components/languagePage/LanguagePage";
import Singup from "./Components/Singup/Singup";
import OTPVerify from "./Components/OTPVerify/OTPVerify";
import Password from "./Components/Password/Password";
import Login from "./Components/Login/Login";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import Intro from "./Components/Intro/Intro";
import Location from "./Components/Onboarding/Location";
import Identity from "./Components/Onboarding/Identity";
import BasicInfo from "./Components/Onboarding/BasicInfo";
import Story from "./Components/Onboarding/Story";
import Photos from "./Components/Onboarding/Photos";
import ReligionOptions from "./Components/Onboarding/ReligionOptions";
import Astrology from "./Components/Onboarding/Astrology";
import Religion from "./Components/Onboarding/Religion";
import Subscription from "./Components/Subscription/Subscription";
import PaymentModal from "./Components/Subscription/Checkout/PaymentModal";
import ConfirmModal from "./Components/Subscription/Checkout/ConfirmModal.jsx";
import Lanuch from "./Components/Lanuch/Lanuch";
import CompatibilityTest from "./Components/Lanuch/CompatibilityTest";
import VoiceConsentModal from "./Components/Lanuch/VoiceConsentModal/VoiceConsentModal";
import VoicePageWrapper from "./Components/Lanuch/VoiceConsentModal/VoicePageWrapper";
import VoiceAnalysis from "./Components/Lanuch/VoiceConsentModal/VoiceAnalysis";
import Homepage from "./Components/HomePage/Homepage";
import Subscription2 from "./Components/Subscription/Subscription2";
import Chat from "./Components/Chat/Chat";

import FreeChatModal from "./Components/Cards/FreeChatModal";

import Soulmap from "./Components/Soulmap/Soulmap";
import Session from "./Components/Session/Session";
import Lucas from "./Components/Lucas/Lucas";
import Animation from "./Components/Animation/Animation";
import ForgotOtp from "./Components/ForgotPassword/ForgotOtp";

import ProfileHome from "./Components/UserProfile/ProfileHome/ProfileHome";
import ProfileSettings from "./Components/UserProfile/ProfileSetting";
import ProfileLanguage from "./Components/UserProfile/ProfileLanguage";
import ProfileSubscription from "./Components/UserProfile/ProfileSubscription.jsx";
import ProfileLucasDetails from "./Components/UserProfile/ProfileLucasDetails.jsx";
import ProfileNotification from "./Components/UserProfile/ProfileNotification";

import BubblePairFound from "./Components/Lanuch/LaunchGame/BubblePopUp/BubblePairFound.jsx";
import RushSession from "./Components/Lanuch/LaunchGame/RushSession/RushSession.jsx";
import BubblePopUpGame from "./Components/Lanuch/LaunchGame/BubblePopUp/BubblePopUpGame.jsx";
import HeartMemoryGame from "./Components/Lanuch/LaunchGame/HeartMemory/HeartMemoryGame.jsx";
import HeartMemoryHome from "./Components/Lanuch/LaunchGame/HeartMemory/HeartMemoryHome.jsx";
import RushSessionHome from "./Components/Lanuch/LaunchGame/RushSession/RushSessionHome.jsx";
import Help from "./Components/UserProfile/Help/Help.jsx";
import Data from "./Components/UserProfile/Data&Privacy/Data.jsx";
import SafetyTools from "./Components/UserProfile/Safety/SafetyTools.jsx";
import Report from "./Components/UserProfile/ReportHearassment/Report.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProfileSettingsPage from "./Components/UserProfile/ProfileSettingsPage.jsx";
import WalletPage from "./Components/Wallet/WalletPage.jsx";
import EarnMeons from "./Components/Wallet/EarnMeons.jsx";
import SpendMeons from "./Components/Wallet/SpendMeons.jsx";
import ChatRulesModal from "./Components/Cards/ChatRulesModal.jsx";
import VerifyModal from "./Components/UserProfile/verification/VerifyModal.jsx";
import PopupOne from "./Components/UserProfile/verification/PopupOne.jsx";
import PopupTwo from "./Components/UserProfile/verification/PopupTwo.jsx";
import GetVerify from "./Components/UserProfile/verification/GetVerify.jsx";
import Selfie from "./Components/UserProfile/verification/Selfie.jsx";
import Submit from "./Components/UserProfile/verification/Sumbit.jsx";
import VerificationProgress from "./Components/UserProfile/verification/VerificationProgress.jsx";

import RealCurrencyWallet from "./Components/realCurrencyWallet/RealCurrencyWallet.jsx";
import ConvertToMeonsModal from "./Components/realCurrencyWallet/ConvertToMeonsModal.jsx";
import PaymentMethodModal from "./Components/realCurrencyWallet/PaymentMethodModal.jsx";
import SecureCheckoutModal from "./Components/realCurrencyWallet/SecureCheckoutModal.jsx";
import PaymentSuccessModal from "./Components/realCurrencyWallet/PaymentSuccessModal.jsx";
import PaymentFailedModal from "./Components/realCurrencyWallet/PaymentFailedModal.jsx";
import InviteFriendsModal from "./Components/realCurrencyWallet/InviteFriendsModal.jsx";
import InviteConnectionsModal from "./Components/realCurrencyWallet/InviteConnectionsModal.jsx";
import ShareInviteModal from "./Components/realCurrencyWallet/ShareInviteModal.jsx";
import Share from "./Components/realCurrencyWallet/Share.jsx";
import GetVerified from "./Components/UserProfile/GetVerified/GetVerified.jsx";
import TakeSelfie from "./Components/UserProfile/GetVerified/TakeSelfie.jsx";
import Identify from "./Components/UserProfile/GetVerified/Identify.jsx";
import Complete from "./Components/UserProfile/GetVerified/Complete.jsx";
// import InfluencerDashborad from "./Components/UserProfile/verification/InfluencerDashboard.jsx"
import SplashScreen from "./Components/SplashScreen/SplashScreen.jsx";

import Introduction from "./Components/UserProfile/InfluencerPage/Introduction";
import RegistrationPopup from "./Components/UserProfile/InfluencerPage/RegistrationPopup.jsx";
import SubmitApplication from "./Components/UserProfile/InfluencerPage/SubmitApplication.jsx";
import InfluencerDashborad from "./Components/UserProfile/InfluencerPage/InfluencerDashborad.jsx";
import PromoCodeModal from "./Components/UserProfile/InfluencerPage/PromoCodeModal.jsx";
import DeactivatedDashboard from "./Components/UserProfile/InfluencerPage/DeactivatedDashboard.jsx";
import WalletPopup from "./Components/UserProfile/InfluencerPage/WalletPopup.jsx";
import AddBankPopup from "./Components/UserProfile/InfluencerPage/AddBankPopup.jsx";
import SubmitTwo from "./Components/UserProfile/InfluencerPage/SubmitTwo.jsx";
import InfluencerWallet from "./Components/UserProfile/InfluencerPage/InfluencerWallet.jsx";
import Withdrawal from "./Components/UserProfile/InfluencerPage/Withdrawal.jsx";
import ConfirmWithdrawal from "./Components/UserProfile/InfluencerPage/ConfirmWithdrawal.jsx";
import PromoCodeList from "./Components/UserProfile/InfluencerPage/PromoCodeList.jsx";
import ReferralPopup from "./Components/UserProfile/InfluencerPage/ReferralPopup.jsx";
import SubmitPromoCode from "./Components/UserProfile/InfluencerPage/SubmitPromoCode.jsx";
import Kycverified from "./Components/UserProfile/InfluencerPage/Kycverified.jsx";
import Banner from "./Components/HomePage/Banner.jsx";
import UpdateProfile from "./Components/UserProfile/UpdateuserProfile/Updateprofile.jsx";
function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  // Fires POST /user/session-start once per app launch when a token already
  // exists, and surfaces the daily Meon check-in reward (see hooks/useSessionStart.js)
  useSessionStart();

  useEffect(() => {
    // Initialize authentication state from localStorage on app start
    dispatch(initializeAuth());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      connectSocket(token);
    }

    if (token && user?.id) {
      connectSocket(token);
      joinUserRoom(user.id);
    }
  }, [token, user]);

  return (
    <Router>
      <ToastContainer position="top-right" />
      <Routes>
        <Route
          path="/LanguagePage"
          element={
            <Animation>
              <LanguagePage />
            </Animation>
          }
        />
        <Route path="/" element={<SplashScreen />} />
        <Route
          path="/intro"
          element={
            <Animation>
              <Intro />
            </Animation>
          }
        />
        <Route
          path="/homepage"
          element={
            <Animation>
              <Homepage />
            </Animation>
          }
        />
        <Route
          path="/forgot-otp"
          element={
            <Animation>
              <ForgotOtp />
            </Animation>
          }
        />
        <Route
          path="/signup"
          element={
            <Animation>
              <Singup />
            </Animation>
          }
        />
        <Route
          path="/otp"
          element={
            <Animation>
              <OTPVerify />
            </Animation>
          }
        />
        <Route
          path="/create-password"
          element={
            <Animation>
              <Password />
            </Animation>
          }
        />
        <Route
          path="/login"
          element={
            <Animation>
              <Login />
            </Animation>
          }
        />
        <Route
          path="/forgot"
          element={
            <Animation>
              <ForgotPassword />
            </Animation>
          }
        />
        <Route
          path="/Location"
          element={
            <Animation>
              <Location />
            </Animation>
          }
        />
        <Route
          path="/Identity"
          element={
            <Animation>
              <Identity />
            </Animation>
          }
        />
        <Route
          path="/BasicInfo"
          element={
            <Animation>
              <BasicInfo />
            </Animation>
          }
        />
        <Route
          path="/Story"
          element={
            <Animation>
              <Story />
            </Animation>
          }
        />
        <Route
          path="/Photos"
          element={
            <Animation>
              <Photos />
            </Animation>
          }
        />
        <Route
          path="/religion-options"
          element={
            <Animation>
              <ReligionOptions />
            </Animation>
          }
        />
        <Route
          path="/astrology"
          element={
            <Animation>
              <Astrology />
            </Animation>
          }
        />
        <Route
          path="/religion"
          element={
            <Animation>
              <Religion />
            </Animation>
          }
        />
        <Route path="/Subscription" element={<Subscription />} />
        <Route path="/PaymentModal" element={<PaymentModal />} />
        <Route path="/ConfirmModal" element={<ConfirmModal />} />
        <Route path="/Lanuch" element={<Lanuch />} />
        <Route path="/CompatibilityTest" element={<CompatibilityTest />} />
        <Route path="/VoiceConsentModal" element={<VoiceConsentModal />} />
        <Route path="/VoicePageWrapper" element={<VoicePageWrapper />} />
        <Route path="/VoiceAnalysis" element={<VoiceAnalysis />} />
        <Route path="/Subscription2" element={<Subscription2 />} />
        <Route path="/Chat" element={<Chat />} />
        <Route path="/ChatInvitation" element={<FreeChatModal />} />
        <Route path="/ChatRules" element={<ChatRulesModal />} />
        <Route path="/Soulmap" element={<Soulmap />} />
        <Route path="/Session" element={<Session />} />
        <Route path="/Lucas" element={<Lucas />} />
        {/* rush session routes */}
        <Route path="/voiceAnalysis/rushsession" element={<RushSession />} />
        <Route
          path="/voiceAnalysis/rushsessionhome"
          element={<RushSessionHome />}
        />
        {/* bubble pop up routes */}
        <Route
          path="/VoiceAnalysis/colormatchhome"
          element={<BubblePairFound />}
        />
        <Route path="/voiceAnalysis/colormatch" element={<BubblePopUpGame />} />
        {/* heart memory routes */}
        <Route
          path="/voiceAnalysis/heartmemory"
          element={<HeartMemoryGame />}
        />
        <Route
          path="/voiceAnalysis/heartmemoryhome"
          element={<HeartMemoryHome />}
        />
        <Route path="/profile" element={<ProfileHome />} />
        <Route path="/profile/language" element={<ProfileLanguage />} />
        <Route path="/profile/subscription" element={<ProfileSubscription />} />
        <Route path="/profile/settings" element={<ProfileSettings />} />
        <Route
          path="/profile/lucas_details"
          element={<ProfileLucasDetails />}
        />
        <Route
          path="/profile/notifications"
          element={<ProfileNotification />}
        />
        <Route path="/profile/Help" element={<Help />} />
        <Route path="/profile/userprofile/data" element={<Data />} />
        //
        <Route path="/userprofile/safety" element={<SafetyTools />} />
        <Route path="/userprofile/report" element={<Report />} />
        <Route
          path="/profile/account-settings"
          element={<ProfileSettingsPage />}
        />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/earn-meons" element={<EarnMeons />} />
        <Route path="/spend-meons" element={<SpendMeons />} />
        <Route path="/verifymodel" element={<VerifyModal />} />
        <Route path="/popupone" element={<PopupOne />} />
        <Route path="/popuptwo" element={<PopupTwo />} />
        <Route path="/profile/getverify" element={<GetVerify />} />
        <Route path="/selfie" element={<Selfie />} />
        <Route path="/submit" element={<Submit />} />
        <Route path="/process" element={<VerificationProgress />} />
        <Route path="/realCurrencyWallet" element={<RealCurrencyWallet />} />
        <Route path="/getverified" element={<GetVerified />} />
        <Route path="/takeselfie" element={<TakeSelfie />} />
        <Route path="/identify" element={<Identify />} />
        <Route path="/complete" element={<Complete />} />
        ``
        {/* <Route path="/convertToMeonsModal" element={<ConvertToMeonsModal/>}/>
        <Route path="/paymentMethodModal" element={<PaymentMethodModal/>}/>
        <Route path="/secureCheckoutModal" element={<SecureCheckoutModal/>}/>
        <Route path="/paymentSuccessModal" element={<PaymentSuccessModal/>}/>
        <Route path="/paymentFailedModal" element={<PaymentFailedModal/>}/>
        <Route path="/inviteFriendsModal" element={<InviteFriendsModal/>}/>
        <Route path="/inviteConnectionsModal" element={<InviteConnectionsModal/>}/>
        <Route path="/ShareInviteModal" element={<ShareInviteModal/>}/>
        <Route path="/share" element={<Share/>}/> */}
        {/* /////////////////////////////////////////////////////////////////////// */}
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/registrationpopup" element={<RegistrationPopup />} />
        <Route path="/submitapplication" element={<SubmitApplication />} />
        <Route path="/influencerdashborad" element={<InfluencerDashborad />} />
        <Route path="/promocodemodal" element={<PromoCodeModal />} />
        <Route
          path="/deactivateddashboard"
          element={<DeactivatedDashboard />}
        />
        <Route path="/walletpopup" element={<WalletPopup />} />
        <Route path="/addbankpopup" element={<AddBankPopup />} />
        <Route path="/submittwo" element={<SubmitTwo />} />
        <Route path="/influencerwallet" element={<InfluencerWallet />} />
        <Route path="/withdrawal" element={<Withdrawal />} />
        <Route path="/confirmwithdrawal" element={<ConfirmWithdrawal />} />
        <Route path="/promocodelist" element={<PromoCodeList />} />
        <Route path="/submitpromocode" element={<SubmitPromoCode />} />
        <Route path="/referralpopup" element={<ReferralPopup />} />
        <Route path="/kycverified" element={<Kycverified />} />
        <Route path="/banner" element={<Banner />} />
        <Route path="/UpdateProfile" element={<UpdateProfile />} />

        {/* <Route path="/influencerdashborad" element={<InfluencerDashborad />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
