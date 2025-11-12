import { useEffect } from "react";

import { useTheme, useToast, type ToastContextType } from "../../context";
import { useFetch } from "../../hooks";
import { deleteManga } from "../../service";
import { CustomButton } from "../ui/CustomButton";
import { Loader } from "../ui/Loader";

interface Props {
  id: string;
  closeModal: () => void;
  navigate: (path: string) => void;
}

export const ConfirmationDelete = ({ id, closeModal, navigate }: Props) => {
  const { isDark } = useTheme();
  const { showToast } = useToast() as ToastContextType;

  const { loading, error, data, fetch } = useFetch(deleteManga, {
    params: id,
    autoFetch: false,
  });

  function confirmDelete() {
    fetch(id);
  }

  useEffect(() => {
    if (loading) return;

    if (data) {
      showToast(data.message || "Manga deleted", "success");
      closeModal();
      navigate("/");
    }
  }, [loading]);

  return (
    <aside className="flex flex-col items-center justify-center w-full">
      <div className="flex flex-col items-center justify-center w-full max-w-lg mt-5">
        <h2 className={`font-bold text-2xl ${isDark ? "" : ""}`}>
          Are you sure you want delete?
        </h2>
        <p
          className={`text-sm italic text-center ${
            isDark ? "text-dark-text-muted" : "text-light-text-muted"
          }`}
        >
          If you confirm, the manga will be completely deleted from the
          database. Are you sure?
        </p>
      </div>

      <form className="flex flex-col items-center justify-center w-full mt-12 mb-6 md:flex-row gap-y-5 md:gap-y-0 md:gap-x-5">
        <CustomButton
          type="button"
          disabled={loading}
          onClick={closeModal}
          className="w-full max-w-sm"
          color={isDark ? "dark-primary" : "light-primary"}
        >
          Go back
        </CustomButton>
        <CustomButton
          disabled={loading}
          className="w-full max-w-sm"
          type="submit"
          onClick={confirmDelete}
          color={isDark ? "dark-error" : "light-error"}
        >
          {loading ? <Loader /> : error ? "Ups.! Try again" : "Delete"}
        </CustomButton>
      </form>
    </aside>
  );
};
