interface Props {
  color?: string; // default to white
  size?: number; // default to 30px
}

const CalendarIcon: React.FC<Props> = ({ color, size = 30 }) => {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 80 80"
      fill="none"
    >
      <desc>Calendar</desc>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 4H72C74.2091 4 76 5.79086 76 8V14H4V8C4 5.79086 5.79086 4 8 4ZM4 18V72C4 74.2091 5.79086 76 8 76H72C74.2091 76 76 74.2091 76 72V18H4ZM0 8C0 3.58172 3.58172 0 8 0H72C76.4183 0 80 3.58172 80 8V72C80 76.4183 76.4183 80 72 80H8C3.58172 80 0 76.4183 0 72V8Z"
        fill={color || 'white'}
      />
    </svg>
  );
};

export default CalendarIcon;
