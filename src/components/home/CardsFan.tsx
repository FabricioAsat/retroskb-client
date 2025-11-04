import { motion } from "motion/react";

// Posters
import img1 from "../../assets/img/img1.webp";
import img2 from "../../assets/img/img2.webp";
import img3 from "../../assets/img/img3.webp";
import img4 from "../../assets/img/img4.webp";

const cards = [img1, img2, img3, img4];

export const CardsFan = () => {
  const cardWidth = 10; // en rem, aproximadamente
  const gap = 2.5; // separación horizontal
  const totalWidth = cardWidth + (cards.length - 1) * gap;
  const offsetStart = -(totalWidth / 2) + cardWidth / 2;

  return (
    <div className="flex relative justify-center items-center w-40 h-96 md:w-60 xl:w-72">
      {cards.map((card, index) => (
        <motion.img
          key={index}
          src={card}
          alt={`card-${index}`}
          className="absolute w-40 h-auto rounded-lg shadow-lg md:w-60 xl:w-72"
          initial={{
            opacity: 0,
            y: 40,
            rotate: 0,
            scale: 0.8,
          }}
          animate={{
            opacity: 1,
            y: 0,
            rotate: [-10, -3, 3, 10][index],
            scale: 1,
          }}
          transition={{
            delay: index * 0.15,
            duration: 0.5,
            ease: "easeOut",
          }}
          style={{
            zIndex: index,
            left: `${offsetStart + index * gap}rem`, // 🔹 centrado exacto
          }}
        />
      ))}
    </div>
  );
};
