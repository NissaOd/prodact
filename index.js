import"./assets/styles-Dw4sMSfm.js";import{a as e,i as n}from"./assets/vendor-DCjS4zLf.js";const i=()=>{const t=document.querySelector(".categories__btn");t&&t.classList.add("categories__btn--active")},d="https://dummyjson.com",r={CATEGORIES:"/products/category-list",PRODUCTS:"/products"},a=12;e.defaults.baseURL=d;const l=async()=>{const{data:t}=await e(`${r.CATEGORIES}`);return t},p=async t=>{const{data:c}=await e(`${r.PRODUCTS}`,{params:{limit:a,skip:(t-1)*a}});return c},o={categoryList:document.querySelector(".categories"),productList:document.querySelector(".products")},u=t=>{const c=t.map(s=>`<li class="categories__item">
   <button class="categories__btn" type="button">${s}</button>
 </li>`).join("");o.categoryList.innerHTML=c},_=t=>{const c=t.map(s=>`<li class="products__item" data-id="${s.id}">
    <img class="products__image" src="${s.thumbnail}" alt="${s.description}"/>
    <p class="products__title">${s.title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${s.brand}</span></p>
    <p class="products__category">Category: ${s.category} </p>
    <p class="products__price">Price: ${s.price} $</p>
 </li>`).join("");o.productList.insertAdjacentHTML("beforeend",c)};let g=1;const m=async()=>{try{const t=await l();u(["All",...t]),i()}catch(t){console.log(t)}},y=async()=>{try{const t=await p(g);_(t.products)}catch(t){n.error({message:t})}};m();y();
//# sourceMappingURL=index.js.map
