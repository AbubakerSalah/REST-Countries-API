import React from "react";

export default function Header() {
  return (
    <>
      <div className="bg-[#fafafa] text-[#111827] shadow-md py-20 px-6 flex justify-between font-sans">

        <h1 className="font-semibold text-2xl">Where in the world?</h1>

        <div className="flex items-center gap-2 text-2xl">
          <ion-icon name="moon-outline"></ion-icon>
          <button className="font-light">Dark Mode</button>
        </div>
      </div>
    </>
  );
}
