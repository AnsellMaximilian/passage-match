import {
  PassageUser,
  PassageUserInfo,
} from "@passageidentity/passage-elements/passage-user";
import { useEffect, useState } from "react";

const useUser = () => {
  const [user, setUser] = useState<PassageUserInfo | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const passageUser = new PassageUser();

        const res = await passageUser.userInfo();
        if (res) {
          setUser(res);
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

  return { user, logout };
};

export default useUser;
