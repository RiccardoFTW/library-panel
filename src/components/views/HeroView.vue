<script setup lang="ts">
import { ref, onMounted, onUnmounted, type Component } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import bookWebp from '@/assets/images/book.webp'
import bgImage from '@/assets/images/shadows-remix.webp'
import LoginForm from '@/components/molecules/LoginForm.vue'
import RegistrationForm from '@/components/molecules/RegistrationForm.vue'

gsap.registerPlugin(ScrollTrigger)

const heroRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const overlayRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)
const ctaRef = ref<HTMLElement | null>(null)

interface Tab {
  alias: string
  label: string
  component: Component
}

let frames: ImageBitmap[] = []
let frameCount = 0
let ctx: CanvasRenderingContext2D | null = null
let isReady = false

const authSectionRef = ref<HTMLElement | null>(null)
const genreRefs = ref<HTMLElement[]>([])

const tabs = ref<Tab[]>([
  { alias: 'login', label: 'Accedi', component: LoginForm },
  { alias: 'register', label: 'Registrati', component: RegistrationForm },
])
const activeTab = ref<Tab>(tabs.value[0] as Tab)
const genres = ['Romanzo', 'Fantasy', 'Giallo', 'Fantascienza', 'Horror', 'Storico']

const scrollToAuth = () => {
  authSectionRef.value?.scrollIntoView({ behavior: 'smooth' })
}

// Genre positions
const genrePositions: Record<string, string>[] = [
  { top: '20%', left: '15%' },
  { top: '22%', right: '15%' },
  { top: '42%', left: '8%' },
  { top: '50%', right: '10%' },
  { bottom: '28%', left: '18%' },
  { bottom: '18%', right: '12%' },
]

const getGenreStyle = (index: number): Record<string, string> => {
  return genrePositions[index] || {}
}

const setupWebPScrub = async () => {
  const canvas = canvasRef.value
  if (!canvas) return

  ctx = canvas.getContext('2d')

  try {
    const response = await fetch(bookWebp)
    const blob = await response.blob()

    if ('ImageDecoder' in window) {
      const ImageDecoderClass = (
        window as unknown as {
          ImageDecoder: new (options: { type: string; data: ArrayBuffer }) => {
            decode: (options: { frameIndex: number }) => Promise<{ image: ImageBitmap }>
            tracks: { selectedTrack: { frameCount: number } }
          }
        }
      ).ImageDecoder

      const decoder = new ImageDecoderClass({
        type: 'image/webp',
        data: await blob.arrayBuffer(),
      })

      await decoder.decode({ frameIndex: 0 })
      frameCount = decoder.tracks.selectedTrack.frameCount

      for (let i = 0; i < frameCount; i++) {
        const result = await decoder.decode({ frameIndex: i })
        const frameBitmap = await createImageBitmap(result.image)
        frames.push(frameBitmap)
      }

      const firstFrame = frames[0]
      if (firstFrame) {
        canvas.width = firstFrame.width
        canvas.height = firstFrame.height
        ctx?.drawImage(firstFrame, 0, 0)
      }
      isReady = true

      setupScrollTrigger()
    } else {
      console.warn('ImageDecoder not supported, using fallback')
      setupFallback(blob)
    }
  } catch (error) {
    console.error('Error decoding WebP:', error)
    setupFallback()
  }
}

const setupFallback = async (blob?: Blob) => {
  const canvas = canvasRef.value
  if (!canvas || !ctx) return

  const img = new Image()

  if (blob) {
    img.src = URL.createObjectURL(blob)
  } else {
    img.src = bookWebp
  }

  img.onload = () => {
    canvas.width = img.naturalWidth || 1920
    canvas.height = img.naturalHeight || 1080
    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)

    setupFallbackScrollTrigger()
  }
}

const setupScrollTrigger = () => {
  if (titleRef.value) {
    gsap.set(titleRef.value, { y: 80, opacity: 0 })
  }
  if (ctaRef.value) {
    gsap.set(ctaRef.value, { y: 40, opacity: 0 })
  }
  genreRefs.value.forEach((el) => {
    gsap.set(el, { y: 30, opacity: 0 })
  })

  ScrollTrigger.create({
    trigger: heroRef.value,
    start: 'top top',
    end: '+=200%',
    pin: true,
    scrub: 0.3,
    onUpdate: (self) => {
      if (!isReady || frames.length === 0 || !canvasRef.value || !ctx) return

      const frameIndex = Math.min(Math.floor(self.progress * frameCount), frameCount - 1)
      const currentFrame = frames[frameIndex]

      ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
      if (currentFrame) {
        ctx.drawImage(currentFrame, 0, 0)
      }

      genreRefs.value.forEach((el, index) => {
        const startAt = 0.15 + index * 0.07

        if (self.progress >= startAt && self.progress <= 0.65) {
          const localProgress = Math.min((self.progress - startAt) / 0.1, 1)
          gsap.set(el, {
            y: 30 - 30 * localProgress,
            opacity: localProgress,
          })
        } else if (self.progress > 0.65) {
          const fadeProgress = (self.progress - 0.65) / 0.05
          gsap.set(el, {
            opacity: Math.max(1 - fadeProgress, 0),
          })
        } else {
          gsap.set(el, { y: 30, opacity: 0 })
        }
      })

      if (self.progress > 0.7) {
        const localProgress = (self.progress - 0.7) / 0.3
        if (titleRef.value) {
          gsap.set(titleRef.value, {
            y: 80 - 80 * localProgress,
            opacity: localProgress,
          })
        }
        if (ctaRef.value) {
          gsap.set(ctaRef.value, {
            y: 40 - 40 * localProgress,
            opacity: localProgress,
          })
        }
      } else {
        if (titleRef.value) {
          gsap.set(titleRef.value, { y: 80, opacity: 0 })
        }
        if (ctaRef.value) {
          gsap.set(ctaRef.value, { y: 40, opacity: 0 })
        }
      }
    },
  })

  setupTextAnimations()
}

const setupFallbackScrollTrigger = () => {
  if (canvasRef.value) {
    gsap.to(canvasRef.value, {
      scale: 0.6,
      y: '-20vh',
      scrollTrigger: {
        trigger: heroRef.value,
        start: 'top top',
        end: '+=150%',
        pin: true,
        scrub: 1,
      },
    })
  }

  setupTextAnimations()
}

const setupTextAnimations = () => {
  if (overlayRef.value) {
    gsap.to(overlayRef.value, {
      opacity: 0.7,
      scrollTrigger: {
        trigger: heroRef.value,
        start: 'top top',
        end: '+=100%',
        scrub: 1,
      },
    })
  }
}

onMounted(() => {
  setupWebPScrub()
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  frames.forEach((frame) => frame.close?.())
  frames = []
})
</script>

<template>
  <div class="hero-page">
    <section ref="heroRef" class="hero">
      <canvas ref="canvasRef" class="hero__canvas"></canvas>

      <h2 class="hero__brand">Library</h2>

      <div ref="overlayRef" class="hero__overlay"></div>

      <span
        v-for="(genre, index) in genres"
        :key="genre"
        :ref="
          (el) => {
            if (el) genreRefs[index] = el as HTMLElement
          }
        "
        class="hero__genre"
        :style="getGenreStyle(index)"
      >
        {{ genre }}
      </span>

      <div class="hero__content">
        <h1 ref="titleRef" class="hero__title">
          Discover Your Next
          <span class="hero__title-accent">Story</span>
        </h1>

        <button ref="ctaRef" class="hero__cta" @click="scrollToAuth">Inizia Ora</button>
      </div>

      <div class="hero__scroll-indicator">
        <span>Scroll</span>
      </div>
    </section>

    <!-- Auth Section -->
    <section ref="authSectionRef" class="auth-section">
      <div class="auth-section__bg">
        <img :src="bgImage" alt="" class="auth-section__bg-img" />
      </div>

      <div class="auth-section__container">
        <div class="auth-tabs">
          <button
            v-for="t in tabs"
            :key="t.alias"
            :class="['auth-tabs__btn', { 'auth-tabs__btn--active': activeTab.alias === t.alias }]"
            @click="activeTab = t"
          >
            {{ t.label }}
          </button>
        </div>

        <div class="auth-section__card">
          <component :is="activeTab.component" />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
/* Page */
.hero-page {
  min-height: 300vh;
  background: var(--color-bg);
}

/* Hero Section */
.hero {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: var(--color-bg);

  &__canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }

  &__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(13, 12, 11, 0.2) 0%, rgba(13, 12, 11, 0.8) 100%);
    opacity: 0;
    pointer-events: none;
    z-index: 2;
  }

  &__brand {
    position: absolute;
    top: 2rem;
    left: 2rem;
    z-index: 100;
    font-family: var(--font-display);
    font-size: clamp(2rem, 7vw, 5rem);
    font-weight: 500;
    color: var(--color-text);
    letter-spacing: 0.1em;
  }

  &__content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    width: 90%;
    max-width: 800px;
    text-align: center;
  }

  &__title {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 8vw, 5rem);
    line-height: 1.1;
    letter-spacing: -0.02em;
    color: var(--color-text);
    margin-bottom: 1rem;
  }

  &__title-accent {
    display: block;
    font-style: italic;
    color: var(--color-accent);
  }

  &__genre {
    position: absolute;
    z-index: 50;
    font-family: var(--font-display);
    font-size: clamp(1.2rem, 3vw, 2rem);
    letter-spacing: 0.15em;
    color: var(--color-text);
    opacity: 0;
    pointer-events: none;
  }

  &__cta {
    padding: 1rem 3rem;
    font-size: 1.125rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: var(--color-accent);
    background: var(--color-text);
    border: none;
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.3s var(--ease-smooth);

    &:hover {
      background: var(--color-text);
      transform: scale(1.05);
    }
  }

  &__scroll-indicator {
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    z-index: 10;
    font-family: var(--font-display);
    font-size: 1.5rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--color-text);
  }
}

/* Auth Section */
.auth-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  overflow: hidden;
  background: var(--color-bg-warm);

  &__bg {
    position: absolute;
    inset: 0;
    z-index: 1;
  }

  &__bg-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.4;
  }

  &__container {
    position: relative;
    z-index: 10;
    width: 100%;
    max-width: 440px;
  }

  &__card {
    background: rgba(26, 23, 20, 0.85);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(245, 240, 232, 0.1);
    border-radius: 1.5rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }
}

.auth-tabs {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;

  &__btn {
    padding: 0.75rem 2rem;
    font-family: var(--font-body);
    font-size: 1rem;
    font-weight: 500;
    color: var(--color-text);
    background: transparent;
    border: none;
    border-radius: 9999px;
    cursor: pointer;
    transition: all 0.3s var(--ease-smooth);

    &:hover {
      color: var(--color-text);
    }

    &--active {
      color: #000;
      background: var(--color-text);

      &:hover {
        background: var(--color-accent);
      }
    }
  }
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    &__brand {
      top: 1rem;
      left: 1rem;
    }

    &__scroll-indicator {
      bottom: 1.5rem;
      right: 1.5rem;
    }
  }
}
</style>
