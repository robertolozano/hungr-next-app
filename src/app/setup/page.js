export const dynamic = "force-dynamic";

("use client");

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
      <h1 style={{ margin: 10 }}>Create Custom Game ID or Use Random</h1>
      <p style={{ fontSize: 20, margin: 10 }}>
        Create a Game ID for your session so you can invite your friends to this
        session
      </p>
      <TextField
        label="Game ID"
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
          // router.push(`/waiting/${textFieldValue}`);
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
    </div>
  );
});

export default SelectionPage;
