const Logo = ({ color = "blue", xmlns = "http://www.w3.org/2000/svg" }) => (
  <svg
    xmlns={xmlns}
    width="100"
    height="100"
    viewBox="0 0 100 100"
    style={{ color }}
  >
    <circle cx="50" cy="50" r="40" fill="currentColor" />
  </svg>
);

export default Logo;
