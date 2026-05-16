const drawer = document.querySelector(".music-drawer");
const drawerToggle = document.querySelector(".drawer-toggle");
const audioPlayer = document.querySelector("#audio-player");
const currentTrackTitle = document.querySelector("#current-track-title");
const currentTrackDescription = document.querySelector("#current-track-description");
const trackButtons = document.querySelectorAll(".track-button");

drawerToggle.addEventListener("click", () => {
  const isOpen = drawer.classList.toggle("is-open");

  drawerToggle.setAttribute("aria-expanded", String(isOpen));
  drawerToggle.setAttribute("aria-label", isOpen ? "Close music player" : "Open music player");
});

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