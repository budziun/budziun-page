<template>
  <section id="about" class="section about-section">
    <h2 class="section-title" ref="sectionTitle">{{ $t('about.title') }}</h2>
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
  watch: {
    '$i18n.locale'() {
      this.$nextTick(() => {
      });
    }
  },
  methods: {
    setupIntersectionObserver() {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
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
        this.$refs.aboutText1,
        this.$refs.aboutText2,
        this.$refs.aboutText3
      ];

      elements.forEach((el, index) => {
        if (el) {
          el.style.transitionDelay = `${index * 0.2}s`;
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
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 2rem;
}

.about-content {
  display: flex;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
}

.about-text {
  width: 100%;
  max-width: 100%;
  word-break: break-word;
}

.about-text p {
  margin-bottom: 1.5rem;
  line-height: 1.8;
  font-size: 1.1rem;
  opacity: 0;
  transform: translateY(20px);
  transition: var(--transition);
}

.about-text p.visible {
  opacity: 1;
  transform: translateY(0);
}

.about-text p:last-child {
  margin-bottom: 0;
}

.fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .about-section {
    padding: 2rem 1rem;
  }

  .about-content {
    flex-direction: column;
    align-items: center;
  }

  .about-text p {
    font-size: 1rem;
    word-break: break-word;
  }
}
@media (max-width: 480px) {
  .section-title {
    font-size: 1.3rem;
    text-align: center;
    word-break: break-word;
  }
  .about-section {
    padding: 1rem 0.5rem;
  }
}
</style>