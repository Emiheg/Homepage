const drawer = document.querySelector(".music-drawer");
const drawerToggle = document.querySelector(".drawer-toggle");
const musicTab = document.getElementsByClassName("music-tab");
const audioPlayer = document.querySelector("#audio-player");
const currentTrackTitle = document.querySelector("#current-track-title");
const currentTrackDescription = document.querySelector("#current-track-description");
const trackButtons = document.querySelectorAll(".track-button");
const themeSwitch = document.querySelector(".theme-switch");
const themeLabel = document.querySelector(".theme-label");

const applyTheme = (theme) => {
  const isLight = theme === "light";

  document.body.dataset.theme = isLight ? "light" : "dark";
  themeSwitch.setAttribute("aria-checked", String(!isLight));
  themeSwitch.setAttribute("aria-label", isLight ? "Switch to dark theme" : "Switch to light theme");
};

applyTheme(localStorage.getItem("theme") || "dark");

themeSwitch.addEventListener("click", () => {
  const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";

  localStorage.setItem("theme", nextTheme);
  applyTheme(nextTheme);
});

for (const tab of musicTab) {
  tab.addEventListener("click", () => {
    const isOpen = drawer.classList.toggle("is-open");

    drawerToggle.setAttribute("aria-expanded", String(isOpen));
    drawerToggle.setAttribute("aria-label", isOpen ? "Close music player" : "Open music player");
  });
}

trackButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const { title, description, src } = button.dataset;

    trackButtons.forEach((trackButton) => trackButton.classList.remove("is-active"));
    button.classList.add("is-active");

    currentTrackTitle.textContent = title;
    currentTrackDescription.textContent = description;
    audioPlayer.src = src;
    audioPlayer.play().catch(() => {
      audioPlayer.load();
    });
  });
});
