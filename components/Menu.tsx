"use client";

import React from "react";
import { Menu as HUIMenu, Transition } from "@headlessui/react";
import { HiMenu as MenuIcon } from "react-icons/hi";
import { FaTrophy as TrophyIcon } from "react-icons/fa";

import { Fragment, useEffect, useRef, useState } from "react";
import useUser from "@/utils/userUser";
import Link from "next/link";

export default function Menu() {
  const { user, logout } = useUser();

  return (
    <HUIMenu as="div" className="relative inline-block text-left">
      <div>
        <HUIMenu.Button className="inline-flex w-full justify-center rounded-md bg-[#4565B6] hover:bg-[#3c5696] px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          <MenuIcon size={32} />
        </HUIMenu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <HUIMenu.Items className="z-50 absolute left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <HUIMenu.Item>
              {user && (
                <button
                  className={`hover:bg-[#4565B6] hover:text-white group flex w-full items-center rounded-md px-2 py-2 text-sm gap-2`}
                >
                  <TrophyIcon /> <span>Leaderboard</span>
                </button>
              )}
            </HUIMenu.Item>
          </div>

          <div className="px-1 py-1 ">
            {user && (
              <div className="px-2 text-xs text-gray-600">{user.email}</div>
            )}
            <HUIMenu.Item>
              {user ? (
                <button
                  onClick={logout}
                  className={`hover:bg-[#4565B6] hover:text-white group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/auth"
                  className={`hover:bg-[#4565B6] hover:text-white group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  Sign In
                </Link>
              )}
            </HUIMenu.Item>
          </div>
        </HUIMenu.Items>
      </Transition>
    </HUIMenu>
  );
}
