"use client";

import React, { useEffect } from "react";

import { observer } from "mobx-react-lite";
import selectionPageStore from "../../../stores/SelectionPageStore";
import SelectionPage from "./components/selectionPage";
import VotePage from "./components/votePage";
import WaitingPage from "./components/waitingPage";
import { useParams } from "next/navigation";
import WinnerPage from "./components/winnerPage";

const GamePage = observer(() => {
  const { sessionId } = useParams();

  useEffect(() => {
    return () => {
      selectionPageStore.cleanup();
    };
  }, [sessionId]);

  const { status } = selectionPageStore;

  if (status == "selection") return <SelectionPage />;

  if (status == "voting") return <VotePage />;

  if (status == "done") return <WinnerPage />;

  return <WaitingPage />;
});

export default GamePage;
