<template>
  <section id="hero" class="hero-section">
    <div class="hero-content">
      <div class="hero-image-container" ref="heroTilt">
        <div class="hero-image" ref="heroImage">
          <img src="../assets/pp_me.png" alt="Jakub Budzich" fetchpriority="high" decoding="async" />
        </div>
      </div>
      <div class="hero-text">
        <h1>
          <span
            v-for="(word, wordIndex) in nameWords"
            :key="wordIndex"
            class="word-group"
          >
            <span
              v-for="item in word"
              :key="item.index"
              class="animated-text"
              :style="{ animationDelay: `${item.index * 0.06}s` }"
            >{{ item.char }}</span>
          </span>
        </h1>
        <h2 class="job-title">
          {{ $t('hero.jobTitle') }}
        </h2>
        <p class="hero-description">
          {{ $t('hero.description') }}
        </p>
        <div class="hero-cta">
          <a href="#projects" @click.prevent="scrollToSection('projects')" class="btn btn-primary">
            {{ $t('hero.viewProjects') }}
          </a>
          <a href="#contact" @click.prevent="scrollToSection('contact')" class="btn btn-secondary">
            {{ $t('hero.contactBtn') }}
          </a>
        </div>
      </div>
    </div>
    <div class="scroll-indicator" @click="scrollToSection('about')">
      <span>{{ $t('hero.scrollDown') }}</span>
      <div class="scroll-arrow">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Hero_component',
  data() {
    return {
      hasFinePointer: false
    }
  },
  computed: {
    nameWords() {
      const fullText = this.$t('hero.name') || '';
      let globalIndex = 0;
      return fullText.split(' ').map(word => {
        const chars = word.split('').map(char => ({
          char,
          index: globalIndex++
        }));
        globalIndex++;
        return chars;
      });
    }
  },
  mounted() {
    this.initParallaxEffect();
  },
  beforeUnmount() {
    if (this.hasFinePointer) {
      window.removeEventListener('mousemove', this.handleMouseMove);
    }
  },
  methods: {
    initParallaxEffect() {
      if (window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        this.hasFinePointer = true;
        window.addEventListener('mousemove', this.handleMouseMove, { passive: true });
      }
    },
    handleMouseMove(e) {
      if (this.$refs.heroTilt && window.scrollY < window.innerHeight) {
        const xAxis = (window.innerWidth / 2 - e.clientX) / 35;
        const yAxis = (window.innerHeight / 2 - e.clientY) / 35;
        this.$refs.heroTilt.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
      }
    },
    scrollToSection(section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }
}
</script>

<style scoped>
.hero-section {
  min-height: 100vh;
  padding: 6.5rem 0 5.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
}

.hero-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  width: 100%;
  position: relative;
  z-index: 2;
}

.hero-image-container {
  perspective: 1000px;
  width: 38%;
  min-width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.25s ease-out;
  transform-style: preserve-3d;
}

.hero-image {
  width: 290px;
  height: 290px;
  max-width: 75vw;
  max-height: 75vw;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  animation: floatImage 6s ease-in-out infinite;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 30% 80%;
  display: block;
}

.hero-text {
  width: 62%;
  color: white;
  text-align: left;
  padding-left: 3rem;
  min-width: 0;
}

h1 {
  font-size: clamp(2rem, 4vw, 3.4rem);
  margin-bottom: 0.85rem;
  font-weight: 700;
  display: flex;
  flex-wrap: wrap;
  gap: 0.15rem 0.85rem;
  line-height: 1.15;
}

.word-group {
  display: inline-flex;
  white-space: nowrap;
}

.animated-text {
  display: inline-block;
  opacity: 0;
  animation: fadeInLetter 0.45s forwards;
}

.job-title {
  font-size: clamp(1.15rem, 2.2vw, 1.65rem);
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 1.25rem;
  color: rgba(255, 255, 255, 0.92);
  opacity: 0;
  animation: fadeIn 0.8s forwards 0.6s;
}

.hero-description {
  font-size: clamp(0.98rem, 1.4vw, 1.15rem);
  line-height: 1.65;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.88);
  opacity: 0;
  animation: fadeIn 0.8s forwards 0.9s;
  max-width: 640px;
}

.hero-cta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  opacity: 0;
  animation: fadeIn 0.8s forwards 1.2s;
}

.btn {
  padding: 0.85rem 1.75rem;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition);
  text-align: center;
}

.btn-primary {
  background-color: white;
  color: var(--primary-color);
}

.btn-primary:hover {
  background-color: var(--accent-color);
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background-color: transparent;
  color: white;
  border: 2px solid white;
}

.btn-secondary:hover {
  background-color: white;
  color: var(--primary-color);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.scroll-indicator {
  position: absolute;
  left: 50%;
  bottom: 1.5rem;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  cursor: pointer;
}

.scroll-indicator span {
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: white;
}

.scroll-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.scroll-arrow span {
  display: block;
  width: 10px;
  height: 10px;
  border-bottom: 2px solid white;
  border-right: 2px solid white;
  transform: rotate(45deg);
  margin: -2px;
  animation: scrollArrow 2s infinite;
}

.scroll-arrow span:nth-child(2) {
  animation-delay: 0.2s;
}

.scroll-arrow span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes floatImage {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-16px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes fadeInLetter {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scrollArrow {
  0% {
    opacity: 0;
    transform: rotate(45deg) translate(-15px, -15px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(45deg) translate(15px, 15px);
  }
}

/* --- RESPONSYWNOŚĆ --- */
@media (max-width: 992px) {
  .hero-section {
    padding: 6rem 0 5rem;
  }

  .hero-content {
    flex-direction: column;
    text-align: center;
  }

  .hero-image-container,
  .hero-text {
    width: 100%;
    min-width: 0;
  }

  .hero-text {
    padding-left: 0;
    margin-top: 1.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    justify-content: center;
    text-align: center;
    gap: 0.1rem 0.65rem;
  }

  .hero-image {
    width: 220px;
    height: 220px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 5.5rem 0 4.5rem;
  }

  .hero-content {
    padding: 0 1.25rem;
  }

  .scroll-indicator {
    bottom: 1rem;
  }

  .job-title {
    text-align: center;
    margin-bottom: 1rem;
  }

  .hero-description {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .hero-cta {
    flex-direction: column;
    gap: 0.85rem;
    width: 100%;
    max-width: 340px;
    align-items: stretch;
  }

  .btn {
    width: 100%;
    padding: 0.8rem 1rem;
    font-size: 0.95rem;
  }

  .hero-image {
    width: 175px;
    height: 175px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 5rem 0 4rem;
  }

  .hero-content {
    padding: 0 1rem;
  }

  .hero-image {
    width: 145px;
    height: 145px;
  }

  h1 {
    font-size: 1.65rem;
    gap: 0.1rem 0.5rem;
  }

  .job-title {
    font-size: 1rem;
    margin-bottom: 0.75rem;
  }

  .hero-description {
    font-size: 0.92rem;
    margin-bottom: 1.25rem;
  }

  .scroll-indicator {
    bottom: 0.6rem;
  }
}

@media (max-height: 620px) {
  .scroll-indicator {
    display: none !important;
  }
}
</style>
