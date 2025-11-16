import { useEffect } from "react";

import { useTheme, useToast, type ToastContextType } from "../../context";
import { useFetch } from "../../hooks";
import { deleteManga, deleteMangas } from "../../service";
import { CustomButton } from "./CustomButton";
import { Loader } from "./Loader";

interface Props {
  id?: string;
  mode: "single" | "all";
  closeModal: () => void;
  navigate?: (path: string) => void;
  onSuccess?: () => void;
}

export const ConfirmationDelete = ({
  id,
  mode,
  closeModal,
  navigate,
  onSuccess,
}: Props) => {
  const { isDark } = useTheme();
  const { showToast } = useToast() as ToastContextType;
  const apiFn = mode === "single" ? deleteManga : deleteMangas;

  const title =
    mode === "single"
      ? "Are you sure you want to delete this manga?"
      : "Are you sure you want to delete ALL mangas?";

  const subtitle =
    mode === "single"
      ? "If you confirm, this manga will be completely deleted from the database."
      : "If you confirm, ALL mangas will be permanently deleted from the database.";

  const { loading, error, data, fetch } = useFetch(apiFn);

  function confirmDelete() {
    if (mode === "single") fetch(id!);
    else fetch("");
  }

  useEffect(() => {
    if (loading) return;

    if (data) {
      showToast(data.message || "Deleted", "success");
      closeModal();
      navigate?.("/");
      onSuccess?.();
    }
  }, [loading]);

  return (
    <aside className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center w-full max-w-lg mt-5">
        <h2 className={`font-bold text-2xl text-center ${isDark ? "" : ""}`}>
          {title}
        </h2>
        <p
          className={`text-sm italic text-center ${
            isDark ? "text-dark-text-muted" : "text-light-text-muted"
          }`}
        >
          {subtitle}
        </p>
      </div>

      <form className="flex flex-col items-center justify-center w-full mt-12 mb-6 md:flex-row gap-y-5 md:gap-y-0 md:gap-x-5">
        <CustomButton
          type="button"
          disabled={loading}
          onClick={closeModal}
          className="w-full max-w-sm px-4 py-2"
          color={isDark ? "dark-primary" : "light-primary"}
        >
          Go back
        </CustomButton>
        <CustomButton
          disabled={loading}
          className="w-full max-w-sm px-4 py-2"
          type="submit"
          onClick={confirmDelete}
          color={isDark ? "dark-error" : "light-error"}
        >
          {loading ? (
            <Loader />
          ) : error ? (
            "Ups.! Try again"
          ) : mode === "all" ? (
            "Delete All"
          ) : (
            "Delete"
          )}
        </CustomButton>
      </form>
    </aside>
  );
};
