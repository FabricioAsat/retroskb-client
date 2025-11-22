import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";

import { CloseIMG } from "../../assets";
import { useTheme } from "../../context";

interface Props {
  handleChange: (file: string) => (imageUrl: string) => void;
  image?: string;
}

export const ImageUpdate = ({ handleChange, image }: Props) => {
  const { isDark } = useTheme();
  const [preview, setPreview] = useState<string | null>(image || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageUrl = reader.result as string;
      setPreview(imageUrl);
      if (handleChange) handleChange("image")(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (handleChange) handleChange("image")("");
  };

  return (
    <div
      className={`relative w-full rounded-xl h-full overflow-hidden border-2 border-dashed flex justify-center items-center cursor-pointer group transition-all duration-200 ${
        isDark ? "border-dark-border" : "border-light-border"
      }`}
      onClick={() => !preview && fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      <AnimatePresence>
        {!preview ? (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-2 text-center"
          >
            <CloseIMG className="w-10 h-10 rotate-45 opacity-70" />
            <p className="text-sm opacity-70">Click to upload an image</p>
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full"
          >
            <img
              src={preview}
              alt="Preview"
              className="object-cover object-center w-full h-full"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className={`absolute top-2 right-2 p-1 rounded-full cursor-pointer ${
                isDark ? "bg-dark-bg/75" : "bg-light-bg/75"
              }`}
            >
              <CloseIMG className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
