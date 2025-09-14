import L from "leaflet";
import CurrentPositionLoadControl from "../custom-control/currentPositionLoadControl";
import SearchInputControl from "../custom-control/searchInputControl";
import LoadButtonControl from "../custom-control/loadButtonControl";
import { CreateMarkerControl } from "../custom-control/createMarkerControl";

export default function addControls(map: L.Map) {
  map.addControl(new CurrentPositionLoadControl({ position: "topright" }));
  map.addControl(new SearchInputControl({ position: "topleft" }));
  map.addControl(new LoadButtonControl({ position: "topleft" }));
  map.addControl(new CreateMarkerControl({ position: "bottomright" }));
}
