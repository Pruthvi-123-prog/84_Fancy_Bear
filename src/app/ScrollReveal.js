'use client';

import { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollReveal.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.05,
  baseRotation = 2,
  blurStrength = 3,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom"
}) => {
  const containerRef = useRef(null);

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((word, index) => {
      if (word.match(/^\s+$/)) return word;
      return (
        <span 
          className="word inline-block transition-all duration-300 hover:text-blue-400 hover:scale-105" 
          key={index}
          style={{
            transformOrigin: 'center bottom',
            willChange: 'transform, opacity, filter'
          }}
        >
          {word}
        </span>
      );
    });
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller =
      scrollContainerRef && scrollContainerRef.current
        ? scrollContainerRef.current
        : window;

    // Enhanced container rotation animation
    gsap.fromTo(
      el,
      { 
        transformOrigin: '0% 50%', 
        rotate: baseRotation,
        scale: 0.98
      },
      {
        ease: 'power2.out',
        rotate: 0,
        scale: 1,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom-=10%',
          end: rotationEnd,
          scrub: 1.5,
        },
      }
    );

    const wordElements = el.querySelectorAll('.word');

    // Enhanced word reveal animation with stagger effect
    gsap.fromTo(
      wordElements,
      { 
        opacity: baseOpacity, 
        y: 30,
        rotateX: -90,
        willChange: 'opacity, transform, filter'
      },
      {
        ease: 'power3.out',
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.03,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom-=15%',
          end: wordAnimationEnd,
          scrub: 2,
        },
      }
    );

    // Enhanced blur effect with improved performance
    if (enableBlur) {
      gsap.fromTo(
        wordElements,
        { 
          filter: `blur(${blurStrength}px) brightness(0.7)`,
          scale: 0.95
        },
        {
          ease: 'power2.out',
          filter: 'blur(0px) brightness(1)',
          scale: 1,
          stagger: 0.02,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=15%',
            end: wordAnimationEnd,
            scrub: 1.8,
          },
        }
      );
    }

    // Add subtle glow effect on scroll
    gsap.fromTo(
      wordElements,
      { 
        textShadow: '0 0 0px rgba(59, 130, 246, 0)'
      },
      {
        textShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
        stagger: 0.02,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom-=20%',
          end: 'top center',
          scrub: 1,
          onComplete: () => {
            // Add completion glow
            gsap.to(wordElements, {
              textShadow: '0 0 30px rgba(59, 130, 246, 0.4)',
              duration: 0.8,
              ease: 'power2.out',
              stagger: 0.01
            });
          }
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <div ref={containerRef} className={`scroll-reveal ${containerClassName}`}>
      <div className={`scroll-reveal-text ${textClassName}`} style={{ perspective: '1000px' }}>
        {splitText}
      </div>
    </div>
  );
};

export default ScrollReveal;
