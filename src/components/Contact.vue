<template>
  <section id="contact" class="section contact-section">
    <h2 class="section-title" ref="sectionTitle">{{ $t('contact.title') }}</h2>
    <div class="contact-content">
      <div class="contact-info fade-in" ref="contactInfo">
        <h3>{{ $t('contact.subtitle') }}</h3>
        <p>{{ $t('contact.description') }}</p>

        <div class="contact-details">
          <div class="contact-item">
            <div class="contact-icon email-icon"></div>
            <div class="contact-text">
              <h4>{{ $t('contact.email') }}</h4>
              <p><a href="mailto:budziunn@gmail.com">budziunn@gmail.com</a></p>
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-icon github-icon"></div>
            <div class="contact-text">
              <h4>{{ $t('contact.github') }}</h4>
              <p><a href="https://github.com/budziun" target="_blank" rel="noopener noreferrer">github.com/budziun</a></p>
            </div>
          </div>

          <div class="contact-item">
            <div class="contact-icon linkedin-icon"></div>
            <div class="contact-text">
              <h4>{{ $t('contact.linkedin') }}</h4>
              <p><a href="https://www.linkedin.com/in/jakub-budzich-3bb447207/" target="_blank" rel="noopener noreferrer">linkedin.com/in/jakub-budzich</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Contact_component',
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

      // Observe section title and other elements
      if (this.$refs.sectionTitle) observer.observe(this.$refs.sectionTitle);
      if (this.$refs.contactInfo) observer.observe(this.$refs.contactInfo);
    }
  }
}
</script>

<style scoped>
.contact-section {
  color: black;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.section-title {
  color: var(--primary-color);
}

.contact-content {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  width: 100%;
  max-width: 800px;
}

.contact-info {
  flex: 1;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 2.5rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
  width: 100%;
}

.contact-info h3 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}

.contact-info h3::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 50px;
  height: 3px;
  background-color: var(--accent-color);
}

.contact-info p {
  margin-bottom: 2rem;
  line-height: 1.6;
  font-size: 1.1rem;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.contact-icon {
  width: 50px;
  height: 50px;
  color: var(--primary-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  mask-size: 25px 25px;
  mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-size: 25px 25px;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  flex-shrink: 0;
}

.email-icon {
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z'/%3E%3C/svg%3E");
  background-color: var(--primary-color);
}

.github-icon {
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/%3E%3C/svg%3E");
  background-color: var(--primary-color);
}

.linkedin-icon {
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'/%3E%3C/svg%3E");
  background-color: var(--primary-color);
}

.contact-text h4 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.contact-text a {
  color: black;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 1.1rem;
}

.contact-text a:hover {
  color: var(--accent-color);
}

/* Dodajemy animację pojawienia się elementów */
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
  .contact-content {
    padding: 0 1rem;
  }

  .contact-info {
    padding: 1.5rem;
  }

  .contact-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
}
</style>
