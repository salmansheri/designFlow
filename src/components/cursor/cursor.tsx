import CursorSVG from "../../../public/assets/CursorSVG";

interface CursorProps {
  color: string;
  x: number;
  y: number;
  message: string;
}

const Cursors = ({ color, x, y, message }: CursorProps) => {
  return (
    <div
      className="pointer-events-none absolute top-0 left-0"
      style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
    >
      <CursorSVG color={color} />

      {/* MESSAGE */}
    </div>
  );
};

export default Cursors;
