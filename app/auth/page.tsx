"use client";

// import Auth from "@/components/Auth";
import React, { useEffect, useState } from "react";

export default function AuthPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    require("@passageidentity/passage-elements/passage-auth");
    setIsMounted(true);
  }, []);

  return (
    <div>
      {isMounted && (
        <passage-auth
          app-id={process.env.NEXT_PUBLIC_PASSAGE_ID as string}
        ></passage-auth>
      )}
    </div>
  );
}
