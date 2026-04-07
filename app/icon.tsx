import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Red accent bar — top-left, mirrors the nav logo mark */}
        <div
          style={{
            position: 'absolute',
            top: 6,
            left: 6,
            width: 4,
            height: 14,
            background: '#e31f2b',
          }}
        />
        <span
          style={{
            color: '#ffffff',
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: '-0.03em',
            fontFamily: 'sans-serif',
            lineHeight: 1,
            paddingLeft: 6,
          }}
        >
          SM
        </span>
      </div>
    ),
    { ...size },
  )
}
