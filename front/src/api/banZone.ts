import L from "leaflet";

export default async function loadBanZone(map: L.Map) {
  try {
    const res = await fetch("/banZone.json");
    const data = await res.json();

    L.geoJSON(data, {
      style: {
        color: "red",
        weight: 2,
        fillColor: "red",
        fillOpacity: 0.3,
      },
      onEachFeature(feature, layer) {
        if (feature.properties?.name) {
          layer.bindPopup(feature.properties.name);
          layer.bindTooltip(feature.properties.name, { permanent: true });
        }
      },
    }).addTo(map);
  } catch (err) {
    console.error(`금지구역 불러오기 실패 ${err}`);
  }
}
