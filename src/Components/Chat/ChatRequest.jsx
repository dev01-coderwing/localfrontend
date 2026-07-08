import { useEffect, useState } from "react";
import { useSelector ,useDispatch, } from "react-redux";
import {
  acceptChatRequest,
  declineChatRequest,
} from "../../Components/Redux/chatRequestSlice";
import { useTranslation } from "react-i18next";

const IMAGE_BASE_URL = import.meta.env.VITE_API_URL?.trim()?.replace(/\/api\/v1\/?$/, "");

const STATUS_STYLES = {
  pending: "text-[var(--text-dim)]",
  accepted: "text-green-500",
  declined: "text-red-500",
  expired: "text-orange-500",
};

// Formats a backend-provided expiry timestamp into a countdown string.
// Purely presentational: the expiry/refund itself is decided server-side.
const formatTimeLeft = (expiresAt) => {
  if (!expiresAt) return null;
  const diffMs = new Date(expiresAt).getTime() - Date.now();
  if (Number.isNaN(diffMs) || diffMs <= 0) return null;

  const hours = Math.floor(diffMs / (60 * 60 * 1000));
  const minutes = Math.floor((diffMs % (60 * 60 * 1000)) / (60 * 1000));
  return `${hours}h ${minutes}m`;
};

const ChatRequest = ({ onClose }) => {
   const dispatch = useDispatch();
  const { t } = useTranslation();

  const { requests, loading } = useSelector(
    (state) => state.chatRequests
  );

  const [actionError, setActionError] = useState({});
  const [pendingIds, setPendingIds] = useState({});

  // Re-render every minute so the "expires in" countdown stays accurate.
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((n) => n + 1), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const handleAccept = async (id) => {
    setActionError((prev) => ({ ...prev, [id]: null }));
    setPendingIds((prev) => ({ ...prev, [id]: true }));
    try {
      await dispatch(acceptChatRequest(id)).unwrap();
    } catch (error) {
      setActionError((prev) => ({
        ...prev,
        [id]: error?.message || error || t("chatRequest.decline"),
      }));
    } finally {
      setPendingIds((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleDecline = async (id) => {
    setActionError((prev) => ({ ...prev, [id]: null }));
    setPendingIds((prev) => ({ ...prev, [id]: true }));
    try {
      await dispatch(declineChatRequest(id)).unwrap();
    } catch (error) {
      setActionError((prev) => ({
        ...prev,
        [id]: error?.message || error || t("chatRequest.decline"),
      }));
    } finally {
      setPendingIds((prev) => ({ ...prev, [id]: false }));
    }
  };
  return (
    <div className="fixed inset-0  z-50 flex justify-center items-start pt-10">
      <div className="w-[380px] bg-[var(--bg-background)] rounded-2xl p-4 shadow-xl max-h-[80vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg text-[var(--text-dim)]">{t('chatRequest.title')}</h2>
          <button onClick={onClose} className="text-[var(--text-dim)] hover:text-[var(--text-dim2)]">
            ✕
          </button>
        </div>

        {loading ? (
          <p className="text-center py-4">{t('chatRequest.loading')}</p>
        ) : requests.length === 0 ? (
          <p className="text-center py-4 text-[var(--text-dim)]">
            {t('chatRequest.no_requests')}
          </p>
        ) : (
          <div className="space-y-3">
            {requests.map((item) => {
              const requestId = item.id ?? item._id;
              const status = (item.status || "pending").toLowerCase();
              const isPending = status === "pending";
              const isBusy = Boolean(pendingIds[requestId]);
              const timeLeft = isPending ? formatTimeLeft(item.expiresAt) : null;

              return (
                <div
                  key={requestId || item.sender?.id || item.sender?.fullName}
                  className="flex flex-col gap-2 p-3 rounded-xl bg-[var(--bg-card)]/10 border border-[var(--border)]"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={`${IMAGE_BASE_URL}/${item.sender?.profileImage}`}
                      alt={item.sender?.fullName}
                      className="w-14 h-14 rounded-full object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-[var(--text-dim)]">
                        {item.sender?.fullName}
                      </h3>

                      <p className="text-sm text-[var(--text-dim2)]">
                        {item.sender?.gender}
                      </p>

                      <p className={`text-xs capitalize ${STATUS_STYLES[status] || "text-[var(--text-dim)]"}`}>
                        {t(`chatRequest.status_${status}`, item.status)}
                      </p>

                      {timeLeft && (
                        <p className="text-[11px] text-[var(--text-dim2)]">
                          {t("chatRequest.expires_in", { time: timeLeft })}
                        </p>
                      )}
                    </div>

                    {isPending && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAccept(requestId)}
                          disabled={!requestId || isBusy}
                          className="px-3 py-1 rounded-lg bg-green-500 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {t('chatRequest.accept')}
                        </button>

                        <button
                          onClick={() => handleDecline(requestId)}
                          disabled={!requestId || isBusy}
                          className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {t('chatRequest.decline')}
                        </button>
                      </div>
                    )}
                  </div>

                  {actionError[requestId] && (
                    <p className="text-xs text-red-500">{actionError[requestId]}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRequest;


