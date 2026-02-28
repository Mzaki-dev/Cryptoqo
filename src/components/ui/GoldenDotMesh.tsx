import { useEffect, useRef } from 'react'

export default function GoldenDotMesh({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let width = 0
    let height = 0

    // Wave line config
    const LINE_COUNT = 30
    // The wave band occupies the bottom ~55% of the canvas
    const BAND_START = 0.42  // top of band as fraction of height
    const BAND_END   = 0.98  // bottom of band

    const resize = () => {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }

    let t = 0
    const STEPS = 260

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      t += 0.004

      const bandTop = height * BAND_START
      const bandH   = height * (BAND_END - BAND_START)

      for (let i = 0; i < LINE_COUNT; i++) {
        const p = i / (LINE_COUNT - 1) // 0 → 1
        const baseY = bandTop + p * bandH

        // Wave parameters vary per line for organic feel
        const freq1  = 0.9  + p * 0.6
        const freq2  = 0.4  + p * 0.3
        const amp1   = 18   + p * 22
        const amp2   = 10   + (1 - p) * 14
        const phase  = p * Math.PI * 2.5

        // Opacity: denser in the middle of the band
        const centerDist = Math.abs(p - 0.5) * 2  // 0 at center, 1 at edges
        const alpha = 0.08 + (1 - centerDist) * 0.38

        // Gold tone shifts slightly across lines
        const gold = `rgba(${185 + Math.round(p * 25)},${138 + Math.round(p * 28)},${28},${alpha})`

        ctx.beginPath()
        ctx.strokeStyle = gold
        ctx.lineWidth   = 0.65

        for (let s = 0; s <= STEPS; s++) {
          const nx = s / STEPS               // 0 → 1 across width
          const x  = nx * width
          const y  = baseY
            + Math.sin(nx * Math.PI * 2 * freq1 + t * 1.1 + phase) * amp1
            + Math.sin(nx * Math.PI * 2 * freq2 + t * 0.6 + phase * 0.6) * amp2

          if (s === 0) ctx.moveTo(x, y)
          else         ctx.lineTo(x, y)
        }

        ctx.stroke()
      }

      animId = requestAnimationFrame(draw)
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()
    draw()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  )
}
