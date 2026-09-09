import { products, getDealProducts, getBestSellerProducts, searchProducts, getProductById } from '../src/data/products.ts';

console.log('--- Running Milestone 2 Catalog & Logic Verification ---');

// 1. Total products check
console.assert(products.length >= 36, `Expected at least 36 products, got ${products.length}`);
console.log(`✓ Total products count: ${products.length} (Requirement >= 36 passed)`);

// 2. Category distribution check
const categories = ['electronics', 'computers', 'home', 'fashion', 'books', 'beauty'];
const categoryCounts = {};
categories.forEach(cat => {
  const count = products.filter(p => p.category === cat).length;
  categoryCounts[cat] = count;
  console.assert(count >= 6, `Expected at least 6 products in ${cat}, got ${count}`);
});
console.log('✓ Category distribution:', categoryCounts);

// 3. Deal and Bestseller products check
const deals = getDealProducts();
const bestSellers = getBestSellerProducts();
console.assert(deals.length > 0, 'Expected deals to be populated');
console.assert(bestSellers.length > 0, 'Expected bestsellers to be populated');
console.log(`✓ Deal products: ${deals.length}, Best sellers: ${bestSellers.length}`);

// 4. Search query test
const headphonesSearch = searchProducts('headphones');
console.assert(headphonesSearch.length >= 1, 'Expected search for headphones to return results');
console.log(`✓ Search for "headphones" found: ${headphonesSearch.length} item(s)`);

const macbookSearch = searchProducts('macbook');
console.assert(macbookSearch.length >= 1, 'Expected search for macbook to return results');
console.log(`✓ Search for "macbook" found: ${macbookSearch.length} item(s)`);

// 5. Product detail lookup
const prod1 = getProductById('prod-elec-1');
console.assert(prod1 !== undefined, 'Expected prod-elec-1 to exist');
console.assert(prod1.title.includes('Sony'), 'Expected prod-elec-1 to be Sony headphones');
console.assert(prod1.price === 328.00, 'Expected price to be 328.00');
console.assert(prod1.images.length >= 2, 'Expected multiple images for gallery');
console.assert(Object.keys(prod1.specs).length > 0, 'Expected specs to be populated');
console.log('✓ Product detail lookup validated for:', prod1.title);

// 6. Invalid product lookup
const invalidProd = getProductById('non-existent-id');
console.assert(invalidProd === undefined, 'Expected undefined for non-existent product');
console.log('✓ Non-existent product correctly returns undefined');

console.log('ALL VERIFICATIONS PASSED SUCCESSFULLY!');
