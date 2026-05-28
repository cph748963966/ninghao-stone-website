const contactEmail = "inquiry@example.com";

const materialGrid = document.querySelector("#productGrid");
const detailTitle = document.querySelector("#detailTitle");
const detailPanel = document.querySelector("#detailPanel");
const productSelect = document.querySelector("[name='product']");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function materialLabel(material) {
  return material.name;
}

function formLabel(material, form) {
  return `${material.name} - ${form.name}`;
}

function imageTag(src, alt, className, loading = "lazy") {
  return `
    <img
      class="${className}"
      src="${escapeHtml(src)}"
      alt="${escapeHtml(alt)}"
      loading="${loading}"
      decoding="async"
    />
  `;
}

function renderMaterials() {
  materialGrid.innerHTML = window.MATERIALS.map(
    (material) => `
      <article class="material-card tone-${material.tone}">
        <button class="material-card-button" type="button" data-stone-id="${material.id}">
          <span class="material-image-frame">
            ${imageTag(material.heroImage, `${materialLabel(material)} rough stone`, "material-image")}
          </span>
          <span class="material-card-copy">
            <span class="category-label">Stone category</span>
            <strong>${escapeHtml(materialLabel(material))}</strong>
            <span>${escapeHtml(material.summary)}</span>
            <span class="form-count">${material.forms.length} available forms</span>
          </span>
        </button>
      </article>
    `,
  ).join("");
}

function renderMaterialDetail(materialId) {
  const material = window.MATERIALS.find((item) => item.id === materialId);
  if (!material) return;

  document
    .querySelectorAll(".material-card")
    .forEach((card) => card.classList.toggle("is-selected", card.querySelector("[data-stone-id]")?.dataset.stoneId === materialId));

  detailTitle.textContent = materialLabel(material);
  detailPanel.innerHTML = `
    <div class="detail-media">
      ${imageTag(material.heroImage, `${materialLabel(material)} rough material`, "detail-main-image")}
    </div>
    <div class="detail-copy">
      <p class="category-label">Available forms</p>
      <h3>${escapeHtml(materialLabel(material))}</h3>
      <p>${escapeHtml(material.summary)}</p>
      <div class="form-gallery">
        ${material.forms
          .map(
            (form) => `
              <article class="form-card">
                <div class="form-image-frame">
                  ${imageTag(form.image, formLabel(material, form), "form-image")}
                </div>
                <h4>${escapeHtml(form.name)}</h4>
                <a class="button secondary form-inquiry" href="#contact" data-fill-product="${escapeHtml(formLabel(material, form))}">
                  Ask about this form
                </a>
              </article>
            `,
          )
          .join("")}
      </div>
      <a class="button primary" href="#contact" data-fill-product="${escapeHtml(materialLabel(material))}">
        Ask about ${escapeHtml(material.name)}
      </a>
    </div>
  `;

  document.querySelector("#product-detail").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderProductOptions() {
  if (!productSelect) return;

  productSelect.innerHTML = [
    '<option>Custom order</option>',
    ...window.MATERIALS.map((material) => `<option>${escapeHtml(materialLabel(material))}</option>`),
    ...window.MATERIALS.flatMap((material) =>
      material.forms.map((form) => `<option>${escapeHtml(formLabel(material, form))}</option>`),
    ),
  ].join("");
}

document.addEventListener("click", (event) => {
  const detailButton = event.target.closest("[data-stone-id]");
  if (detailButton) {
    renderMaterialDetail(detailButton.dataset.stoneId);
  }

  const fillButton = event.target.closest("[data-fill-product]");
  if (fillButton) {
    const message = document.querySelector("[name='message']");
    if (productSelect) productSelect.value = fillButton.dataset.fillProduct;
    if (message) {
      message.value = `I am interested in ${fillButton.dataset.fillProduct}.\n\nStone type:\nProduct form:\nSize:\nQuantity:\nShipping country:\nReference link:`;
    }
    document.querySelector("#contact").scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

document.querySelector("#inquiryForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`Website inquiry from ${formData.get("name")}`);
  const body = encodeURIComponent(
    [
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      `Company / shop: ${formData.get("company") || "-"}`,
      `Product interest: ${formData.get("product")}`,
      "",
      "Message:",
      formData.get("message"),
    ].join("\n"),
  );
  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
});

renderProductOptions();
renderMaterials();
