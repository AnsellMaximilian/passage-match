"use client";

import React, { useEffect, useRef } from "react";

interface authResult {
  redirect_url: string;
  auth_token: string;
}
type OnSuccessCallback = (authResult: authResult) => void;

export default function Auth() {
  const ref = useRef<any>();

  const onSuccess: OnSuccessCallback = (authResult) => {
    console.log(authResult);
    console.log("SWAAGGER");
  };

  useEffect(() => {
    console.log("ther isnt ref");

    if (ref.current) {
      console.log("ther is ref");
      const { current } = ref;
      current.onSuccess = onSuccess;
    }
  });
  return (
    <div>
      <div className="shadow-lg bg-red-100 p-4">
        <passage-auth
          ref={ref}
          app-id={process.env.NEXT_PUBLIC_PASSAGE_ID as string}
        ></passage-auth>
      </div>
    </div>
  );
}
