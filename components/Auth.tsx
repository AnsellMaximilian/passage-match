"use client";

import React from "react";

export default function Auth() {
  return (
    <div>
      <passage-auth
        app-id={process.env.NEXT_PUBLIC_PASSAGE_ID as string}
      ></passage-auth>
    </div>
  );
}
