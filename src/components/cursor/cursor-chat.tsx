import { CursorChatProps, CursorMode } from "@/types/type";
import CursorSVG from "../../../public/assets/CursorSVG";

//   </>)}
const CursorChat = ({
  cursor,
  cursorState,
  setCursorState,
  updateMyPresence,
}: CursorChatProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateMyPresence({ message: event.target.value });
    setCursorState({
      mode: CursorMode.Chat,
      previousMessage: null,
      message: event.target.value,
    });
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setCursorState({
        mode: CursorMode.Chat,
        // @ts-ignore
        previousMessage: cursorState.message,
        message: "",
      });
    } else if (event.key === "Escape") {
      // @ts-ignore
      setCursorState({
        mode: CursorMode.Chat,
      });
    }
  };
  return (
    <div
      className="absolute top-0 left-0"
      style={{ transform: `translateX(${cursor.x}px) translateY${cursor.y}px` }}
    >
      {cursorState.mode === CursorMode.Chat && (
        <>
          <CursorSVG color="#000" />
          <div className="absolute left-2 top-5 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white rounded-[20px]">
            {cursorState.previousMessage && (
              <div>{cursorState.previousMessage}</div>
            )}

            <input
              placeholder={
                cursorState.previousMessage ? "" : "Type a Message..."
              }
              className="z-10 w-60 border-none bg-transparent text-white placeholder-blue-300 outline-none"
              autoFocus={true}
              onChange={handleChange}
              onKeyDown={handleKeydown}
              value={cursorState.message}
              maxLength={50}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default CursorChat;
