function navigate(pageId) {
  document.querySelectorAll('.page').forEach((page) => page.classList.remove('active'));
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('data-page') === pageId) {
      link.classList.add('active');
    }
  });
    updateQuickNav(pageId);
}

function getPreferredTheme() {
  const storedMode = localStorage.getItem('portfolio-theme-mode') || 'auto';
  if (storedMode === 'light' || storedMode === 'dark') {
    return storedMode;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function syncThemeButtons(mode) {
  document.querySelectorAll('[data-theme-button]').forEach((button) => {
    button.classList.toggle('active', button.getAttribute('data-theme-button') === mode);
  });
}

function applyTheme(mode) {
  const resolvedMode = mode === 'auto' ? getPreferredTheme() : mode;
  document.documentElement.setAttribute('data-theme', resolvedMode);
  syncThemeButtons(mode);
}

function setThemeMode(mode) {
  localStorage.setItem('portfolio-theme-mode', mode);
  applyTheme(mode);
}

function scrollToAnchor(anchorId) {
  const target = document.getElementById(anchorId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
    document.querySelectorAll('.quick-nav .chip').forEach((chip) => {
      chip.classList.remove('active');
      if (chip.getAttribute('data-anchor') === anchorId) {
        chip.classList.add('active');
      }
    });
}

function updateQuickNav(pageId) {
  document.querySelectorAll('.quick-nav .chip').forEach((chip) => chip.classList.remove('active'));
  const activeChip = document.querySelector(`.quick-nav .chip[data-page="${pageId}"]`);
  if (activeChip) {
    activeChip.classList.add('active');
  }
}

function toggleAcc(element) {
  const header = element.querySelector('.accordion-header');
  const body = element.querySelector('.accordion-body');
  const isOpen = header.classList.contains('open');

  document.querySelectorAll('.accordion-header').forEach((openHeader) => openHeader.classList.remove('open'));
  document.querySelectorAll('.accordion-body').forEach((openBody) => {
    openBody.style.display = 'none';
  });

  if (!isOpen) {
    header.classList.add('open');
    body.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const storedMode = localStorage.getItem('portfolio-theme-mode') || 'auto';
  applyTheme(storedMode);
  navigate('inicio');
  updateQuickNav('inicio');
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', () => {
    if ((localStorage.getItem('portfolio-theme-mode') || 'auto') === 'auto') {
      applyTheme('auto');
    }
  });
});
