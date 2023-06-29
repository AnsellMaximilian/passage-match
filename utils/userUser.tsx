import {
  PassageUser,
  PassageUserInfo,
} from "@passageidentity/passage-elements/passage-user";
import { useEffect, useState } from "react";

import { createContext, useContext } from "react";

interface UserWithData extends PassageUserInfo {
  name: string;
  passage_id: string;
}

interface UserContext {
  user: UserWithData | null;
  logout: () => void;
  updateName: (newName: string) => void;
}

export const UserContext = createContext<UserContext>({
  user: null,
  logout: () => {},
  updateName: () => {},
});

const useUser = () => {
  const [user, setUser] = useState<UserWithData | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const passageUser = new PassageUser();

        const userInfo = await passageUser.userInfo();
        if (userInfo) {
          const userDataRes = await fetch(`/api/users/${userInfo.id}`);
          const userData = await userDataRes.json();
          setUser({ ...userInfo, ...userData });
        } else {
          setUser(null);
        }
      } catch (error) {}
    })();
  }, []);

  const logout = async () => {
    const passageUser = new PassageUser();

    const res = await passageUser.signOut();
    if (res) setUser(null);

    return res;
  };

  const updateName = (newName: string) => {
    setUser((prev) => (prev === null ? null : { ...prev, name: newName }));
  };

  return { user, logout, updateName };
};

export default useUser;
