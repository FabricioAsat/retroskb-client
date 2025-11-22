import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "../../context";
import { useFetch } from "../../hooks";
import { getMe } from "../../service";
import { CustomButton, Loader } from "../../components";

const variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
};

export const ShowProfile = () => {
  const { isDark } = useTheme();
  const { loading, error, data, fetch } = useFetch(getMe, {
    params: null,
    autoFetch: true,
  });

  function reloadProfile() {
    fetch(null);
  }

  return (
    <AnimatePresence>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`absolute max-w-xs right-0 z-50 flex border-2 rounded-b-lg rounded-tl-lg flex-col items-end p-4 bg-amber-950 top-full ${
          isDark
            ? "bg-dark-bg border-dark-border"
            : "bg-light-bg border-light-border"
        }`}
      >
        {loading ? (
          <Loading />
        ) : error ? (
          <Error isDark={isDark} label={error.message} fetch={reloadProfile} />
        ) : (
          <>
            <h3
              className={`font-bold text-base truncate w-full text-end ${
                isDark ? "text-dark-text" : "text-light-text"
              }`}
            >
              {data?.data.username}
            </h3>
            <small
              className={`text-xs italic truncate w-full text-end ${
                isDark ? "text-dark-text-muted" : "text-light-text-muted"
              }`}
            >
              {data?.data.email}
            </small>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

function Loading() {
  return <Loader label="Loading profile" />;
}

function Error({
  isDark,
  label,
  fetch,
}: {
  isDark: boolean;
  label: string;
  fetch: () => void;
}) {
  return (
    <div className="flex flex-col items-center w-full gap-y-2">
      <p
        className={`w-full font-bold text-xl text-center truncate ${
          isDark ? "text-dark-error" : "text-light-error"
        }`}
      >
        {label}
      </p>
      <CustomButton
        onClick={fetch}
        className="px-4 py-1"
        color={isDark ? "dark-error" : "light-error"}
      >
        Retry
      </CustomButton>
    </div>
  );
}
