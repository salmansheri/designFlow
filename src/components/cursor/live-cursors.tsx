import { LiveCursorProps } from "@/types/type";
import Cursors from "./cursor";
import { COLORS } from "@/constants";

const LiveCursors = ({ others }: LiveCursorProps) => {
  console.log(others);
  return others?.map(({ connectionId, presence }) => {
    if (!presence?.cursor) {
      return null;
    }

    return (
      <Cursors
        key={connectionId}
        color={COLORS[Number(connectionId) % COLORS.length]}
        x={presence.cursor.x}
        y={presence.cursor.y}
        message={presence.message}
      />
    );
  });
};

export default LiveCursors;
