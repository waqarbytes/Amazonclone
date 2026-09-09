import { products, getProductById } from '../src/data/products';
import { getProductImages } from '../src/utils/productImages';
import { getProductReviews, getRatingBreakdown } from '../src/data/mockReviews';

console.log('--- Running Milestone 4 PDP Verification ---');

// 1. Check all 5 required test categories
const sampleIds = [
  'prod-elec-1', // Sony WH-1000XM5
  'prod-comp-1', // MacBook Air M3
  'prod-home-1', // Ninja Air Fryer
  'prod-fash-1', // Levi's 501
  'prod-book-1', // Atomic Habits
  'prod-beau-1', // Dyson Airwrap
];

sampleIds.forEach(id => {
  const p = getProductById(id);
  if (!p) {
    throw new Error(`Failed to find required showcase product ID: ${id}`);
  }
  console.log(`✓ Product found: [${p.category}] ${p.title} - $${p.price}`);
  
  // 2. Verify image gallery has at least 4 images
  const imgs = getProductImages(p);
  if (imgs.length < 4) {
    throw new Error(`Product ${id} has only ${imgs.length} gallery images, required >= 4`);
  }
  console.log(`   - Gallery images count: ${imgs.length}`);

  // 3. Verify reviews generated
  const revs = getProductReviews(p);
  if (revs.length === 0 || !revs[0].verified) {
    throw new Error(`Product ${id} failed to generate valid verified reviews`);
  }

  // 4. Verify specifications exist
  if (!p.specs || Object.keys(p.specs).length === 0) {
    throw new Error(`Product ${id} missing specifications`);
  }
});

// 5. Test rating breakdown calculations
const highRatingBreakdown = getRatingBreakdown(4.8);
if (highRatingBreakdown.fiveStar < 70) {
  throw new Error('Rating breakdown for high rating is incorrect');
}
console.log('✓ Rating breakdown logic verified');

// 6. Test recommendations across catalog
products.forEach(p => {
  const sameCat = products.filter(o => o.id !== p.id && o.category === p.category);
  if (sameCat.length === 0) {
    throw new Error(`No recommendation alternatives found for category: ${p.category}`);
  }
});
console.log(`✓ Category recommendations verified for all ${products.length} products`);

// 7. Non-existent product test
const nonExistent = getProductById('not-real-product-xyz');
if (nonExistent !== undefined) {
  throw new Error('Nonexistent product did not return undefined');
}
console.log('✓ Non-existent product lookup gracefully returned undefined');

console.log('ALL MILESTONE 4 VERIFICATIONS PASSED SUCCESSFULLY!');
