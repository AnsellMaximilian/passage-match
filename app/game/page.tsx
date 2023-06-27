"use client";
import { v4 as uuidv4 } from "uuid";

import Card from "@/components/Card";
import { shuffleArray } from "@/utils/helpers";
import cardImages, { CardImage } from "@/utils/images";
import Image from "next/image";
import { useEffect, useState } from "react";

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

  useEffect(() => {
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
    if (hasWon) console.log("winner");
  }, [cards]);

  const reset = () => {
    setDisabled(false);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  const startGame = () => {
    if (!playing) {
      setPlaying(true);
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
      <div className="container mx-auto p-4">
        <div className="p-4 mb-4 flex items-end">
          <div className="flex gap-4">
            <div>Best Score: 0</div>
          </div>
          <div className="ml-auto">
            <button
              className={`${
                playing
                  ? "bg-red-600 hover:bg-red-800"
                  : "bg-[#4565B6] hover:bg-[#3c5696]"
              } text-white px-4 py-2 rounded`}
              onClick={startGame}
            >
              {playing ? "Give Up" : "Start Game"}
            </button>
          </div>
        </div>
        <div className="flex gap-4 flex-wrap justify-center">
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
    </main>
  );
}
