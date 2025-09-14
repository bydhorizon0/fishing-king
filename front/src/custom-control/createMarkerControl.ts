import L, { Control } from "leaflet";

export class CreateMarkerControl extends Control {
  onAdd(map: L.Map): HTMLElement {
    const container = L.DomUtil.create("div");

    // 이벤트 전파 disable
    L.DomEvent.disableClickPropagation(container);
    L.DomEvent.disableScrollPropagation(container);

    container.innerHTML = /*html*/ `
      <!-- 버튼 -->
      <button id="open-marker-modal" class="btn btn-active btn-sm">
        포인트 등록
      </button>

      <!-- 모달 -->
      <input type="checkbox" id="marker-modal" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box max-w-3xl w-full">
          <h3 class="font-bold text-lg">포인트 등록 하기</h3>
          
          <form method="POST" action="http://localhost:8080/api/point/add" enctype="multipart/form-data" class="mt-4 space-y-4">
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-semibold">제목</span>
              </label>
              <input type="text" name="title" class="input input-bordered w-full" placeholder="포인트의 타이틀을 입력해주세요 (선택)" />
            </div>
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-semibold">내용</span>
              </label>
              <textarea name="content" class="textarea textarea-bordered w-full resize-none" rows="10" placeholder="포인트에 대해 설명해주세요!" required></textarea>
            </div>
            <div class="form-control flex w-full">
              <div class="flex-1">
                <label class="label">
                  <span class="label-text font-semibold">길이</span>
                </label>
                <label class="input input-bordered flex items-center gap-2">
                  <input type="number" name="length" step="0.1" pattern="^\d+(\.\d{1})?$" title="소수점은 최대 1자리까지 입력 가능" class="grow" placeholder="예: 31.4" />
                  <span>cm</span>
                </label>
              </div>
              <div class="flex-1">
                <label class="label">
                  <span class="label-text font-semibold">무게</span>
                </label>
                <label class="input input-bordered flex items-center gap-2">
                  <input type="number" name="weight" step="0.1" pattern="^\d+(\.\d{1})?$" title="소수점은 최대 1자리까지 입력 가능" class="grow" placeholder="예: 31.4" />
                  <span>kg</span>
                </label>
              </div>
            </div>
            <div class="form-control w-full">
              <label class="label">
                <span class="label-text font-semibold">이미지 첨부</span>
              </label>
              <input type="file" name="images" accept="image/*" multiple id="imageInput" class="file-input file-input-bordered w-full" />
              <div id="previewContainer" class="flex flex-wrap gap-2 mt-2"></div>
            </div>
            <div class="form-control">
              <label class="cursor-pointer items-center gap-2">
                <input type="checkbox" name="isPrivate" id="isPrivate" class="checkbox" />
                <span>비공개</span>
              </label>
            </div>
            <div class="modal-action justify-between">
              <label for="marker-modal" class="btn btn-soft btn-error" id="close-modal">닫기</label>
              <input type="submit" class="btn btn-soft btn-active" value="등록"/>
            </div>
          </form>
          
        </div>
      </div>
    `;

    const form = container.querySelector<HTMLFormElement>("form");
    const button = container.querySelector<HTMLButtonElement>("#open-marker-modal");
    const closeModalLabel = container.querySelector<HTMLButtonElement>("#close-modal");
    const imageInput = container.querySelector<HTMLInputElement>("#imageInput");
    const previewContainer = container.querySelector<HTMLDivElement>("#previewContainer");

    button?.addEventListener("click", () => {
      const modalCheckbox = container.querySelector<HTMLInputElement>("#marker-modal");
      if (modalCheckbox) modalCheckbox.checked = true;
    });

    closeModalLabel?.addEventListener("click", () => {
      if (form) {
        form.reset();
      }

      // 이미지 미리보기 초기화
      if (previewContainer) {
        previewContainer.innerHTML = "";
      }
    });

    // 이미지 미리보기 기능
    imageInput?.addEventListener("change", () => {
      if (!previewContainer) return;
      previewContainer.innerHTML = "";

      const files = imageInput.files;
      if (!files) return;

      Array.from(files).forEach((file) => {
        if (!file.type.startsWith("image/")) return;

        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.createElement("img");
          img.src = e.target?.result as string;
          img.className = "w-20 h-20 object-cover rounded-md border";
          previewContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
      });
    });

    L.DomEvent.disableClickPropagation(container);

    return container;
  }
}
