import L, { Control } from "leaflet";

export default class LoadButtonControl extends Control {
  private markerLayer = L.layerGroup(); // 마커 모음

  onAdd(map: L.Map): HTMLElement {
    const container = L.DomUtil.create("div");
    container.innerHTML = /*html*/ `
      <button class="btn btn-accent font-semibold px-3 py-1 rounded-lg shadow-md">
        현재 화면에서 검색
      </button>
    `;

    L.DomEvent.disableClickPropagation(container);

    // api 호출 후 캐시하면 좋을 거 같다.
    // 검색어, 위도경도

    let fishMarkers = [
      { id: 1, lat: 37.5665, lng: 126.978, title: "한강 포인트", content: "30cm 붕어" },
      { id: 2, lat: 37.57, lng: 126.982, title: "청계천 포인트", content: "25cm 송사리" },
    ];

    const searchInput = document.getElementById("searchInput")! as HTMLInputElement;

    container.querySelector("button")!.addEventListener("click", () => {
      // 기존 마커들 제거
      this.markerLayer.clearLayers();

      // 검색 후 새 마커 추카
      const filtered = fishMarkers.filter((m) => m.title.includes(searchInput.value));

      this.addMarkers(filtered);
    });

    // 레이어를 지도에 추가
    this.markerLayer.addTo(map);

    return container;
  }

  addMarkers(fishMarkers: { id: number; lat: number; lng: number; title: string; content: string }[]) {
    fishMarkers.forEach((m) => {
      const marker = L.marker([m.lat, m.lng], {
        icon: L.divIcon({
          html: `<div style="width:10px; height:10px; background:red; border-radius:50%;"></div>`,
          className: "", // leaflet 기본 스타일 제거
          iconSize: [12, 12], // 픽셀 고정
        }),
      })
        .bindPopup(
          /*html*/ `
        <div>
          <h3>${m.title}</h3>
          <p>${m.content}</p>
        </div>
        `
        )
        .bindTooltip(m.title, { permanent: true })
        .openTooltip()
        .on("popupopen", (e: L.LeafletEvent) => (e.target as L.CircleMarker).closeTooltip())
        .on("popupclose", (e: L.LeafletEvent) => (e.target as L.CircleMarker).openPopup());

      // markerLayer에 추가 (map에 직접 add 안 해도 됨)
      this.markerLayer.addLayer(marker);
    });
  }
}
