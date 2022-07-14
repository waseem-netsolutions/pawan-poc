import React from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router";


export default function Home() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
