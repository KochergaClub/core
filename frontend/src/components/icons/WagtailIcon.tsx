import clsx from 'clsx';

interface Props {
  color?: string; // default to black
  size?: number; // default to 16px
  className?: string;
}

const WagtailIcon: React.FC<Props> = ({ color, size = 16, className }) => {
  return (
    <svg
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 256 316"
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      preserveAspectRatio="xMidYMid"
      className={clsx('block', className)}
    >
      <g>
        <desc>Wagtail</desc>
        <path
          style={color ? { fill: color } : {}}
          d="M214.75,46.25 C218.339851,46.25 221.25,43.3398509 221.25,39.75 C221.25,36.1601491 218.339851,33.25 214.75,33.25 C211.160149,33.25 208.25,36.1601491 208.25,39.75 C208.25,43.3398509 211.160149,46.25 214.75,46.25 Z M223,102.25 C223,102.25 214.75,60.75 160.75,72 C155.25,53.25 156.25,39.5 168.25,26.75 C184.5,9.5 210,19 210,19 L210,4.75 C201,0.75 192.5,3.55271368e-15 183,3.55271368e-15 C148.25,3.55271368e-15 129,26 120.75,43.5 L23,223.25 L50.5,218 L0,315.5 L35.25,309.25 L62.25,232.5 C138.75,232.5 236.75,205 223,102.25 Z M256,67.5 L234.5,46.75 L217.5,67.5 L256,67.5 Z M75,210.25 C75,210.25 77.5,209.75 82,208.75 C86.5,207.75 92.75,206.25 100.25,204.25 C104,203.25 108,202 112.25,200.5 C116.5,199 121,197.5 125.25,195.5 C129.75,193.75 134.25,191.5 138.75,189 C143.25,186.5 147.5,183.75 151.5,180.5 C152.5,179.75 153.5,179 154.5,178 L157.5,175.5 C159.25,173.75 161.25,172 163,170 C164.75,168.25 166.25,166.25 167.75,164.25 C168.5,163.25 169.25,162.25 170,161.25 L171,159.75 L172,158.25 C172.5,157.25 173.25,156.25 173.75,155.25 C174.25,154.25 174.75,153.25 175.5,152.25 C175.75,151.75 176,151.25 176.25,150.75 C176.5,150.25 176.75,149.75 177,149.25 C177.5,148.25 178,147.25 178.25,146.25 C179,144.25 179.75,142.25 180.5,140.25 C181,138.25 181.75,136.25 182.25,134.5 C182.75,132.75 183,130.75 183.5,129.25 C183.75,127.5 184,126 184.25,124.25 C184.5,122.75 184.75,121.25 184.75,120 C185,118.75 185,117.5 185.25,116.25 C185.5,111.75 185.5,109.25 185.5,109.25 L189.5,109.5 C189.5,109.5 189.25,112.25 189,116.75 C188.75,118 188.75,119.25 188.5,120.5 C188.25,122 188.25,123.5 187.75,125 C187.5,126.5 187,128.25 186.75,130 C186.25,131.75 185.75,133.5 185.25,135.5 C184.75,137.5 184,139.25 183.25,141.5 C182.5,143.5 181.75,145.5 180.75,147.75 C180.25,148.75 179.75,149.75 179.25,150.75 C179,151.25 178.75,151.75 178.5,152.25 C178.25,152.75 178,153.25 177.75,153.75 C177.25,154.75 176.5,155.75 176,157 C175.25,158 174.75,159 174,160 C173.75,160.5 173.25,161 173,161.5 L172,163 C171.25,164 170.5,165 169.75,166 C168,168 166.5,170 164.5,171.75 C162.75,173.75 160.75,175.25 158.75,177.25 L155.75,179.75 C154.75,180.5 153.75,181.25 152.5,182 C148.25,185 143.75,187.75 139.25,190.25 C134.75,192.5 130,194.75 125.5,196.5 C121,198.25 116.5,199.75 112.25,201 C108,202.25 104,203.5 100,204.25 C92.5,206 86,207.5 81.5,208.25 C77.5,209.75 75,210.25 75,210.25 L75,210.25 Z"
        />
      </g>
    </svg>
  );
};

export default WagtailIcon;
