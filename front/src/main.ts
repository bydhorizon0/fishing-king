import "leaflet/dist/leaflet.css";
import "./main.css";
import "./map/addEvents";
import L from "leaflet";
import initMap from "./map/initMap";
import addControls from "./map/addControls";
import loadBanZone from "./api/banZone";
import {logout} from "./api/auth.ts";

function main() {
  const authButtons = document.getElementById("auth-buttons")!

  async function renderAuthUI() {
    //const user = await getCurrentUser();

    if (authButtons) {
      if (false) {
        authButtons.innerHTML = /*html*/`
        <button id="logoutBtn" class="btn btn-sm btn-outline btn-ghost">로그아웃</button>
      `;
        document.getElementById("logoutBtn")?.addEventListener("click", logout());
      } else {
        authButtons.innerHTML = /*html*/`
        <a href="/login" class="btn btn-sm btn-outline btn-ghost">로그인</a>
        <a href="/signup" class="btn btn-sm btn-outline btn-ghost">회원가입</a>
      `;
      }
    }
  }
  renderAuthUI();
}

main();

const map = initMap();
addControls(map);
await loadBanZone(map);

// 타일 레이어 추가
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);
