/**
 * Event Shark - Main Application Controller
 */

const { seedEvents, businessVerticals, mockAIBenefits } = window.EventSharkData;
const { scrapeEvent } = window.EventSharkScraper;

// Base system date reference
const SYSTEM_DATE = new Date("2026-07-10T00:00:00");

// App State
const state = {
  events: [...seedEvents],
  verticals: [...businessVerticals],
  activeTab: 'discover',
  filters: {
    search: '',
    dateHorizon: 12, // months
    keynotes: true,
    abstracts: true,
    papers: true
  },
  sponsorship: {
    budgetValue: 15000,
    selectedEventId: 1
  },
  aiPlanner: {
    selectedVerticalId: 'ai-ml',
    selectedEventId: 1,
    isGenerating: false
  },
  settings: {
    apiKey: localStorage.getItem('gemini_api_key') || '',
    model: localStorage.getItem('gemini_model') || 'gemini-1.5-flash',
    proxyUrl: localStorage.getItem('scraper_proxy_url') || 'https://api.allorigins.win/raw?url='
  },
  activeScrapeController: null
};

// ================= INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  setupFilters();
  setupScraper();
  setupSponsorshipMatcher();
  setupAIPlanner();
  setupSettings();
  
  // Initial renders
  renderEventsGrid();
  populateDropdowns();
  updateSponsorshipShowcase();
  
  // Set system date text
  document.getElementById('current-system-date').innerText = SYSTEM_DATE.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  
  showToast("Welcome to Event Shark! Database loaded.");
});

// ================= TOAST NOTIFICATION =================
function showToast(message, duration = 3000) {
  const toast = document.getElementById('app-toast');
  const toastMsg = document.getElementById('app-toast-message');
  toastMsg.innerText = message;
  toast.classList.add('active');
  
  setTimeout(() => {
    toast.classList.remove('active');
  }, duration);
}

// ================= NAVIGATION =================
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const tabViews = document.querySelectorAll('.tab-view');
  const pageTitleText = document.getElementById('page-title-text');
  
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const tabName = item.getAttribute('data-tab');
      
      // Update active nav item
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      
      // Update active view
      tabViews.forEach(view => view.classList.remove('active'));
      document.getElementById(`view-${tabName}`).classList.add('active');
      
      state.activeTab = tabName;
      
      // Update header title
      if (tabName === 'discover') {
        pageTitleText.innerText = "Event Discovery Dashboard";
      } else if (tabName === 'sponsorships') {
        pageTitleText.innerText = "Sponsorship Tier Calculator";
        updateSponsorshipShowcase();
      } else if (tabName === 'ai-planner') {
        pageTitleText.innerText = "AI Business Case Planner";
      } else if (tabName === 'settings') {
        pageTitleText.innerText = "App Configuration";
      }
    });
  });
}

// ================= POPULATE DROPDOWNS =================
function populateDropdowns() {
  const sponsorSelect = document.getElementById('select-sponsor-event');
  const aiEventSelect = document.getElementById('select-ai-event');
  
  // Clear options
  sponsorSelect.innerHTML = '';
  aiEventSelect.innerHTML = '';
  
  state.events.forEach(event => {
    const optSponsor = document.createElement('option');
    optSponsor.value = event.id;
    optSponsor.innerText = `${event.name} (${event.location})`;
    sponsorSelect.appendChild(optSponsor);
    
    const optAI = document.createElement('option');
    optAI.value = event.id;
    optAI.innerText = event.name;
    aiEventSelect.appendChild(optAI);
  });
  
  // Match states
  sponsorSelect.value = state.sponsorship.selectedEventId;
  aiEventSelect.value = state.aiPlanner.selectedEventId;
}

// ================= EVENTS FILTER & RENDER =================
function setupFilters() {
  const searchInput = document.getElementById('search-input');
  const dateSlider = document.getElementById('date-slider');
  const dateLabel = document.getElementById('slider-date-label');
  const filterKeynotes = document.getElementById('filter-keynotes');
  const filterAbstracts = document.getElementById('filter-abstracts');
  const filterPapers = document.getElementById('filter-papers');
  
  // Search text input
  searchInput.addEventListener('input', (e) => {
    state.filters.search = e.target.value.toLowerCase();
    renderEventsGrid();
  });
  
  // Date slider input
  dateSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    state.filters.dateHorizon = val;
    dateLabel.innerText = val === 12 ? "12 Months" : `${val} Months`;
    renderEventsGrid();
  });
  
  // Opportunity checkboxes
  const handleCheckboxChange = () => {
    state.filters.keynotes = filterKeynotes.checked;
    state.filters.abstracts = filterAbstracts.checked;
    state.filters.papers = filterPapers.checked;
    renderEventsGrid();
  };
  
  filterKeynotes.addEventListener('change', handleCheckboxChange);
  filterAbstracts.addEventListener('change', handleCheckboxChange);
  filterPapers.addEventListener('change', handleCheckboxChange);
}

function getDaysUntil(dateStr) {
  const target = new Date(dateStr);
  const diffTime = target - SYSTEM_DATE;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return d.toLocaleDateString('en-US', options);
}

function renderEventsGrid() {
  const grid = document.getElementById('events-grid-container');
  const resultsCountText = document.getElementById('results-count-text');
  grid.innerHTML = '';
  
  let matchesCount = 0;
  let totalOppsCount = 0;
  
  state.events.forEach(event => {
    // 1. Search Query filter
    const searchMatch = !state.filters.search || 
      event.name.toLowerCase().includes(state.filters.search) ||
      event.location.toLowerCase().includes(state.filters.search) ||
      event.description.toLowerCase().includes(state.filters.search) ||
      event.verticals.some(v => v.includes(state.filters.search));
      
    // 2. Date range filter (from 30 days to dateHorizon * 30 days)
    const daysUntil = getDaysUntil(event.date);
    const dateMatch = daysUntil >= 30 && daysUntil <= (state.filters.dateHorizon * 30);
    
    // 3. Opportunities filter
    // Check if the event has at least one of the active checked opportunity categories
    let hasMatchingOpp = false;
    if (state.filters.keynotes && event.opportunities.keynote) hasMatchingOpp = true;
    if (state.filters.abstracts && event.opportunities.abstract) hasMatchingOpp = true;
    if (state.filters.papers && event.opportunities.paper) hasMatchingOpp = true;
    
    // If no checkboxes checked, we show none
    if (!state.filters.keynotes && !state.filters.abstracts && !state.filters.papers) {
      hasMatchingOpp = false;
    }
    
    if (searchMatch && dateMatch && hasMatchingOpp) {
      matchesCount++;
      
      // Render card
      const card = document.createElement('div');
      card.className = 'glass-card event-card';
      
      // Opportunities HTML list
      let oppsListHtml = '';
      if (state.filters.keynotes && event.opportunities.keynote) {
        oppsListHtml += `
          <div class="opp-item">
            <div class="opp-info">
              <span class="opp-name">${event.opportunities.keynote.title}</span>
              <span class="opp-deadline">Deadline: <span>${formatDate(event.opportunities.keynote.deadline)}</span></span>
            </div>
            <span class="opp-type-badge badge-keynote">Keynote</span>
          </div>
        `;
        totalOppsCount++;
      }
      if (state.filters.abstracts && event.opportunities.abstract) {
        oppsListHtml += `
          <div class="opp-item">
            <div class="opp-info">
              <span class="opp-name">${event.opportunities.abstract.title}</span>
              <span class="opp-deadline">Deadline: <span>${formatDate(event.opportunities.abstract.deadline)}</span></span>
            </div>
            <span class="opp-type-badge badge-abstract">Abstract</span>
          </div>
        `;
        totalOppsCount++;
      }
      if (state.filters.papers && event.opportunities.paper) {
        oppsListHtml += `
          <div class="opp-item">
            <div class="opp-info">
              <span class="opp-name">${event.opportunities.paper.title}</span>
              <span class="opp-deadline">Deadline: <span>${formatDate(event.opportunities.paper.deadline)}</span></span>
            </div>
            <span class="opp-type-badge badge-paper">Paper</span>
          </div>
        `;
        totalOppsCount++;
      }
      
      card.innerHTML = `
        <div class="event-card-header">
          <div class="event-brand">
            <div class="event-logo-badge">${event.logoText || event.name.substring(0,2).toUpperCase()}</div>
            <div>
              <h3 class="event-title">${event.name}</h3>
              <span class="event-meta">
                <i class="fa-solid fa-calendar"></i> ${formatDate(event.date)} (in ${daysUntil} days)
              </span>
              <span class="event-meta" style="margin-top: 0.1rem;">
                <i class="fa-solid fa-map-location-dot"></i> ${event.location}
              </span>
            </div>
          </div>
        </div>
        
        <div class="event-card-body">
          <p class="event-description">${event.description}</p>
          <div class="opportunities-list">
            ${oppsListHtml}
          </div>
        </div>
        
        <div class="event-card-footer">
          <button class="btn-card-action btn-learn-more" data-event-id="${event.id}">
            <i class="fa-solid fa-circle-info"></i> Details & Contacts
          </button>
          <a class="btn-card-action" href="${event.website}" target="_blank" style="text-decoration:none;">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Visit Site
          </a>
        </div>
      `;
      
      grid.appendChild(card);
    }
  });
  
  resultsCountText.innerText = `Showing ${matchesCount} matches`;
  document.getElementById('stats-total-events').innerText = state.events.length;
  document.getElementById('stats-total-opps').innerText = totalOppsCount || (state.events.length * 3);
  
  // Re-bind click event on "Learn More" buttons
  document.querySelectorAll('.btn-learn-more').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const eventId = parseInt(btn.getAttribute('data-event-id'));
      openDetailModal(eventId);
    });
  });
}

// ================= MODAL OPPORTUNITY DETAILS =================
function openDetailModal(eventId) {
  const event = state.events.find(e => e.id === eventId);
  if (!event) return;
  
  const modal = document.getElementById('event-detail-modal');
  
  // Set headers
  document.getElementById('modal-event-logo').innerText = event.logoText || event.name.substring(0,2).toUpperCase();
  document.getElementById('modal-event-name').innerText = event.name;
  document.getElementById('modal-event-meta-text').innerHTML = `
    <i class="fa-solid fa-calendar"></i> ${formatDate(event.date)} (${getDaysUntil(event.date)} days away) | 
    <i class="fa-solid fa-map-location-dot"></i> ${event.location}
  `;
  document.getElementById('modal-event-desc').innerText = event.description;
  
  // Populate opportunities
  const oppsContainer = document.getElementById('modal-opps-container');
  oppsContainer.innerHTML = '';
  
  for (const [key, opp] of Object.entries(event.opportunities)) {
    const oppCard = document.createElement('div');
    oppCard.className = 'modal-opp-card';
    
    let badgeClass = 'badge-keynote';
    let typeName = 'Keynote Slot';
    if (key === 'abstract') { badgeClass = 'badge-abstract'; typeName = 'Call for Abstract'; }
    if (key === 'paper') { badgeClass = 'badge-paper'; typeName = 'Research Paper'; }
    
    oppCard.innerHTML = `
      <div class="modal-opp-header">
        <span class="modal-opp-title">${opp.title}</span>
        <span class="opp-type-badge ${badgeClass}">${typeName}</span>
      </div>
      <p class="modal-opp-desc">${opp.description}</p>
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <span class="opp-deadline" style="font-size:0.75rem;">Deadline: <span style="font-weight:700; color:var(--accent-red);">${formatDate(opp.deadline)}</span></span>
        <a class="btn-modal-link" href="${opp.link}" target="_blank">
          Apply Slot <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>
    `;
    oppsContainer.appendChild(oppCard);
  }
  
  // Populate contacts
  renderModalContacts(event);
  
  // Populate links
  const linksContainer = document.getElementById('modal-links-container');
  linksContainer.innerHTML = `
    <a class="external-link-item" href="${event.website}" target="_blank">
      <i class="fa-solid fa-globe"></i> Main Event Website
    </a>
  `;
  
  // Add direct link options for cfp if present
  for (const [key, opp] of Object.entries(event.opportunities)) {
    linksContainer.innerHTML += `
      <a class="external-link-item" href="${opp.link}" target="_blank">
        <i class="fa-solid fa-arrow-right-to-bracket"></i> CFP Portal (${key.toUpperCase()})
      </a>
    `;
  }
  
  // Set scrape trigger button target event
  const scrapeBtnModal = document.getElementById('btn-rescraped-modal');
  scrapeBtnModal.onclick = () => {
    closeDetailModal();
    runScraperProcess(event.website, event.id);
  };
  
  modal.classList.add('active');
}

function renderModalContacts(event) {
  const contactsContainer = document.getElementById('modal-contacts-container');
  contactsContainer.innerHTML = '';
  
  if (event.organizers && event.organizers.length > 0) {
    event.organizers.forEach(org => {
      const cCard = document.createElement('div');
      cCard.className = 'contact-card';
      cCard.innerHTML = `
        <div class="contact-name">${org.name}</div>
        <div class="contact-role">${org.role}</div>
        <div class="contact-links">
          <a class="contact-link" href="mailto:${org.email}" title="Email contact">
            <i class="fa-solid fa-envelope"></i> ${org.email}
          </a>
          ${org.linkedin ? `
            <a class="contact-link" href="${org.linkedin}" target="_blank" title="LinkedIn profile">
              <i class="fa-brands fa-linkedin"></i> Profile
            </a>
          ` : ''}
        </div>
      `;
      contactsContainer.appendChild(cCard);
    });
  } else {
    contactsContainer.innerHTML = `<p style="font-size:0.8rem; color:var(--text-muted);">No organizers cached. Click "Re-Scrape Site" below to scan.</p>`;
  }
}

function closeDetailModal() {
  document.getElementById('event-detail-modal').classList.remove('active');
}

document.getElementById('btn-close-detail-modal').addEventListener('click', closeDetailModal);

// ================= WEB SCRAPER INTERFACE =================
function setupScraper() {
  const btnRunScraper = document.getElementById('btn-run-scraper');
  const btnCloseTerminal = document.getElementById('btn-close-terminal');
  const btnAbortScrape = document.getElementById('btn-abort-scrape');
  
  btnRunScraper.addEventListener('click', () => {
    const urlInput = document.getElementById('scrape-url-input');
    const url = urlInput.value.trim();
    if (!url) {
      showToast("Please enter a valid Event URL.");
      return;
    }
    runScraperProcess(url);
  });
  
  btnCloseTerminal.addEventListener('click', () => {
    document.getElementById('scraper-terminal-modal').classList.remove('active');
  });
  
  btnAbortScrape.addEventListener('click', () => {
    if (state.activeScrapeController) {
      state.activeScrapeController.abort();
      addTerminalLog("Scraping task aborted by user.", "error");
      setTerminalStatus("ABORTED", "failed");
    }
  });
}

function setTerminalStatus(text, className) {
  const statusEl = document.getElementById('terminal-status-val');
  statusEl.className = `status-val ${className}`;
  statusEl.innerText = text;
}

function addTerminalLog(message, type = 'system') {
  const consoleEl = document.getElementById('terminal-log-content');
  const line = document.createElement('div');
  line.className = `terminal-log-line ${type}`;
  
  const timestamp = new Date().toLocaleTimeString();
  line.innerText = `[${timestamp}] ${message}`;
  
  consoleEl.appendChild(line);
  consoleEl.scrollTop = consoleEl.scrollHeight;
}

async function runScraperProcess(url, existingEventId = null) {
  const modal = document.getElementById('scraper-terminal-modal');
  const consoleEl = document.getElementById('terminal-log-content');
  consoleEl.innerHTML = '';
  
  modal.classList.add('active');
  setTerminalStatus("SCRAPING...", "running");
  
  const logFn = (msg) => {
    let type = 'system';
    if (msg.includes('Successfully') || msg.includes('finished')) type = 'success';
    if (msg.includes('ERROR') || msg.includes('failed')) type = 'error';
    if (msg.includes('Fetching') || msg.includes('Connecting')) type = 'progress';
    if (msg.includes('Found') || msg.includes('Extracted')) type = 'info';
    addTerminalLog(msg, type);
  };
  
  const abortController = new AbortController();
  state.activeScrapeController = abortController;
  
  try {
    // Run client side crawler
    const result = await scrapeEvent(url, logFn);
    
    if (result.success) {
      setTerminalStatus("SUCCESS", "done");
      
      if (existingEventId) {
        // Update details of an existing seed event
        const event = state.events.find(e => e.id === existingEventId);
        if (event) {
          event.organizers = result.organizers;
          logFn(`Merged ${result.organizers.length} organizer contacts back into existing database entry: "${event.name}"`);
        }
      } else {
        // Create a completely new event entry in state (Discover new events!)
        const newEventId = state.events.length + 1;
        const host = new URL(url.startsWith('http') ? url : 'https://' + url).hostname;
        
        const newEvent = {
          id: newEventId,
          name: result.title !== "Scraped Event Portal" ? result.title : `Event at ${host}`,
          logoText: host.substring(0, 3).toUpperCase(),
          date: getDateOffset(90 + Math.floor(Math.random() * 90)), // dynamic range 3-6 months out
          location: "Location Identified Online",
          website: url,
          verticals: ["saas"], // default vertical
          description: `Automatically compiled event from site crawl. Identified contacts and portals are mapped.`,
          opportunities: {
            keynote: result.links.speakers[0] ? {
              title: result.links.speakers[0].text,
              deadline: getDateOffset(45),
              description: "Extracted registration/CFP details from web scan.",
              link: result.links.speakers[0].url
            } : {
              title: "General speakership slot",
              deadline: getDateOffset(45),
              description: "Contact the event board directly to secure slots.",
              link: url
            }
          },
          organizers: result.organizers,
          sponsorships: [
            { tier: "Gold", cost: 15000, inclusions: ["Standard logo listing", "Exhibition table", "2 attendee passes"] },
            { tier: "Silver", cost: 7500, inclusions: ["Logo listing on footer", "1 attendee pass"] }
          ]
        };
        
        // Add additional opportunities found
        if (result.links.speakers[1]) {
          newEvent.opportunities.abstract = {
            title: result.links.speakers[1].text,
            deadline: getDateOffset(50),
            description: "Identified abstract submission portal.",
            link: result.links.speakers[1].url
          };
        }
        
        state.events.push(newEvent);
        populateDropdowns();
        renderEventsGrid();
        logFn(`Added new event "${newEvent.name}" to global list index!`);
      }
      
      showToast("Web scraper job completed successfully!");
    } else {
      setTerminalStatus("FAILED", "failed");
      logFn(`Scraper reported failure: ${result.error || 'Unknown error'}`);
    }
  } catch (err) {
    setTerminalStatus("FAILED", "failed");
    logFn(`Runtime execution error: ${err.message}`, "error");
  } finally {
    state.activeScrapeController = null;
  }
}

// ================= SPONSORSHIP MATCHER =================
function setupSponsorshipMatcher() {
  const budgetInput = document.getElementById('input-budget');
  const eventSelect = document.getElementById('select-sponsor-event');
  const shortcutButtons = document.querySelectorAll('.budget-shortcut-btn');
  
  budgetInput.addEventListener('input', (e) => {
    state.sponsorship.budgetValue = parseFloat(e.target.value) || 0;
    updateSponsorshipShowcase();
  });
  
  eventSelect.addEventListener('change', (e) => {
    state.sponsorship.selectedEventId = parseInt(e.target.value);
    updateSponsorshipShowcase();
  });
  
  shortcutButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = parseInt(btn.getAttribute('data-value'));
      budgetInput.value = val;
      state.sponsorship.budgetValue = val;
      updateSponsorshipShowcase();
    });
  });
}

function updateSponsorshipShowcase() {
  const eventId = state.sponsorship.selectedEventId;
  const budget = state.sponsorship.budgetValue;
  const event = state.events.find(e => e.id === eventId);
  
  if (!event) return;
  
  // Set selected event badge
  document.getElementById('event-selected-badge').innerText = event.name;
  
  const container = document.getElementById('packages-comparison-container');
  container.innerHTML = '';
  
  // Analyze match
  // Tiers are sorted highest first. Find the best affordable package (closest to budget but less than or equal)
  let bestMatchPackage = null;
  const sortedSponsorships = [...event.sponsorships].sort((a,b) => b.cost - a.cost);
  
  // Find highest cost package that is <= budget
  for (const pkg of sortedSponsorships) {
    if (pkg.cost <= budget) {
      bestMatchPackage = pkg;
      break;
    }
  }
  
  // Render cards
  event.sponsorships.forEach(pkg => {
    const isAffordable = pkg.cost <= budget;
    const isRecommended = bestMatchPackage && bestMatchPackage.tier === pkg.tier;
    
    const card = document.createElement('div');
    
    let cardClass = 'package-card';
    if (isRecommended) cardClass += ' recommended';
    if (!isAffordable) cardClass += ' locked';
    
    card.className = cardClass;
    
    let ribbonHtml = '';
    if (isRecommended) {
      ribbonHtml = `<div class="package-ribbon">Best Match</div>`;
    }
    
    let inclusionsHtml = '';
    pkg.inclusions.forEach(inc => {
      inclusionsHtml += `<li>${inc}</li>`;
    });
    
    card.innerHTML = `
      ${ribbonHtml}
      <h4 class="package-tier-name">${pkg.tier}</h4>
      <div class="package-cost">$${pkg.cost.toLocaleString()} <span>total</span></div>
      <ul class="package-inclusions-list">
        ${inclusionsHtml}
      </ul>
      <div style="margin-top:auto; padding-top:1.5rem; text-align:center;">
        ${!isAffordable ? `
          <span style="font-size:0.75rem; font-weight:700; color:var(--accent-red);"><i class="fa-solid fa-lock"></i> Exceeds Budget</span>
        ` : `
          <span style="font-size:0.75rem; font-weight:700; color:var(--accent-green);"><i class="fa-solid fa-circle-check"></i> Within Budget</span>
        `}
      </div>
    `;
    
    container.appendChild(card);
  });
  
  // Update ROI Box Text
  const roiBox = document.getElementById('roi-box');
  const roiText = document.getElementById('roi-recommendation-text');
  
  if (bestMatchPackage) {
    roiBox.classList.remove('no-match');
    roiText.innerHTML = `
      Based on your budget of <strong>$${budget.toLocaleString()}</strong>, we recommend the <strong>${bestMatchPackage.tier} Tier ($${bestMatchPackage.cost.toLocaleString()})</strong>.
      <br><br>
      <strong>Key Inclusion:</strong> ${bestMatchPackage.inclusions[0] || 'Official brand placement'}.
      <br><br>
      This leaves <strong>$${(budget - bestMatchPackage.cost).toLocaleString()}</strong> in your budget for marketing collaterals or travel accommodations.
    `;
  } else {
    roiBox.classList.add('no-match');
    
    // Find cheapest package cost
    const cheapest = sortedSponsorships[sortedSponsorships.length - 1];
    
    roiText.innerHTML = `
      <span style="font-weight:700;">No package matches your budget.</span>
      <br><br>
      The lowest entry package is <strong>${cheapest.tier} ($${cheapest.cost.toLocaleString()})</strong>, which exceeds your input budget by <strong>$${(cheapest.cost - budget).toLocaleString()}</strong>.
      <br><br>
      Consider increasing your budget or reviewing other events in the list.
    `;
  }
}

// ================= AI BUSINESS PLANNER =================
function setupAIPlanner() {
  const container = document.getElementById('verticals-options-container');
  container.innerHTML = '';
  
  // Render Business Vertical Selector
  state.verticals.forEach((v, index) => {
    const label = document.createElement('label');
    label.className = 'vertical-radio-label';
    label.innerHTML = `
      <input type="radio" name="vertical-selection" value="${v.id}" ${v.id === state.aiPlanner.selectedVerticalId ? 'checked' : ''}>
      <div class="vertical-radio-card">
        <span class="vertical-radio-name">${v.name}</span>
        <span class="vertical-radio-desc">${v.description}</span>
      </div>
    `;
    container.appendChild(label);
  });
  
  // Watch radio clicks
  container.addEventListener('change', (e) => {
    state.aiPlanner.selectedVerticalId = e.target.value;
  });
  
  document.getElementById('select-ai-event').addEventListener('change', (e) => {
    state.aiPlanner.selectedEventId = parseInt(e.target.value);
  });
  
  document.getElementById('btn-generate-ai').addEventListener('click', runAIGeneration);
}

async function runAIGeneration() {
  if (state.aiPlanner.isGenerating) return;
  state.aiPlanner.isGenerating = true;
  
  const vertical = state.verticals.find(v => v.id === state.aiPlanner.selectedVerticalId);
  const event = state.events.find(e => e.id === state.aiPlanner.selectedEventId);
  
  if (!vertical || !event) {
    state.aiPlanner.isGenerating = false;
    return;
  }
  
  const outputBox = document.getElementById('ai-output-box');
  const modelTag = document.getElementById('ai-model-tag-text');
  
  // Set loader state
  outputBox.innerHTML = `
    <div class="ai-placeholder">
      <i class="fa-solid fa-spinner fa-spin ai-icon" style="color:var(--text-accent);"></i>
      <p>Analyzing demographics, extracting market verticals, and structuring value propositions...</p>
    </div>
  `;
  
  // Check if API Key is set
  const apiKey = state.settings.apiKey.trim();
  
  if (apiKey) {
    // RUN REAL GEMINI API CALL!
    modelTag.innerText = `Gemini (${state.settings.model})`;
    try {
      const generatedData = await callRealGeminiAPI(apiKey, state.settings.model, vertical, event);
      renderAIOutput(generatedData);
    } catch (err) {
      showToast("Gemini API call failed, running heuristic model fallback.", 4000);
      modelTag.innerText = "Local Heuristic (API Fallback)";
      runHeuristicFallback(vertical, event);
    }
  } else {
    // RUN PRECOMPILED / HEURISTIC FALLBACK
    modelTag.innerText = "Local Smart Heuristic Model";
    setTimeout(() => {
      runHeuristicFallback(vertical, event);
    }, 1200); // slight delay to feel like processing
  }
}

function runHeuristicFallback(vertical, event) {
  // Check if we have preseeded mock benefits
  let targetData = null;
  const eventKey = event.logoText ? event.logoText.toLowerCase() : '';
  
  if (mockAIBenefits[vertical.id] && mockAIBenefits[vertical.id][eventKey]) {
    targetData = mockAIBenefits[vertical.id][eventKey];
  } else {
    // Dynamic fallback generation if no match found
    const pitch = `Integrating your ${vertical.name} solutions with ${event.name} will provide your business with direct exposure to top-tier enterprise decision makers. By delivering speakerships or presenting abstracts, you'll address high-intent technical leads looking for tools that maximize ROI, cut server latency, and secure transactional pipelines. Networking sessions provide an excellent bridge to lock in initial discovery calls and partnership channels.`;
    
    const metrics = [
      { label: "Target Buyer Density", value: "35% of Attendees" },
      { label: "Est. CAC Impact", value: "-15% Acquisition Cost" },
      { label: "Primary Objective", value: "B2B Brand Authority" }
    ];
    
    targetData = { pitch, metrics };
  }
  
  renderAIOutput(targetData);
}

function renderAIOutput(data) {
  const outputBox = document.getElementById('ai-output-box');
  
  outputBox.innerHTML = `
    <div class="ai-response-body">
      <div class="ai-pitch-text" id="ai-pitch-typer"></div>
      
      <h4 style="font-family:var(--font-display); font-weight:700; color:var(--text-accent); font-size:1rem; margin-top:0.5rem;">Target Engagement Metrics</h4>
      <div class="ai-metrics-grid" id="ai-metrics-container">
        <!-- Rendered after typing finishes -->
      </div>
    </div>
  `;
  
  // Animate text typing
  const text = data.pitch;
  const typer = document.getElementById('ai-pitch-typer');
  let charIndex = 0;
  
  function typeWriter() {
    if (charIndex < text.length) {
      typer.innerHTML += text.charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 12);
    } else {
      // Type finished, show metrics
      const metricsContainer = document.getElementById('ai-metrics-container');
      data.metrics.forEach(m => {
        const mCard = document.createElement('div');
        mCard.className = 'ai-metric-card';
        mCard.style.opacity = '0';
        mCard.style.transform = 'translateY(10px)';
        mCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        mCard.innerHTML = `
          <div class="ai-metric-val">${m.value}</div>
          <div class="ai-metric-lbl">${m.label}</div>
        `;
        
        metricsContainer.appendChild(mCard);
        
        // slight stagger
        setTimeout(() => {
          mCard.style.opacity = '1';
          mCard.style.transform = 'translateY(0)';
        }, 100);
      });
      
      state.aiPlanner.isGenerating = false;
    }
  }
  
  typeWriter();
}

// ================= REAL GEMINI API INTEGRATION =================
async function callRealGeminiAPI(apiKey, model, vertical, event) {
  // Use direct HTTP POST request to Google Generative Language API
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  
  const systemInstruction = "You are Event Shark AI, a business strategy assistant analyzing event participations. You must return a valid, parsable JSON block matching the schema requested. Do not include markdown code ticks (e.g. ```json) around the JSON, just return raw JSON.";
  
  const userPrompt = `
  Analyze the business value of participating in the event: "${event.name}"
  Event Description: "${event.description}"
  Event Location & Date: ${event.location} on ${event.date}
  
  Analyze it for a business categorized as: "${vertical.name}"
  Vertical Details: "${vertical.description}"
  
  Write a professional benefit assessment. Focus on the benefits of securing keynotes, abstracts, papers, or sponsorships.
  
  You MUST return your answer strictly as a JSON object with this exact structure:
  {
    "pitch": "A 3-4 sentence detailed strategic write-up of specific, concrete benefits for this business type at this event.",
    "metrics": [
      { "label": "Label for metric 1 (e.g., 'CTO Density' or 'Avg Deal Size')", "value": "Value for metric 1 (e.g., '1,200+' or '$65,000')" },
      { "label": "Label for metric 2", "value": "Value for metric 2" },
      { "label": "Label for metric 3", "value": "Value for metric 3" }
    ]
  }
  `;
  
  const payload = {
    contents: [
      {
        parts: [
          { text: userPrompt }
        ]
      }
    ],
    generationConfig: {
      responseMimeType: "application/json"
    }
  };
  
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error ? errorData.error.message : `HTTP status ${response.status}`);
  }
  
  const responseData = await response.json();
  const textResponse = responseData.candidates[0].content.parts[0].text;
  
  // Parse and return JSON
  return JSON.parse(textResponse.trim());
}

// ================= SETTINGS PANEL =================
function setupSettings() {
  const keyInput = document.getElementById('settings-api-key');
  const modelSelect = document.getElementById('settings-gemini-model');
  const proxyInput = document.getElementById('settings-proxy-url');
  
  const btnToggleKey = document.getElementById('btn-toggle-key-visibility');
  const btnSaveSettings = document.getElementById('btn-save-settings');
  const btnResetSettings = document.getElementById('btn-reset-settings');
  
  // Set current inputs
  keyInput.value = state.settings.apiKey;
  modelSelect.value = state.settings.model;
  proxyInput.value = state.settings.proxyUrl;
  
  btnToggleKey.addEventListener('click', () => {
    const icon = btnToggleKey.querySelector('i');
    if (keyInput.type === 'password') {
      keyInput.type = 'text';
      icon.className = 'fa-solid fa-eye-slash';
    } else {
      keyInput.type = 'password';
      icon.className = 'fa-solid fa-eye';
    }
  });
  
  btnSaveSettings.addEventListener('click', () => {
    const key = keyInput.value.trim();
    const model = modelSelect.value;
    const proxy = proxyInput.value.trim();
    
    localStorage.setItem('gemini_api_key', key);
    localStorage.setItem('gemini_model', model);
    localStorage.setItem('scraper_proxy_url', proxy);
    
    state.settings.apiKey = key;
    state.settings.model = model;
    state.settings.proxyUrl = proxy;
    
    showToast("Settings saved successfully!");
  });
  
  btnResetSettings.addEventListener('click', () => {
    localStorage.removeItem('gemini_api_key');
    localStorage.removeItem('gemini_model');
    localStorage.removeItem('scraper_proxy_url');
    
    keyInput.value = '';
    modelSelect.value = 'gemini-1.5-flash';
    proxyInput.value = 'https://api.allorigins.win/raw?url=';
    
    state.settings.apiKey = '';
    state.settings.model = 'gemini-1.5-flash';
    state.settings.proxyUrl = 'https://api.allorigins.win/raw?url=';
    
    showToast("Settings reset to defaults.");
  });
}
