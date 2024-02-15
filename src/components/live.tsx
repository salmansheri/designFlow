"use client";

import { useCallback, useEffect, useState } from "react";
import { useMyPresence, useOthers } from "../../liveblocks.config";
import LiveCursors from "./cursor/live-cursors";
import CursorChat from "./cursor/cursor-chat";
import { CursorMode, CursorState, Reaction } from "@/types/type";
import ReactionSelector from "./reaction/reaction-button";

const Live = () => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;
  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden,
  });

  const [reactions, setReactions] = useState<Reaction[]>([]);

  // Function to handle the pointer movement
  const handlePointerMovement = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault();
      if (cursor === null || cursorState.mode !== CursorMode.ReactionSelector) {
        // Note: Subtracting position of the cursor relative to the window not subtracting from cursor width
        // for x axis
        const x = event.clientX - event.currentTarget.getBoundingClientRect().x;

        // For Y axis
        const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

        // Calling the update presence hook
        updateMyPresence({ cursor: { x, y } });
      }
    },
    [updateMyPresence, cursorState, cursor],
  );

  // Function to handle the Pointer Leaving from its origin
  const handlePointerLeave = useCallback(
    (event: React.PointerEvent) => {
      setCursorState({ mode: CursorMode.Hidden });
      // Calling the update presence hook
      updateMyPresence({ cursor: { cursor: null, message: null } });
    },
    [updateMyPresence],
  );

  // Function will run when the pointer moves down
  const handlePointerDown = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault();
      // Note: Subtracting position of the cursor relative to the window not subtracting from cursor width
      // for x axis
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;

      // For Y axis
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

      // Calling the update presence hook
      updateMyPresence({ cursor: { x, y } });
      setCursorState((state: CursorState) =>
        cursorState.mode === CursorMode.Reaction
          ? { ...state, isPressed: true }
          : state,
      );
    },
    [updateMyPresence, cursorState],
  );

  const handlePointerUp = useCallback(() => {
    setCursorState((state: CursorState) =>
      cursorState.mode === CursorMode.Reaction
        ? { ...state, isPressed: true }
        : state,
    );
  }, [cursorState]);

  useEffect(() => {
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === "/") {
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: "",
        });
      } else if (event.key === "Escape") {
        updateMyPresence({ message: "" });
        setCursorState({
          mode: CursorMode.Hidden,
        });
      } else if (event.key === "e") {
        setCursorState({
          mode: CursorMode.ReactionSelector,
        });
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "/") {
        event.preventDefault();
      }
    };

    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyDown);
  }, [updateMyPresence]);

  const setReaction = useCallback((reaction: string) => {
    setCursorState({
      mode: CursorMode.Reaction,
      reaction,
      isPressed: false,
    });
  }, []);

  return (
    <div
      onPointerUp={handlePointerUp}
      onPointerMove={handlePointerMovement}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      className="h-[100vh] w-full flex justify-center items-center text-center "
    >
      <h1 className="text-2xl text-white ">Design Flow</h1>
      {cursor && (
        <CursorChat
          cursor={cursor}
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}
        />
      )}
      {cursorState.mode === CursorMode.ReactionSelector && (
        <ReactionSelector setReaction={setReaction} />
      )}
      <LiveCursors others={others} />;
    </div>
  );
};

export default Live;
