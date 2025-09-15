import L from "leaflet";

export default function initMap(): L.Map {
  // HTML div 타입 지정
  const mapDiv = document.querySelector<HTMLDivElement>("#map")!;

  // 지도 생성
  const map: L.Map = L.map(mapDiv, {
    center: [36.5, 127.5],
    zoom: 7,
    minZoom: 8,
    maxZoom: 18,
    zoomControl: false,
    attributionControl: false,
  });

  // 한국 영역
  const southWest = L.latLng(32.5, 124.0); // 남서쪽
  const northEast = L.latLng(38.7, 132.0); // 북동쪽 (DMZ 근처까지)
  const koreaBounds = L.latLngBounds(southWest, northEast);

  map.setMaxBounds(koreaBounds);

  // 드래그 시 bounds 밖으로 나가지 않도록
  map.on("drag", () => {
    map.panInsideBounds(koreaBounds, { animate: false });
  });

  // 현재 줌 레벨 저장
  let currentZoom = map.getZoom();

  // 줌 이벤트
  map.on("zoomend", () => {
    const zoom = map.getZoom();

    // 모든 툴팁 제어
    const tooltips = document.getElementsByClassName("leaflet-tooltip");
    for (let i = 0; i < tooltips.length; i++) {
      const el = tooltips[i] as HTMLElement;
      if (zoom >= 12) {
        el.style.display = "block"; // 툴팁 보이기
      } else {
        el.style.display = "none"; // 툴팁 숨기기
      }
    }
  });

  setCurrentLocation(map);

  return map;
}

function setCurrentLocation(map: L.Map) {
  /* 현재 위치 가져오기
 - PC에선 이용자의 IP 주소로 예측한 접속 위치를 제공 해 오차 범위가 심하다.
 - 위치 직접 설정 버튼을 추후에 추가.
*/
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const lat: number = position.coords.latitude;
        const lng: number = position.coords.longitude;

        map.setView([lat, lng], 13);

        L.marker([lat, lng], {
          icon: L.divIcon({
            html: `<div style="width:10px; height:10px; background:red; border-radius:50%;"></div>`,
            className: "", // leaflet 기본 스타일 제거
            iconSize: [12, 12], // 픽셀 고정
          }),
        })
          .addTo(map)
          .bindPopup(
            /*html*/ `<h3>현재 위치</h3><button id="detail-btn" class="btn btn-primary btn-sm">상세보기</button>`
          )
          .bindTooltip("HEllo", { permanent: true })
          .openTooltip()
          .on("popupopen", (e: L.LeafletEvent) => {
            (e.target as L.CircleMarker).closeTooltip();
          })
          .on("popupclose", (e: L.LeafletEvent) => {
            (e.target as L.CircleMarker).openTooltip();
          });
      },
      (err) => {
        console.error(`위치 가져오기 실패: ${err}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 10_000,
        maximumAge: 0,
      }
    );
  }
}
