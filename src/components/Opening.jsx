// PinnedWordRevealPage.jsx
import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
 
gsap.registerPlugin(ScrollTrigger);

export default function PinnedWordRevealPage() {
  const sectionRef = useRef(null);
  const wordsRef = useRef([]);

  // Your sentence (edit freely)
  const sentence =
    "The foundation of AI action—connecting agents to tools and enabling them to execute complex tasks autonomously across your enterprise.";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // collect word nodes
      const words = wordsRef.current.filter(Boolean);
      if (!words.length) return;

      // ensure starting state (no movement, only opacity)
      gsap.set(words, { opacity: 0.1 });

      // timeline that fades words in with stagger (no y/scale/rotation)
      const tl = gsap.timeline().to(words, {
        opacity: 1,
        stagger: 0.22,           // reveal gap between words
        duration: 0.4,           // fade duration per word
        ease: "power1.out",
      });

      // pin the section for the whole animation,
      // and scrub so opacity follows scroll
      const st = ScrollTrigger.create({
        trigger: sectionRef.current,
        animation: tl,
        start: "top top",
        end: "+=" + words.length * 50, // pin length based on word count
        pin: true,          // lock the screen to this section
        scrub: true,        // tie progress to scroll for smoothness
        markers: false,
        anticipatePin: 1,
      });

      // Removed GSAP navbar toggling. Navbar.jsx controls navbar theme via viewport detection to prevent flicker during pinning.

      return () => {
        st.kill();
        tl.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="page-openingO">
            <svg className="top-svg" xmlns="http://www.w3.org/2000/svg" width="927" height="26" viewBox="0 0 927 26" fill="none">
  <path d="M927 0H0L46 26H881L927 0Z" fill="#1A1A1A"/>
</svg>
<svg className="bottom-svg" xmlns="http://www.w3.org/2000/svg" width="927" height="26" viewBox="0 0 927 26" fill="none">
  <path d="M927 26H0L46 0H881L927 26Z" fill="#1A1A1A"/>
</svg>
      <style>{`
        /* Page base - unique to OpeningO */
        .page-openingO {
          min-height: 100vh;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          position: relative;
        }

        /* Text box */
        .hero-wrap-openingO {
          max-width: 1100px;
          width: 100%;
          position: relative;
          z-index: 10;
        }

        .headline-openingO {
          margin: 0;
          font-family: "Alliance No.2";
          font-weight: 300;
font-size: clamp(1rem, 10vw, 2.75rem);
          line-height: 1.3;
          color: #333333;
          text-align: center;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Keep words inline but targetable */
        .headline-openingO .word {
          display: inline-block;
          opacity: 0;
          will-change: opacity;
          margin-right: 10px;
        }

        /* Optional subtle color accents */
        .muted-openingO { color: #666666; }
        .highlight-openingO { color: #84D04D; }

        /* Vector grid styling - unique to OpeningO */
        .hard-grid-openingO {
          margin: 0 53px 0 53px;
          display: flex;
          flex-direction: column;
          gap: 32px;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .top-grid-openingO {
          margin-top: 70px; /* Pushed down by 20px from 35px */
        }

        .bottom-grid-openingO {
          margin-top: 650px; /* Pushed down by 50px from 350px */
          margin-bottom: 35px;
        }

        .hard-row-openingO {
          display: flex;
          gap: 27px;
          justify-content: center;
          pointer-events: auto;
        }

        /* Ensure text is above the grid */
        .hero-wrap-openingO {
          z-index: 20;
        }

        .top-svg {
          position: absolute;
          top: 0;
          transform: translateX(0);
          z-index: 10;
        }
          .bottom-svg {
            position: absolute;
            bottom: -1px;
            transform: translateX(0);
            z-index: 10;
          }
            @media (max-width: 900px) {
              .top-svg {
                position: absolute;
                top: -9px;
        transform: translateX(0) scale(0.6);
                z-index: 10;
              }
                .bottom-svg {
                  position: absolute;
                  bottom: -9px;
        transform: translateX(0) scale(0.6);
                  z-index: 10;
                }
            }
                 @media (max-width: 480px) {
              .top-svg {
                position: absolute;
                top: -9px;
        transform: translateX(0) scale(0.35);
                z-index: 10;
              }
                .bottom-svg {
                  position: absolute;
                  bottom: -9px;
        transform: translateX(0) scale(0.35);
                  z-index: 10;
                }
            }
      `}</style>

      <div className="hero-wrap-openingO">

        <h1 className="headline-openingO" aria-label={sentence}>
          {sentence.split(" ").map((w, i) => (
            <span
              key={i}
              className={`word${
                // Green highlighted words based on the image
                ["The", "foundation", "of", "AI", "action—connecting", "agents","across","your","enterprise"].includes(
                  w.replace(/[^\w-—]/g, "")
                )
                  ? " highlight-openingO"
                  : ""
                }`}
              ref={(el) => (wordsRef.current[i] = el)}
            >
              {w}
              {i < sentence.split(" ").length - 1 ? " " : ""}
            </span>
          ))}
        </h1>
      </div>
    </div>
  );
}
