"use client";
import { v4 as uuidv4 } from "uuid";

import Card from "@/components/Card";
import { parseSeconds, shuffleArray } from "@/utils/helpers";
import cardImages, { CardImage } from "@/utils/images";
import { useEffect, useState } from "react";
import Menu from "@/components/Menu";
import EndGameModal from "@/components/EndGameModal";
import useUser, { UserContext } from "@/utils/userUser";

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

  // Scoring system
  const [score, setScore] = useState(0);
  const [currentAttempts, setCurrentAttempts] = useState(10);
  const [hasWon, setHasWon] = useState(false);
  const [gameTimeIntervalId, setGameTimeIntervalId] =
    useState<NodeJS.Timer | null>(null);
  const [gameTime, setGameTime] = useState(180);

  const [isMounted, setIsMounted] = useState(false);

  const { logout, user } = useUser();

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
        setScore((prev) => prev + currentAttempts);
        setCurrentAttempts(10);
        reset();
      } else {
        setTimeout(() => reset(), 1000);
      }
    }
  }, [choiceOne, choiceTwo, cards, currentAttempts]);

  // check win
  useEffect(() => {
    const allMatched = cards.every((card) => card.matched);
    if (allMatched && cards.length > 0) {
      setPlaying(false);
      setHasWon(true);
      if (gameTimeIntervalId) clearInterval(gameTimeIntervalId);
    }
  }, [cards, gameTimeIntervalId]);

  const reset = () => {
    setDisabled(false);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  const startGame = () => {
    if (!playing) {
      const intervalId = setInterval(() => {
        setGameTime((prev) => prev - 1);
      }, 1000);
      setScore(0);
      setCurrentAttempts(10);
      setGameTimeIntervalId(intervalId);
      setGameTime(180);
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
      if (gameTimeIntervalId) clearInterval(gameTimeIntervalId);
    }
  };

  const handleChoice = (card: CardObj) => {
    if (!choiceOne) {
      setChoiceOne(card.id);
    } else if (card.id !== choiceOne) {
      // subtract attempts only on second choice
      setCurrentAttempts((prev) => (prev > 0 ? prev - 1 : prev));
      setChoiceTwo(card.id);
    }
  };

  return (
    <UserContext.Provider value={{ user, logout }}>
      <main className="bg-[#F0F3F9] min-h-screen">
        {isMounted && (
          <div className="container mx-auto p-4">
            <div className="mb-4 gap-4 grid grid-cols-12 text-center items-center max-w-4xl mx-auto">
              <div className="col-span-4 text-left">
                <Menu />
              </div>
              <div className="col-span-4">
                <div className="flex flex-col">
                  <div className="text-xs">
                    Multiplier &middot; {parseSeconds(gameTime)}
                  </div>
                  <div className="text-xl font-semibold ">
                    Current Score: {score}
                  </div>
                </div>
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
                    card.id === choiceOne ||
                    card.id === choiceTwo ||
                    card.matched
                  }
                  handleChoice={handleChoice}
                  disabled={disabled || !playing}
                />
              ))}
            </div>
          </div>
        )}
        <EndGameModal
          isOpen={hasWon}
          closeModal={() => setHasWon(false)}
          currentScore={score}
          remainingSeconds={gameTime}
        />
      </main>
    </UserContext.Provider>
  );
}
