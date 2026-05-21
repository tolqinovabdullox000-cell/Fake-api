const data = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
    rating: {
      rate: 4.1,
      count: 259,
    },
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png",
    rating: {
      rate: 4.7,
      count: 500,
    },
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description:
      "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png",
    rating: {
      rate: 2.1,
      count: 430,
    },
  },
];

let searchQuery = "";
let selectedCategory = "all";

function generateProductHTML(product) {
  return `
    <div class="product-card" onclick="openProductModal(${product.id})">
      <div class="img-wrapper">
        <img src="${product.image}" alt="${product.title}">
      </div>
      <div>
        <h4 class="product-title">${product.title}</h4>
        <p class="product-category">${product.category}</p>
        <div class="price">$${product.price}</div>
      </div>
    </div>
  `;
}

function displayFeatured() {
  const featuredGrid = document.getElementById("featuredGrid");
  if (!featuredGrid) return;

  const featuredProducts = data.slice(0, 4);
  featuredGrid.innerHTML = featuredProducts
    .map((product) => generateProductHTML(product))
    .join("");
}

function initProductsPage() {
  const searchInput = document.getElementById("searchInput");
  const categorySelect = document.getElementById("categorySelect");
  const closeModal = document.getElementById("closeModal");
  const productModal = document.getElementById("productModal");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderAllProducts();
    });
  }

  if (categorySelect) {
    categorySelect.addEventListener("change", (e) => {
      selectedCategory = e.target.value;
      renderAllProducts();
    });
  }

  if (closeModal && productModal) {
    closeModal.addEventListener("click", () =>
      productModal.classList.remove("open"),
    );
  }

  if (productModal) {
    productModal.addEventListener("click", (e) => {
      if (e.target === productModal) productModal.classList.remove("open");
    });
  }

  renderAllProducts();
}

function renderAllProducts() {
  const allProductsGrid = document.getElementById("allProductsGrid");
  if (!allProductsGrid) return;

  let filtered = data.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    allProductsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:var(--text-muted);">No products found.</p>`;
    return;
  }

  allProductsGrid.innerHTML = filtered
    .map((product) => generateProductHTML(product))
    .join("");
}

function openProductModal(id) {
  const product = data.find((p) => p.id === id);
  const modalBody = document.getElementById("modalBody");
  const productModal = document.getElementById("productModal");

  if (!productModal || !modalBody || !product) return;

  modalBody.innerHTML = `
    <div class="modal-grid">
      <div class="modal-img-wrapper" style="background:#fff; padding:10px; border-radius:6px; display:flex; align-items:center; justify-content:center;">
        <img src="${product.image}" alt="${product.title}">
      </div>
      <div class="modal-info">
        <h2>${product.title}</h2>
        <p style="color:var(--accent-blue); font-size:12px; margin-bottom:8px; text-transform:uppercase;">${product.category}</p>
        <p class="modal-desc">${product.description}</p>
        <div class="price" style="font-size:18px;">$${product.price}</div>
      </div>
    </div>
  `;
  productModal.classList.add("open");
}

document.addEventListener("DOMContentLoaded", () => {
  displayFeatured();
  initProductsPage();
});
