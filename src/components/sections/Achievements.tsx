import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { achievements } from '../../data/portfolio-data'
import type { ReactElement } from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Achievements = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Set initial state for all achievement items
      gsap.set('.achievement-item', {
        y: 1000,
      })

      // Animate each row on scroll
      const rows = gsap.utils.toArray<HTMLElement>('.achievement-row')

      rows.forEach(row => {
        const achievementItems = gsap.utils.toArray<HTMLElement>(
          row.querySelectorAll('.achievement-item')
        )

        achievementItems.forEach((item, itemIndex) => {
          const isLeftItem = itemIndex === 0
          gsap.set(item, {
            rotation: isLeftItem ? -60 : 60,
            transformOrigin: 'center center',
          })
        })

        ScrollTrigger.create({
          trigger: row,
          start: 'top 50%',
          onEnter: () => {
            gsap.to(achievementItems, {
              y: 0,
              rotation: 0,
              duration: 1,
              ease: 'power4.out',
              stagger: 0.25,
            })
          },
        })
      })
    },
    { scope: containerRef }
  )

  // Create rows with 2 items each
  const createRows = () => {
    const rows: ReactElement[] = []

    for (let i = 0; i < achievements.length; i += 2) {
      const leftItem = achievements[i]
      const rightItem = achievements[i + 1]

      rows.push(
        <div key={i} className="achievement-row flex gap-6 md:gap-8">
          <AchievementItem achievement={leftItem} />
          {rightItem && <AchievementItem achievement={rightItem} />}
        </div>
      )
    }

    return rows
  }

  return (
    <section className="relative min-h-screen w-full bg-black py-24 text-white md:py-32">
      {/* Header */}
      <div className="mb-16 px-6 text-center md:mb-24">
        <h2 className="font-display mb-4 text-2xl leading-tight font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
          <span className="text-python-electric">LeetCode</span>{' '}
          <span className="text-python-yellow">Achievements</span>
        </h2>
        <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg md:text-xl">
          Consistency and dedication in problem-solving excellence
        </p>
      </div>

      {/* Achievements Grid */}
      <div
        ref={containerRef}
        className="achievements-container relative flex w-full flex-col gap-12 overflow-hidden px-6 md:gap-16 md:px-12 lg:px-24"
      >
        {createRows()}
      </div>

      {/* Footer Text */}
      <div className="mt-16 px-6 text-center md:mt-24">
        <p className="text-sm text-gray-500 md:text-base">
          View all achievements on{' '}
          <a
            href="https://leetcode.com/u/hetlathiya875/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-python-yellow hover:text-python-blue transition-colors duration-300"
          >
            LeetCode Profile
          </a>
        </p>
      </div>
    </section>
  )
}

interface AchievementItemProps {
  achievement: {
    name: string
    description: string
    img: string
    route?: string
  }
}

const AchievementItem = ({ achievement }: AchievementItemProps) => {
  const handleClick = () => {
    if (achievement.route) {
      window.open(achievement.route, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div className="achievement-item flex flex-1 flex-col gap-4">
      <div
        onClick={handleClick}
        className={`achievement-link flex flex-col gap-4 ${
          achievement.route ? 'group cursor-pointer' : ''
        }`}
      >
        {/* Image Container */}
        <div className="achievement-img bg-surface-variant aspect-[4/3] overflow-hidden rounded-lg border border-gray-800 transition-transform duration-500 group-hover:scale-105">
          <img
            src={achievement.img}
            alt={achievement.name}
            className="h-full w-full object-contain p-4"
            loading="lazy"
          />
        </div>

        {/* Text Content */}
        <div className="achievement-copy">
          <h3 className="group-hover:text-python-yellow mb-2 text-xl font-semibold tracking-tight transition-colors duration-300 md:text-2xl">
            {achievement.name}
          </h3>
          <p className="text-sm leading-relaxed text-gray-400 md:text-base">
            {achievement.description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Achievements
