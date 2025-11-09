'use client';

import { useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(SplitText, useGSAP);

type RollDirection = 'up' | 'down' | 'center';

export type TextRollProps = {
  children: ReactNode;
  direction?: RollDirection;
  duration?: number;
  stagger?: number;
  ease?: string;
  className?: string;
  disabled?: boolean;
};

export default function TextRoll({
  children,
  direction = 'up',
  duration = 0.5,
  stagger = 0.025,
  ease = 'power3.out',
  className = '',
  disabled = false,
}: TextRollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const topTextRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);
  const topSplitRef = useRef<SplitText | null>(null);
  const bottomSplitRef = useRef<SplitText | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Initialize SplitText for both duplicate texts
  useGSAP(
    () => {
      if (!topTextRef.current || !bottomTextRef.current || disabled) return;

      // Create split instances for both texts - split all text nodes including nested ones
      topSplitRef.current = new SplitText(topTextRef.current, {
        type: 'chars',
        charsClass: 'text-roll-char',
        // This will split text even inside nested elements
      });

      bottomSplitRef.current = new SplitText(bottomTextRef.current, {
        type: 'chars',
        charsClass: 'text-roll-char',
      });

      // Set initial positions based on direction
      const topChars = topSplitRef.current.chars;
      const bottomChars = bottomSplitRef.current.chars;

      if (direction === 'center') {
        // For center direction, start from center and expand out
        gsap.set(topChars, { yPercent: 0, opacity: 1 });
        gsap.set(bottomChars, { yPercent: 100, opacity: 0 });
      } else if (direction === 'up' || direction === 'down') {
        gsap.set(topChars, { yPercent: 0 });
        gsap.set(bottomChars, {
          yPercent: direction === 'up' ? 100 : -100,
        });
      }

      return () => {
        topSplitRef.current?.revert();
        bottomSplitRef.current?.revert();
        timelineRef.current?.kill();
      };
    },
    { scope: containerRef, dependencies: [children, direction, disabled] }
  );

  // Handle hover animation
  const handleMouseEnter = () => {
    if (disabled || !topSplitRef.current || !bottomSplitRef.current) return;

    const topChars = topSplitRef.current.chars;
    const bottomChars = bottomSplitRef.current.chars;

    if (!topChars || !bottomChars) return;

    // Kill any existing timeline
    timelineRef.current?.kill();

    // Create hover timeline
    const tl = gsap.timeline();

    if (direction === 'center') {
      // Animate from center outwards
      tl.to(
        topChars,
        {
          yPercent: -100,
          opacity: 0,
          duration,
          stagger: {
            from: 'center',
            amount: stagger * topChars.length,
          },
          ease,
        },
        0
      ).to(
        bottomChars,
        {
          yPercent: 0,
          opacity: 1,
          duration,
          stagger: {
            from: 'center',
            amount: stagger * bottomChars.length,
          },
          ease,
        },
        0
      );
    } else {
      const moveAmount = direction === 'up' ? -100 : 100;

      // Move both texts simultaneously
      tl.to(
        topChars,
        {
          yPercent: moveAmount,
          duration,
          stagger,
          ease,
        },
        0
      ).to(
        bottomChars,
        {
          yPercent: 0,
          duration,
          stagger,
          ease,
        },
        0
      );
    }

    timelineRef.current = tl;
  };

  // Handle mouse leave animation
  const handleMouseLeave = () => {
    if (disabled || !topSplitRef.current || !bottomSplitRef.current) return;

    const topChars = topSplitRef.current.chars;
    const bottomChars = bottomSplitRef.current.chars;

    if (!topChars || !bottomChars) return;

    // Kill any existing timeline
    timelineRef.current?.kill();

    // Create leave timeline - reverse the animation
    const tl = gsap.timeline();

    if (direction === 'center') {
      // Reverse from center outwards
      tl.to(
        topChars,
        {
          yPercent: 0,
          opacity: 1,
          duration: duration * 0.8,
          stagger: {
            from: 'center',
            amount: stagger * 0.5 * topChars.length,
          },
          ease,
        },
        0
      ).to(
        bottomChars,
        {
          yPercent: 100,
          opacity: 0,
          duration: duration * 0.8,
          stagger: {
            from: 'center',
            amount: stagger * 0.5 * bottomChars.length,
          },
          ease,
        },
        0
      );
    } else {
      const resetAmount = direction === 'up' ? 100 : -100;

      // Move both texts back
      tl.to(
        topChars,
        {
          yPercent: 0,
          duration: duration * 0.8,
          stagger: stagger * 0.5,
          ease,
        },
        0
      ).to(
        bottomChars,
        {
          yPercent: resetAmount,
          duration: duration * 0.8,
          stagger: stagger * 0.5,
          ease,
        },
        0
      );
    }

    timelineRef.current = tl;
  };

  // Get aria-label as string for accessibility
  const getAriaLabel = (): string => {
    if (typeof children === 'string') return children;
    if (typeof children === 'number') return String(children);
    return '';
  };

  return (
    <div
      ref={containerRef}
      className={`inline-block overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-block',
        position: 'relative',
      }}
    >
      {/* Top/Visible text */}
      <div
        ref={topTextRef}
        className="inline-block"
        style={{ position: 'relative' }}
        aria-label={getAriaLabel()}
      >
        {children}
      </div>

      {/* Bottom/Hidden duplicate text */}
      <div
        ref={bottomTextRef}
        className="inline-block"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}
