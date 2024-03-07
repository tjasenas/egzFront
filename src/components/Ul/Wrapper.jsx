import React from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";

export default function Wrapper({ children }) {
  return (
    <>
      <Header />
      <main>
        <div className="container">{children}</div>
      </main>
      <Footer />
    </>
  );
}
