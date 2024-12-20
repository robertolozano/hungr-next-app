"use client";

// import React from "react";
import React from "react";
import { observer } from "mobx-react-lite";
import selectionPageStore from "../../../stores/SelectionPageStore";
import SelectionPage from "./components/selectionPage";
import VotePage from "./components/votePage";

const GamePage = observer(() => {
  const { status } = selectionPageStore;

  if (status == "started") return <VotePage />;

  return <SelectionPage />;
});

export default GamePage;
