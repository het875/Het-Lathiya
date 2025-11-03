import { useEffect, useRef } from 'react'
import type { SVGProps } from 'react'
import { gsap } from 'gsap'

const Python = (props: SVGProps<SVGSVGElement>) => {
  const path1Ref = useRef<SVGPathElement>(null)
  const path2Ref = useRef<SVGPathElement>(null)
  const imageRef = useRef<SVGImageElement>(null)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      // Skip animations if user prefers reduced motion
      return
    }

    const path1 = path1Ref.current
    const path2 = path2Ref.current
    const image = imageRef.current

    if (!path1 || !path2 || !image) return

    // Get path lengths for stroke animation
    const length1 = path1.getTotalLength()
    const length2 = path2.getTotalLength()

    // Create timeline for sequential animations
    const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })

    // Initially hide the image
    gsap.set(image, { opacity: 0 })

    // Set initial state for stroke drawing animation
    gsap.set(path1, {
      strokeDasharray: length1,
      strokeDashoffset: length1,
      opacity: 1,
    })
    gsap.set(path2, {
      strokeDasharray: length2,
      strokeDashoffset: length2,
      opacity: 1,
    })

    // Animate stroke drawing effect
    tl.to(path1, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: 'power2.out',
    })
      .to(
        path2,
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.out',
        },
        '-=0.8' // Overlap animations slightly
      )
      // Fade in the image after paths are drawn
      .to(
        image,
        {
          opacity: 1,
          duration: 0.8,
        },
        '-=0.5'
      )

    // Optional: Add intersection observer for replay on scroll
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            tl.restart()
          }
        })
      },
      { threshold: 0.5 }
    )

    const svgElement = path1Ref.current?.closest('svg')
    if (svgElement) {
      observer.observe(svgElement)
    }

    return () => {
      tl.kill()
      if (svgElement) {
        observer.unobserve(svgElement)
      }
    }
  }, [])

  return (
    <svg {...props} fill="none" viewBox="16 16 32 32">
      <defs>
        <clipPath id="python-clip-path">
          <path d="M31.885 16c-8.124 0-7.617 3.523-7.617 3.523l.01 3.65h7.752v1.095H21.197S16 23.678 16 31.876c0 8.196 4.537 7.906 4.537 7.906h2.708v-3.804s-.146-4.537 4.465-4.537h7.688s4.32.07 4.32-4.175v-7.019S40.374 16 31.885 16zm-4.275 2.454a1.394 1.394 0 1 1 0 2.79 1.393 1.393 0 0 1-1.395-1.395c0-.771.624-1.395 1.395-1.395z" />
          <path d="M32.115 47.833c8.124 0 7.617-3.523 7.617-3.523l-.01-3.65H31.97v-1.095h10.832S48 40.155 48 31.958c0-8.197-4.537-7.906-4.537-7.906h-2.708v3.803s.146 4.537-4.465 4.537h-7.688s-4.32-.07-4.32 4.175v7.019s-.656 4.247 7.833 4.247zm4.275-2.454a1.393 1.393 0 0 1-1.395-1.395 1.394 1.394 0 1 1 1.395 1.395z" />
        </clipPath>
      </defs>

      {/* Visible stroke paths for drawing animation */}
      <path
        ref={path1Ref}
        d="M31.885 16c-8.124 0-7.617 3.523-7.617 3.523l.01 3.65h7.752v1.095H21.197S16 23.678 16 31.876c0 8.196 4.537 7.906 4.537 7.906h2.708v-3.804s-.146-4.537 4.465-4.537h7.688s4.32.07 4.32-4.175v-7.019S40.374 16 31.885 16zm-4.275 2.454a1.394 1.394 0 1 1 0 2.79 1.393 1.393 0 0 1-1.395-1.395c0-.771.624-1.395 1.395-1.395z"
        stroke="url(#python-gradient-1)"
        strokeWidth="0.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        ref={path2Ref}
        d="M32.115 47.833c8.124 0 7.617-3.523 7.617-3.523l-.01-3.65H31.97v-1.095h10.832S48 40.155 48 31.958c0-8.197-4.537-7.906-4.537-7.906h-2.708v3.803s.146 4.537-4.465 4.537h-7.688s-4.32-.07-4.32 4.175v7.019s-.656 4.247 7.833 4.247zm4.275-2.454a1.393 1.393 0 0 1-1.395-1.395 1.394 1.394 0 1 1 1.395 1.395z"
        stroke="url(#python-gradient-2)"
        strokeWidth="0.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Gradient definitions for Python colors */}
      <defs>
        <linearGradient id="python-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#306998" />
          <stop offset="100%" stopColor="#1e90ff" />
        </linearGradient>
        <linearGradient id="python-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffd43b" />
          <stop offset="100%" stopColor="#4b8b3b" />
        </linearGradient>
      </defs>

      {/* Image with clip path */}
      <image
        ref={imageRef}
        href="/me.avif"
        x="16"
        y="16"
        width="32"
        height="32"
        clipPath="url(#python-clip-path)"
        preserveAspectRatio="xMidYMid slice"
      />
    </svg>
  )
}

export { Python }
