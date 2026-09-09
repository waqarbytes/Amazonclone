import React, { useState } from 'react';
import { Product } from '../../types';
import { getProductReviews, getRatingBreakdown } from '../../data/mockReviews';
import { Star, CheckCircle, ThumbsUp } from 'lucide-react';

interface ProductReviewsProps {
  product: Product;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({ product }) => {
  const reviews = getProductReviews(product);
  const breakdown = getRatingBreakdown(product.rating);
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const starPercentages = [
    { stars: 5, pct: breakdown.fiveStar },
    { stars: 4, pct: breakdown.fourStar },
    { stars: 3, pct: breakdown.threeStar },
    { stars: 2, pct: breakdown.twoStar },
    { stars: 1, pct: breakdown.oneStar },
  ];

  const handleHelpful = (reviewId: string, current: number) => {
    setHelpfulVotes(prev => ({
      ...prev,
      [reviewId]: (prev[reviewId] ?? current) + 1
    }));
  };

  const filteredReviews = filterRating 
    ? reviews.filter(r => r.rating === filterRating)
    : reviews;

  const displayedReviews = showAll ? filteredReviews : filteredReviews.slice(0, 3);

  return (
    <section id="customer-reviews" className="space-y-6 pt-4">
      <div className="border-b border-gray-200 pb-2 flex items-baseline justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-amazon-text">
            Customer Reviews
          </h2>
          <p className="text-xs text-amazon-muted">
            Verified ratings and customer feedback for {product.title}
          </p>
        </div>
        <span className="text-[11px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full border border-gray-200 font-medium">
          Simulated Demo Data
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Aggregate Rating & Breakdown (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center text-amazon-amber">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200'}`}
                />
              ))}
            </div>
            <span className="text-2xl font-black text-amazon-text">
              {product.rating.toFixed(1)} <span className="text-sm font-normal text-amazon-muted">out of 5</span>
            </span>
          </div>

          <p className="text-xs text-gray-500">
            Based on {product.reviewCount.toLocaleString()} global ratings
          </p>

          {/* Star Distribution Bars */}
          <div className="space-y-2 pt-2">
            {starPercentages.map(({ stars, pct }) => (
              <button
                key={stars}
                type="button"
                onClick={() => setFilterRating(prev => (prev === stars ? null : stars))}
                className={`
                  w-full flex items-center gap-3 text-xs group text-left rounded-md p-1 transition
                  ${filterRating === stars ? 'bg-amber-50 ring-1 ring-amazon-amber' : 'hover:bg-gray-50'}
                `}
              >
                <span className="w-12 text-amazon-link group-hover:underline font-semibold flex-shrink-0">
                  {stars} star
                </span>
                <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amazon-amber group-hover:bg-amber-500 transition-all rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="w-9 text-right text-gray-500 font-medium flex-shrink-0">
                  {pct}%
                </span>
              </button>
            ))}
          </div>

          {filterRating && (
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setFilterRating(null)}
                className="text-xs text-amazon-link hover:underline font-semibold"
              >
                Showing {filterRating}-star reviews only (Clear filter)
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Customer Reviews List (8 cols) */}
        <div className="lg:col-span-8 space-y-5">
          {displayedReviews.length === 0 ? (
            <div className="p-6 bg-gray-50 rounded-xl text-center text-xs text-gray-500">
              No reviews match the selected {filterRating}-star filter.
              <button
                type="button"
                onClick={() => setFilterRating(null)}
                className="block mx-auto mt-2 text-amazon-link font-semibold hover:underline"
              >
                Reset review filters
              </button>
            </div>
          ) : (
            displayedReviews.map((rev) => {
              const currentHelpful = helpfulVotes[rev.id] ?? rev.helpfulCount;
              return (
                <article 
                  key={rev.id} 
                  className="p-4 bg-white rounded-xl border border-gray-200/90 shadow-2xs space-y-2.5 text-xs text-gray-700"
                >
                  {/* Reviewer Header */}
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-full ${rev.avatarColor} text-white font-bold flex items-center justify-center text-[11px]`}>
                      {rev.author.charAt(0)}
                    </div>
                    <span className="font-semibold text-amazon-text">{rev.author}</span>
                  </div>

                  {/* Rating, Headline, and Verified Badge */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center text-amazon-amber">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-current' : 'text-gray-200'}`}
                        />
                      ))}
                    </div>
                    <h3 className="font-bold text-amazon-text text-xs">
                      {rev.title}
                    </h3>
                  </div>

                  {/* Date & Verified */}
                  <div className="flex items-center gap-2 text-[11px] text-gray-500">
                    <span>Reviewed in the United States on {rev.date}</span>
                    {rev.verified && (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Verified Purchase
                      </span>
                    )}
                  </div>

                  {/* Body Text */}
                  <p className="leading-relaxed text-gray-800">
                    {rev.content}
                  </p>

                  {/* Helpful Vote Button */}
                  <div className="pt-1 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleHelpful(rev.id, rev.helpfulCount)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-gray-200 hover:bg-gray-50 text-[11px] font-semibold text-gray-700 active:scale-95 transition"
                    >
                      <ThumbsUp className="w-3 h-3 text-gray-500" />
                      <span>Helpful</span>
                    </button>
                    <span className="text-[11px] text-gray-500">
                      {currentHelpful} people found this helpful
                    </span>
                  </div>
                </article>
              );
            })
          )}

          {/* See all / collapse toggle */}
          {filteredReviews.length > 3 && (
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setShowAll(prev => !prev)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 text-xs font-bold text-amazon-text transition"
              >
                {showAll ? 'Show Fewer Reviews' : `See All Reviews (${filteredReviews.length})`}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
