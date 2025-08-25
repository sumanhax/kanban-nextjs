'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();


  const handleProceed = (e) => {
    e.preventDefault();
    // Handle login logic here (API call, validation, etc)
    // alert(`Email: ${email}\nPassword: ${password}`);  
    axios.post('https://n8nnode.bestworks.cloud/webhook/login-rep', {email:email}).then((res) => {
      console.log("res", res);
      if(res.status==200){
        router.push(`/login/${encodeURIComponent(email)}`);
      }else{
        alert('Email not found')
      }
    })
      .catch((err) => {
        console.log("err", err);
         alert('Email not found')
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleProceed}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-6 text-center text-blue-600">
          Type Your Email to Check MailBox 📧
        </h2>
        <div className="mb-4">
          {/* <label className="block mb-1 text-gray-600" htmlFor="email">
            Email
          </label> */}
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
          />
        </div>
        {/* <div className="mb-6">
          <label className="block mb-1 text-gray-600" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div> */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold"
        >
          Proceed
        </button>
      </form>
    </div>
  );
}
