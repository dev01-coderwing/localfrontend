import { useSelector ,useDispatch, } from "react-redux";
import {
  acceptChatRequest,
  declineChatRequest,
} from "../../Components/Redux/chatRequestSlice";

const ChatRequest = ({ onClose }) => {
   const dispatch = useDispatch();

  const { requests, loading } = useSelector(
    (state) => state.chatRequests
  );

  const handleAccept = (id) => {
    dispatch(acceptChatRequest(id));
  };

  const handleDecline = (id) => {
    dispatch(declineChatRequest(id));
  };

  return (
    <div className="fixed inset-0  z-50 flex justify-center items-start pt-10">
      <div className="w-[380px] bg-[var(--bg-background)] rounded-2xl p-4 shadow-xl max-h-[80vh] overflow-y-auto">

        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg text-[var(--text-dim)]">Chat Requests</h2>
          <button onClick={onClose} className="text-[var(--text-dim)] hover:text-[var(--text-dim2)]">
            ✕
          </button>
        </div>

        {loading ? (
          <p className="text-center py-4">Loading...</p>
        ) : requests.length === 0 ? (
          <p className="text-center py-4 text-[var(--text-dim)]">
            No more requests for now
          </p>
        ) : (
          <div className="space-y-3">
            {requests.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-card)]/10 border border-[var(--border)]"
              >
                <img
                  src={`http://35.180.139.208:3000/${item.sender?.profileImage}`}
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

                  <p className="text-xs text-[var(--text-dim)] capitalize">
                    {item.status}
                  </p>
                </div>

                <button
                  onClick={() => handleAccept(item.id)}
                  className="px-3 py-1 rounded-lg bg-green-500 text-white text-sm"
                >
                  Accept
                </button>

                <button
                  onClick={() => handleDecline(item.id)}
                  className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm"
                >
                  Decline
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRequest;