import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

export default function register() {
  const initValue = {
    fullname: "",
    email: "",
    age: "",
    password: "",
    confirmpassword: "",
  };
  const [user, setUser] = useState(initValue);
  const { push } = useRouter();
  const listInput = [
    {
      type: "text",
      label: "fullname",
    },
    {
      type: "email",
      label: "email",
    },
    {
      type: "number",
      label: "age",
    },
    {
      type: "password",
      label: "password",
    },
    {
      type: "password",
      label: "confirmpassword",
    },
  ];

  const handleRgister = async (event) => {
    event.preventDefault();
    //post db
    try {
      // const token = JSON.parse(localStorage.getItem("jwtToken"));

      const testApi = await axios.post(
        "/api/register",
        {
          fullname: user.fullname,
          email: user.email,
          age: user.age,
          password: user.password,
          confirmpassword: user.confirmpassword,
        }
        // {
        //   headers: { authorization: ` Bearer ${token}` },
        // }
      );

      console.log(testApi);
      setUser(initValue);
      push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleRgister}
      className="mx-auto mt-20  w-96 h-full rounded-3xl"
    >
      <h1 className="text-center pt-4 mb-2 text-4xl font-mono ">Đăng kí</h1>
      {listInput.map((item, i) => (
        <div key={i} className="mt-3">
          <label className="block capitalize ml-12 text-xl font-mono">
            {item.label}
          </label>
          <input
            value={user[item.label]}
            onChange={(e) => {
              setUser((prev) => ({
                ...prev,
                [item.label]: e.target.value,
              }));
            }}
            className=" py-2 w-72 px-3 ml-11 rounded-lg text-xs2l border-gray-300 border-solid font-semibold"
            type={item.type}
          />
        </div>
      ))}
      <button className="text-center ml-20 px-20 py-2 rounded-full bg-teal-500 mt-6 hover:bg-blue-400 text-zinc-50">
        Register
      </button>
      <span className="block ml-32 pt-3 text-red-700 hover:text-white">
        <Link href="/">Quay lại trang chủ</Link>
      </span>
    </form>
  );
}
