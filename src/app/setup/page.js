"use client";

import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import selectionPageStore from "../../stores/SelectionPageStore";
import { Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";

const SelectionPage = observer(() => {
  const router = useRouter();
  useEffect(() => {
    selectionPageStore.setStatus("idle"); // or "waiting" or whatever default
  }, []);

  const [textFieldValue, setTextFieldValue] = useState("");
  const [mode, setMode] = useState("");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      {mode == "" && (
        <>
          <Button
            variant="contained"
            style={{ margin: 10 }}
            onClick={() => setMode("create")}
          >
            Create Session
          </Button>
          <Button
            variant="contained"
            style={{ margin: 10 }}
            onClick={() => setMode("join")}
          >
            Join Session
          </Button>
        </>
      )}
      {mode == "create" && (
        <>
          <h1 style={{ margin: 10, textAlign: "center" }}>Create Session</h1>
          <p style={{ fontSize: 20, margin: 10, textAlign: "center" }}>
            Create a Session ID. Share this with friends so they can join your
            session!
          </p>
          <TextField
            label="Session ID"
            variant="outlined"
            value={textFieldValue}
            onChange={(e) => setTextFieldValue(e.target.value)}
            style={{ margin: 10, backgroundColor: "white" }}
          />
          <Button
            variant="contained"
            onClick={() => {
              if (textFieldValue) {
                selectionPageStore.setSessionId(textFieldValue);
              }

              selectionPageStore.startWaitingRoom();
              router.push(`/game/${textFieldValue}`);
            }}
            style={{ margin: "0px 5px", margin: 10 }}
            sx={{
              height: "40px",
              width: "150px",
            }}
            disabled={!textFieldValue}
          >
            Setup Session
          </Button>
        </>
      )}
      {mode === "join" && (
        <>
          <h1 style={{ margin: 10, textAlign: "center" }}>Join Session</h1>
          <p style={{ fontSize: 20, margin: 10, textAlign: "center" }}>
            Enter the Session ID you were given to join the session.
          </p>
          <TextField
            label="Session ID"
            variant="outlined"
            value={textFieldValue}
            onChange={(e) => setTextFieldValue(e.target.value)}
            style={{ margin: 10, backgroundColor: "white" }}
          />
          <Button
            variant="contained"
            onClick={() => {
              selectionPageStore.cleanup(); // Clear old socket/listeners

              if (textFieldValue) {
                selectionPageStore.setSessionId(textFieldValue);
                router.push(`/game/${textFieldValue}`);
              }
            }}
            style={{ margin: 10 }}
            sx={{ height: "40px", width: "150px" }}
            disabled={!textFieldValue}
          >
            Join Session
          </Button>
        </>
      )}
    </div>
  );
});

export default SelectionPage;
