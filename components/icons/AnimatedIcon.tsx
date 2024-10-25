export const AnimatedIcon = ({
  icon: Icon,
  color,
}: {
  icon: React.ElementType;
  color: string;
}) => (
  <div className="relative w-16 h-16 mb-4">
    <Icon className={`w-full h-full ${color}`} />
    <div className="absolute inset-0 border-2 border-transparent">
      <svg className="w-full h-full">
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="none"
          stroke={color}
          strokeWidth="4"
        >
          <animate
            attributeName="stroke-dasharray"
            from="0 100 0 100"
            to="100 0 100 0"
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>
  </div>
);
