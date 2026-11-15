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
          class="filter-btn"
          :class="{ active: activeFilter === filter.id }"
          @click="filterProjects(filter.id)"
      >
        {{ $t(`projects.filters.${filter.id}`) }}
      </button>
    </div>

    <div class="projects-grid">
      <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="project-card fade-in"
          :ref="`projectCard${project.id}`"
      >
        <div class="project-image">
          <video
              v-if="project.video"
              muted
              loop
              playsinline
              preload="none"
              :data-src="project.video"
              class="project-media"
          ></video>

          <img
              v-else
              :src="project.image"
              :alt="$t(`projects.projectList.${project.id}.title`)"
              loading="lazy"
              decoding="async"
              class="project-media"
          />

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

          <!-- Tagi i linki widoczne na urządzeniach dotykowych / mobile -->
          <div class="project-mobile-meta">
            <div class="project-tags mobile-tags">
              <span v-for="tag in project.tags" :key="`m-${tag}`" class="project-tag">{{ $t(`projects.filters.${tag}`) }}</span>
            </div>
            <div class="project-links mobile-links">
              <a v-if="project.repo" :href="project.repo" target="_blank" rel="noopener noreferrer" class="project-link mobile-link">
                <i class="github-icon"></i> {{ $t('projects.links.github') }}
              </a>
              <a v-if="project.demo" :href="project.demo" target="_blank" rel="noopener noreferrer" class="project-link mobile-link">
                <i class="demo-icon"></i> {{ $t('projects.links.demo') }}
              </a>
              <a v-if="project.download" :href="project.download" target="_blank" rel="noopener noreferrer" class="project-link mobile-link">
                <i class="download-icon"></i> {{ $t('projects.links.download') }}
              </a>
            </div>
          </div>
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
      cardObserver: null,
      videoObserver: null,
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
          video: require('@/assets/images/ecg.mp4'),
          tags: ['python', 'backend', 'frontend', 'react', 'ML', 'fastapi'],
          repo: 'https://github.com/budziun/ecg-project'
        },
        {
          id: 'dzik',
          video: require('@/assets/images/dzik.mp4'),
          tags: ['python', 'django', 'backend', 'frontend', 'react'],
          demo: 'https://www.dzikmapa.pl/',
          repo: 'https://github.com/budziun/dzik-map'
        },
        {
          id: 'slidefy',
          video: require('@/assets/images/swipe.mp4'),
          tags: ['react', 'frontend', 'backend'],
          repo: 'https://github.com/budziun/slidefy',
          demo: 'https://slidefy.budziun.pl/'
        },
        {
          id: 'qrcode',
          video: require('@/assets/images/qr.mp4'),
          tags: ['angular', 'frontend'],
          repo: 'https://github.com/budziun/qr-code-generator',
          demo: 'https://budziun.github.io/qr-code-generator/'
        },
        {
          id: 'avgweather',
          video: require('@/assets/images/avg.mp4'),
          tags: ['vuejs', 'frontend'],
          repo: 'https://github.com/budziun/avg-weather',
          demo: 'https://budziun.github.io/avg-weather/'
        },
        {
          id: 'quiz',
          video: require('@/assets/images/tablice.mp4'),
          tags: ['php', 'backend', 'frontend', 'javascript'],
          repo: 'https://github.com/budziun/quiz-tablice-pl',
          demo: 'https://quiz-tablice.budziun.pl/'
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
      }
      return this.projects.filter(project =>
        project.tags.includes(this.activeFilter)
      );
    }
  },
  mounted() {
    this.setupIntersectionObserver();
    this.setupVideoObserver();
  },
  beforeUnmount() {
    if (this.cardObserver) {
      this.cardObserver.disconnect();
    }
    if (this.videoObserver) {
      this.videoObserver.disconnect();
    }
  },
  methods: {
    filterProjects(filterId) {
      this.activeFilter = filterId;
      this.$nextTick(() => {
        this.setupProjectCards();
        this.observeVideos();
      });
    },

    setupIntersectionObserver() {
      this.cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            this.cardObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05 });

      if (this.$refs.sectionTitle) this.cardObserver.observe(this.$refs.sectionTitle);
      if (this.$refs.projectsDesc) this.cardObserver.observe(this.$refs.projectsDesc);

      this.setupProjectCards();
    },

    setupProjectCards() {
      if (!this.cardObserver) return;

      this.filteredProjects.forEach(project => {
        const refName = `projectCard${project.id}`;
        const el = this.$refs[refName] && this.$refs[refName][0];
        if (el) {
          el.classList.remove('visible');
          this.cardObserver.observe(el);
        }
      });
    },

    setupVideoObserver() {
      this.videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const video = entry.target;
          if (entry.isIntersecting) {
            if (!video.src && video.dataset.src) {
              video.src = video.dataset.src;
              video.load();
            }
            const playPromise = video.play();
            if (playPromise && typeof playPromise.catch === 'function') {
              playPromise.catch(() => {});
            }
          } else {
            if (!video.paused) {
              video.pause();
            }
          }
        });
      }, {
        root: null,
        rootMargin: '200px 0px',
        threshold: 0.05
      });

      this.observeVideos();
    },

    observeVideos() {
      if (!this.videoObserver || !this.$el) return;
      const videos = this.$el.querySelectorAll('video.project-media');
      videos.forEach(video => {
        this.videoObserver.observe(video);
      });
    }
  }
}
</script>

<style scoped>
.projects-section {
  background-color: var(--bg-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.projects-description {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 2rem;
  font-size: 1.08rem;
  line-height: 1.6;
}

.project-filters {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
}

.filter-btn {
  background: none;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  padding: 0.55rem 1.35rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  transition: var(--transition);
}

.filter-btn:hover, .filter-btn.active {
  background-color: var(--primary-color);
  color: white;
}

.projects-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  width: 100%;
}

.project-card {
  flex: 0 1 350px;
  width: 100%;
  max-width: 350px;
  background-color: var(--card-bg);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.14);
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  background-color: #1a1a2e;
  flex-shrink: 0;
}

.project-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  display: block;
}

.project-card:hover .project-media {
  transform: scale(1.04);
}

.project-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.85) 100%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.25rem;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 2;
}

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}

.project-tag {
  background-color: var(--secondary-color);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.78rem;
  font-weight: 500;
}

.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.project-link {
  display: inline-flex;
  align-items: center;
  background-color: white;
  color: var(--primary-color);
  padding: 0.45rem 0.95rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.88rem;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
}

.project-link:hover {
  background-color: var(--accent-color);
  color: white;
  transform: translateY(-2px);
}

.github-icon, .demo-icon, .download-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-color: currentColor;
  mask-size: cover;
  -webkit-mask-size: cover;
  margin-right: 6px;
  flex-shrink: 0;
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
  mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z'/%3E%3C/svg%3E");
  -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM17 13l-5 5-5-5h3V9h4v4h3z'/%3E%3C/svg%3E");
}

.project-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.project-info h3 {
  font-size: 1.35rem;
  margin-bottom: 0.75rem;
  color: var(--primary-color);
}

.project-info p {
  color: #555;
  line-height: 1.6;
  font-size: 0.96rem;
}

.project-mobile-meta {
  display: none;
  margin-top: auto;
  padding-top: 1.1rem;
  flex-direction: column;
  gap: 0.85rem;
}

.mobile-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.mobile-link {
  flex: 1 1 110px;
  justify-content: center;
  background-color: var(--primary-color);
  color: white;
  padding: 0.55rem 0.9rem;
  border-radius: 5px;
}

.mobile-link:hover {
  background-color: var(--secondary-color);
  color: white;
  transform: none;
}

@media (hover: none), (max-width: 768px) {
  .project-overlay {
    display: none;
  }

  .project-mobile-meta {
    display: flex;
  }
}

@media (max-width: 768px) {
  .projects-grid {
    gap: 1.5rem;
  }

  .project-card {
    flex: 1 1 300px;
    max-width: 100%;
  }

  .project-filters {
    margin-bottom: 1.75rem;
    gap: 0.5rem;
  }

  .filter-btn {
    padding: 0.45rem 1rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .filter-btn {
    padding: 0.38rem 0.85rem;
    font-size: 0.82rem;
    border-width: 1.5px;
  }
}
</style>
