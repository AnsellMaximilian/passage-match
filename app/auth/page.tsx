"use client";

import { useRouter } from "next/navigation";
import {
  PassageUser,
  PassageUserInfo,
} from "@passageidentity/passage-elements/passage-user";
import React, { useEffect, useRef, useState } from "react";
interface authResult {
  redirect_url: string;
  auth_token: string;
}
type OnSuccessCallback = (authResult: authResult) => void;

export default function AuthPage() {
  const [isMounted, setIsMounted] = useState(false);

  const router = useRouter();

  const ref = useRef<any>();

  const onSuccess: OnSuccessCallback = async (authResult) => {
    // check if user exists
    const passageUser = new PassageUser();
    const userInfo = (await passageUser.userInfo()) as PassageUserInfo;

    const existingUserRes = await fetch(`/api/users/${userInfo.id}`);

    if (existingUserRes.status === 404) {
      const newUserRes = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
          name: "Anonymous",
          email: userInfo.email,
          passage_id: userInfo.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    router.push(authResult.redirect_url);
  };

  useEffect(() => {
    if (ref.current) {
      const { current } = ref;
      current.onSuccess = onSuccess;
    }
  });

  useEffect(() => {
    require("@passageidentity/passage-elements/passage-auth");
    setIsMounted(true);
  }, []);

  return (
    <div>
      {isMounted && (
        <passage-auth
          ref={ref}
          app-id={process.env.NEXT_PUBLIC_PASSAGE_ID as string}
        ></passage-auth>
      )}
    </div>
  );
}
