<template>
  <section id="hero" class="hero-section">
    <div class="hero-content">
      <div class="hero-image-container">
        <div class="hero-image" ref="heroImage">
          <img src="../assets/pp_me.png" alt="PP" />
        </div>
      </div>
      <div class="hero-text">
        <h1>
          <span class="animated-text" v-for="(letter, index) in nameLetters" :key="index"
                :style="{ animationDelay: `${index * 0.1}s` }">
            {{ letter }}
          </span>
        </h1>
        <h2 class="job-title">
          {{ $t('hero.jobTitle') }}
        </h2>
        <p class="hero-description">
          {{ $t('hero.description') }}
        </p>
        <div class="hero-cta">
          <a href="#" @click.prevent="scrollToSection('projects')" class="btn btn-primary">
            {{ $t('hero.viewProjects') }}
          </a>
          <a href="#" @click.prevent="scrollToSection('contact')" class="btn btn-secondary">
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
      nameLetters: this.$t('hero.name').split('')
    }
  },
  mounted() {
    this.initParallaxEffect();
  },
  watch: {
    // Obserwowanie zmian języka
    '$i18n.locale'() {
      // Aktualizacja nameLetters po zmianie języka
      this.nameLetters = this.$t('hero.name').split('');
      this.$nextTick(() => {
      });
    }
  },
  methods: {
    initParallaxEffect() {
      window.addEventListener('mousemove', this.handleMouseMove);
    },
    handleMouseMove(e) {
      if (this.$refs.heroImage) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        this.$refs.heroImage.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
      }
    },
    scrollToSection(section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    }
  }
}
</script>

<style scoped>
.hero-section {
  min-height: 100vh;
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
  width: 40%;
  min-width: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image {
  width: 300px;
  height: 300px;
  max-width: 80vw;
  max-height: 80vw;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  transform-style: preserve-3d;
  transition: transform 0.5s ease-out;
  animation: floatImage 6s ease-in-out infinite;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 30% 80%;
  display: block;
}
.hero-text {
  width: 60%;
  color: white;
  text-align: left;
  padding-left: 3rem;
  min-width: 0;
  word-break: break-word;
}

h1 {
  font-size: 3.5rem;
  margin-bottom: 1rem;
  font-weight: 700;
  display: flex;
  flex-wrap: wrap;
  line-height: 1.1;
  word-break: break-word;
}

.animated-text {
  display: inline-block;
  opacity: 0;
  animation: fadeInLetter 0.5s forwards;
  margin-right: 0.1rem;
  white-space: pre;
}

.job-title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: rgba(255, 255, 255, 0.9);
  opacity: 0;
  animation: fadeIn 1s forwards 1s;
}

.hero-description {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0;
  animation: fadeIn 1s forwards 1.5s;
  max-width: 600px;
  word-break: break-word;
}

.hero-cta {
  display: flex;
  gap: 1rem;
  opacity: 0;
  animation: fadeIn 1s forwards 2s;
}

.btn {
  padding: 0.8rem 1.5rem;
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
  bottom: 2rem;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
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
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes fadeInLetter {
  0% {
    opacity: 0;
    transform: translateY(50px);
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
    transform: rotate(45deg) translate(-20px, -20px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(45deg) translate(20px, 20px);
  }
}

/* --- RESPONSYWNOŚĆ --- */
@media (max-width: 992px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
    padding-bottom: 80px;
  }

  .hero-image-container, .hero-text {
    width: 100%;
    min-width: 0;
  }

  .hero-text {
    padding-left: 0;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    justify-content: center;
    font-size: 2.5rem;
    text-align: center;
    word-break: break-word;
  }
}

@media (max-width: 768px) {
  .hero-content {
    padding-bottom: 100px;
  }

  .scroll-indicator {
    bottom: 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  .job-title {
    font-size: 1.1rem;
    text-align: center;
    margin-bottom: 1rem;
  }

  .hero-description {
    text-align: center;
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .hero-cta {
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    align-items: center;
  }

  .btn {
    width: 90%;
    padding: 0.8rem 1rem;
    font-size: 0.9rem;
  }

  .hero-image {
    width: 180px;
    height: 180px;
    max-width: 90vw;
    max-height: 90vw;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 1rem 0.2rem;
  }
  .hero-content {
    padding: 0 0.3rem 80px 0.3rem;
  }
  .hero-image {
    width: max;
  }
  h1 {
    font-size: 1.3rem;
    padding: 0;
  }
  .job-title {
    font-size: 0.95rem;
    margin-bottom: 0.7rem;
  }
  .hero-description {
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 0.85rem;
    padding: 0.7rem 0.5rem;
    width: 100%;
  }
  .scroll-indicator {
    bottom: 0.5rem;
  }
}
@media (max-height: 500px) {
  .scroll-indicator {
    display: none !important;
  }
}
</style>
