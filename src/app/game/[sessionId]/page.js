export const dynamic = "force-dynamic";

("use client");

// import React from "react";
import React, { useEffect, useState } from "react";

import { observer } from "mobx-react-lite";
import selectionPageStore from "../../../stores/SelectionPageStore";
import SelectionPage from "./components/selectionPage";
import VotePage from "./components/votePage";
import WaitingPage from "./components/waitingPage";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import WinnerPage from "./components/winnerPage";

const GamePage = observer(() => {
  const { sessionId } = useParams();
  const router = useRouter();

  useEffect(() => {
    // selectionPageStore.setRouter(router);
    // selectionPageStore.joinSession(sessionId);a

    return () => {
      selectionPageStore.cleanup();
    };
  }, [sessionId]);

  const { status } = selectionPageStore;

  if (status == "done") return <WinnerPage />;

  if (status == "selection") return <SelectionPage />;

  if (status == "voting") return <VotePage />;

  return <WaitingPage />;
});

export default GamePage;
