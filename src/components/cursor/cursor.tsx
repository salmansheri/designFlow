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

      {message && (
        <div
          className="absolute left-0 top-5  rounded-3xl px-4 py-2"
          style={{ backgroundColor: color }}
        >
          <p className="text-white whitespace-nowrap text-sm leading-relaxed">
            {message}
          </p>
        </div>
      )}
    </div>
  );
};

export default Cursors;
