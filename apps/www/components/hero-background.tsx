import { useTheme } from 'next-themes';

export const HeroBackground = (props: React.SVGProps<SVGSVGElement>) => {
  const { resolvedTheme } = useTheme();

  const color = resolvedTheme === 'dark' ? '#fff' : '#000';
  const opacity = resolvedTheme === 'dark' ? 0.1 : 0.15;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 74.71 74.71"
      {...props}
    >
      <defs>
        <radialGradient
          id="d"
          cx="37.35"
          cy="37.35"
          r="37.35"
          fx="37.35"
          fy="37.35"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor={color}></stop>
          <stop offset="1" stopColor={color} stopOpacity="0"></stop>
        </radialGradient>
      </defs>
      <path
        id="c"
        fill="url(#d)"
        d="M0 0h74.71v74.71H0z"
        fillOpacity={opacity}
      ></path>
    </svg>
  );
};
