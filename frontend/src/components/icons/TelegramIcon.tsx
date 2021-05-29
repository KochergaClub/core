interface Props {
  color?: string; // default to white
  size?: number; // default to 30px
}

const TelegramIcon: React.FC<Props> = ({ color, size = 30 }) => {
  return (
    <svg
      version="1.1"
      x="0px"
      y="0px"
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 60 60"
      className="block"
    >
      <desc>Telegram</desc>
      <path
        style={{ fill: color || '#ffffff' }}
        d="M30 0C13.4 0 0 13.4 0 30s13.4 30 30 30 30-13.4 30-30S46.6 0 30 0zm16.9 13.9l-6.7 31.5c-.1.6-.8.9-1.4.6l-10.3-6.9-5.5 5.2c-.5.4-1.2.2-1.4-.4L18 32.7l-9.5-3.9c-.7-.3-.7-1.5 0-1.8l37.1-14.1c.7-.2 1.4.3 1.3 1z"
      />
      <path
        style={{ fill: color || '#ffffff' }}
        d="M22.7 40.6l.6-5.8 16.8-16.3-20.2 13.3"
      />
    </svg>
  );
};

export default TelegramIcon;
