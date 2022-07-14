import React from "react";
import DashboardHeader from "../components/Header/DashboardHeader";
import { Outlet } from "react-router";

export default function Dashboard() {
  return (
    <>
      <DashboardHeader />
      <Outlet />
    </>
  );
}
