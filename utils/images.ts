import onePassKey from "@/assets/1password-key.png";
import onePassSquare from "@/assets/1password-logo-square.png";
import onePass from "@/assets/1password-logo.png";
import hashSquare from "@/assets/hashnode-square.jpg";
import hash from "@/assets/hashnode.jpg";
import nextSquare from "@/assets/nextjs-icon.png";
import next from "@/assets/nextjs.png";
import passage from "@/assets/passage-logo.png";
import planetScale from "@/assets/planetscale.png";
import react from "@/assets/react.png";
import vercelSquare from "@/assets/vercel-icon.png";
import vercel from "@/assets/vercel.png";

import { StaticImageData } from "next/image";

export interface CardImage {
  name: string;
  image: StaticImageData;
}

const images: CardImage[] = [
  { name: "onePassKey", image: onePassKey },
  { name: "onePassSquare", image: onePassSquare },
  { name: "onePass", image: onePass },
  { name: "hashSquare", image: hashSquare },
  // { name: "hash", image: hash },
  // { name: "nextSquare", image: nextSquare },
  // { name: "next", image: next },
  // { name: "passage", image: passage },
  // { name: "planetScale", image: planetScale },
  // { name: "react", image: react },
  // { name: "vercelSquare", image: vercelSquare },
  // { name: "vercel", image: vercel },
];

export default images;
