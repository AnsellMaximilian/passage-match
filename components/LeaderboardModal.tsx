import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Score, User } from "@prisma/client";
import { AiOutlineLoading3Quarters as LoadIcon } from "react-icons/ai";
import { FaTrophy as TrophyIcon, FaUserAlt as UserIcon } from "react-icons/fa";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

interface ScorePayload extends Score {
  user: User;
}
export default function LeaderboardModal({ isOpen, closeModal }: Props) {
  const [scores, setScores] = useState<ScorePayload[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (isOpen) {
      (async () => {
        setIsLoading(true);

        try {
          const scoresRes = await fetch("/api/scores");
          const scores = await scoresRes.json();
          setScores(scores);
        } catch (error) {
          console.log("error");
        }
        setIsLoading(false);
      })();
    }
  }, [isOpen]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900 text-center"
                >
                  Leaderboard
                </Dialog.Title>
                <div className="mt-2">
                  {isLoading ? (
                    <div className="flex justify-center my-8">
                      <LoadIcon className="animate-spin" />
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 pt-2">
                      {scores.map((score, index) => {
                        let trophyClass: string = "";
                        if (index === 0) trophyClass = "text-yellow-500";
                        else if (index === 1) trophyClass = "text-slate-400";
                        else if (index === 2) trophyClass = "text-[#d9ae64]";
                        return (
                          <div
                            key={score.id}
                            className="flex justify-between font-semibold bg-[#C9D8FF] p-2 rounded items-center"
                          >
                            <div className="gap-2 flex items-center">
                              <div className="w-8 flex justify-center">
                                {index < 3 ? (
                                  <TrophyIcon className={trophyClass} />
                                ) : (
                                  <span className="text-sm">
                                    {("0" + (index + 1)).slice(-2)}
                                  </span>
                                )}
                              </div>
                              <div>{score.user.name}</div>
                            </div>
                            <div>{score.score}</div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    className="inline-flex rounded-md justify-center bg-[#4565B6] hover:bg-[#3c5696] px-4 py-2 text-sm font-medium text-white"
                    onClick={closeModal}
                  >
                    Done
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
