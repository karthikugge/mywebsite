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

  document.documentElement.setAttribute('data-theme', defaultTheme);
  if (defaultTheme === 'dark') toggleSwitch.classList.add('active');

  // Toggle theme on click
  toggleSwitch.addEventListener('click', function () {
    this.classList.toggle('active');

    const newTheme = this.classList.contains('active') ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);

    // Save preference
    localStorage.setItem('theme', newTheme);
  });
}

// === Hamburger Menu ===
if (hamburger && navLinks) {
  // Toggle menu
  hamburger.addEventListener('click', function () {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}
