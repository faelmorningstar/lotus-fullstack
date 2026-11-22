
export default function IridescentBackground() {
  return (
    <div
      className="iridescent-background"
      aria-hidden="true"
    >
      <svg
        className="light-threads"
        viewBox="0 0 1440 1000"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="thread-blue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2455ff" />
            <stop offset="50%" stopColor="#50caff" />
            <stop offset="100%" stopColor="#2455ff" />
          </linearGradient>

          <linearGradient id="thread-pink" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a336ff" />
            <stop offset="50%" stopColor="#f052df" />
            <stop offset="100%" stopColor="#8e35ff" />
          </linearGradient>

          <linearGradient id="thread-green" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#077b76" />
            <stop offset="50%" stopColor="#28f2c5" />
            <stop offset="100%" stopColor="#087d9d" />
          </linearGradient>
        </defs>

        <path
          className="light-thread thread-blue"
          d="M 130 -100
             C -80 180, 300 280, 130 540
             S 100 860, 330 1100"
          stroke="url(#thread-blue)"
        />

        <path
          className="light-thread thread-pink"
          d="M 390 -100
             C 80 170, 420 350, 200 600
             S 150 900, 520 1100"
          stroke="url(#thread-pink)"
        />

        <path
          className="light-thread thread-green"
          d="M 1450 -100
             C 1150 200, 1510 380, 1260 610
             S 1120 900, 1450 1100"
          stroke="url(#thread-green)"
        />
      </svg>
    </div>
  )
}
