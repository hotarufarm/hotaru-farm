const productGrid = document.querySelector("[data-product-grid]");
const productTemplate = document.querySelector("#product-card-template");

function renderProducts(products) {
  if (!productGrid || !productTemplate) return;

  productGrid.innerHTML = "";

  products
    .filter((product) => !product.hidden)
    .forEach((product) => {
      const card = productTemplate.content.cloneNode(true);
      const imageLink = card.querySelector(".product-image-link");
      const image = card.querySelector("img");
      const status = card.querySelector(".product-status");
      const name = card.querySelector(".product-name");
      const content = card.querySelector(".product-content");
      const price = card.querySelector(".product-price");
      const desc = card.querySelector(".product-desc");
      const meta = card.querySelector(".product-meta");
      const button = card.querySelector(".product-button");
      const url = product.url || "https://hotarufarm.stores.jp/";

      imageLink.href = url;
      imageLink.setAttribute("aria-label", `${product.name}を詳しく見る`);
      image.src = product.image;
      image.alt = product.imageAlt || product.name;
      status.textContent = product.status;
      name.textContent = product.name;
      if (content) content.textContent = product.content || "";
      if (price) price.textContent = product.price || "";
      if (desc) desc.textContent = product.description || "";
      button.href = url;
      button.textContent = product.buttonLabel || "詳しく見る";

      if (meta) {
        meta.innerHTML = "";
        (product.tags || []).forEach((tag) => {
          const item = document.createElement("span");
          item.textContent = tag;
          meta.appendChild(item);
        });
      }

      productGrid.appendChild(card);
    });
}

renderProducts(window.HOTARU_PRODUCTS || []);
