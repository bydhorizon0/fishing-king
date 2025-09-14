import L, { Control, Map } from "leaflet";

export default class CurrentPositionLoadControl extends Control {
  onAdd(map: Map): HTMLElement {
    const container = L.DomUtil.create("div");
    container.innerHTML = /*html*/ `
      <button type="button"
        class="btn btn-active">
          현재위치
      </button>
    `;

    L.DomEvent.on(container, "click", (e) => {
      L.DomEvent.stopPropagation(e);
      L.DomEvent.preventDefault(e);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const { latitude, longitude } = pos.coords;

          map.flyTo([latitude, longitude], 15, {
            animate: true,
            duration: 1.0,
          });
        });
      }
    });

    return container;
  }
}
