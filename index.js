import"./assets/styles-Dw4sMSfm.js";import{a as i,i as m}from"./assets/vendor-DCjS4zLf.js";const r=document.querySelector(".modal"),_=document.querySelector(".modal__close-btn"),y=document.querySelector(".modal-product");document.querySelector(".products");function L(t){return fetch(`https://dummyjson.com/products/${t}`).then(o=>{if(!o.ok)throw new Error(`Error: ${o.status}`);return o.json()})}function h(t){const o=`<img class="modal-product__img" src="${t.thumbnail}" alt="${t.title}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${t.title}</p>
        <ul class="modal-product__tags">${t.tags}</ul>
        <p class="modal-product__description">${t.description}</p>
        <p class="modal-product__shipping-information">Shipping: ${t.shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy: ${t.returnPolicy}</p>
        <p class="modal-product__price">Price: $${t.price}</p>
        <button class="modal-product__buy-btn" type="button">Buy</button>
      </div>

 `;y.innerHTML=o,r.classList.add("modal--is-open")}function g(){r.classList.remove("modal--is-open")}function f(t){const o=t.target.closest(".products__item");if(!o)return;const s=o.dataset.id;L(s).then(d=>h(d)).catch(d=>console.error("Error loading product:",d))}_.addEventListener("click",g);r.addEventListener("click",t=>{t.target===r&&g()});const $=()=>{const t=document.querySelector(".categories__btn");t&&t.classList.add("categories__btn--active")},b="https://dummyjson.com",p={CATEGORIES:"/products/category-list",PRODUCTS:"/products",CATEGORY:"/products/category/"},l=12,e={categoryList:document.querySelector(".categories"),productList:document.querySelector(".products"),loadMoreBtn:document.querySelector(".load-more-btn")};i.defaults.baseURL=b;const B=async()=>{const{data:t}=await i(`${p.CATEGORIES}`);return t},u=async t=>{const{data:o}=await i(`${p.PRODUCTS}`,{params:{limit:l,skip:(t-1)*l}});return o},M=async t=>{const{data:o}=await i(`${p.CATEGORY}${t}`);return o},E=t=>{const o=t.map(s=>`<li class="categories__item">
   <button class="categories__btn" type="button">${s}</button>
 </li>`).join("");e.categoryList.innerHTML=o},n=t=>{const o=t.map(s=>`<li class="products__item" data-id="${s.id}">
    <img class="products__image" src="${s.thumbnail}" alt="${s.description}"/>
    <p class="products__title">${s.title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${s.brand}</span></p>
    <p class="products__category">Category: ${s.category} </p>
    <p class="products__price">Price: ${s.price} $</p>
 </li>`).join("");e.productList.insertAdjacentHTML("beforeend",o)},P=()=>{e.productList.innerHTML=""};let c=1,a=0;const S=async()=>{try{const t=await B();E(["All",...t]),$()}catch(t){console.log(t)}},T=async()=>{try{const t=await u(c);e.loadMoreBtn.classList.contains("is-hidden")&&(a=Math.ceil(t.total/l),console.log(a)),n(t.products),a>c?e.loadMoreBtn.classList.remove("is-hidden"):a===c&&!e.loadMoreBtn.classList.contains("is-hidden")&&e.loadMoreBtn.classList.add("is-hidden")}catch(t){m.error({message:`${t}`})}},C=async()=>{try{if(c++,a>c){const t=await u(c);n(t.products),e.loadMoreBtn.classList.remove("is-hidden")}else if(a===c&&!e.loadMoreBtn.classList.contains("is-hidden")){console.log(a);const t=await u(c);n(t.products),e.loadMoreBtn.classList.add("is-hidden")}}catch{m.warning({message:"No more products available",messageColor:"orangered"})}},v=async t=>{if(t.target.nodeName==="BUTTON")try{const o=t.target.textContent,s=await M(o);P(),n(s.products)}catch(o){console.log(o)}};S();T();e.loadMoreBtn.addEventListener("click",C);e.productList.addEventListener("click",f);e.categoryList.addEventListener("click",v);
//# sourceMappingURL=index.js.map
