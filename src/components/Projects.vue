<template>
  <section id="projects" class="section projects-section">
    <h2 class="section-title" ref="sectionTitle">{{ $t('projects.title') }}</h2>
    <p class="projects-description fade-in" ref="projectsDesc">
      {{ $t('projects.description') }}
    </p>

    <div class="project-filters">
      <button
          v-for="filter in filters"
          :key="filter.id"
          class="filter-btn fade-in"
          :class="{ active: activeFilter === filter.id }"
          @click="filterProjects(filter.id)"
          :ref="`filterBtn${filter.id}`"
      >
        {{ $t(`projects.filters.${filter.id}`) }}
      </button>
    </div>

    <div :class="gridClass">
      <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="project-card fade-in"
          :ref="`projectCard${project.id}`"
      >
        <div class="project-image">
          <img :src="project.image" :alt="$t(`projects.projectList.${project.id}.title`)" />
          <div class="project-overlay">
            <div class="project-tags">
              <span v-for="tag in project.tags" :key="tag" class="project-tag">{{ $t(`projects.filters.${tag}`) }}</span>
            </div>
            <div class="project-links">
              <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener noreferrer" class="project-link">
                <i class="github-icon"></i> {{ $t('projects.links.github') }}
              </a>
              <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener noreferrer" class="project-link">
                <i class="demo-icon"></i> {{ $t('projects.links.demo') }}
              </a>
              <a v-if="project.download" :href="project.download" target="_blank" rel="noopener noreferrer" class="project-link">
                <i class="download-icon"></i> {{ $t('projects.links.download') }}
              </a>
            </div>
          </div>
        </div>
        <div class="project-info">
          <h3>{{ $t(`projects.projectList.${project.id}.title`) }}</h3>
          <p>{{ $t(`projects.projectList.${project.id}.description`) }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Projects_component',
  data() {
    return {
      activeFilter: 'all',
      filters: [
        { id: 'all' },
        { id: 'frontend' },
        { id: 'react' },
        { id: 'vuejs' },
        { id: 'angular' },
        { id: 'backend' },
        { id: 'python' },
        { id: 'php' },
        { id: 'ML' }
      ],
      projects: [
        {
          id: 'ecg',
          image: require('@/assets/images/ecg.gif'),
          tags: ['python', 'backend','frontend','react','ML','fastapi'],
          repo: 'https://github.com/budziun/ecg-project'
        },
        {
          id: 'dzik',
          image: require('@/assets/images/dzik.gif'),
          tags: ['python', 'django', 'backend', 'frontend','react'],
          repo: 'https://github.com/budziun/dzik-map'
        },
        {
          id: 'slidefy',
          image: require('@/assets/images/swipe.gif'),
          tags: ['react', 'frontend', 'backend'],
          repo: 'https://github.com/budziun/slidefy'
        },
        {
          id: 'qrcode',
          image: require('@/assets/images/qr.gif'),
          tags: ['angular', 'frontend'],
          repo: 'https://github.com/budziun/qr-code-generator',
          demo: 'https://budziun.github.io/qr-code-generator/'
        },
        {
          id: 'avgweather',
          image: require('@/assets/images/avg.gif'),
          tags: ['vuejs', 'frontend'],
          repo: 'https://github.com/budziun/avg-weather',
          demo: 'https://budziun.github.io/avg-weather/'
        },
        {
          id: 'quiz',
          image: require('@/assets/images/tablice.gif'),
          tags: ['php', 'backend', 'frontend', 'javascript'],
          repo: 'https://github.com/budziun/quiz-tablice-pl'
        },
        {
          id: 'zaraz',
          image: require('@/assets/images/zz.png'),
          tags: ['frontend', 'angular'],
          repo: 'https://github.com/Cent0l/ZarazZrobimy'
        },
        {
          id: 'yttomp3',
          image: require('@/assets/images/mp3_2.png'),
          tags: ['backend', 'python'],
          repo: 'https://github.com/budziun/ytToMp3',
          download: 'https://github.com/budziun/ytToMP3/releases/download/v2.0/ytToMP3_v2.0.tar'
        },
        {
          id: 'portfolio',
          image: require('@/assets/images/cv_page.png'),
          tags: ['vuejs', 'frontend'],
          repo: 'https://github.com/budziun/budziun-page',
          demo: 'https://budziun.github.io/budziun-page/'
        },
        {
          id: 'uchwalomat',
          image: require('@/assets/images/uchwal.png'),
          tags: ['python', 'backend'],
          repo: 'https://github.com/budziun/Uchwalomat.PDF',
          download: 'https://github.com/budziun/Uchwalomat.PDF/releases/download/UchwalomatPDF/Uchwalomat-PDF.exe'
        },
        {
          id: 'quicksearch',
          image: require('@/assets/images/qs.png'),
          tags: ['javascript', 'backend'],
          repo: 'https://github.com/budziun/Quick_Search'
        }
      ]
    }
  },
  computed: {
    filteredProjects() {
      if (this.activeFilter === 'all') {
        return this.projects;
      } else {
        return this.projects.filter(project =>
            project.tags.includes(this.activeFilter)
        );
      }
    },
    gridClass() {
      const count = this.filteredProjects.length;
      return (count % 3 !== 0) ? 'projects-grid centered' : 'projects-grid';
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
    filterProjects(filterId) {
      this.activeFilter = filterId;

      setTimeout(() => {
        this.setupProjectCards();
        this.setupFilterButtons();
      }, 10);
    },

    setupFilterButtons(observer) {
      if (!observer) {
        observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        }, {
          root: null,
          rootMargin: '0px',
          threshold: 0.2
        });
      }

      this.filters.forEach(filter => {
        const refName = `filterBtn${filter.id}`;
        if (this.$refs[refName] && this.$refs[refName][0]) {
          this.$refs[refName][0].classList.add('visible');
        }
      });
    },

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
      if (this.$refs.projectsDesc) observer.observe(this.$refs.projectsDesc);

      this.filters.forEach(filter => {
        const refName = `filterBtn${filter.id}`;
        if (this.$refs[refName] && this.$refs[refName][0]) {
          observer.observe(this.$refs[refName][0]);
        }
      });

      this.setupProjectCards(observer);
    },

    setupProjectCards(observer) {
      if (!observer) {
        observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        }, {
          root: null,
          rootMargin: '0px',
          threshold: 0.2
        });
      }

      this.projects.forEach(project => {
        const refName = `projectCard${project.id}`;
        if (this.$refs[refName] && this.$refs[refName][0]) {
          this.$refs[refName][0].classList.remove('visible');
          observer.observe(this.$refs[refName][0]);
        }
      });
    }
  }
}
</script>

<style scoped>
.projects-section {
  background-color: var(--bg-color);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.projects-description {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
}

.project-filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
}

.filter-btn {
  background: none;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  padding: 0.6rem 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  transition: var(--transition);
}

.filter-btn:hover, .filter-btn.active {
  background-color: var(--primary-color);
  color: white;
}

.projects-grid.centered {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  width: 100%;
}

.projects-grid.centered .project-card {
  width: 350px; /* Taka sama szerokość jak minmax w gridzie */
}

.projects-grid.centered .project-card {
  width: 350px;
}

.project-card {
  background-color: var(--card-bg);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.project-card:hover .project-image img {
  transform: scale(1);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.project-tag {
  background-color: var(--secondary-color);
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 500;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-link {
  display: inline-block;
  background-color: white;
  color: var(--primary-color);
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.project-link:hover {
  background-color: var(--accent-color);
  color: white;
  transform: translateY(-3px);
}

.github-icon, .demo-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-color: currentColor;
  mask-size: cover;
  -webkit-mask-size: cover;
  margin-right: 5px;
  vertical-align: text-top;
}

.github-icon {
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z'/%3E%3C/svg%3E");
}

.demo-icon {
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M14 12l-10 10v-20l10 10zm-4-1.5l4 3.5v-7l-4 3.5z'/%3E%3Cpath d='M20 10.5v3c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-3c0-.276.224-.5.5-.5s.5.224.5.5zm-4 3.5c.276 0 .5.224.5.5v3c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-3c0-.276.224-.5.5-.5z'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M14 12l-10 10v-20l10 10zm-4-1.5l4 3.5v-7l-4 3.5z'/%3E%3Cpath d='M20 10.5v3c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-3c0-.276.224-.5.5-.5s.5.224.5.5zm-4 3.5c.276 0 .5.224.5.5v3c0 .276-.224.5-.5.5s-.5-.224-.5-.5v-3c0-.276.224-.5.5-.5z'/%3E%3C/svg%3E");
}

.download-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-color: currentColor;
  mask-size: cover;
  -webkit-mask-size: cover;
  margin-right: 5px;
  vertical-align: text-top;
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z'/%3E%3C/svg%3E");
}

.project-info {
  padding: 1.5rem;
}

.project-info h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.project-info p {
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  .project-filters {
    margin-bottom: 2rem;
  }

  .filter-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
