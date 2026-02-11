"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, Quote, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface Review {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url?: string;
}

interface ReviewsData {
  reviews: Review[];
  rating: number;
  totalReviews: number;
}

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviewsData, setReviewsData] = useState<ReviewsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const response = await fetch("/api/reviews");
        const data = await response.json();
        setReviewsData(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReviews();
  }, []);

  const reviews = reviewsData?.reviews || [];
  const overallRating = reviewsData?.rating || 5.0;
  const totalReviews = reviewsData?.totalReviews || 0;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Get initials from name for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section id="testimonials" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 mb-4">
            <Image
              src="/images/google-logo.svg"
              alt="Google"
              width={20}
              height={20}
              className="opacity-80"
            />
            <span className="text-[#2F3E4E] font-semibold text-sm">
              Google Bewertungen
            </span>
          </div>
          <h2 className="font-headline text-3xl md:text-4xl lg:text-5xl text-[#2D2D2D] mb-6">
            Was Familien sagen
          </h2>
          <p className="text-lg text-[#5A5A5A] max-w-2xl mx-auto">
            Echte Bewertungen von Familien, die mit Skills4Life erfolgreich
            durch schwierige Schulphasen navigiert haben.
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#2F3E4E]" />
          </div>
        )}

        {/* Reviews Content */}
        {!isLoading && reviews.length > 0 && (
          <>
            {/* Testimonials Carousel - Mobile */}
            <div className="md:hidden">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="border border-[#E8DCC8] shadow-xl bg-white rounded-2xl">
                  <CardContent className="p-8">
                    <Quote className="text-[#2F3E4E] mb-4" size={32} />

                    <div className="flex space-x-1 mb-4">
                      {[...Array(reviews[currentIndex]?.rating || 5)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className="text-[#2F3E4E] fill-[#2F3E4E]"
                          />
                        )
                      )}
                    </div>

                    <p className="text-[#2D2D2D] text-lg leading-relaxed mb-6">
                      {reviews[currentIndex]?.text}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-[#2F3E4E] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {getInitials(reviews[currentIndex]?.author_name || "")}
                        </div>
                        <div>
                          <p className="font-semibold text-[#2D2D2D]">
                            {reviews[currentIndex]?.author_name}
                          </p>
                          <p className="text-sm text-[#5A5A5A]">
                            {reviews[currentIndex]?.relative_time_description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-center space-x-4 mt-6">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={prevTestimonial}
                    className="rounded-full border-[#2F3E4E] text-[#2F3E4E]"
                  >
                    <ChevronLeft size={20} />
                  </Button>
                  <div className="flex items-center space-x-2">
                    {reviews.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === currentIndex
                            ? "bg-[#2F3E4E]"
                            : "bg-[#E8DCC8]"
                        }`}
                      />
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={nextTestimonial}
                    className="rounded-full border-[#2F3E4E] text-[#2F3E4E]"
                  >
                    <ChevronRight size={20} />
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Testimonials Grid - Desktop */}
            <div className="hidden md:grid md:grid-cols-2 gap-6">
              {reviews.slice(0, 4).map((review, index) => (
                <motion.div
                  key={review.author_name + index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <Card className="h-full border border-[#E8DCC8] shadow-lg hover:shadow-xl transition-shadow bg-white rounded-2xl">
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <Quote className="text-[#2F3E4E]" size={28} />
                        <div className="flex space-x-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              size={16}
                              className="text-[#2F3E4E] fill-[#2F3E4E]"
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-[#2D2D2D] leading-relaxed mb-6 line-clamp-4">
                        {review.text}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-[#E8DCC8]">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-[#2F3E4E] rounded-full flex items-center justify-center text-white font-semibold">
                            {getInitials(review.author_name)}
                          </div>
                          <div>
                            <p className="font-semibold text-[#2D2D2D]">
                              {review.author_name}
                            </p>
                            <p className="text-sm text-[#5A5A5A]">
                              {review.relative_time_description}
                            </p>
                          </div>
                        </div>
                        <Image
                          src="/images/google-logo.svg"
                          alt="Google Review"
                          width={24}
                          height={24}
                          className="opacity-60"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <a
            href="https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-6 bg-[#F3E8D7] px-8 py-4 rounded-full shadow-lg border border-[#E8DCC8] hover:shadow-xl transition-shadow"
          >
            <Image
              src="/images/google-logo.svg"
              alt="Google"
              width={28}
              height={28}
            />
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="text-[#2F3E4E] fill-[#2F3E4E]"
                  />
                ))}
              </div>
              <span className="font-semibold text-[#2D2D2D]">
                {overallRating.toFixed(1)}
              </span>
            </div>
            <div className="h-8 w-px bg-[#E8DCC8]" />
            <div>
              <span className="text-[#5A5A5A]">
                {totalReviews > 0
                  ? `${totalReviews} Bewertungen`
                  : "Bewertung schreiben"}
              </span>
            </div>
          </a>

          {/* CTA after social proof */}
          <div className="mt-10">
            <p className="text-[#2D2D2D] font-medium mb-4">
              Werde Teil unserer Erfolgsgeschichten
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[#2F3E4E] hover:bg-[#1A2530] text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg"
            >
              <Link href="#standortbestimmung" className="flex items-center space-x-2">
                <span>Die Situation Ihres Kindes einschätzen</span>
                <ArrowRight size={20} />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
