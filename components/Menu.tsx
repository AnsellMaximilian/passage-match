import React from "react";
import { Menu as HUIMenu, Transition } from "@headlessui/react";
import { HiMenu as MenuIcon } from "react-icons/hi";

import { Fragment, useEffect, useRef, useState } from "react";

export default function Menu() {
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
              <button
                className={`hover:bg-[#4565B6] hover:text-white group flex w-full items-center rounded-md px-2 py-2 text-sm`}
              >
                Edit
              </button>
            </HUIMenu.Item>
          </div>
        </HUIMenu.Items>
      </Transition>
    </HUIMenu>
  );
}
