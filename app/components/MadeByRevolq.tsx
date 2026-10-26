import Link from 'next/link'

export default function MadeByRevolq() {
  return (
    <a
      href="https://revol-q.vercel.app"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Made with love by Revolq — Digital Agency, Kerala"
      className="made-by-revolq"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 180 28"
        fill="none"
        aria-hidden="true"
        className="made-by-revolq__svg"
      >
        {/* "made with" text */}
        <text
          x="0"
          y="18"
          fontFamily="inherit"
          fontSize="9"
          letterSpacing="0.12em"
          textAnchor="start"
          fill="currentColor"
          opacity="0.45"
          fontWeight="500"
          style={{ textTransform: 'uppercase' }}
        >
          MADE WITH
        </text>

        {/* Heart */}
        <path
          d="M73 9.5 C73 7.6 71.6 6 69.8 6 C68.8 6 67.9 6.5 67.3 7.3 C66.7 6.5 65.8 6 64.8 6 C63 6 61.6 7.6 61.6 9.5 C61.6 12.5 67.3 17 67.3 17 C67.3 17 73 12.5 73 9.5Z"
          fill="currentColor"
          opacity="0.7"
        />

        {/* "by" text */}
        <text
          x="77"
          y="18"
          fontFamily="inherit"
          fontSize="9"
          letterSpacing="0.12em"
          fill="currentColor"
          opacity="0.45"
          fontWeight="500"
        >
          BY
        </text>

        {/* REVOLQ wordmark */}
        <text
          x="95"
          y="19"
          fontFamily="inherit"
          fontSize="11"
          letterSpacing="0.18em"
          fill="currentColor"
          opacity="0.85"
          fontWeight="700"
        >
          REVOLQ
        </text>

        {/* Decorative diamond mark */}
        <polygon
          points="172,8 175,12 172,16 169,12"
          fill="currentColor"
          opacity="0.5"
        />
      </svg>
    </a>
  )
}
