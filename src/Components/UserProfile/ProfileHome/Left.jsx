import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";

function Left({ data = {} }) {
  const { t } = useTranslation();
  const stats = data?.stats || [];
  const compatibility = data?.compatibility || [];

  return (
    <div className="space-y-6 pt-10">
      <h2 className="font-bold text-[var(--text-dim)] text-[28px] mb-8">
        {t('profile.my_profile')}
      </h2>

      <div className="bg-[var(--bg-card)]/10 rounded-3xl pt-16 pb-6 px-5 shadow-sm relative">
        {/* Avatar */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2">
          <img
            src={data?.avatar || "/Image/default-avatar.png"}
            alt="Profile"
            className="w-30 h-30 rounded-full object-cover"
          />
        </div>

        {/* Name */}
        <div className="text-center mt-4">
          <h2 className="text-lg text-[var(--text-dim)] flex items-center justify-center gap-1 font-bold">
            {data?.name || "User"}

            {data?.verified && (
              <img
                src="/Image/BlueTick.png"
                alt="Verified"
                className="w-4 h-4"
              />
            )}

            {data?.badge && (
              <img
                src={data.badge}
                alt="Badge"
                className="w-4 h-4"
              />
            )}
          </h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-6 text-center">
          {stats.length > 0 ? (
            stats.map((item, i) => (
              <div key={i} className="py-3">
                <p className="font-semibold text-[var(--text-dim)]">
                  {item?.value ?? 0}
                </p>
                <p className="text-xs text-[var(--text-dim2)]">
                  {item?.label ?? ""}
                </p>
              </div>
            ))
          ) : (
            <>
              <div className="py-3">
                <p className="font-semibold text-[var(--text-dim)]">0</p>
                <p className="text-xs text-[var(--text-dim2)]">
                  {t('profile.avg_match')}
                </p>
              </div>

              <div className="py-3">
                <p className="font-semibold text-[var(--text-dim)]">0</p>
                <p className="text-xs text-[var(--text-dim2)]">
                  {t('profile.matches')}
                </p>
              </div>

              <div className="py-3">
                <p className="font-semibold text-[var(--text-dim)]">0</p>
                <p className="text-xs text-[var(--text-dim2)]">
                  {t('profile.in_labs')}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Compatibility */}
        <div className="mt-6">
          <p className="text-sm text-[var(--text-dim)] mb-3">
            {t('profile.compatibility_systems')}
          </p>

          <div className="space-y-3">
            {compatibility.length > 0 ? (
              compatibility.map((item, i) => (
                <Item
                  key={i}
                  item={item}
                  tick={data?.tick}
                />
              ))
            ) : (
              <p className="text-xs text-[var(--text-dim2)]">
                {t('profile.no_compatibility')}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Item({ item = {}, tick }) {
  const { t } = useTranslation();
  return (
    <div
      className="flex items-center justify-between p-3 rounded-xl border-[0.5px]
      border-gray-100 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center">
          {item?.img ? (
            <img
              src={item.img}
              alt={item?.title}
              className="w-5 h-5"
            />
          ) : (
            <Star size={18} className="text-yellow-500" />
          )}
        </div>

        <div>
          <p className="text-sm font-medium text-[var(--text-dim)]">
            {item?.title || ""}
          </p>
          <p className="text-xs text-[var(--text-dim)]">
            {item?.desc || ""}
          </p>
        </div>
      </div>

      {item?.status === "done" ? (
        tick ? (
          <img
            src={tick}
            alt="Completed"
            className="w-4 h-4"
          />
        ) : (
          <span className="text-green-500 text-xs">
            {t('profile.done')}
          </span>
        )
      ) : (
        <span className="text-xs text-white bg-gradient-to-r from-[#F0B100] to-[#FF6900] px-2 py-1 rounded-full">
          {t('profile.complete')}
        </span>
      )}
    </div>
  );
}

export default Left;
