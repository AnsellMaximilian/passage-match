import Image, { StaticImageData } from "next/image";
import React from "react";
import onePassLogo from "@/assets/1password-logo-square.png";
import { CardObj } from "@/app/game/page";

interface Props {
  card: CardObj;
  flipped: boolean;
  disabled: boolean;
  handleChoice: (card: CardObj) => void;
}

export default function Card({ flipped, card, handleChoice, disabled }: Props) {
  const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
    if (!disabled && !card.matched) handleChoice(card);
  };

  return (
    <div
      className="col-span-3 md:col-span-2 aspect-square [perspective:1000px] group bg-transparent cursor-pointer"
      onClick={handleClick}
    >
      <div
        className={`h-full w-full transition-all duration-500 relative [transform-style:preserve-3d] ${
          flipped ? "[transform:rotateY(0deg)]" : "[transform:rotateY(180deg)]"
        }`}
      >
        <div className="p-1 lg:p-3 bg-[#C9D8FF] rounded-lg flex flex-col h-full w-full absolute [backface-visibility:hidden]">
          <div className="border-4 border-[#4565B6] h-full rounded-lg p-2 flex items-center justify-center bg-white bg-[url('/bg.png')] bg-repeat bg-[length:50px_34px]">
            <Image src={card.image.image} alt={card.image.name} />
          </div>
        </div>
        <div className="h-full w-full absolute rounded-lg [transform:rotateY(180deg)] [backface-visibility:hidden] bg-[#4565B6] bg-gradient-radial to-[#1a285f] from-[#4565B6]">
          <div className="w-full h-full rounded-lg flex items-center justify-center">
            <div className="w-2/3 aspect-square bg-[#C9D8FF] rounded-full flex items-center justify-center p-1 md:p-3">
              <Image src={onePassLogo} alt="One Pass Logo" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
