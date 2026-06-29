const opportunities = [
  {
    title: "Digital Workplace Essentials",
    provider: "TRAIN TO WORK + verified training",
    category: "training",
    deadline: "Open monthly",
    deadlineKey: "open",
    level: "Beginner",
    levelKey: "beginner",
    format: "Online",
    formatKey: "online",
    keywords: "digital microsoft office communication graduate training",
    description: "Short course for spreadsheet, presentation, email, and workplace communication skills."
  },
  {
    title: "Junior Admin Assistant Pathway",
    provider: "Partner employer listing",
    category: "job",
    deadline: "Apply by 20 July",
    deadlineKey: "urgent",
    level: "Entry level",
    levelKey: "entry",
    format: "On-site",
    formatKey: "in-person",
    keywords: "admin assistant entry job office communication",
    description: "Entry-level role with clear requirements, interview tips, and document checklist."
  },
  {
    title: "Resume Review Clinic",
    provider: "Volunteer career mentors",
    category: "support",
    deadline: "Every Friday",
    deadlineKey: "open",
    level: "All levels",
    levelKey: "all-levels",
    format: "Online appointment",
    formatKey: "online",
    keywords: "resume cv graduate career support",
    description: "Book a 20-minute review and receive practical feedback before applying."
  },
  {
    title: "Customer Service Interview Lab",
    provider: "TRAIN TO WORK + practice room",
    category: "support",
    deadline: "Open weekly",
    deadlineKey: "open",
    level: "Beginner",
    levelKey: "beginner",
    format: "Hybrid",
    formatKey: "hybrid",
    keywords: "interview customer service communication practice",
    description: "Mock interview prompts and coaching for common service-sector questions."
  },
  {
    title: "Data Entry and Reporting Starter",
    provider: "Skills partner programme",
    category: "training",
    deadline: "Next cohort: August",
    deadlineKey: "urgent",
    level: "Beginner",
    levelKey: "beginner",
    format: "Online",
    formatKey: "online",
    keywords: "data entry reporting spreadsheet training",
    description: "Learn clean data entry, basic reporting, and accuracy checks for office jobs."
  },
  {
    title: "Retail Trainee Associate",
    provider: "Partner employer listing",
    category: "job",
    deadline: "Rolling intake",
    deadlineKey: "open",
    level: "No experience required",
    levelKey: "entry",
    format: "In person",
    formatKey: "in-person",
    keywords: "retail trainee job customer service youth",
    description: "Trainee role with skills checklist, salary transparency reminder, and interview preparation."
  }
];

const grid = document.querySelector("#opportunity-grid");
const search = document.querySelector("#search");
const filters = document.querySelectorAll(".filter");
const levelFilter = document.querySelector("#level-filter");
const formatFilter = document.querySelector("#format-filter");
const deadlineFilter = document.querySelector("#deadline-filter");
const readinessForm = document.querySelector("#readiness-form");
const recommendation = document.querySelector("#recommendation");
const applicationForm = document.querySelector("#application-form");
const formStatus = document.querySelector("#form-status");
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector("#site-nav");
const savedCount = document.querySelector("#saved-count");
const savedList = document.querySelector("#saved-list");
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const chatWindow = document.querySelector("#chat-window");
const chatSuggestions = document.querySelector(".chat-suggestions");

let activeFilter = "all";
const savedItems = new Map();

function getFilteredOpportunities() {
  const term = search.value.trim().toLowerCase();
  const level = levelFilter.value;
  const format = formatFilter.value;
  const deadline = deadlineFilter.value;

  return opportunities.filter((item) => {
    const haystack = `${item.title} ${item.provider} ${item.keywords} ${item.description}`.toLowerCase();
    const matchesCategory = activeFilter === "all" || item.category === activeFilter;
    const matchesTerm = haystack.includes(term);
    const matchesLevel = level === "all" || item.levelKey === level;
    const matchesFormat = format === "all" || item.formatKey === format;
    const matchesDeadline = deadline === "all" || item.deadlineKey === deadline;
    return matchesCategory && matchesTerm && matchesLevel && matchesFormat && matchesDeadline;
  });
}

function renderOpportunities() {
  const filtered = getFilteredOpportunities();

  grid.innerHTML = filtered.map((item) => {
    const index = opportunities.indexOf(item);
    const isSaved = savedItems.has(index);
    return `
      <article class="opportunity-card">
        <div class="card-top">
          <span class="tag">${item.category}</span>
          <span class="deadline">${item.deadline}</span>
        </div>
        <div>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
        <ul class="card-meta">
          <li>${item.provider}</li>
          <li>${item.level}</li>
          <li>${item.format}</li>
        </ul>
        <button class="save-button ${isSaved ? "saved" : ""}" type="button" data-index="${index}">
          ${isSaved ? "Saved" : "Save opportunity"}
        </button>
      </article>
    `;
  }).join("");

  if (!filtered.length) {
    grid.innerHTML = `<p>No matching opportunities found. Try a different keyword, category, level, format, or deadline.</p>`;
  }
}

function renderSavedList() {
  const items = Array.from(savedItems.values());
  savedCount.textContent = `${items.length} saved`;
  if (!items.length) {
    savedList.innerHTML = `<li>No saved opportunities yet. Use the Save button on any card.</li>`;
    return;
  }

  savedList.innerHTML = items.map((item) => `
    <li>
      <strong>${item.title}</strong>
      <span>${item.category} | ${item.level} | ${item.format}</span>
    </li>
  `).join("");
}

function setRecommendation(need, background) {
  const profiles = {
    student: "start with skill-building and collect certificates before internship applications",
    graduate: "focus on entry-level vacancies, resume review, and interview practice",
    "career-switcher": "choose short training linked to a realistic target role"
  };
  const actions = {
    training: "Recommended pathway: complete one verified short course, save two related job cards, then request resume feedback.",
    job: "Recommended pathway: compare entry-level job requirements, prepare a document checklist, then submit targeted applications.",
    resume: "Recommended pathway: book the resume review clinic and update your profile before applying.",
    interview: "Recommended pathway: join the interview lab and practise answers using the job card requirements."
  };
  recommendation.textContent = `${actions[need]} For your background, ${profiles[background]}.`;
}

function chatbotReply(message) {
  const text = message.toLowerCase();
  if (text.includes("resume") || text.includes("cv")) {
    return "For resume help, save the Resume Review Clinic and prepare your education, skills, projects, and work experience in one page.";
  }
  if (text.includes("interview")) {
    return "For interview preparation, choose the Interview Lab and practise examples using the STAR method: situation, task, action, result.";
  }
  if (text.includes("job") || text.includes("vacancy")) {
    return "For job search, filter by Jobs and Entry level, then compare requirements before applying.";
  }
  if (text.includes("training") || text.includes("skill")) {
    return "For training, start with Digital Workplace Essentials or Data Entry and Reporting Starter to build employability skills.";
  }
  return "Try asking about resume, interview, job, or training. I will suggest the best next step.";
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    renderOpportunities();
  });
});

[search, levelFilter, formatFilter, deadlineFilter].forEach((control) => {
  control.addEventListener("input", renderOpportunities);
  control.addEventListener("change", renderOpportunities);
});

grid.addEventListener("click", (event) => {
  const button = event.target.closest(".save-button");
  if (!button) return;

  const index = Number(button.dataset.index);
  if (savedItems.has(index)) {
    savedItems.delete(index);
  } else {
    savedItems.set(index, opportunities[index]);
  }

  renderSavedList();
  renderOpportunities();
});

readinessForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const need = document.querySelector("#need").value;
  const background = document.querySelector("#background").value;
  activeFilter = need === "job" ? "job" : need === "training" ? "training" : "support";
  filters.forEach((item) => item.classList.toggle("active", item.dataset.filter === activeFilter));
  levelFilter.value = "all";
  formatFilter.value = "all";
  deadlineFilter.value = "all";
  setRecommendation(need, background);
  renderOpportunities();
  document.querySelector("#opportunities").scrollIntoView({ behavior: "smooth", block: "start" });
});

applicationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(applicationForm);
  const name = data.get("name").trim() || "Applicant";
  const interest = data.get("interest");
  formStatus.textContent = `Thank you, ${name}. Your request for ${interest.toLowerCase()} has been recorded for this prototype demo.`;
  applicationForm.reset();
});

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;

  const reply = chatbotReply(message);
  chatWindow.insertAdjacentHTML("beforeend", `
    <p><strong>You:</strong> ${escapeHtml(message)}</p>
    <p><strong>Assistant:</strong> ${reply}</p>
  `);
  chatInput.value = "";
  chatWindow.scrollTop = chatWindow.scrollHeight;
});

chatSuggestions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-chat-prompt]");
  if (!button) return;
  chatInput.value = button.dataset.chatPrompt;
  chatForm.requestSubmit();
});

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

renderOpportunities();
renderSavedList();
