
const produtos = [
  {id:1, nome:"Fone Bluetooth X1", preco:149.9, categoria:"Acessórios", img:"https://picsum.photos/400/240?random=11"},
  {id:2, nome:"Teclado Mecânico", preco:329.0, categoria:"Periféricos", img:"https://picsum.photos/400/240?random=12"},
  {id:3, nome:"Mouse Gamer", preco:199.9, categoria:"Periféricos", img:"https://picsum.photos/400/240?random=13"},
  {id:4, nome:"Smartwatch Fit", preco:499.0, categoria:"Wearables", img:"https://picsum.photos/400/240?random=14"},
  {id:5, nome:"Câmera Action 4K", preco:899.0, categoria:"Câmeras", img:"https://picsum.photos/400/240?random=15"},
  {id:6, nome:"Caixa de Som", preco:249.9, categoria:"Áudio", img:"https://picsum.photos/400/240?random=16"}
];

const grid = document.getElementById("grid");
const cartCount = document.getElementById("cart-count");
const sortSel = document.getElementById("sort");
let cart = 0;

function render(items){
  grid.innerHTML = "";
  items.forEach(p => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-lg-4";
    col.innerHTML = `
      <div class="card h-100 position-relative shadow-sm">
        <span class="badge text-bg-dark badge-category">${p.categoria}</span>
        <img src="${p.img}" class="card-img-top" alt="${p.nome}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${p.nome}</h5>
          <p class="price mb-3">R$ ${p.preco.toFixed(2)}</p>
          <div class="mt-auto d-grid gap-2">
            <button class="btn btn-primary">Adicionar ao carrinho</button>
            <button class="btn btn-outline-secondary">Detalhes</button>
          </div>
        </div>
      </div>`;
    const btn = col.querySelector(".btn.btn-primary");
    btn.addEventListener("click", () => {
      cart++;
      cartCount.textContent = String(cart);
      btn.textContent = "Adicionado!";
      setTimeout(() => (btn.textContent = "Adicionar ao carrinho"), 900);
    });
    grid.appendChild(col);
  });
}

function sortItems(mode){
  const arr = [...produtos];
  if(mode === "cheap") arr.sort((a,b)=>a.preco-b.preco);
  if(mode === "expensive") arr.sort((a,b)=>b.preco-a.preco);
  render(arr);
}

sortSel.addEventListener("change", (e)=> sortItems(e.target.value));
sortItems("popular");
