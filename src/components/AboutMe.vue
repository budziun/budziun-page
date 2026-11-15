<template>
  <section id="about" class="section about-section">
    <h2 class="section-title" ref="sectionTitle">{{ $t('about.title') }}</h2>
    <p class="about-subtitle fade-in" ref="aboutSubtitle">{{ $t('about.subtitle') }}</p>
    <div class="about-content">
      <div class="about-text">
        <p ref="aboutText1" class="fade-in">
          {{ $t('about.paragraph1') }}
        </p>
        <p ref="aboutText2" class="fade-in">
          {{ $t('about.paragraph2') }}
        </p>
        <p ref="aboutText3" class="fade-in">
          {{ $t('about.paragraph3') }}
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutMe',
  mounted() {
    this.setupIntersectionObserver();
  },
  methods: {
    setupIntersectionObserver() {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, options);

      const elements = [
        this.$refs.sectionTitle,
        this.$refs.aboutSubtitle,
        this.$refs.aboutText1,
        this.$refs.aboutText2,
        this.$refs.aboutText3
      ];

      elements.forEach((el, index) => {
        if (el) {
          el.style.transitionDelay = `${index * 0.12}s`;
          observer.observe(el);
        }
      });
    }
  }
}
</script>

<style scoped>
.about-section {
  background-color: var(--bg-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.about-subtitle {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 2rem;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--secondary-color);
  line-height: 1.5;
}

.about-content {
  display: flex;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.about-text {
  width: 100%;
  max-width: 100%;
  word-break: break-word;
}

.about-text p {
  margin-bottom: 1.5rem;
  line-height: 1.8;
  font-size: 1.08rem;
  color: var(--text-color);
}

.about-text p:last-child {
  margin-bottom: 0;
}

.fade-in {
  opacity: 0;
  transform: translateY(25px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .about-subtitle {
    font-size: 0.98rem;
    margin-bottom: 1.5rem;
  }

  .about-text p {
    font-size: 1rem;
    margin-bottom: 1.2rem;
  }
}
</style>
