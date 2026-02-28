import { TrendingUp, LineChart, Filter, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

type Feature = {
  icon: React.ElementType
  tag: string
  title: string
  description: string
  accent: string
  wide?: boolean
}

const features: Feature[] = [
  {
    icon: TrendingUp,
    tag: '01',
    title: 'Real-time Tracking',
    description:
      'Monitor prices and market trends with live updates streamed every minute. Never miss a move.',
    accent: 'from-primary/20 via-primary/5 to-transparent',
  },
  {
    icon: LineChart,
    tag: '02',
    title: 'Advanced Analytics',
    description:
      'Interactive charts and deep statistics to visualise every market movement at a glance.',
    accent: 'from-amber-400/15 via-amber-400/5 to-transparent',
  },
  {
    icon: Filter,
    tag: '03',
    title: 'Smart Filtering',
    description:
      'Slice through 15K+ coins by name, price, volume, or market cap — instantly.',
    accent: 'from-yellow-300/20 via-yellow-300/5 to-transparent',
  },
  {
    icon: Zap,
    tag: '04',
    title: 'Blazing Performance',
    description:
      'Optimised fetching and virtual rendering keep every interaction silky smooth, always.',
    accent: 'from-primary/15 via-primary/5 to-transparent',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 36, filter: 'blur(12px)' },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
  }),
}

function BentoCard({ icon: Icon, tag, title, description, accent, wide, delay }: Feature & { delay: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      custom={delay}
      className={`group relative ${
        wide ? 'lg:col-span-2' : ''
      } rounded-3xl overflow-hidden border border-border bg-white dark:bg-zinc-900 p-8 flex flex-col justify-between gap-8 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 cursor-default min-h-[220px]`}
    >
      {/* gradient wash */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${accent} opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
      />
      {/* top row */}
      <div className="relative flex items-start justify-between gap-4">
        <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-primary/60">{tag}</span>
        <div className="p-3 rounded-2xl bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
          <Icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
        </div>
      </div>
      {/* bottom row */}
      <div className="relative space-y-2">
        <h3 className="text-xl font-bold tracking-tight">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-md">{description}</p>
      </div>
    </motion.div>
  )
}

export default function FeatureCards() {
  return (
    <section id="features" className="w-full py-20 md:py-28 lg:py-36 bg-muted dark:bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.5 }} custom={0}
            className="text-xs font-semibold tracking-widest uppercase text-primary"
          >
            Why CryptoQo
          </motion.p>
          <motion.h2
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.5 }} custom={0.1}
            className="text-3xl md:text-4xl font-bold tracking-tight"
          >
            Everything the market demands
          </motion.h2>
          <motion.p
            variants={fadeUp} initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.5 }} custom={0.2}
            className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            One platform. Every signal. Zero noise.
          </motion.p>
        </div>
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
          {features.map((feature, i) => (
            <BentoCard key={feature.tag} {...feature} delay={0.1 + i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
