import Logo from "../assets/images/Login Art.png";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

import FbIcon from "../assets/icons/FbIcon";
import Button from "../components/Button";
import { useState } from "react";
import Icon from "../assets/icons/Icon";
import { signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from "../firebase";
import OAuth from "../components/OAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      navigate("/Home");
    } catch (error) {
      toast.error("wrong login credentials");
    }
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

        <div className="flex flex-col gap-6 md:p-[150px] md:basis-1/2 md:justify-center">
          <div className="flex flex-col gap-4">
            <h6 className="font-[sf pro rounded] font-semibold text-2xl">
              Welcome Back
            </h6>
            <p>
              Today is a new day. It's your day. You shape it. Sign up to start
              saving your ideas.
            </p>
          </div>
          <div>
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
              <label class="block">
                <span class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                  Password
                </span>
                <div className="flex gap-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    name="password"
                    class="mt-2 px-3 py-2 bg-[#F3F7FB] border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
                    placeholder="Atleast 8 characters"
                    onChange={onChange}
                  />
                  {/* <button
                    onClick={() => setShowPassword((prevState) => !prevState)}
                  >
                    <Icon />
                  </button> */}
                </div>
              </label>

              <Link
                class="inline-block align-baseline font-bold text-sm text-blue-500  text-right hover:text-blue-800"
                to="/ForgotPassword"
              >
                Forgot Password?
              </Link>
              <button className="w-full bg-[#162D3A] py-[14px] rounded-xl text-white">
                Sign In
              </button>
            </form>
          </div>
          <div className="flex flex-col gap-4 ">
            <div className="flex gap-4 justify-center items-center">
              <div className="h-px bg-[#CFDFE2]"></div>
              <div>Or sign in with</div>
              <div className="h-px bg-[#CFDFE2]" />
            </div>
            <div class="flex gap-4 md:flex-col">
              <OAuth />
              <Button icon={<FbIcon />} text={"Facebook"} />
            </div>
          </div>
          <div>
            <p className="pb-[24px] flex justify-center items-center">
              Don't you have an account?
              <Link className=" font-bold text-sm text-blue-500" to="/SignUp">
                Sign up
              </Link>
            </p>
          </div>
          <p className="text-sm text-center">© 2023 ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </>
  );
};

export default Login;
