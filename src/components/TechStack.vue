<template>
  <section id="tech" class="section tech-section">
    <h2 class="section-title" ref="sectionTitle">{{ $t('tech.title') }}</h2>
    <p class="tech-description fade-in" ref="techDesc">
      {{ $t('tech.description') }}
      <strong>{{ $t('tech.clickInstruction') }}</strong>
    </p>
    <h3 class="tech-subtitle fade-in" ref="mainTechTitle">{{ $t('tech.mainTechnologies') }}</h3>
    <div class="tech-grid">
      <div
          v-for="(tech, index) in mainTechStack"
          :key="tech.id"
          class="tech-card fade-in"
          :ref="`techCard${index}`"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @click="openTechDetails(tech.id)"
      >
        <div class="tech-icon">
          <img :src="tech.icon" :alt="tech.name" />
        </div>
        <h3>{{ tech.name }}</h3>
      </div>
    </div>
    <h3 class="tech-subtitle fade-in" ref="secondaryTechTitle">{{ $t('tech.otherTechnologies') }}</h3>
    <div class="secondary-tech-grid">
      <div
          v-for="(tech, index) in secondaryTechStack"
          :key="tech.id"
          class="secondary-tech-card fade-in"
          :ref="`secondaryTechCard${index}`"
          :style="{ animationDelay: `${index * 0.1}s` }"
      >
        <div class="tech-icon small">
          <img :src="tech.icon" :alt="tech.name" />
        </div>
        <h4>{{ tech.name }}</h4>
      </div>
    </div>
    <!-- Popup tech details -->
    <div class="tech-details" :class="{ active: activeTech !== null }" ref="techDetails" @click.self="closeTechDetails">
      <div class="tech-details-content" v-if="activeTech !== null">
        <div class="tech-details-header">
          <div class="tech-details-icon">
            <img :src="activeTech.icon" :alt="activeTech.name" />
          </div>
          <h3>{{ activeTech.name }}</h3>
          <button class="close-btn" @click="closeTechDetails">×</button>
        </div>
        <div class="tech-details-body">
          <div class="tech-projects" v-if="activeTech.projects && activeTech.projects.length > 0">
            <h4>{{ $t('tech.projectsUsing') }} {{ activeTech.name }}:</h4>
            <ul>
              <li v-for="project in activeTech.projects" :key="project.id">
                <a :href="project.repo" target="_blank" rel="noopener noreferrer">
                  {{ $t(`tech.technologies.${activeTech.id}.projects.${project.id}.name`) }}
                </a>
                <span> - {{ $t(`tech.technologies.${activeTech.id}.projects.${project.id}.description`) }}</span>
                <div class="project-links">
                  <a :href="project.repo" target="_blank" rel="noopener noreferrer" class="link-btn">
                    {{ $t('tech.repository') }}
                  </a>
                  <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener noreferrer" class="link-btn">
                    {{ $t('tech.demo') }}
                  </a>
                  <a v-if="project.download" :href="project.download" target="_blank" rel="noopener noreferrer" class="link-btn">
                    {{ $t('tech.download') }}
                  </a>
                </div>
              </li>
            </ul>
          </div>
          <div v-else class="no-projects-message">
            <p>{{ $t('tech.noProjects') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'TechStack',
  data() {
    return {
      activeTech: null,
      mainTechStack: [
        {
          id: 'react',
          name: 'React',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
          projects: [
            { id: 'slidefy', repo: 'https://github.com/budziun/Slidefy', demo: '' },
            { id: 'ecg', repo: 'https://github.com/budziun/ecg-project', demo: '' },
            { id: 'dzik', repo: 'https://github.com/budziun/find-dzik', demo: '' }
          ]
        },
        {
          id: 'vue',
          name: 'Vue.js',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg',
          projects: [
            { id: 'portfolio', repo: 'https://github.com/budziun/budziun-page', demo: 'https://budziun.github.io/budziun-page/' },
            { id: 'avgweather', repo: 'https://github.com/budziun/avg-weather', demo: 'https://budziun.github.io/avg-weather/' }
          ]
        },
        {
          id: 'angular',
          name: 'Angular',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg',
          projects: [
            { id: 'qrcode', repo: 'https://github.com/budziun/qr-code-generator', demo: 'https://budziun.github.io/qr-code-generator/' },
            { id: 'zaraz', repo: 'https://github.com/Cent0l/ZarazZrobimy', demo: '' }
          ]
        },
        {
          id: 'python',
          name: 'Python',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
          projects: [
            { id: 'ecg', repo: 'https://github.com/budziun/ecg-project', demo: '' },
            { id: 'dzik', repo: 'https://github.com/budziun/find-dzik', demo: '' },
            { id: 'uchwalomat', repo: 'https://github.com/budziun/Uchwalomat.PDF', download: 'https://github.com/budziun/Uchwalomat.PDF/releases/download/UchwalomatPDF/Uchwalomat-PDF.exe' },
            { id: 'yttomp3', repo: 'https://github.com/budziun/ytToMP3', download: 'https://github.com/budziun/ytToMP3/releases/download/v2.0/ytToMP3_v2.0.tar' }
          ]
        },
        {
          id: 'typescript',
          name: 'TypeScript',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
          projects: [
            { id: 'slidefy', repo: 'https://github.com/budziun/Slidefy', demo: '' },
            { id: 'ecg', repo: 'https://github.com/budziun/ecg-project', demo: '' },
            { id: 'dzik', repo: 'https://github.com/budziun/find-dzik', demo: '' },
            { id: 'zaraz', repo: 'https://github.com/Cent0l/ZarazZrobimy', demo: '' },
            { id: 'qrcode', repo: 'https://github.com/budziun/qr-code-generator', demo: 'https://budziun.github.io/qr-code-generator/' }
          ]
        },
        {
          id: 'javascript',
          name: 'JavaScript',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
          projects: [
            { id: 'quicksearch', repo: 'https://github.com/budziun/Quick_Search', demo: '' },
            { id: 'www', repo: 'https://github.com/budziun/WWW', demo: '' }
          ]
        },
        {
          id: 'php',
          name: 'PHP',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
          projects: [
            { id: 'quiz', repo: 'https://github.com/budziun/quiz-tablice-pl', demo: 'https://quiz-tablice-pl-production.up.railway.app/' }
          ]
        },
        {
          id: 'django',
          name: 'Django',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg',
          projects: [
            { id: 'dzik', repo: 'https://github.com/budziun/find-dzik', demo: '' }
          ]
        }
      ],
      secondaryTechStack: [
        {
          id: 'html',
          name: 'HTML5 + CSS3',
          icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/CSS3_and_HTML5_logos_and_wordmarks.svg/791px-CSS3_and_HTML5_logos_and_wordmarks.svg.png?20150111171555',
          projects: [
            { id: 'www', repo: 'https://github.com/budziun/WWW', demo: '' }
          ]
        },
        {
          id: 'tailwind',
          name: 'Tailwind CSS',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
          projects: [
            { id: 'spotify', repo: '', demo: '' }
          ]
        },
        {
          id: 'bootstrap',
          name: 'Bootstrap',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg',
          projects: [
            { id: 'quiz', repo: 'https://github.com/budziun/quiz-tablice-pl', demo: 'https://quiz-tablice-pl-production.up.railway.app/' }
          ]
        },
        {
          id: 'cicd',
          name: 'CI/CD',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
          projects: [
            { id: 'portfolio', repo: 'https://github.com/budziun/budziun-page', demo: 'https://budziun.github.io/budziun-page/' },
            { id: 'avgweather', repo: 'https://github.com/budziun/avg-weather', demo: 'https://budziun.github.io/avg-weather/' },
            { id: 'qrcode', repo: 'https://github.com/budziun/qr-code-generator', demo: 'https://budziun.github.io/qr-code-generator/' }
          ]
        },
        {
          id: 'nodejs',
          name: 'Node.js',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg'
        },
        {
          id: 'postgresql',
          name: 'PostgreSQL',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg'
        },
        {
          id: 'docker',
          name: 'Docker',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg'
        },
        {
          id: 'postman',
          name: 'Postman',
          icon: 'https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg'
        },
        {
          id: 'mysql',
          name: 'MySQL',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg'
        },
        {
          id: 'git',
          name: 'Git',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg'
        },
        {
          id: 'jest',
          name: 'Jest',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jest/jest-plain.svg'
        },
        {
          id: 'fastapi',
          name: 'FastAPI',
          icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg'
        }
      ]
    }
  },
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
      if (this.$refs.sectionTitle) observer.observe(this.$refs.sectionTitle);
      if (this.$refs.techDesc) observer.observe(this.$refs.techDesc);
      if (this.$refs.mainTechTitle) observer.observe(this.$refs.mainTechTitle);
      if (this.$refs.secondaryTechTitle) observer.observe(this.$refs.secondaryTechTitle);
      this.mainTechStack.forEach((_, index) => {
        const refName = `techCard${index}`;
        if (this.$refs[refName] && this.$refs[refName][0]) {
          observer.observe(this.$refs[refName][0]);
        }
      });
      this.secondaryTechStack.forEach((_, index) => {
        const refName = `secondaryTechCard${index}`;
        if (this.$refs[refName] && this.$refs[refName][0]) {
          observer.observe(this.$refs[refName][0]);
        }
      });
    },
    openTechDetails(techId) {
      const tech = this.mainTechStack.find(t => t.id === techId);
      if (tech) {
        this.activeTech = tech;
        document.body.classList.add('modal-open');
      }
    },
    closeTechDetails() {
      this.activeTech = null;
      document.body.classList.remove('modal-open');
    }
  }
}
</script>
<style scoped>
.tech-section {
  background-color: #f9f9f9;
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 4rem;
}
.tech-description {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 3rem;
  font-size: 1.1rem;
  line-height: 1.6;
}
.tech-subtitle {
  font-size: 1.8rem;
  color: var(--primary-color);
  margin: 2rem 0 1.5rem;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;
}
.tech-subtitle.visible {
  opacity: 1;
  transform: translateY(0);
}
.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
  margin-bottom: 3rem;
}
.secondary-tech-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-top: 1rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  grid-auto-rows: 1fr;
}
.tech-card {
  background-color: var(--card-bg);
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  z-index: 1;
}
.secondary-tech-card {
  background-color: var(--card-bg);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 120px;
  aspect-ratio: 1 / 1;
}
.tech-card::before, .secondary-tech-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.tech-card:hover, .secondary-tech-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0,.15);
}
.tech-card:hover::before {
  opacity: 1;
}
.tech-card:hover h3 {
  color: white;
}
.tech-icon {
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  transition: transform 0.3s ease;
}
.tech-icon.small {
  height: 60px;
  margin-bottom: 0.8rem;
}
.tech-icon img {
  width: 80px;
  height: 80px;
  max-width: 80px;
  max-height: 80px;
  object-fit: contain;
  transition: transform 0.3s ease;
  display: block;
}
.tech-icon.small img {
  width: 50px;
  height: 50px;
  max-width: 50px;
  max-height: 50px;
}
.tech-card:hover .tech-icon img {
  transform: scale(1.1);
}
.tech-card h3 {
  font-size: 1.5rem;
  margin-top: 0.5rem;
  transition: color 0.3s ease;
}
.secondary-tech-card h4 {
  font-size: 1.2rem;
  margin-top: 0.5rem;
  transition: color 0.3s ease;
  word-break: break-word;
  hyphens: auto;
}
/* Tech details popup */
.tech-details {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  cursor: pointer;
}
.tech-details.active {
  opacity: 1;
  visibility: visible;
}
.tech-details-content {
  background-color: var(--card-bg);
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  border-radius: 10px;
  overflow-y: auto;
  padding: 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  position: relative;
  animation: scaleIn 0.3s ease forwards;
  cursor: default;
}
.tech-details-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
}
.tech-details-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}
.tech-details-icon img {
  width: 60px;
  height: 60px;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}
.tech-details-header h3 {
  font-size: 1.8rem;
  color: var(--primary-color);
  flex: 1;
}
.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #999;
  cursor: pointer;
  transition: color 0.3s ease;
}
.close-btn:hover {
  color: var(--primary-color);
}
.tech-details-body p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}
.tech-projects {
  margin-top: 2rem;
}
.tech-projects h4 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}
.tech-projects ul {
  list-style: none;
  padding: 0;
}
.tech-projects li {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  transition: transform 0.3s ease;
}
.tech-projects li:hover {
  transform: translateX(10px);
}
.tech-projects a {
  color: var(--primary-color);
  font-weight: 600;
  text-decoration: none;
}
.tech-projects a:hover {
  text-decoration: underline;
}
.project-links {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
.link-btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: var(--primary-color);
  color: white !important;
  border-radius: 5px;
  text-decoration: none !important;
  transition: background-color 0.3s ease;
}
.link-btn:hover {
  background-color: var(--secondary-color);
}
.no-projects-message {
  padding: 1.5rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  text-align: center;
  font-style: italic;
  color: #666;
}
@keyframes scaleIn {
  0% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
/* Styl dla body, gdy modal jest otwarty (zapobiega przewijaniu) */
:global(.modal-open) {
  overflow: hidden;
}
/* Animacja pojawienia się elementów */
.fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
@media (max-width: 1200px) {
  .secondary-tech-grid {
    grid-template-columns: repeat(3, 1fr);
    max-width: 800px;
  }
}
@media (max-width: 768px) {
  .tech-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
  .tech-card {
    padding: 1rem;
  }
  .secondary-tech-card {
    padding: 0.6rem;
    min-height: 90px;
    aspect-ratio: 1 / 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .tech-icon {
    height: 60px;
  }
  .tech-icon.small {
    height: 35px;
    margin-bottom: 0.4rem;
  }
  .tech-icon img {
    width: 60px;
    height: 60px;
    max-width: 60px;
    max-height: 60px;
  }
  .tech-icon.small img {
    width: 32px;
    height: 32px;
    max-width: 32px;
    max-height: 32px;
  }
  .tech-card h3 {
    font-size: 1.2rem;
  }
  .secondary-tech-card h4 {
    font-size: 0.85rem;
    line-height: 1.2;
    margin-top: 0.3rem;
    overflow-wrap: break-word;
  }
  .secondary-tech-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.8rem;
    justify-items: center;
    grid-auto-rows: 1fr;
  }
  .secondary-tech-grid > .secondary-tech-card:last-child:nth-child(odd) {
    grid-column: 1 / -1;
    justify-self: center;
    max-width: 120px;
  }
  .tech-details-content {
    width: 98vw;
    max-width: 98vw;
    min-width: 0;
    padding: 1rem;
    font-size: 1rem;
  }
  .tech-details-header h3 {
    font-size: 1.2rem;
    word-break: break-word;
  }
  .tech-details-body p,
  .tech-projects h4 {
    font-size: 1rem;
    word-break: break-word;
  }
  .tech-projects li {
    padding: 0.7rem;
    font-size: 0.95rem;
  }
  .project-links {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
  .link-btn {
    width: 100%;
    box-sizing: border-box;
    text-align: center;
    padding: 0.6rem 0.5rem;
    font-size: 0.97rem;
  }
}
@media (max-width: 350px) {
  .secondary-tech-card h4 {
    font-size: 0.75rem;
  }
  .secondary-tech-card {
    padding: 0.4rem;
  }
  .tech-icon.small {
    height: 30px;
  }
  .tech-icon.small img {
    width: 28px;
    height: 28px;
    max-width: 28px;
    max-height: 28px;
  }
}
</style>