import { Product } from '../types';

export interface ReviewItem {
  id: string;
  author: string;
  avatarColor: string;
  rating: number;
  title: string;
  date: string;
  verified: boolean;
  content: string;
  helpfulCount: number;
}

export function getProductReviews(product: Product): ReviewItem[] {
  // Generate realistic reviews customized to the product's brand, title, and key feature
  const brand = product.brand;
  const mainFeature = product.features[0] || 'performance';
  const secondaryFeature = product.features[1] || 'design';

  return [
    {
      id: `rev-${product.id}-1`,
      author: 'Marcus Vance',
      avatarColor: 'bg-emerald-600',
      rating: 5,
      title: `Best in its category — exceptional ${secondaryFeature.toLowerCase()}`,
      date: 'August 18, 2026',
      verified: true,
      content: `I've tested several alternatives before settling on this ${brand} product. The ${mainFeature.toLowerCase()} exceeded my expectations right out of the box. Build quality feels sturdy, reliable, and worth every penny. If you are on the fence, definitely pick it up while it is on sale.`,
      helpfulCount: 42
    },
    {
      id: `rev-${product.id}-2`,
      author: 'Elena Rostova',
      avatarColor: 'bg-blue-600',
      rating: 5,
      title: 'Fast Prime delivery and premium packaging',
      date: 'July 29, 2026',
      verified: true,
      content: `Arrived next morning in perfect condition via Prime. Setting it up was seamless and took less than 3 minutes. The attention to detail that ${brand} put into this is noticeable immediately. Very happy with this purchase.`,
      helpfulCount: 29
    },
    {
      id: `rev-${product.id}-3`,
      author: 'David K.',
      avatarColor: 'bg-purple-600',
      rating: 4,
      title: 'Solid product with great everyday reliability',
      date: 'June 14, 2026',
      verified: true,
      content: `Overall a 4.5 star experience. The ${secondaryFeature.toLowerCase()} works flawlessly. The only minor critique is that the documentation could be slightly more detailed, but intuitive controls made that a non-issue. Would recommend to friends and colleagues.`,
      helpfulCount: 15
    },
    {
      id: `rev-${product.id}-4`,
      author: 'Sarah Jenkins',
      avatarColor: 'bg-amber-600',
      rating: 5,
      title: 'Game changer for my daily routine',
      date: 'May 3, 2026',
      verified: true,
      content: `I use this every single day now. It feels durable, looks sleek on my desk/countertop, and lives up to all the hype. Outstanding value.`,
      helpfulCount: 8
    }
  ];
}

export function getRatingBreakdown(rating: number) {
  // Generates plausible rating distribution percentages based on overall score
  if (rating >= 4.8) {
    return { fiveStar: 84, fourStar: 11, threeStar: 3, twoStar: 1, oneStar: 1 };
  } else if (rating >= 4.6) {
    return { fiveStar: 78, fourStar: 14, threeStar: 5, twoStar: 2, oneStar: 1 };
  } else if (rating >= 4.3) {
    return { fiveStar: 68, fourStar: 20, threeStar: 7, twoStar: 3, oneStar: 2 };
  } else {
    return { fiveStar: 58, fourStar: 24, threeStar: 10, twoStar: 5, oneStar: 3 };
  }
}
