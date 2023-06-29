"use client";

import useUser from "@/utils/userUser";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const { user } = useUser();
  return (
    <main className="bg-[#F0F3F9] h-screen relative overflow-hidden">
      <div className="absolute inset-0 [background:linear-gradient(to_bottom,#F0F3f9,#F0F3f9_50%,#4565B6_50%,#4565B6)]">
        <div className="bg-white p-2 shadow-lg absolute left-0 -translate-x-2/3 md:-translate-x-1/2 top-1/2 -translate-y-1/2 rounded-lg">
          <Image src="/gameplay.png" alt="Gameplay" width={500} height={300} />
        </div>
        <div className="bg-white p-2 shadow-lg absolute right-0 translate-x-2/3 md:translate-x-1/2 top-1/2 -translate-y-1/2 rounded-lg">
          <Image
            src="/leaderboard.png"
            alt="Gameplay"
            width={500}
            height={300}
          />
        </div>
        <div className="absolute inset-x-0 top-0 flex justify-center py-8">
          <div className="flex gap-2 items-center">
            <Image
              src="/logo.svg"
              alt="app logo"
              width={75}
              height={75}
              className="w-20"
            />
            <div className="w-min text-center font-bold text-4xl bg-gradient-to-r to-[#4565B6] from-[#1A285F] bg-clip-text text-transparent">
              Passage Match
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0">
        <div className="container mx-auto p-4 h-full flex flex-col items-center justify-center">
          <div className="bg-white rounded-md shadow-lg max-w-3xl p-8 mx-auto">
            <div>
              <p className="text-center text-[#4565B6] text-lg font-bold mb-4 uppercase">
                Play Now
              </p>
              <div className="flex flex-col gap-2 items-center">
                {user ? (
                  <Link
                    href="/game"
                    className="w-48 text-center rounded-md bg-[#4565B6] border-2 border-[#4565B6] hover:border-[#3c5696] hover:bg-[#3c5696] px-4 py-2 text-sm font-medium text-white"
                  >
                    Play
                  </Link>
                ) : (
                  <Link
                    href="/auth"
                    className="w-48 text-center rounded-md bg-[#4565B6] border-2 border-[#4565B6] hover:border-[#3c5696] hover:bg-[#3c5696] px-4 py-2 text-sm font-medium text-white"
                  >
                    Sign In
                  </Link>
                )}
                {user ? (
                  <Link
                    href="/game"
                    className="w-48 text-center rounded-md border-2 bg-[#F0F3F9] text-[#4565B6] border-[#4565B6] hover:border-[#3c5696] hover:bg-[#3c5696] px-4 py-2 text-sm font-medium hover:text-white"
                  >
                    Change Accounts
                  </Link>
                ) : (
                  <Link
                    href="/game"
                    className="w-48 text-center rounded-md border-2 bg-[#F0F3F9] text-[#4565B6] border-[#4565B6] hover:border-[#3c5696] hover:bg-[#3c5696] px-4 py-2 text-sm font-medium hover:text-white"
                  >
                    Play As Guest
                  </Link>
                )}
              </div>
              {!user && (
                <p className="text-xs mt-4 text-gray-400 text-center w-48">
                  Note: You need to be signed in to enter the leaderboard.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
