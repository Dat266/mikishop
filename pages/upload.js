import React, { useState } from "react";
import axios from "axios";

export default function upload() {
  const [previewImg, setPreviewImg] = useState("");
  const handleChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImg(reader.result);
    };
  };
  const handleUpload = (e) => {
    e.preventDefault();
    if (!previewImg) return;
    uploadImg(previewImg);
  };

  const uploadImg = async (base64EncodedImage) => {
    const item = JSON.parse(localStorage.getItem("JwtToken"));
    const accesstoken = item.accessToken;
    try {
      const res = await axios({
        method: "POST",
        url: "/api/user/image",
        data: { image: base64EncodedImage },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accesstoken,
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleUpload}
      className="bg-white border-solid mt-24 p-7 w-96 mx-auto rounded-lg"
    >
      <div>
        <input type="file" name="file" onChange={handleChange} />
        <button className=" rounded-lg bg-green-500 hover:bg-slate-400">
          Upload
        </button>
      </div>
      <div>
        <img src={previewImg} />
      </div>
    </form>
  );
}
