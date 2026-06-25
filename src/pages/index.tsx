"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Book from "@/components/book";
import pinad1 from "../assets/images/pinad-idle.png";
import pinad2 from "../assets/images/pinad-twink.png";
import board from "../assets/images/hero/board.png";
import pict from "../assets/images/hero/pict.png";
import Image from "next/image";
import TypewriterDialog from "@/components/typingtext";
import Hero from "../assets/images/hero.png";
import contactme1 from "../assets/images/contact/contactme_1.png";
import contactme2 from "../assets/images/contact/contactme_2.png";
import contactme3 from "../assets/images/contact/contactme_3.png";
import contactme4 from "../assets/images/contact/contactme_4.png";
import contactme5 from "../assets/images/contact/contactme_5.png";
import music from "@/assets/music/dreamy_sparks.mp3"; // Import file musik

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const pinad1Ref = useRef<HTMLImageElement>(null);
  const pinad2Ref = useRef<HTMLImageElement>(null);
  const [isMuted, setIsMuted] = useState(true); // Default muted untuk menghindari autoplay
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(true);

  // Add mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Add this new component near the top of the return statement

  // Handle interaksi pertama
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasUserInteracted(true);
      if (audioRef.current && !hasUserInteracted) {
        audioRef.current.play().catch(console.error);
      }
    };

    document.addEventListener("click", handleFirstInteraction, { once: true });
    return () => document.removeEventListener("click", handleFirstInteraction);
  }, []);

  // Sync mute state dengan audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Efek untuk animasi pinad (sudah ada sebelumnya)
  useEffect(() => {
    const pinad1: any = pinad1Ref.current;
    const pinad2: any = pinad2Ref.current;

    const handleMouseEnter = () => {
      pinad1.style.opacity = "1";
      pinad2.style.opacity = "2";
      if (pinad1 && pinad2) {
        pinad2.style.opacity = "1";
      }
    };

    const handleMouseLeave = () => {
      if (pinad1 && pinad2) {
        pinad2.style.opacity = "0";
      }
    };

    const container = pinad1?.parentElement;
    if (container) {
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <main className="w-full">
        {isMobile && showMobileWarning && (
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#f5ece1] rounded-2xl p-8 max-w-md text-center border-4 border-[#6b5b4d]">
        <h2 className="text-2xl font-bold mb-4 text-[#6b5b4d]">
          📱 Mobile Device Detected
        </h2>
        <p className="mb-6 text-[#6b5b4d]">
          For the best experience, we recommend viewing this portfolio on a desktop or laptop computer.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setShowMobileWarning(false)}
            className="px-6 py-2 bg-[#6b5b4d] text-[#f5ece1] rounded-full hover:bg-[#8a7665] transition-colors"
          >
            Continue Anyway
          </button>
        </div>
      </div>
    </div>
  )}
      {/* Audio element */}
      <audio ref={audioRef} loop muted={isMuted}>
        <source src="/music/dreamy_sparks.mp3" type="audio/mpeg" />
      </audio>

      {/* Tombol mute */}
      <button
        onClick={handleToggleMute}
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-[#f5ece1] hover:bg-[#e0ccbc] transition-colors shadow-lg border-2 border-[#6b5b4d]"
        aria-label={isMuted ? "Unmute musik" : "Mute musik"}
      >
        <svg
          className="w-6 h-6 text-[#6b5b4d]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMuted ? (
            // Icon mute
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
              clipPath="url(#mute-clip)"
            />
          ) : (
            // Icon unmute
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.536 8.464a5 5 0 010 7.072M12 6.253v11.497M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            />
          )}
        </svg>
      </button>
      {/* HERO */}
      <section className="w-full h-screen bg-[#f5ece1] flex items-center justify-center sticky top-0 z-10 hero relative">
        <Image src={board} alt="Pinad Board" className="w-[80vw]" />

        {/* HERO image di tengah */}
        <Image
          src={Hero}
          alt="Hero Image"
          className="absolute z-20 w-[30vw] max-w-[400px] object-contain"
          style={{
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* pict foreground */}
        <Image
          src={pict}
          alt="Pinad Pict"
          className="w-[95vw] absolute z-10 mb-[25px]"
        />
      </section>

      {/* DIALOG */}
      <section className="w-full min-h-screen rounded-t-[50px]  sticky top-0 z-20 dialog mt-[300px] flex flex-col drop-shadow-2xl">
        <div className="flex items-end justify-center flex-col-reverse sm:flex-col-reverse md:flex-row min-h-[95vh]">
          <div
            className="w-[70vw] min-h-[25vh] flex dialog-box items-center transition-transform duration-300"
            style={{}}
          >
            <TypewriterDialog
              texts={[
                "Hello! I'm Nadya but you can call me Soyu!",
                "I'm a passionate creative with a love for Illustration and design",
                "This portfolio is a collection of my works and experiences",
                "lets dive in!",
              ]}
              typingSpeed={40}
              onComplete={() => console.log("Dialog selesai!")}
            />
          </div>

          <div className="flex-1 min-h-[25vh] transition-transform duration-300 relative flex justify-center items-end mb-[-2vh]">
            <Image
              ref={pinad1Ref}
              src={pinad1}
              alt="Pinad 1"
              width={500}
              className="absolute transition-opacity duration-300 opacity-100"
            />
            <Image
              ref={pinad2Ref}
              src={pinad2}
              alt="Pinad 2"
              width={500}
              className="absolute"
            />
          </div>
        </div>
        <div className="min-h-[5vh] bg-[#e0ccbc] border-t-3 border-slate-800 z-10 relative"></div>
      </section>

      {/* BOOK */}
      <section className="w-full min-h-screen bg-[#e0ccbc] rounded-t-[50px] sticky top-0 z-30 flex flex-col mt-[300px] drop-shadow-2xl">
        <div className="flex-1 flex items-center justify-center">
          <div className=" max-h-screen min-h-max w-fit drop-shadow-2xl">
            <Book />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="w-full min-h-screen bg-[#e0ccbc] rounded-t-[50px] flex items-center justify-center sticky top-0 z-40 mt-[300px] drop-shadow-2xl ">
        {/* contactme1 - pojok kanan bawah */}
        <div className="absolute bottom-0 right-0  w-[25vw]">
          <Image src={contactme1} alt="contactme1" layout="responsive" />
        </div>

        {/* contactme2 - pojok kiri bawah */}
        <div className="absolute bottom-0 left-0 w-[15vw]">
          <Image src={contactme2} alt="contactme2" layout="responsive" />
        </div>

        {/* contactme3 - di atas contactme1, ada jarak */}
        <div className="absolute top-0 right-0  w-[25vw]">
          <Image src={contactme3} alt="contactme3" layout="responsive" />
        </div>

        {/* contactme4 - tengah agak ke kanan + hover scale */}
        <div className="absolute top-1/3 right-1/3  w-[13vw]">
          <Image src={contactme4} alt="contactme4" layout="responsive" />
        </div>

        {/* contactme5 - kanan dari contactme2 + hover scale */}
        <div
          className="absolute bottom-0 left-100 top-40 w-[18vw] transition-transform duration-300 hover:scale-110 cursor-pointer"
          onClick={() => setShowContactForm(true)}
        >
          <Image src={contactme5} alt="contactme5" layout="responsive" />
        </div>
        {/* Modal Overlay */}
        <AnimatePresence>
          {showContactForm && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-[rgba(0,0,0,0.3)] backdrop-blur-sm"
                onClick={() => setShowContactForm(false)}
              />

              {/* Modal Content - Animasi seperti HP diangkat */}

              <motion.div
                className="relative bg-[rgba(245,236,225,0.7)] p-8 rounded-2xl w-full max-w-md backdrop-blur-lg border-2 border-white/20 shadow-xl mx-4"
                initial={{
                  y: "100vh",
                  rotate: "-2deg",
                  scale: 0.8,
                }}
                animate={{
                  y: 0,
                  rotate: "0deg",
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 100,
                    damping: 10,
                  },
                }}
                exit={{
                  y: "100vh",
                  rotate: "2deg",
                  scale: 0.8,
                  transition: { duration: 0.3 },
                }}
              >
                <button
                  className="absolute top-4 right-4 text-[#6b5b4d] hover:text-[#8a7665] text-2xl"
                  onClick={() => setShowContactForm(false)}
                >
                  ✕
                </button>
                <h2 className="text-3xl font-bold mb-6 text-[#6b5b4d] text-center">
                  Let's Connect! ✨
                </h2>

                <div className="space-y-4">
                  {/* Instagram */}
                  <a
                    href="https://www.instagram.com/soyuwanmi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-[#f5ece1] rounded-lg hover:bg-[#e0ccbc] transition-colors border border-[#6b5b4d]"
                  >
                    <svg
                      className="w-8 h-8 mr-4 text-[#6b5b4d]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                    <div>
                      <p className="font-bold text-[#6b5b4d]">Instagram</p>
                      <p className="text-sm">@soyuwanmi</p>
                    </div>
                  </a>

                  {/* Behance */}
                  <a
                    href="https://www.behance.net/nadyabuditj"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-[#f5ece1] rounded-lg hover:bg-[#e0ccbc] transition-colors border border-[#6b5b4d]"
                  >
                    <svg
                      className="w-8 h-8 mr-4 text-[#6b5b4d]"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M272 160h96v32h-96v-32zm127.5 48c-31.9 0-64.5 24.2-64.5 70.5S368 349 399.5 349c38.1 0 55.6-22.2 62.5-44.2h-32.8c-3.3 9.6-13.2 17.3-29.7 17.3-19.5 0-32.8-13.8-34.8-31.7h99.2c.4-3 .6-6 .6-9.1 0-38.5-22.6-71.3-66-71.3zm-31.2 56c1.7-13.5 13.3-25 30.2-25s28.3 11.5 30 25h-60.2zM80 160H16v192h80.5c56 0 94.5-23.1 94.5-64 0-24.6-13.8-40.5-35.2-47.2v-.6c17.6-8.2 28.7-22.5 28.7-43.2 0-40.8-36.5-56-84.5-56zm-1 32h29c17.7 0 34 7.1 34 24.5 0 18.2-16.3 25.5-34 25.5H79v-50zm0 80h34c21.3 0 38 6.4 38 27s-16.7 27-38 27H79v-54z" />
                    </svg>

                    <div>
                      <p className="font-bold text-[#6b5b4d]">Behance</p>
                      <p className="text-sm">nadyabuditj</p>
                    </div>
                  </a>

                  {/* Discord */}
                  <div className="flex items-center p-4 bg-[#f5ece1] rounded-lg border border-[#6b5b4d]">
                    <svg
                      className="w-8 h-8 mr-4 text-[#6b5b4d]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z" />
                    </svg>
                    <div>
                      <p className="font-bold text-[#6b5b4d]">Discord</p>
                      <p className="text-sm">soyuwanmi</p>
                    </div>
                  </div>

                  {/* Email */}
                  <a
                    href="https://mail.google.com/mail/?view=cm&to=nadyatjandra04@gmail.com"
                    className="flex items-center p-4 bg-[#f5ece1] rounded-lg hover:bg-[#e0ccbc] transition-colors border border-[#6b5b4d]"
                  >
                    <svg
                      className="w-8 h-8 mr-4 text-[#6b5b4d]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                    <div>
                      <p className="font-bold text-[#6b5b4d]">Email</p>
                      <p className="text-sm">nadyatjandra04@gmail.com</p>
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/nadya-budi-tjandra"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-[#f5ece1] rounded-lg hover:bg-[#e0ccbc] transition-colors border border-[#6b5b4d]"
                  >
                    <svg
                      className="w-8 h-8 mr-4 text-[#6b5b4d]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                    <div>
                      <p className="font-bold text-[#6b5b4d]">LinkedIn</p>
                      <p className="text-sm">Nadya Budi Tjandra</p>
                    </div>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}
