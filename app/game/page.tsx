"use client";
import { v4 as uuidv4 } from "uuid";

import Card from "@/components/Card";
import { shuffleArray } from "@/utils/helpers";
import cardImages, { CardImage } from "@/utils/images";
import Image from "next/image";
import { useEffect, useState } from "react";
import Menu from "@/components/Menu";
import useUser from "@/utils/userUser";

const doubledImages = [...cardImages, ...cardImages];

export interface CardObj {
  image: CardImage;
  id: string;
  matched: boolean;
}

export default function Home() {
  const [cards, setCards] = useState<CardObj[]>([]);
  const [choiceOne, setChoiceOne] = useState<null | string>(null);
  const [choiceTwo, setChoiceTwo] = useState<null | string>(null);
  const [disabled, setDisabled] = useState(false);
  const [playing, setPlaying] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    require("@passageidentity/passage-elements/passage-auth");
    setIsMounted(true);
    setCards(
      doubledImages.map((image) => ({ id: uuidv4(), image, matched: false }))
    );
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      const cardOne = cards.find((card) => card.id === choiceOne) as CardObj;
      const cardTwo = cards.find((card) => card.id === choiceTwo) as CardObj;

      if (cardOne.image.name === cardTwo.image.name) {
        setCards((prev) =>
          prev.map((card) => {
            if (card.id === choiceOne || card.id === choiceTwo)
              return { ...card, matched: true };
            return card;
          })
        );
        reset();
      } else {
        setTimeout(() => reset(), 1000);
      }
    }
  }, [choiceOne, choiceTwo, cards]);

  // check win
  useEffect(() => {
    const hasWon = cards.every((card) => card.matched);
    if (hasWon) {
      setPlaying(false);
      console.log("winner");
    }
  }, [cards]);

  const reset = () => {
    setDisabled(false);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  const startGame = () => {
    if (!playing) {
      setPlaying(true);
      reset();
      setCards((prev) => {
        const shuffledImages = shuffleArray(doubledImages);
        const shuffledCards = shuffledImages.map((image) => ({
          id: uuidv4(),
          image: image,
          matched: false,
        }));

        return shuffledCards;
      });
    } else {
      setPlaying(false);
    }
  };

  const handleChoice = (card: CardObj) => {
    if (!choiceOne) {
      setChoiceOne(card.id);
    } else if (card.id !== choiceOne) {
      setChoiceTwo(card.id);
    }
  };

  return (
    <main className="bg-[#F0F3F9] min-h-screen">
      {isMounted && (
        <div className="container mx-auto p-4">
          <div className="mb-4 gap-4 grid grid-cols-12 text-center items-center max-w-4xl mx-auto">
            <div className="col-span-4 text-left">
              <Menu />
            </div>
            <div className="col-span-4">
              <div className="text-xl font-semibold">Current Score: 0</div>
            </div>
            <div className="col-span-4 text-right">
              <button
                className={`${
                  playing
                    ? "bg-red-600 hover:bg-red-800"
                    : "bg-[#4565B6] hover:bg-[#3c5696]"
                } text-white px-4 py-2 rounded`}
                onClick={startGame}
              >
                {playing ? "Give Up" : "Start"}
              </button>
            </div>
          </div>
          <div className="grid gap-2 md:gap-4 grid-cols-12 mx-auto max-w-4xl">
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                flipped={
                  card.id === choiceOne || card.id === choiceTwo || card.matched
                }
                handleChoice={handleChoice}
                disabled={disabled || !playing}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
