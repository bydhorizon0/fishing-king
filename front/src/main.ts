import "leaflet/dist/leaflet.css";
import "./main.css";
import "./map/addEvents";
import L from "leaflet";
import initMap from "./map/initMap";
import addControls from "./map/addControls";
import loadBanZone from "./api/banZone";

const authButtons = document.getElementById("auth-buttons")!;
const app = document.getElementById("app")!;

function renderAuthButtons() {
  authButtons.innerHTML = /*html*/ `
    <a href="#login" class="btn btn-sm btn-outline btn-ghost">로그인</a>
    <a href="#signup" class="btn btn-sm btn-outline btn-ghost">회원가입</a>
    <a href="#map" class="btn btn-sm btn-outline btn-ghost">지도</a>
  `;
}

async function loadPage(filePath: string) {
  const res = await fetch(filePath);
  if (!res.ok) throw new Error("페이지를 불러올 수 없습니다.");
  const html = await res.text();
  return html;
}

async function renderLogin() {
  app.innerHTML = await loadPage("/src/page/login.html")

  const loginForm = document.getElementById("loginForm") as HTMLFormElement;
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // TODO: 로그인 API 호출
    alert("로그인 시도");
  });
}

async function renderSignup() {
  app.innerHTML = await loadPage("/src/page/signup.html")

  const signupForm = document.getElementById("signupForm") as HTMLFormElement;
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // TODO: 회원가입 API 호출
    alert("회원가입 시도");
  });
}

async function renderMap() {
  app.innerHTML = `<div id="map" class="h-100"></div>`;

  const map = initMap();
  addControls(map);
  await loadBanZone(map);

  // 타일 레이어 추가
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);
}

// 해시 라우팅 처리
function router() {
  const hash = location.hash || "#login"; // 기본 로그인 페이지
  switch (hash) {
    case "#login":
      renderLogin();
      break;
    case "#signup":
      renderSignup();
      break;
    case "#map":
      renderMap();
      break;
    default:
      app.innerHTML = /*html*/`<h2>404 - 페이지를 찾을 수 없습니다.</h2>`;
  }
}

window.addEventListener("hashchange", router);

renderAuthButtons();
router();

