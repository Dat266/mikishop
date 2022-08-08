import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

export default function login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const userLogin = [
    {
      label: "email",
      type: "email",
    },
    {
      label: "password",
      type: "password",
    },
  ];
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios({
        method: "POST",
        url: "/api/login",
        data,
        headers: { Authorization: `Bearer ${data.accessToken}` },
      });

      localStorage.setItem("JwtToken", JSON.stringify(res.data));

      router.push("./upload");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" h-96 w-96 rounded-2xl mx-auto mt-40"
    >
      <h1 className="text-center pt-6 text-4xl font-mono">Đăng nhập</h1>
      {userLogin.map((user, index) => (
        <div key={index} className="mt-4">
          <label className="ml-12 text-xl font-mono">{user.label}</label>
          <input
            onChange={(e) => {
              setData((prev) => ({
                ...prev,
                [user.label]: e.target.value,
              }));
            }}
            className="block py-2 w-72 px-3 ml-11 rounded-lg text-xs2l border-gray-300 border-solid font-sans"
            type={user.type}
          />
        </div>
      ))}

      <button className="text-center ml-24 px-20 py-2 rounded-full bg-orange-700 mt-6 hover:bg-blue-600 text-zinc-50">
        Login
      </button>
      <span className="block ml-20 mt-6">
        Bạn chưa có tài khoản?
        <span className="pl-2 text-white hover:text-sky-700">
          <Link href="./register">Register</Link>
        </span>
      </span>
    </form>
  );
}
