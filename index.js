import"./assets/styles-Dw4sMSfm.js";import{a,i}from"./assets/vendor-DCjS4zLf.js";const d=()=>{const t=document.querySelector(".categories__btn");t&&t.classList.add("categories__btn--active")},l="https://dummyjson.com",r={CATEGORIES:"/products/category-list",PRODUCTS:"/products",CATEGORY:"/products/category/"},o=12;a.defaults.baseURL=l;const u=async()=>{const{data:t}=await a(`${r.CATEGORIES}`);return t},p=async t=>{const{data:s}=await a(`${r.PRODUCTS}`,{params:{limit:o,skip:(t-1)*o}});return s},g=async t=>{const{data:s}=await a(`${r.CATEGORY}${t}`);return s},e={categoryList:document.querySelector(".categories"),productList:document.querySelector(".products")},y=t=>{const s=t.map(c=>`<li class="categories__item">
   <button class="categories__btn" type="button">${c}</button>
 </li>`).join("");e.categoryList.innerHTML=s},n=t=>{const s=t.map(c=>`<li class="products__item" data-id="${c.id}">
    <img class="products__image" src="${c.thumbnail}" alt="${c.description}"/>
    <p class="products__title">${c.title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${c.brand}</span></p>
    <p class="products__category">Category: ${c.category} </p>
    <p class="products__price">Price: ${c.price} $</p>
 </li>`).join("");e.productList.insertAdjacentHTML("beforeend",s)},_=()=>{e.productList.innerHTML=""};let m=1;const L=async()=>{try{const t=await u();y(["All",...t]),d()}catch(t){console.log(t)}},T=async()=>{try{const t=await p(m);n(t.products)}catch(t){i.error({message:t})}},b=async t=>{if(t.target.nodeName==="BUTTON")try{const s=t.target.textContent,c=await g(s);_(),n(c.products)}catch(s){console.log(s)}};L();T();e.categoryList.addEventListener("click",b);
//# sourceMappingURL=index.js.map
