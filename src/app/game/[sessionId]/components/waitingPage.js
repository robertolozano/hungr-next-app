"use client";

import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import selectionPageStore from "../../../../stores/SelectionPageStore";
import { useParams } from "next/navigation";
import { Button, Divider, TextField } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FaceIcon from "@mui/icons-material/Face";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/navigation";
import screenSizeStore from "../../../../stores/ScreenSizeStore";

const SelectionPage = observer(() => {
  const { sessionId } = useParams();
  const [username, setUsername] = useState("");
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
  const { isTablet, isMobile } = screenSizeStore;

  useEffect(() => {
    selectionPageStore.setRouter(router);
    selectionPageStore.joinSession(sessionId);
    selectionPageStore.setStatus("waiting");

    return () => {};
  }, [sessionId]);

  const isCurrentUser = (userId) => selectionPageStore.userId === userId;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          textAlign: "center",
          height: "30%",
        }}
      >
        <h1 style={{ margin: 20, marginTop: 40 }}>Waiting Room</h1>
        <h2 style={{ margin: 20 }}>
          Session ID: {selectionPageStore.sessionId}
        </h2>
        <p>
          Waiting on {selectionPageStore.notReadyUsers.length} user(s) to get
          ready
        </p>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "70%",
          width: isMobile ? "100%" : 700,
        }}
      >
        <h2 style={{ display: "flex", alignSelf: "flex-start" }}>
          Participants: ({selectionPageStore.userCount})
        </h2>
        <Divider flexItem style={{ marginTop: 10 }} />
        <List dense>
          {selectionPageStore.userList.map((user) => (
            <React.Fragment key={user.id}>
              <ListItem style={{ width: isMobile ? 400 : 700 }}>
                <ListItemIcon>
                  <FaceIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    editMode && isCurrentUser(user.id) ? (
                      <TextField
                        label="Edit username"
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                          margin: 0,
                          backgroundColor: "white",
                        }}
                        sx={{ size: "small" }}
                      />
                    ) : (
                      user.username
                    )
                  }
                  secondary={user.ready ? "Ready" : "Not Ready"}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isCurrentUser(user.id)
                      ? "space-between"
                      : "flex-end",
                    width: isMobile ? "200px" : "500px",
                  }}
                >
                  {isCurrentUser(user.id) && (
                    <Button
                      variant="contained"
                      onClick={() => {
                        if (editMode) {
                          selectionPageStore.setUsername(username);
                          setEditMode(false);
                        } else {
                          setEditMode(true);
                        }
                      }}
                      sx={{
                        height: 40,
                        width: isMobile ? 30 : "auto",
                        fontSize: isMobile ? 10 : "auto",
                      }}
                    >
                      {editMode ? "Save Name" : "Edit Name"}
                    </Button>
                  )}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {isCurrentUser(user.id) && (
                      <Button
                        variant="contained"
                        onClick={() => selectionPageStore.setReadyStatus()}
                        sx={{
                          height: 40,
                          marginRight: 2,
                          maxWidth: 150,
                          width: isMobile ? 30 : "auto",
                          fontSize: isMobile ? 10 : "auto",
                        }}
                        color={user.ready ? "error" : "primary"}
                      >
                        {user.ready ? "Cancel Ready" : "Ready?"}
                      </Button>
                    )}
                    {user.ready ? (
                      <CheckCircleIcon
                        style={{ color: "green", fontSize: 50 }}
                      />
                    ) : (
                      <CircularProgress size={35} />
                    )}
                  </div>
                </div>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>

        <Button
          variant="contained"
          onClick={() => {
            selectionPageStore.startSelection();
          }}
          sx={{
            height: 40,
            marginLeft: 10,
            maxWidth: 150,
          }}
          disabled={selectionPageStore.notReadyUsers.length > 0}
          color={"primary"}
        >
          Begin Game
        </Button>
      </div>
    </div>
  );
});

export default SelectionPage;
