import Logo from "../assets/images/Login Art.png";
import { Link, useNavigate } from "react-router-dom";
import Google from "../assets/icons/Google";
import FbIcon from "../assets/icons/FbIcon";
import Button from "../components/Button";
import { useState } from "react";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../firebase"; //import database from firbase
import auth from "../firebase"; // Import the auth object from firebase.js
const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const { fname, lname, email, password } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: `${fname} ${lname}`,
      });
      //duplicate the formData state so we don't change the original state
      const formDataCopy = { ...formData };
      delete formDataCopy.password; //dont want to save the password on the db
      formDataCopy.timeStamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy);
      navigate("/Home");
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <>
      <div className="flex flex-col p-[24px] md:p-[32px] md:flex-row  md:gap-8 ">
        <div className="md:order-2 md:basis-1/2 ">
          <img
            src={Logo}
            alt="logo"
            className="mb-[27px] md:mb-0 w-full h-full"
          />
        </div>

        <div className="flex flex-col gap-6 md:p-[100px] md:basis-1/2 md:justify-center">
          <div className="flex flex-col gap-4">
            <h6 className="font-[sf pro rounded] font-semibold text-2xl">
              Welcome
            </h6>
            <p>
              Today is a new day. It's your day. You shape it. Sign in to start
              managing your projects.
            </p>
          </div>
          <div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <label className="block">
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                  First Name
                </span>
                <input
                  id="fname"
                  type="text"
                  name="fname"
                  class="mt-2 px-3 py-2 bg-[#F3F7FB] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="you@example.com"
                  onChange={onChange}
                />
              </label>
              <label className="block">
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                  Last Name
                </span>
                <input
                  id="lname"
                  type="text"
                  name="lname"
                  class="mt-2 px-3 py-2 bg-[#F3F7FB] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="you@example.com"
                  onChange={onChange}
                />
              </label>
              <label className="block">
                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                  Email
                </span>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="mt-2 px-3 py-2 bg-[#F3F7FB] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="you@example.com"
                  onChange={onChange}
                />
              </label>
              <label class="block">
                <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                  Password
                </span>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="mt-2 px-3 py-2 bg-[#F3F7FB] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                  placeholder="Atleast 8 characters"
                  onChange={onChange}
                />
              </label>

              <button
                type="submit"
                className="w-full bg-[#162D3A] py-[14px] rounded-xl text-white"
              >
                Sign Up
              </button>
              <p className="pb-[24px] flex justify-center items-center">
                Already have an account?
                <Link className=" font-bold text-sm text-blue-500" to="/">
                  Sign in
                </Link>
              </p>
            </form>
          </div>
          <div className="flex flex-col gap-4 ">
            <div className="flex gap-4 justify-center items-center">
              <div className="h-px bg-[#CFDFE2]" />
              <div>Or sign up with</div>
              <div className="h-px bg-[#CFDFE2]" />
            </div>
            <div className="flex gap-4">
              <Button icon={<Google />} text={"Google"} />
              <Button icon={<FbIcon />} text={"Facebook"} />
            </div>
          </div>
          <p className="text-sm text-center">© 2023 ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
