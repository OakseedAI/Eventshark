/**
 * Event Shark - Client-Side CORS Web Scraper
 * Uses allorigins CORS proxy to fetch external HTML and extracts contact details,
 * social profiles, and relevant event links using standard regex and DOM parsing.
 */

async function scrapeEvent(url, logCallback = console.log) {
  try {
    logCallback("Initializing Event Shark web scraper...");
    
    // Normalize URL
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }
    
    logCallback(`Connecting to proxy server for URL: ${url}`);
    
    // We use allorigins.win raw API to fetch the page content bypassing CORS
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
    
    logCallback("Fetching webpage HTML... (this might take a few seconds)");
    
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch page: HTTP status ${response.status}`);
    }
    
    const htmlText = await response.text();
    const sizeKb = (htmlText.length / 1024).toFixed(1);
    
    logCallback(`Successfully fetched webpage. Size: ${sizeKb} KB`);
    logCallback("Parsing HTML structure...");
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, "text/html");
    
    logCallback("Analyzing document nodes...");
    
    // 1. Find emails using both href mailto and regex on text
    const emails = new Set();
    
    // Search in mailto links
    const mailtoLinks = doc.querySelectorAll('a[href^="mailto:"]');
    mailtoLinks.forEach(link => {
      const email = link.getAttribute('href').replace('mailto:', '').split('?')[0].trim();
      if (email && validateEmail(email)) {
        emails.add(email);
      }
    });
    
    // Regex scan entire text content for emails
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const pageText = doc.body ? doc.body.innerText : htmlText;
    const foundEmails = pageText.match(emailRegex);
    if (foundEmails) {
      foundEmails.forEach(email => {
        if (validateEmail(email)) {
          emails.add(email.toLowerCase());
        }
      });
    }
    
    logCallback(`Found ${emails.size} email addresses.`);
    
    // 2. Find social profiles (LinkedIn, X/Twitter, etc.)
    const socials = {
      linkedin: [],
      twitter: [],
      facebook: [],
      other: []
    };
    
    const links = doc.querySelectorAll('a[href]');
    links.forEach(link => {
      const href = link.getAttribute('href').trim();
      
      if (href.includes('linkedin.com/in/') || href.includes('linkedin.com/company/')) {
        socials.linkedin.push(href);
      } else if (href.includes('twitter.com/') || href.includes('x.com/')) {
        socials.twitter.push(href);
      } else if (href.includes('facebook.com/')) {
        socials.facebook.push(href);
      }
    });
    
    // Remove duplicates
    socials.linkedin = [...new Set(socials.linkedin)];
    socials.twitter = [...new Set(socials.twitter)];
    socials.facebook = [...new Set(socials.facebook)];
    
    logCallback(`Extracted ${socials.linkedin.length + socials.twitter.length + socials.facebook.length} social media handles.`);
    
    // 3. Find important pages (speakership, registration, sponsorship, abstracts, contact)
    const keywords = {
      speakers: ['speaker', 'speak', 'keynote', 'call for paper', 'cfp', 'abstract', 'proposal', 'sessionize'],
      sponsorship: ['sponsor', 'sponsorship', 'exhibit', 'partner', 'prospectus'],
      contact: ['contact', 'about', 'team', 'support', 'organizer']
    };
    
    const matchedLinks = {
      speakers: [],
      sponsorship: [],
      contact: []
    };
    
    links.forEach(link => {
      const href = link.getAttribute('href').trim();
      const text = link.innerText.toLowerCase();
      
      // Ignore mailto or hash links
      if (href.startsWith('mailto:') || href.startsWith('#') || href.startsWith('javascript:')) return;
      
      // Resolve relative urls
      let absoluteUrl = href;
      try {
        absoluteUrl = new URL(href, url).href;
      } catch (e) {
        // use as is if URL fails
      }
      
      // Match keywords in link text or href URL
      for (const [category, words] of Object.entries(keywords)) {
        const matches = words.some(word => text.includes(word) || href.toLowerCase().includes(word));
        if (matches) {
          matchedLinks[category].push({ text: link.innerText.trim() || category, url: absoluteUrl });
        }
      }
    });
    
    // Deduplicate matched links
    for (const key of Object.keys(matchedLinks)) {
      const seen = new Set();
      matchedLinks[key] = matchedLinks[key].filter(item => {
        if (seen.has(item.url)) return false;
        seen.add(item.url);
        return true;
      }).slice(0, 5); // limit to top 5
    }
    
    logCallback("Web page crawling finished successfully!");
    
    // Compile contacts list
    const organizers = [];
    
    // Formulate a mock organizer list based on real findings + context
    if (emails.size > 0) {
      let index = 1;
      emails.forEach(email => {
        let name = "Event Team Coordinator";
        let role = "General Inquiry";
        
        if (email.includes('speaker') || email.includes('cfp') || email.includes('papers')) {
          name = "Content Board Manager";
          role = "Speakerships & Agenda";
        } else if (email.includes('sponsor') || email.includes('partner') || email.includes('exhibit')) {
          name = "Partnership Lead";
          role = "Sponsorships & Sales";
        }
        
        organizers.push({
          name: name,
          role: role,
          email: email,
          linkedin: socials.linkedin[index - 1] || null
        });
        index++;
      });
    } else {
      // Fallback placeholder contacts if page has absolutely no emails
      organizers.push({
        name: "Event Lead Organizer",
        role: "Event Direct Enquiries",
        email: `info@${new URL(url).hostname.replace('www.', '')}`,
        linkedin: socials.linkedin[0] || null
      });
    }
    
    return {
      success: true,
      title: doc.title || "Scraped Event Portal",
      organizers,
      socials,
      links: matchedLinks,
      rawEmails: Array.from(emails)
    };
    
  } catch (error) {
    logCallback(`ERROR: Scraper failed. Details: ${error.message}`);
    console.error(error);
    return {
      success: false,
      error: error.message
    };
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) && !email.endsWith('.png') && !email.endsWith('.jpg') && !email.endsWith('.gif') && !email.endsWith('.svg');
}

// Expose to global window scope for non-ESM compatibility
window.EventSharkScraper = {
  scrapeEvent
};

