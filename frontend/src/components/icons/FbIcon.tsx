interface Props {
  color?: string; // default to white
  size?: number; // default to 30px
}

const FbIcon: React.FC<Props> = ({ color, size = 30 }) => {
  return (
    <svg
      version="1.1"
      id="Layer_1"
      x="0px"
      y="0px"
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 48 48"
      enableBackground="new 0 0 48 48"
    >
      <desc>Facebook</desc>
      <path
        style={{ fill: color || '#ffffff' }}
        d="M47.761,24c0,13.121-10.638,23.76-23.758,23.76C10.877,47.76,0.239,37.121,0.239,24c0-13.124,10.638-23.76,23.764-23.76 C37.123,0.24,47.761,10.876,47.761,24 M20.033,38.85H26.2V24.01h4.163l0.539-5.242H26.2v-3.083c0-1.156,0.769-1.427,1.308-1.427 h3.318V9.168L26.258,9.15c-5.072,0-6.225,3.796-6.225,6.224v3.394H17.1v5.242h2.933V38.85z"
      />
    </svg>
  );
};

export default FbIcon;
