import React from "react";
import { LoginForm } from "./LoginForm";

function page() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-zinc-700 px-20 py-20 rounded-lg">
        <LoginForm />
      </div>
    </div>
  );
}

export default page;
