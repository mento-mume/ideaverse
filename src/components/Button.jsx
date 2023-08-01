import React from "react";

const Button = ({ icon, text }) => {
  return (
    <button className=" flex gap-4 rounded-xl bg-[#F3F9FA] text-base w-full items-center justify-center py-[10px]">
      {icon}
      {text}
    </button>
  );
};

export default Button;
