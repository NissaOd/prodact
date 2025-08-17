import"./assets/styles-Dw4sMSfm.js";import{a as r,i as u}from"./assets/vendor-DCjS4zLf.js";const e=document.querySelector(".modal"),p=document.querySelector(".modal__close-btn"),m=document.querySelector(".modal-product");document.querySelector(".products");function _(t){return fetch(`https://dummyjson.com/products/${t}`).then(o=>{if(!o.ok)throw new Error(`Error: ${o.status}`);return o.json()})}function g(t){const o=`<img class="modal-product__img" src="${t.thumbnail}" alt="${t.title}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${t.title}</p>
        <ul class="modal-product__tags">${t.tags}</ul>
        <p class="modal-product__description">${t.description}</p>
        <p class="modal-product__shipping-information">Shipping: ${t.shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy: ${t.returnPolicy}</p>
        <p class="modal-product__price">Price: $${t.price}</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>

 `;m.innerHTML=o,e.classList.add("modal--is-open")}function d(){e.classList.remove("modal--is-open")}function y(t){const o=t.target.closest(".products__item");if(!o)return;const c=o.dataset.id;_(c).then(a=>g(a)).catch(a=>console.error("Error loading product:",a))}p.addEventListener("click",d);e.addEventListener("click",t=>{t.target===e&&d()});const $=()=>{const t=document.querySelector(".categories__btn");t&&t.classList.add("categories__btn--active")},f="https://dummyjson.com",n={CATEGORIES:"/products/category-list",PRODUCTS:"/products",CATEGORY:"/products/category/"},i=12;r.defaults.baseURL=f;const L=async()=>{const{data:t}=await r(`${n.CATEGORIES}`);return t},b=async t=>{const{data:o}=await r(`${n.PRODUCTS}`,{params:{limit:i,skip:(t-1)*i}});return o},h=async t=>{const{data:o}=await r(`${n.CATEGORY}${t}`);return o},s={categoryList:document.querySelector(".categories"),productList:document.querySelector(".products")},E=t=>{const o=t.map(c=>`<li class="categories__item">
   <button class="categories__btn" type="button">${c}</button>
 </li>`).join("");s.categoryList.innerHTML=o},l=t=>{const o=t.map(c=>`<li class="products__item" data-id="${c.id}">
    <img class="products__image" src="${c.thumbnail}" alt="${c.description}"/>
    <p class="products__title">${c.title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${c.brand}</span></p>
    <p class="products__category">Category: ${c.category} </p>
    <p class="products__price">Price: ${c.price} $</p>
 </li>`).join("");s.productList.insertAdjacentHTML("beforeend",o)},P=()=>{s.productList.innerHTML=""};let S=1;const T=async()=>{try{const t=await L();E(["All",...t]),$()}catch(t){console.log(t)}},C=async()=>{try{const t=await b(S);l(t.products)}catch(t){u.error({message:t})}},B=async t=>{if(t.target.nodeName==="BUTTON")try{const o=t.target.textContent,c=await h(o);P(),l(c.products)}catch(o){console.log(o)}};T();C();s.productList.addEventListener("click",y);s.categoryList.addEventListener("click",B);
//# sourceMappingURL=index.js.map
