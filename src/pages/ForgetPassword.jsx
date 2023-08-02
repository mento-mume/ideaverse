import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import auth from "../firebase";

const ForgetPassword = () => {
  const [email, setEmail] = useState();

  const onChange = (e) => setEmail(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("email was sent");
    } catch (error) {
      toast.error("could not send email");
    }
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <label className="block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Email
          </span>
          <input
            type="email"
            name="email"
            id="email"
            class="mt-2 px-3 py-2 bg-[#F3F7FB] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
            placeholder="you@example.com"
            onChange={onChange}
            value={email}
          />
        </label>
        <Link
          class="inline-block align-baseline font-bold text-sm text-blue-500  text-right hover:text-blue-800"
          to="/"
        >
          sign in
        </Link>
        <button
          type="submit"
          className="w-full bg-[#162D3A] py-[14px] rounded-xl text-white"
        >
          reset Password
        </button>
      </form>
    </>
  );
};

export default ForgetPassword;
