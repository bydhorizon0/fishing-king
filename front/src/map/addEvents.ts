// ESC 키로 모든 팝업 닫기
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" || e.key === "Esc") {
    const closeButtons = document.querySelectorAll<HTMLButtonElement>(
      ".leaflet-popup-close-button"
    );
    closeButtons.forEach((btn) => btn.click());
  }
});
