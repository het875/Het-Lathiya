import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

interface PageRevealProps {
  onComplete?: () => void
}

gsap.registerPlugin(useGSAP)

const PageReveal: React.FC<PageRevealProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const path1Ref = useRef<SVGPathElement>(null)
  const path2Ref = useRef<SVGPathElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)
  const nameContainerRef = useRef<HTMLDivElement>(null)

  const [isAnimating] = useState(true)

  // DISABLED: Session storage check - Animation will show every time
  // Uncomment below to enable session-based loading (shows only once per session)
  /*
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisitedPortfolio')
    if (hasVisited) {
      setIsAnimating(false)
      onComplete?.()
    } else {
      sessionStorage.setItem('hasVisitedPortfolio', 'true')
    }
  }, [onComplete])
  */

  useGSAP(
    () => {

      if (!isAnimating) return

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

      if (prefersReducedMotion) {
        // Quick fade for reduced motion
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            onComplete?.()
          },
        })
        return
      }

      const path1 = path1Ref.current
      const path2 = path2Ref.current
      const curtain = curtainRef.current
      const nameContainer = nameContainerRef.current

      if (!path1 || !path2 || !curtain || !nameContainer) return

      // Get path lengths for stroke animation
      const length1 = path1.getTotalLength()
      const length2 = path2.getTotalLength()

      // Create master timeline
      const masterTl = gsap.timeline({
        onComplete: () => {
          onComplete?.()
        },
      })

      // Set initial states
      gsap.set([path1, path2], {
        strokeDasharray: (_i, target) => {
          return target === path1 ? length1 : length2
        },
        strokeDashoffset: (_i, target) => {
          return target === path1 ? length1 : length2
        },
        opacity: 1,
      })

      gsap.set('.char', {
        opacity: 0,
        y: 100,
        rotationX: -90,
      })

      // Stage 1: Draw Python Logo (2s)
      masterTl
        .to(path1, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: 'power2.inOut',
        })
        .to(
          path2,
          {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: 'power2.inOut',
          },
          '-=0.7'
        )
        // Fill the logo with gradient
        .to(
          [path1, path2],
          {
            fill: (_i, target) => {
              return target === path1 ? 'url(#python-gradient-1)' : 'url(#python-gradient-2)'
            },
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.3'
        )

      // Stage 3: Reveal "Het Lathiya" with cinematic text animation (1.5s)
      masterTl
        .to(
          '.char',
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            stagger: {
              each: 0.03,
              ease: 'power3.out',
            },
            ease: 'power3.out',
          },
          '+=0.3'
        )
      // Stage 4: Scale up and fade everything
      masterTl
        .to(
          '.reveal-logo-container',
          {
            scale: 1.5,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.in',
          },
          '+=0.5'
        )
        .to(
          '.reveal-name',
          {
            scale: 1.2,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.in',
          },
          '-=0.8'
        )

      // Stage 5: Curtain wipe reveal (1s)
      masterTl.to(
        curtain,
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 1,
          ease: 'power4.inOut',
        },
        '-=0.4'
      )

      // Cleanup function
      return () => {
        masterTl.kill()
      }
    },
    { scope: containerRef, dependencies: [isAnimating] }
  )

  if (!isAnimating) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      style={{ willChange: 'opacity' }}
    >
      {/* Curtain overlay */}
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-black"
        style={{
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          willChange: 'clip-path',
        }}
      />

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center gap-12">
        {/* Python Logo with drawing animation */}
        <div className="reveal-logo-container" style={{ willChange: 'transform, opacity' }}>
          <svg
            width="200"
            height="200"
            viewBox="15 15 35 35"
            fill="none"
            className="drop-shadow-[0_0_30px_rgba(48,105,152,0.5)]"
          >
            <defs>
              {/* Clip path for image (optional for future use) */}
              <clipPath id="python-clip-path-reveal">
                <path d="M31.885 16c-8.124 0-7.617 3.523-7.617 3.523l.01 3.65h7.752v1.095H21.197S16 23.678 16 31.876c0 8.196 4.537 7.906 4.537 7.906h2.708v-3.804s-.146-4.537 4.465-4.537h7.688s4.32.07 4.32-4.175v-7.019S40.374 16 31.885 16zm-4.275 2.454a1.394 1.394 0 1 1 0 2.79 1.393 1.393 0 0 1-1.395-1.395c0-.771.624-1.395 1.395-1.395z" />
                <path d="M32.115 47.833c8.124 0 7.617-3.523 7.617-3.523l-.01-3.65H31.97v-1.095h10.832S48 40.155 48 31.958c0-8.197-4.537-7.906-4.537-7.906h-2.708v3.803s.146 4.537-4.465 4.537h-7.688s-4.32-.07-4.32 4.175v7.019s-.656 4.247 7.833 4.247zm4.275-2.454a1.393 1.393 0 0 1-1.395-1.395 1.394 1.394 0 1 1 1.395 1.395z" />
              </clipPath>

              {/* Gradients */}
              <linearGradient id="python-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#306998" />
                <stop offset="100%" stopColor="#1e90ff" />
              </linearGradient>
              <linearGradient id="python-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffd43b" />
                <stop offset="100%" stopColor="#4b8b3b" />
              </linearGradient>
            </defs>

            {/* Path 1 - Blue snake (top half) */}
            <path
              ref={path1Ref}
              d="M31.885 16c-8.124 0-7.617 3.523-7.617 3.523l.01 3.65h7.752v1.095H21.197S16 23.678 16 31.876c0 8.196 4.537 7.906 4.537 7.906h2.708v-3.804s-.146-4.537 4.465-4.537h7.688s4.32.07 4.32-4.175v-7.019S40.374 16 31.885 16zm-4.275 2.454a1.394 1.394 0 1 1 0 2.79 1.393 1.393 0 0 1-1.395-1.395c0-.771.624-1.395 1.395-1.395z"
              stroke="url(#python-gradient-1)"
              strokeWidth="0.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ willChange: 'stroke-dashoffset, fill' }}
            />

            {/* Path 2 - Yellow snake (bottom half) */}
            <path
              ref={path2Ref}
              d="M32.115 47.833c8.124 0 7.617-3.523 7.617-3.523l-.01-3.65H31.97v-1.095h10.832S48 40.155 48 31.958c0-8.197-4.537-7.906-4.537-7.906h-2.708v3.803s.146 4.537-4.465 4.537h-7.688s-4.32-.07-4.32 4.175v7.019s-.656 4.247 7.833 4.247zm4.275-2.454a1.393 1.393 0 0 1-1.395-1.395 1.394 1.394 0 1 1 1.395 1.395z"
              stroke="url(#python-gradient-2)"
              strokeWidth="0.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ willChange: 'stroke-dashoffset, fill' }}
            />
          </svg>
        </div>

        {/* "Het Lathiya" text with character split */}
        <div
          ref={nameContainerRef}
          className="reveal-name flex items-center justify-center gap-2"
          style={{ willChange: 'transform, opacity', perspective: '1000px' }}
        >
          {/* Het */}
          <div className="flex" style={{ perspective: '1000px' }}>
            {'Het'.split('').map((char, i) => (
              <span
                key={`het-${i}`}
                className="char font-display from-python-electric via-python-yellow to-python-neon animate-gradient-shift inline-block bg-gradient-to-r bg-clip-text text-[clamp(4.5rem,10vw,14rem)] font-bold tracking-[-0.01em] text-transparent"
                style={{
                  transformOrigin: 'bottom',
                  willChange: 'transform, opacity',
                }}
              >
                {char}
              </span>
            ))}
          </div>

          {/* Space */}
          <div className="w-4" />

          {/* Lathiya */}
          <div className="flex" style={{ perspective: '1000px' }}>
            {'Lathiya'.split('').map((char, i) => (
              <span
                key={`lathiya-${i}`}
                className="char font-display from-python-yellow via-python-electric to-python-blue animate-gradient-shift inline-block bg-gradient-to-r bg-clip-text text-[clamp(4.5rem,10vw,14rem)] font-bold tracking-[-0.01em] text-transparent"
                style={{
                  transformOrigin: 'bottom',
                  willChange: 'transform, opacity',
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Gradient overlays for depth */}
      <div className="bg-gradient-radial pointer-events-none absolute inset-0 from-transparent via-black/50 to-black" />
    </div>
  )
}

export default PageReveal
