export async function getCategories() {
  const categories = await fetch('https://api.mercadolibre.com/sites/MLB/categories')
    .then((response) => response.json());
  return categories;
}
export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const url = `https://api.mercadolibre.com/sites/MLB/categories=${categoryId}&q=${query}`;
  const productsByCategoryAndId = await fetch(url)
    .then((response) => response.json());
  return productsByCategoryAndId;
}
export async function productApi(query) {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  const product = await fetch(url).then((response) => response.json());
  return product;
}

export async function getCategoriesId(id) {
  const categoryById = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${id}`)
    .then((response) => response.json());
  return categoryById;
}
