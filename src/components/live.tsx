"use client";

import { useCallback } from "react";
import { useMyPresence, useOthers } from "../../liveblocks.config";
import LiveCursors from "./cursor/live-cursors";

const Live = () => {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;

  // Function to handle the pointer movement
  const handlePointerMovement = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault();
      // Note: Subtracting position of the cursor relative to the window not subtracting from cursor width
      // for x axis
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;

      // For Y axis
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

      // Calling the update presence hook
      updateMyPresence({ cursor: { x, y } });
    },
    [updateMyPresence],
  );

  // Function to handle the Pointer Leaving from its origin
  const handlePointerLeave = useCallback(
    (event: React.PointerEvent) => {
      event.preventDefault();
      // Note: Subtracting position of the cursor relative to the window not subtracting from cursor width
      // for x axis
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x;

      // For Y axis
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y;

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
    },
    [updateMyPresence],
  );

  return (
    <div
      onPointerMove={handlePointerMovement}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      className="h-[100vh] w-full flex justify-center items-center text-center "
    >
      <h1 className="text-2xl text-white ">Design Flow</h1>
      <LiveCursors others={others} />;
    </div>
  );
};

export default Live;
