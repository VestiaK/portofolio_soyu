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
import discord from "../assets/images/contact/discord.png";
import behance from "../assets/images/contact/behance.png";
import instagram from "../assets/images/contact/instagram.png";
import linkedin from "../assets/images/contact/linkedIn.png";

import email from "../assets/images/contact/email.webp";
import music from "@/assets/music/dreamy_sparks.mp3";

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const pinad1Ref = useRef<HTMLImageElement>(null);
  const pinad2Ref = useRef<HTMLImageElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(true);

  // Add mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice =
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
        window.innerWidth < 768;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
              For the best experience, we recommend viewing this portfolio on a
              desktop or laptop computer.
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
                    <Image
                      src={instagram}
                      alt="instagram"
                      className="w-7 h-7 mr-4 object-contain shrink-0"
                    />
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
                    <Image
                      src={behance}
                      alt="behance"
                      className="w-7 h-7 mr-4 object-contain shrink-0"
                    />

                    <div>
                      <p className="font-bold text-[#6b5b4d]">Behance</p>
                      <p className="text-sm">nadyabuditj</p>
                    </div>
                  </a>

                  {/* Discord */}
                  <div className="flex items-center p-4 bg-[#f5ece1] rounded-lg border border-[#6b5b4d]">
                    <Image
                      src={discord}
                      alt="discord"
                      className="w-7 h-7 mr-4 object-contain shrink-0"
                    />
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
                    <Image
                      src={email}
                      alt="email"
                      className="w-7 h-7 mr-4 object-contain shrink-0"
                    />
                    <div>
                      <p className="font-bold text-[#6b5b4d]">Email</p>
                      <p className="text-sm">nadyatjandra04@gmail.com</p>
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/nadyatjandra-k21n0304/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-[#f5ece1] rounded-lg hover:bg-[#e0ccbc] transition-colors border border-[#6b5b4d]"
                  >
                    <Image
                      src={linkedin}
                      alt="linkedin"
                      className="w-7 h-7 mr-4 object-contain shrink-0"
                    />
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
