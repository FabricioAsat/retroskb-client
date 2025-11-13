import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { CustomButton } from "../ui/CustomButton";
import { useTheme } from "../../context";
import {
  CloseIMG,
  ExportIMG,
  HamburgerIMG,
  ImportIMG,
  WarningIMG,
} from "../../assets";
import { useFetch } from "../../hooks";
import { getBackup, importBackup } from "../../service/backup.service";
import { Loader } from "../ui/Loader";

const menuVariants: Variants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15 } },
};

export const MoreOptions = ({
  reloadMangas,
}: {
  reloadMangas: (params: undefined) => void;
}) => {
  const [isOpenMoreOptions, setIsOpenMoreOptions] = useState<boolean>(false);
  const { isDark } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    loading: loadingE,
    error: errorE,
    data: dataE,
    fetch: fetchE,
  } = useFetch(getBackup, { params: undefined, autoFetch: false });
  const {
    loading: loadingI,
    data: dataI,
    error: errorI,
    fetch: fetchI,
  } = useFetch(importBackup);

  function handleExport() {
    fetchE(undefined);
  }

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      fetchI(file);
    }
  };

  // Effect del import
  useEffect(() => {
    if (dataI) {
      reloadMangas(undefined);
      setIsOpenMoreOptions(false);
    }
  }, [dataI]);

  // Effect del export
  useEffect(() => {
    if (dataE instanceof Blob) {
      const url = window.URL.createObjectURL(dataE);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mangas_backup.bson";
      a.click();
      a.remove();
    }
  }, [dataE]);

  return (
    <span className="relative h-full mb-2">
      <CustomButton
        title="More options"
        onClick={() => setIsOpenMoreOptions(!isOpenMoreOptions)}
        color={isDark ? "dark-secondary" : "light-secondary"}
        className="h-full px-4 py-4 capitalize gap-x-2 md:px-4 md:py-2"
      >
        {isOpenMoreOptions ? (
          <CloseIMG className="w-4 h-4" />
        ) : (
          <HamburgerIMG className="w-4 h-4" />
        )}
      </CustomButton>

      <AnimatePresence>
        {isOpenMoreOptions && (
          <motion.div
            key="more-options"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`flex flex-col gap-y-1 items-center z-50 justify-center absolute bottom-16 md:top-16 h-fit right-0 rounded-lg md:py-4 pl-4 backdrop-blur-xs ${
              isDark ? "bg-dark-bg/50" : "bg-light-bg/50"
            }`}
          >
            <CustomButton
              disabled={loadingI}
              onClick={handleImportClick}
              color={
                isDark
                  ? errorI
                    ? "dark-error"
                    : "dark-secondary"
                  : errorI
                  ? "light:error"
                  : "light-secondary"
              }
              className="h-full flex items-center md:h-full px-4 py-4 mb-2 md:mb-1 gap-x-2 md:px-10 md:py-2.5"
            >
              {loadingI ? (
                <Loader />
              ) : errorI ? (
                <>
                  <WarningIMG className="w-4 h-4" />
                  <p className="text-xs md:text-sm truncate">Try again</p>
                </>
              ) : (
                <>
                  <p className="text-xs md:text-sm truncate">Import</p>
                  <ImportIMG className="w-4 h-4" />
                </>
              )}
            </CustomButton>

            <CustomButton
              disabled={loadingE}
              onClick={handleExport}
              color={
                isDark
                  ? errorE
                    ? "dark-error"
                    : "dark-secondary"
                  : errorE
                  ? "light:error"
                  : "light-secondary"
              }
              className="h-full flex items-center md:h-full px-4 py-4 mb-2 md:mb-1 gap-x-2 md:px-10 md:py-2.5"
            >
              {loadingE ? (
                <Loader />
              ) : errorE ? (
                <>
                  <WarningIMG className="w-4 h-4" />
                  <p className="text-xs md:text-sm truncate">Try again</p>
                </>
              ) : (
                <>
                  <p className="text-xs md:text-sm truncate">Export</p>
                  <ExportIMG className="w-4 h-4" />
                </>
              )}
            </CustomButton>
          </motion.div>
        )}
      </AnimatePresence>

      <input
        ref={fileInputRef}
        type="file"
        accept=".bson"
        onChange={handleImportChange}
        className="hidden"
      />
    </span>
  );
};
