import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import GoldenDotMesh from '@/components/ui/GoldenDotMesh'

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
  }),
}

export default function HeroSection() {
  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 -mt-8 overflow-hidden bg-gradient-to-b from-background to-muted dark:from-black dark:to-zinc-950">
      <GoldenDotMesh />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-8">

          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={0}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-widest uppercase"
          >
            Live Market Data
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={0.12}
            className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight leading-[1.08] text-foreground"
          >
            Crypto Intelligence,{' '}
            <span className="text-primary">Simplified.</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={0.24}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto"
          >
            Track thousands of cryptocurrencies, decode market signals, and act on real-time insights — all from one clean dashboard.
          </motion.p>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={0.36}
            className="flex justify-center pt-2"
          >
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 px-8 py-3 font-semibold bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/40 rounded-full"
            >
              Explore Dashboard
              <ArrowRight className="h-4 w-4 text-white" />
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
