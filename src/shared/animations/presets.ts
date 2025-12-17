import { MotionProps } from 'framer-motion';

type AnimationPreset = Pick<MotionProps, 'initial' | 'whileInView' | 'viewport' | 'transition'>;

export const AnimationPresets = {
  fadeInUp: (delay = 0): AnimationPreset => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.6, delay },
  }),

  fadeInUpSmall: (delay = 0): AnimationPreset => ({
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
  }),

  fadeInScale: (delay = 0): AnimationPreset => ({
    initial: { opacity: 0, scale: 0.8 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
  }),

  slideInLeft: (delay = 0): AnimationPreset => ({
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, delay },
  }),

  slideInRight: (delay = 0): AnimationPreset => ({
    initial: { opacity: 0, x: 30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.6, delay },
  }),
} as const;
