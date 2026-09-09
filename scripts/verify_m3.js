import { products } from '../src/data/products';
import { 
  filterProducts, 
  sortProducts, 
  paginateProducts, 
  getAvailableBrands, 
  getAutocompleteSuggestions 
} from '../src/utils/searchFilter';

console.log('--- Running Milestone 3 Search & Discovery Verification ---');

// 1. Search Autocomplete verification
const suggestionsHead = getAutocompleteSuggestions(products, 'head');
console.log(`✓ Query "head" returned ${suggestionsHead.length} suggestion(s):`);
suggestionsHead.forEach(s => console.log(`   - ${s.title} (${s.brand || 'No brand'}) - $${s.price || 0}`));
if (suggestionsHead.length === 0) {
  throw new Error('Autocomplete failed to find matching products for "head"');
}

// Case insensitive matching check
const suggestionsLower = getAutocompleteSuggestions(products, 'sony');
const suggestionsUpper = getAutocompleteSuggestions(products, 'SONY');
if (suggestionsLower.length !== suggestionsUpper.length) {
  throw new Error('Autocomplete search is not case-insensitive!');
}
console.log('✓ Autocomplete case-insensitivity verified');

// 2. Multi-field search verification (title, brand, category, description, keywords)
const searchByKeyword = filterProducts(products, { query: 'wireless' });
console.log(`✓ Query "wireless" matched ${searchByKeyword.length} products`);
if (searchByKeyword.length === 0) {
  throw new Error('Search did not match across keywords/description');
}

// 3. Dynamic Brands generation
const electronicsProducts = filterProducts(products, { category: 'electronics' });
const electronicsBrands = getAvailableBrands(electronicsProducts);
console.log(`✓ Available brands in Electronics: ${electronicsBrands.map(b => `${b.name} (${b.count})`).join(', ')}`);
if (electronicsBrands.length === 0 || !electronicsBrands.some(b => b.name === 'Sony')) {
  throw new Error('Dynamic brands extraction failed');
}

// 4. Prime Filtering
const primeOnly = filterProducts(products, { primeOnly: true });
console.log(`✓ Prime eligible products: ${primeOnly.length} of ${products.length}`);
if (primeOnly.some(p => !p.isPrime)) {
  throw new Error('Prime filter returned non-Prime products');
}

// 5. Rating Filtering (Numeric 4★ & up)
const fourStarAndUp = filterProducts(products, { minRating: 4 });
console.log(`✓ 4★ and up products: ${fourStarAndUp.length}`);
if (fourStarAndUp.some(p => p.rating < 4.0)) {
  throw new Error('Rating filter returned products below 4.0 rating');
}

// 6. Price Filtering
const underFifty = filterProducts(products, { maxPrice: 50 });
console.log(`✓ Under $50 products: ${underFifty.length}`);
if (underFifty.some(p => p.price > 50)) {
  throw new Error('Max price filter failed');
}

const customRange = filterProducts(products, { minPrice: 100, maxPrice: 300 });
console.log(`✓ $100-$300 products: ${customRange.length}`);
if (customRange.some(p => p.price < 100 || p.price > 300)) {
  throw new Error('Custom price range filter failed');
}

// 7. Sorting Verification
const sortedLowHigh = sortProducts([...products], 'price-asc');
for (let i = 0; i < sortedLowHigh.length - 1; i++) {
  if (sortedLowHigh[i].price > sortedLowHigh[i+1].price) {
    throw new Error('Sort Price: Low to High failed');
  }
}
console.log('✓ Sort: Price Low to High verified');

const sortedHighLow = sortProducts([...products], 'price-desc');
for (let i = 0; i < sortedHighLow.length - 1; i++) {
  if (sortedHighLow[i].price < sortedHighLow[i+1].price) {
    throw new Error('Sort Price: High to Low failed');
  }
}
console.log('✓ Sort: Price High to Low verified');

const sortedRating = sortProducts([...products], 'rating');
for (let i = 0; i < sortedRating.length - 1; i++) {
  if (sortedRating[i].rating < sortedRating[i+1].rating) {
    throw new Error('Sort: Rating Descending failed');
  }
}
console.log('✓ Sort: Customer Rating verified');

// 8. Pagination Verification
const page1 = paginateProducts(products, 1, 12);
const page2 = paginateProducts(products, 2, 12);
const page3 = paginateProducts(products, 3, 12);
console.log(`✓ Pagination 12/page: P1=${page1.paginatedItems.length}, P2=${page2.paginatedItems.length}, P3=${page3.paginatedItems.length}, Total Pages=${page1.totalPages}`);
if (page1.paginatedItems.length !== 12 || page2.paginatedItems.length !== 12 || page3.paginatedItems.length !== 12 || page1.totalPages !== 3) {
  throw new Error(`Pagination calculation mismatch: expected 3 pages of 12 items for 36 items`);
}

// 9. Empty Result Check
const noResults = filterProducts(products, { query: 'xyzabc123' });
console.log(`✓ Query "xyzabc123" correctly produced ${noResults.length} matches`);
if (noResults.length !== 0) {
  throw new Error('Nonexistent search query returned results!');
}

console.log('ALL MILESTONE 3 VERIFICATIONS PASSED SUCCESSFULLY!');
