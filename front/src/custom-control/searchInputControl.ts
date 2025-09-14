import L, { Control } from "leaflet";

export default class SearchInputControl extends Control {
  onAdd(map: L.Map): HTMLElement {
    const container = L.DomUtil.create("div");
    container.innerHTML = /*html*/ `
      <input 
        type="text"
        id="searchInput"
        placeholder="어종 검색 (예: 배스)"
        class="w-44 px-2 py-1 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    `;

    const searchInput = container.querySelector("input")!;
    searchInput.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        const keyboard = searchInput.value.trim();
        if (!keyboard) return;

        // 기존 마커 제거
        map.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            map.removeLayer(layer);
          }
        });

        // 현재 지도 영역에서 잡긴 물고기만 필터링
        const bounds = map.getBounds();
        // API 호출...
        // const fishes: FishInfo = {};
      }
    });

    return container;
  }
}
