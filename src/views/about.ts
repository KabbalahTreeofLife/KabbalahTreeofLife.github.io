import '../styles/views/about.css';

export function about(): () => void {
  const app = document.getElementById('app')!;

  const skills = [
    { category: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++'] },
    { category: 'Frontend', items: ['HTML5', 'CSS3', 'React', 'Vue.js', 'Tailwind CSS'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'FastAPI', 'Spring Boot'] },
    { category: 'Tools', items: ['Git', 'Docker', 'Linux', 'VS Code', 'Figma'] },
    { category: 'Databases', items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase'] },
  ];

  const timeline = [
    { year: '2024', title: 'Started SE Journey', desc: 'Began pursuing Bachelor of Science in Software Engineering at Western Visayas College of Science and Technology.' },
    { year: '2025', title: '2nd Year Student', desc: 'Deepening knowledge in data structures, algorithms, and full-stack development. Building portfolio and open-source projects.' },
    { year: '2026', title: 'Currently', desc: 'Architecting digital artifacts and exploring cloud technologies in Iloilo City.' },
  ];

  app.innerHTML = `
    <section class="about-view">
      <span class="section-label">THE ALCHEMIST</span>
      <h2>ABOUT ME</h2>

      <div class="about-grid">
        <div class="about-bio">
          <p>
            I'm a <strong>2nd year Software Engineering student</strong> based in Iloilo City, Philippines.
            I'm passionate about crafting elegant solutions to complex problems and transforming ideas into
            digital reality.
          </p>
          <p>
            When I'm not writing code, I'm exploring new technologies, contributing to open-source projects,
            and refining my craft as a software engineer.
          </p>
          <p class="about-quote">
            "Every line of code is a spell, and every program is an artifact of creation."
          </p>
        </div>

        <div class="about-skills">
          <h3 class="skills-title">TECHNICAL SCROLL</h3>
          <div class="skills-grid">
            ${skills.map(s => `
              <div class="skill-group">
                <h4 class="skill-category">${s.category}</h4>
                <div class="skill-items">
                  ${s.items.map(item => `<span class="skill-tag">${item}</span>`).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="timeline-section">
        <h3 class="skills-title">CHRONOLOGY</h3>
        <div class="timeline">
          ${timeline.map(t => `
            <div class="timeline-item">
              <div class="timeline-year">${t.year}</div>
              <div class="timeline-content">
                <h4>${t.title}</h4>
                <p>${t.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  return () => {};
}
