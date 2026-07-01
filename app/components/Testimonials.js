"use client";
import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import { db } from '../../lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const defaultReviews = [
  {
    name: "Sergio F",
    text: "Agil, rapido y economico, sencillo de rastrear y el servicio al cliente es espectacular",
    stars: 5
  },
  {
    name: "Franco T",
    text: "Atentos, rapidos, excelente servicios, los mejores",
    stars: 5
  },
  {
    name: "Jean Carlo S",
    text: "Excelente servicio, no hay mejor empresa en el país",
    stars: 5
  },
  {
    name: "Jonathan H",
    text: "Excelente servicio al cliente y los mejores precios del mercado",
    stars: 5
  },
  {
    name: "Katherine M",
    text: "Traer mis paquetes de Miami nunca fue tan fácil y rápido. ¡Super recomendados!",
    stars: 5
  },
  {
    name: "Alejandro V",
    text: "Me ayudaron con una compra asistida en China y todo llegó perfecto. Excelente comunicación.",
    stars: 5
  },
  {
    name: "Priscilla R",
    text: "Tienen tarifas súper competitivas y el rastreo de paquetes funciona de maravilla.",
    stars: 5
  },
  {
    name: "Mauricio Q",
    text: "Increíble la rapidez de entrega en el país. El personal es muy amable y atento.",
    stars: 5
  }
];

export default function Testimonials() {
  const [reviews, setReviews] = useState(defaultReviews);

  useEffect(() => {
    const q = query(collection(db, "testimonials"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dbReviews = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        dbReviews.push({
          name: data.name,
          text: data.text,
          stars: data.stars || 5
        });
      });
      setReviews([...dbReviews, ...defaultReviews]);
    }, (error) => {
      console.error("Error fetching testimonials from Firebase:", error);
    });

    return () => unsubscribe();
  }, []);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: "start",
      slidesToScroll: 1
    }, 
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    
    const updateSnaps = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
    };
    
    // Update snaps asynchronously to avoid the lint warning
    setTimeout(updateSnaps, 0);
    
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', () => {
      updateSnaps();
      onSelect();
    });
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  }, [emblaApi]);

  return (
    <section className="testimonials-section" style={{ 
      padding: "8rem 2rem", 
      background: "#0A0A0A", 
      color: "#FFFFFF",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Background Radial Glow */}
      <div style={{
        position: "absolute",
        bottom: "-100px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "600px",
        height: "300px",
        background: "radial-gradient(circle, rgba(20, 177, 189, 0.15) 0%, rgba(5, 5, 5, 0) 70%)",
        zIndex: 0,
        pointerEvents: "none"
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        
        {/* Upper Pill Label */}
        <div style={{ marginBottom: "2.5rem", textAlign: "center" }}>
          <span style={{ 
            color: "var(--primary, #14B1BD)", 
            border: "1px solid var(--primary, #14B1BD)", 
            padding: "0.5rem 2rem", 
            borderRadius: "50px", 
            textTransform: "uppercase", 
            fontSize: "0.85rem", 
            letterSpacing: "2px", 
            fontWeight: 600,
            display: "inline-block"
          }}>
            TESTIMONIALES
          </span>
        </div>

        {/* Title */}
        <h2 style={{ 
          fontSize: "clamp(2rem, 5vw, 3rem)", 
          fontWeight: 900, 
          textAlign: "center",
          marginBottom: "4rem", 
          letterSpacing: "-1px"
        }}>
          Opiniones de nuestros <span style={{ color: "var(--primary, #14B1BD)" }}>clientes</span>
        </h2>

        {/* Testimonials Carousel */}
        <div className="embla" ref={emblaRef} style={{ overflow: "hidden", cursor: "grab", padding: "1rem 0" }}>
          <div className="embla__container" style={{ display: "flex" }}>
            {reviews.map((review, index) => (
              <div 
                className="embla__slide" 
                key={index} 
                style={{ 
                  flex: "0 0 100%",
                  minWidth: 0,
                  padding: "0 0.75rem",
                }}
              >
                {/* Testimonial Card */}
                <div style={{
                  background: "#161616",
                  border: "1px solid rgba(20, 177, 189, 0.08)",
                  borderRadius: "16px",
                  padding: "2.5rem 2rem",
                  height: "260px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "all 0.3s ease",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(20, 177, 189, 0.35)";
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 15px 35px rgba(20, 177, 189, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(20, 177, 189, 0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.2)";
                }}
                >
                  <div>
                    {/* Stars */}
                    <div style={{ display: "flex", gap: "0.25rem", marginBottom: "1.5rem" }}>
                      {[...Array(review.stars)].map((_, i) => (
                        <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="var(--primary, #14B1BD)">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>

                    {/* Review Text */}
                    <p style={{ 
                      color: "rgba(255, 255, 255, 0.8)", 
                      fontSize: "1.05rem", 
                      lineHeight: "1.6",
                      fontWeight: "400"
                    }}>
                      &ldquo;{review.text}&rdquo;
                    </p>
                  </div>

                  {/* Customer Name */}
                  <div style={{ marginTop: "1.5rem" }}>
                    <span style={{ 
                      color: "#FFFFFF", 
                      fontWeight: "700", 
                      fontSize: "1.2rem",
                      letterSpacing: "0.5px"
                    }}>
                      {review.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Indicators / Dots */}
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: "0.5rem", 
          marginTop: "3rem" 
        }}>
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              style={{
                width: selectedIndex === index ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: selectedIndex === index ? "var(--primary, #14B1BD)" : "rgba(255, 255, 255, 0.2)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              }}
              aria-label={`Ir al comentario ${index + 1}`}
            />
          ))}
        </div>

      </div>

      {/* CSS Styles for Responsive Flex Basis */}
      <style jsx global>{`
        .embla__slide {
          flex: 0 0 100% !important;
        }
        @media (min-width: 640px) {
          .embla__slide {
            flex: 0 0 50% !important;
          }
        }
        @media (min-width: 1024px) {
          .embla__slide {
            flex: 0 0 25% !important;
          }
        }
      `}</style>
    </section>
  );
}
