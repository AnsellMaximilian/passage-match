import React, { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { UserContext } from "@/utils/userUser";
interface Props {
  isOpen: boolean;
  closeModal: () => void;
}
export default function ProfileModal({ isOpen, closeModal }: Props) {
  const { user, updateName } = useContext(UserContext);

  const [name, setName] = useState("");

  const handleUpdateName: React.FormEventHandler<HTMLFormElement> = async (
    e
  ) => {
    e.preventDefault();
    if (user && name) {
      const updatedUserRes = await fetch(`/api/users/${user.passage_id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const updatedUser = await updatedUserRes.json();
      updateName(updatedUser.name);
    }
  };

  useEffect(() => {
    if (user) setName(user.name);
  }, [user]);

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
                  Profile
                </Dialog.Title>
                <div className="mt-2">
                  <form className="px-[30px]" onSubmit={handleUpdateName}>
                    <label
                      className="text-gray-700 text-sm font-bold mb-2 flex flex-col"
                      htmlFor="name"
                    >
                      <span>Name</span>
                      <span className="text-xs text-gray-400 font-light">
                        (This will be displayed on the leaderboard)
                      </span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Name"
                      />
                      <button className="rounded-md bg-[#4565B6] hover:bg-[#3c5696] px-2 py-1 text-sm font-medium text-white">
                        Update
                      </button>
                    </div>
                  </form>
                  <passage-profile
                    app-id={process.env.NEXT_PUBLIC_PASSAGE_ID as string}
                  ></passage-profile>
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
