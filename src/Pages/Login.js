import React from "react";
import { login } from "../utils";

export default function Login() {
  return (
    <main>
      <h1>Welcome to NEARfunding!</h1>
      <p>This is a crowdfunding platform built on the NEAR blockchain.</p>

      <p style={{ textAlign: "center", marginTop: "2.5em" }}>
        <button onClick={login}>Sign in</button>
      </p>
    </main>
  );
}
