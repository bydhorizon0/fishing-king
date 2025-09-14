import "leaflet/dist/leaflet.css";
import "./main.css";
import "./map/addEvents";
import L from "leaflet";
import initMap from "./map/initMap";
import addControls from "./map/addControls";
import loadBanZone from "./api/banZone";

const map = initMap();
addControls(map);
await loadBanZone(map);

// 타일 레이어 추가
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);
