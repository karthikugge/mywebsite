// === Wait for DOM to be fully loaded ===
document.addEventListener('DOMContentLoaded', function() {
  
  // === Select elements ===
  const toggleSwitch = document.getElementById('themeToggle');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  // === Dark Mode Toggle ===
  if (toggleSwitch) {
    // Load saved theme OR system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    // Apply theme
    document.documentElement.setAttribute('data-theme', defaultTheme);
    
    // Set toggle switch state
    if (defaultTheme === 'dark') {
      toggleSwitch.classList.add('active');
    } else {
      toggleSwitch.classList.remove('active');
    }
    
    // Toggle theme on click
    toggleSwitch.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent any default behavior
      
      this.classList.toggle('active');
      
      const newTheme = this.classList.contains('active') ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', newTheme);
      
      // Save preference
      try {
        localStorage.setItem('theme', newTheme);
      } catch (error) {
        console.warn('Could not save theme preference:', error);
      }
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        
        if (newTheme === 'dark') {
          toggleSwitch.classList.add('active');
        } else {
          toggleSwitch.classList.remove('active');
        }
      }
    });
  } else {
    console.warn('Theme toggle element not found');
  }

  // === Hamburger Menu ===
  if (hamburger && navLinks) {
    // Toggle menu
    hamburger.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const isActive = this.classList.contains('active');
      
      if (isActive) {
        this.classList.remove('active');
        navLinks.classList.remove('active');
        // Remove ARIA attributes
        this.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('aria-hidden', 'true');
      } else {
        this.classList.add('active');
        navLinks.classList.add('active');
        // Add ARIA attributes for accessibility
        this.setAttribute('aria-expanded', 'true');
        navLinks.setAttribute('aria-hidden', 'false');
      }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('aria-hidden', 'true');
      }
    });

    // Close menu when a navigation link is clicked
    const navLinksElements = navLinks.querySelectorAll('a');
    if (navLinksElements.length > 0) {
      navLinksElements.forEach(link => {
        link.addEventListener('click', function(e) {
          // Small delay to allow navigation to start
          setTimeout(() => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            navLinks.setAttribute('aria-hidden', 'true');
          }, 100);
        });
      });
    }

    // Handle escape key to close menu
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && hamburger.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.setAttribute('aria-hidden', 'true');
      }
    });

    // Initialize ARIA attributes
    hamburger.setAttribute('aria-expanded', 'false');
    navLinks.setAttribute('aria-hidden', 'true');
    
  } else {
    if (!hamburger) console.warn('Hamburger menu element not found');
    if (!navLinks) console.warn('Navigation links element not found');
  }

});

// === Additional utility functions ===

// Function to manually set theme (useful for testing)
function setTheme(theme) {
  if (theme !== 'light' && theme !== 'dark') {
    console.error('Invalid theme. Use "light" or "dark"');
    return;
  }
  
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  const toggleSwitch = document.getElementById('themeToggle');
  if (toggleSwitch) {
    if (theme === 'dark') {
      toggleSwitch.classList.add('active');
    } else {
      toggleSwitch.classList.remove('active');
    }
  }
}

// Function to get current theme
function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light';
}
const panels = document.querySelectorAll('.panel');
panels.forEach((panel) => {
    panel.addEventListener('click', () => {
        removeactiveclasses();
        panel.classList.add('active');
        

    });
});
function removeactiveclasses() {
    panels.forEach((panel) => {
        panel.classList.remove('active');
    });
}
