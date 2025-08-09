"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return timeLeft;
    };
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);
  if (timeLeft === null) return null;
  return (
    <div className="flex gap-2 justify-center mb-2">
      <div className="bg-pink-200 rounded-lg px-3 py-2 text-center">
        <div className="text-2xl font-bold">
          {String(timeLeft.days).padStart(2, "0")}
        </div>
        <div className="text-xs font-semibold">Hari</div>
      </div>
      <div className="bg-pink-200 rounded-lg px-3 py-2 text-center">
        <div className="text-2xl font-bold">
          {String(timeLeft.hours).padStart(2, "0")}
        </div>
        <div className="text-xs font-semibold">Jam</div>
      </div>
      <div className="bg-pink-200 rounded-lg px-3 py-2 text-center">
        <div className="text-2xl font-bold">
          {String(timeLeft.minutes).padStart(2, "0")}
        </div>
        <div className="text-xs font-semibold">Menit</div>
      </div>
      <div className="bg-pink-200 rounded-lg px-3 py-2 text-center">
        <div className="text-2xl font-bold">
          {String(timeLeft.seconds).padStart(2, "0")}
        </div>
        <div className="text-xs font-semibold">Detik</div>
      </div>
    </div>
  );
}

const FlowerSVG = ({ className = "" }) => (
  <svg
    className={className}
    width="80"
    height="80"
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <ellipse
        cx="40"
        cy="20"
        rx="12"
        ry="24"
        fill="#f9c2d1"
        fillOpacity="0.8"
      />
      <ellipse
        cx="60"
        cy="40"
        rx="12"
        ry="24"
        fill="#f7b7b7"
        fillOpacity="0.8"
        transform="rotate(60 60 40)"
      />
      <ellipse
        cx="40"
        cy="60"
        rx="12"
        ry="24"
        fill="#f9c2d1"
        fillOpacity="0.8"
      />
      <ellipse
        cx="20"
        cy="40"
        rx="12"
        ry="24"
        fill="#f7b7b7"
        fillOpacity="0.8"
        transform="rotate(60 20 40)"
      />
      <circle cx="40" cy="40" r="12" fill="#f06292" fillOpacity="0.9" />
    </g>
  </svg>
);

// Simple photo frame with subtle decorations
const PhotoFrame = ({ src = "/Depan.jpg" }: { src?: string }) => (
  <div className="relative w-44 h-60 md:w-56 md:h-72 rounded-2xl p-1 bg-gradient-to-br from-pink-200 to-pink-50 border-2 border-pink-200 shadow-lg">
    <div className="absolute -top-3 -left-3 opacity-50">
      <FlowerSVG className="w-8 h-8" />
    </div>
    <div className="absolute -bottom-3 -right-3 opacity-50">
      <FlowerSVG className="w-8 h-8" />
    </div>
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-white">
      <Image src={src} alt="Foto Pasangan" fill className="object-cover" />
    </div>
  </div>
);

// Reveal on scroll helper
function RevealOnScroll({
  children,
  className = "",
  delayMs = 0,
  once = false,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);
  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out will-change-transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}

// Animated floating flowers background layer (vector)
const FloatingFlowers = () => {
  const items = [
    {
      top: "6%",
      left: "8%",
      size: 80,
      anim: "animate-flower-float",
      opacity: 0.45,
    },
    {
      top: "16%",
      left: "74%",
      size: 110,
      anim: "animate-flower-float-slow",
      opacity: 0.4,
    },
    {
      top: "34%",
      left: "12%",
      size: 70,
      anim: "animate-flower-float-reverse",
      opacity: 0.35,
    },
    {
      top: "46%",
      left: "82%",
      size: 95,
      anim: "animate-flower-float",
      opacity: 0.45,
    },
    {
      top: "64%",
      left: "6%",
      size: 100,
      anim: "animate-flower-float-slow",
      opacity: 0.4,
    },
    {
      top: "76%",
      left: "62%",
      size: 76,
      anim: "animate-flower-float",
      opacity: 0.45,
    },
  ];
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {items.map((it, idx) => (
        <div
          key={idx}
          className={`absolute ${it.anim}`}
          style={{ top: it.top, left: it.left, opacity: it.opacity }}
        >
          <FlowerSVG className="" />
        </div>
      ))}
    </div>
  );
};

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [guest, setGuest] = useState("");
  const audioRef = useRef<HTMLAudioElement>(null);
  const [ucapanList, setUcapanList] = useState<
    Array<{
      nama: string;
      jumlahTamu: string;
      kehadiran: string;
      ucapan: string;
    }>
  >([]);
  const [namaUcapan, setNamaUcapan] = useState("");
  const [jumlahTamu, setJumlahTamu] = useState("");
  const [kehadiran, setKehadiran] = useState("");
  const [ucapan, setUcapan] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const to = params.get("to");
      if (to) {
        setGuest(decodeURIComponent(to));
      } else {
        setGuest("Tamu Undangan");
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    // initialize
    setIsPlaying(!audio.paused);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  };

  // Lock scroll while cover is open
  useEffect(() => {
    if (typeof document === "undefined") return;

    const htmlEl = document.documentElement;
    const bodyEl = document.body;

    const originalHtmlOverflow = htmlEl.style.overflow;
    const originalBodyOverflow = bodyEl.style.overflow;
    const originalBodyHeight = bodyEl.style.height;

    const prevent = (e: Event) => {
      e.preventDefault();
    };

    if (!opened) {
      htmlEl.style.overflow = "hidden";
      bodyEl.style.overflow = "hidden";
      bodyEl.style.height = "100vh";
      window.scrollTo(0, 0);
      window.addEventListener("wheel", prevent, { passive: false });
      window.addEventListener("touchmove", prevent, { passive: false });
    } else {
      htmlEl.style.overflow = originalHtmlOverflow || "";
      bodyEl.style.overflow = originalBodyOverflow || "";
      bodyEl.style.height = originalBodyHeight || "";
      window.removeEventListener("wheel", prevent as EventListener);
      window.removeEventListener("touchmove", prevent as EventListener);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return () => {
      htmlEl.style.overflow = originalHtmlOverflow || "";
      bodyEl.style.overflow = originalBodyOverflow || "";
      bodyEl.style.height = originalBodyHeight || "";
      window.removeEventListener("wheel", prevent as EventListener);
      window.removeEventListener("touchmove", prevent as EventListener);
    };
  }, [opened]);

  const handleOpen = (e: React.FormEvent) => {
    e.preventDefault();
    setOpened(true);
    setTimeout(() => {
      audioRef.current?.play();
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 300);
  };

  // Otomatis buka undangan jika ada nama tamu
  // useEffect(() => {
  //   if (guest && guest !== "") {
  //     setOpened(true);
  //     setTimeout(() => {
  //       audioRef.current?.play();
  //     }, 300);
  //   }
  // }, [guest]);

  // Tambahkan handler untuk submit form ucapan
  const handleUcapanSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!namaUcapan || !jumlahTamu || !kehadiran || !ucapan) return;
    setUcapanList((prev) => [
      ...prev,
      {
        nama: namaUcapan,
        jumlahTamu,
        kehadiran,
        ucapan,
      },
    ]);
    setNamaUcapan("");
    setJumlahTamu("");
    setKehadiran("");
    setUcapan("");
  };

  return (
    <div className="font-sans min-h-screen text-gray-800 relative overflow-hidden">
      {/* Animated vector flowers background */}
      <FloatingFlowers />
      {/* Main content stays above flowers */}
      <div className="relative z-10">
        {/* Cover Section */}
        {!opened && (
          <section className="fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen w-full bg-white/90 backdrop-blur-sm relative overflow-hidden">
            {/* Floating flowers inside cover overlay */}
            <FloatingFlowers />
            <div className="flex flex-col items-center w-full max-w-md mx-auto px-4 py-10 relative z-10">
              {/* Ornamen bunga atas */}
              <div className="mb-2">
                <FlowerSVG />
              </div>
              {/* Foto pasangan */}
              <div className="rounded-2xl overflow-hidden border-4 border-pink-200 shadow-lg bg-white w-40 h-56 flex items-center justify-center mx-auto mb-4">
                <Image
                  src="/Depan.JPG"
                  alt="Pasangan"
                  width={180}
                  height={240}
                  className="object-cover w-full h-full"
                />
              </div>
              {/* Judul dan nama pasangan */}
              <div className="text-center mb-4">
                <div className="text-base md:text-lg tracking-widest text-gray-700 font-semibold mb-1 uppercase">
                  The Wedding Of
                </div>
                <div
                  className="text-3xl md:text-4xl font-bold text-pink-700 mb-2 font-[cursive]"
                  style={{
                    fontFamily:
                      'cursive, "Dancing Script", "Great Vibes", serif',
                  }}
                >
                  Shandy & Salwa
                </div>
              </div>
              {/* Sapaan tamu */}
              <div className="text-gray-700 text-lg font-medium text-center mb-2">
                Kepada Yth:
                <div className="text-xl font-bold text-pink-700 mt-1">
                  {guest} dan Partner
                </div>
                <div className="text-base text-gray-500">Di Tempat</div>
              </div>
              <button
                onClick={handleOpen}
                className="mt-4 bg-gray-700 hover:bg-pink-600 text-white font-semibold py-2 px-8 rounded shadow transition flex items-center gap-2"
              >
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <rect width="24" height="24" fill="none" />
                  <path
                    d="M4 8l8 8 8-8"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Buka Undangan
              </button>
              {/* Ornamen bunga bawah */}
              <div className="mt-6">
                <FlowerSVG />
              </div>
            </div>
          </section>
        )}
        {/* Audio player (autoplay after open) */}
        <audio ref={audioRef} src="/wedding-song.mp3" loop hidden />
        {/* Main Invitation */}
        <div
          className={
            opened
              ? "opacity-100 safe-bottom"
              : "opacity-0 pointer-events-none select-none"
          }
        >
          {/* Floating music toggle */}
          {opened && (
            <>
              <div className="fixed bottom-24 right-4 z-50">
                <button
                  onClick={toggleAudio}
                  aria-label={isPlaying ? "Matikan musik" : "Mulai musik"}
                  className="relative w-12 h-12 rounded-full bg-pink-500 hover:bg-pink-600 text-white shadow-lg flex items-center justify-center"
                >
                  {isPlaying && (
                    <span className="absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-40 animate-ping"></span>
                  )}
                  {isPlaying ? (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="6" y="4" width="4" height="16"></rect>
                      <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                  ) : (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8 5v14l11-7-11-7z"></path>
                    </svg>
                  )}
                </button>
              </div>
              {/* Bottom nav */}
              <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-md rounded-full shadow-lg px-3 py-2 flex gap-2 items-center">
                {[
                  {
                    id: "home",
                    label: "Home",
                    icon: (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3 12l9-9 9 9" />
                        <path d="M9 21V9h6v12" />
                      </svg>
                    ),
                  },
                  {
                    id: "profil",
                    label: "Profil",
                    icon: (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5" />
                        <path d="M2 22a10 10 0 0 1 20 0" />
                      </svg>
                    ),
                  },
                  {
                    id: "acara",
                    label: "Acara",
                    icon: (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" />
                        <path d="M16 2v4M8 2v4M3 10h18" />
                      </svg>
                    ),
                  },
                  {
                    id: "galeri",
                    label: "Galeri",
                    icon: (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                      </svg>
                    ),
                  },
                  {
                    id: "amplop",
                    label: "Amplop",
                    icon: (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M4 4h16v16H4z" />
                        <path d="M22 6l-10 7L2 6" />
                      </svg>
                    ),
                  },
                  {
                    id: "ucapan",
                    label: "Ucapan",
                    icon: (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 15a4 4 0 0 1-4 4H7l-4 4V5a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                      </svg>
                    ),
                  },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="group inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-pink-100 text-pink-600"
                    title={item.label}
                    aria-label={item.label}
                  >
                    {item.icon}
                  </a>
                ))}
              </nav>
            </>
          )}
          {/* 1. Countdown & Simpan Kalender */}
          <section
            id="home"
            className="flex flex-col items-center justify-center py-8 px-4 bg-white/80 rounded-xl shadow mb-6 mt-4"
          >
            {/* Photo frame at top */}
            <RevealOnScroll className="mb-6 flex justify-center">
              <PhotoFrame src="/Depan.jpg" />
            </RevealOnScroll>
            <RevealOnScroll className="mb-4" delayMs={50}>
              <div className="text-base md:text-lg tracking-widest text-gray-700 font-semibold mb-1 uppercase">
                The Wedding Of
              </div>
              <div
                className="text-3xl md:text-4xl font-bold text-pink-700 mb-2 font-[cursive]"
                style={{
                  fontFamily: 'cursive, "Dancing Script", "Great Vibes", serif',
                }}
              >
                Shandy & Salwa
              </div>
            </RevealOnScroll>
            <RevealOnScroll
              className="mb-2 text-center text-gray-700"
              delayMs={100}
            >
              Kami akan menikah, kami ingin anda menjadi bagian dari hari
              bahagia kami
            </RevealOnScroll>
            {/* Countdown */}
            <RevealOnScroll delayMs={150}>
              <Countdown targetDate="2029-06-29T08:00:00" />
            </RevealOnScroll>
            {/* Simpan di Kalender */}
            <RevealOnScroll delayMs={200}>
              <a
                href="data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ASUMMARY:Shandy%20%26%20Salwa%20Wedding%0ADESCRIPTION:Undangan%20Pernikahan%20Shandy%20%26%20Salwa%0ADTSTART:20290629T010000Z%0ADTEND:20290629T040000Z%0ALOCATION:Jl.%20Contoh%20Alamat%20No.%20123,%20Kota%0AEND:VEVENT%0AEND:VCALENDAR"
                download="ShandySalwaWedding.ics"
                className="block mt-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded shadow transition text-center"
              >
                Klik Simpan di Kalender
              </a>
            </RevealOnScroll>
            <RevealOnScroll
              className="mt-4 text-lg font-bold text-pink-700"
              delayMs={250}
            >
              Minggu, 29 Juni 2029
            </RevealOnScroll>
          </section>
          {/* 2. Pembukaan */}
          <section className="max-w-2xl mx-auto text-center py-4 px-4">
            <RevealOnScroll delayMs={0}>
              <p className="text-lg text-gray-700 mb-2">
                Assalamu'alaikum warahmatullahi wabarakatuh
              </p>
            </RevealOnScroll>
            <RevealOnScroll delayMs={100}>
              <p className="text-md text-gray-600">
                Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud
                mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan
                kami.
              </p>
            </RevealOnScroll>
          </section>
          {/* 3. Profil Mempelai */}
          <section className="max-w-3xl mx-auto py-8 px-4" id="profil">
            <RevealOnScroll>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-pink-500">
                Profil Mempelai
              </h2>
            </RevealOnScroll>
            <div className="flex flex-col md:flex-row items-center justify-center gap-10">
              <RevealOnScroll
                delayMs={50}
                className="flex flex-col items-center"
              >
                <Image
                  src="/Cowok1.jpg"
                  alt="Mempelai 1"
                  width={120}
                  height={160}
                  className="rounded-full object-cover border-4 border-pink-200 mb-2 w-[120px] h-[120px]"
                />
                <span className="font-semibold text-lg">
                  Mochamad Shandy Firdaus
                </span>
                <span className="text-sm text-gray-500">
                  Putra dari Bapak A & Ibu B
                </span>
              </RevealOnScroll>
              <span className="text-3xl text-pink-400 font-bold">&</span>
              <RevealOnScroll
                delayMs={100}
                className="flex flex-col items-center"
              >
                <Image
                  src="/Cewek1.JPG"
                  alt="Mempelai 2"
                  width={120}
                  height={160}
                  className="rounded-full object-cover border-4 border-pink-200 mb-2 w-[120px] h-[120px]"
                />
                <span className="font-semibold text-lg">Salwa Wafiyah</span>
                <span className="text-sm text-gray-500">
                  Putri dari Bapak C & Ibu D
                </span>
              </RevealOnScroll>
            </div>
          </section>
          {/* 4. Cerita Cinta */}
          <section className="bg-pink-50 py-8 px-4" id="cerita">
            <RevealOnScroll>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-pink-500">
                Cerita Cinta Kami
              </h2>
            </RevealOnScroll>
            <RevealOnScroll
              className="max-w-2xl mx-auto text-center text-gray-700 text-lg leading-relaxed"
              delayMs={100}
            >
              <p>
                Kami dipertemukan secara tak terduga, tumbuh bersama dalam suka
                dan duka, hingga akhirnya memutuskan untuk melangkah ke jenjang
                pernikahan. Semoga kisah kami menjadi inspirasi dan membawa
                kebahagiaan bagi semua yang hadir.
              </p>
            </RevealOnScroll>
          </section>
          {/* 5. Detail Acara */}
          <section className="bg-pink-100 py-8 px-4" id="acara">
            <RevealOnScroll>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-pink-500">
                Detail Acara
              </h2>
            </RevealOnScroll>
            <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
              <RevealOnScroll
                delayMs={50}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h3 className="text-xl font-semibold mb-2 text-pink-600">
                  Akad Nikah
                </h3>
                <p className="mb-1">Minggu, 29 Juni 2029</p>
                <p className="mb-1">08.00 WIB</p>
                <p>Jl. Contoh Alamat No. 123, Kota</p>
                <a
                  href="https://maps.google.com/?q=Jl.+Contoh+Alamat+No.+123,+Kota"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-pink-600 underline"
                >
                  Lihat Lokasi di Google Maps
                </a>
              </RevealOnScroll>
              <RevealOnScroll
                delayMs={100}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <h3 className="text-xl font-semibold mb-2 text-pink-600">
                  Resepsi
                </h3>
                <p className="mb-1">Minggu, 29 Juni 2029</p>
                <p className="mb-1">11.00 WIB - Selesai</p>
                <p>Jl. Contoh Alamat No. 123, Kota</p>
                <a
                  href="https://maps.google.com/?q=Jl.+Contoh+Alamat+No.+123,+Kota"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-pink-600 underline"
                >
                  Lihat Lokasi di Google Maps
                </a>
              </RevealOnScroll>
            </div>
          </section>
          {/* 6. Galeri Foto */}
          <section className="py-8 px-4" id="galeri">
            <RevealOnScroll>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-pink-500">
                Galeri Foto
              </h2>
            </RevealOnScroll>
            <RevealOnScroll
              delayMs={100}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
            >
              <Image
                src="/Cewek2.jpg"
                alt="Galeri 1"
                width={300}
                height={200}
                className="rounded-lg object-cover aspect-[4/3]"
              />
              <Image
                src="/Pasangan2.jpg"
                alt="Galeri 2"
                width={300}
                height={200}
                className="rounded-lg object-cover aspect-[4/3]"
              />
              <Image
                src="/Pasangan3.jpg"
                alt="Galeri 3"
                width={300}
                height={200}
                className="rounded-lg object-cover aspect-[4/3]"
              />
              <Image
                src="/Pasangan4.jpg"
                alt="Galeri 4"
                width={300}
                height={200}
                className="rounded-lg object-cover aspect-[4/3]"
              />
            </RevealOnScroll>
          </section>
          {/* 7. Amplop Digital */}
          <section className="bg-pink-50 py-8 px-4" id="amplop">
            <RevealOnScroll>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-pink-500">
                Amplop Digital
              </h2>
            </RevealOnScroll>
            <RevealOnScroll
              delayMs={100}
              className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6 text-center"
            >
              <p className="mb-2 text-gray-700">
                Bagi yang ingin mengirimkan tanda kasih, dapat melalui rekening
                berikut:
              </p>
              <div className="font-bold text-lg text-pink-700 mb-2">
                BCA 1234567890 a.n. Shandy
              </div>
              <div className="font-bold text-lg text-pink-700 mb-2">
                BNI 9876543210 a.n. Salwa
              </div>
              <p className="text-gray-500 text-sm">Atau scan QR berikut:</p>
              <Image
                src="/qrcode.jpg"
                alt="QR Amplop Digital"
                width={120}
                height={120}
                className="mx-auto mt-2"
              />
            </RevealOnScroll>
          </section>
          {/* Ayat Al-Qur'an tentang Pernikahan */}
          <section
            className="relative py-10 px-4 bg-gradient-to-b from-rose-50 via-pink-50 to-pink-100"
            id="ayat"
          >
            {/* subtle flower ornaments background */}
            <div className="absolute inset-0 pointer-events-none opacity-25">
              <div className="absolute -top-4 left-4 animate-flower-float-slow">
                <FlowerSVG className="w-16 h-16" />
              </div>
              <div className="absolute top-8 right-6 animate-flower-float">
                <FlowerSVG className="w-12 h-12" />
              </div>
              <div className="absolute bottom-6 left-12 animate-flower-float-reverse">
                <FlowerSVG className="w-10 h-10" />
              </div>
              <div className="absolute bottom-0 right-10 animate-flower-float">
                <FlowerSVG className="w-14 h-14" />
              </div>
            </div>
            <RevealOnScroll>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-pink-500">
                Ayat Al-Qur'an tentang Pernikahan
              </h2>
            </RevealOnScroll>
            <RevealOnScroll
              delayMs={100}
              className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-6 text-center"
            >
              <p className="text-2xl md:text-3xl leading-loose mb-3 font-[cursive] text-pink-700">
                وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُمْ مِنْ أَنْفُسِكُمْ أَزْوَاجًا
                لِتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَوَدَّةً وَرَحْمَةً
              </p>
              <p className="text-sm text-gray-500 italic mb-3">Ar-Rūm 30:21</p>
              <p className="text-gray-700">
                Dan di antara tanda-tanda (kebesaran) Allah ialah Dia
                menciptakan untukmu pasangan-pasangan dari jenismu sendiri agar
                kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan
                di antaramu rasa kasih dan sayang.
              </p>
            </RevealOnScroll>
          </section>
          {/* 8. Ucapan & Konfirmasi Kehadiran */}
          <section className="py-8 px-4" id="ucapan">
            <RevealOnScroll>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-pink-500">
                Ucapan & Konfirmasi Kehadiran
              </h2>
            </RevealOnScroll>
            <form
              onSubmit={handleUcapanSubmit}
              className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8 flex flex-col gap-4 mb-4"
            >
              <input
                type="text"
                placeholder="Nama"
                value={namaUcapan}
                onChange={(e) => setNamaUcapan(e.target.value)}
                className="border border-pink-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <input
                type="number"
                placeholder="Jumlah Tamu"
                value={jumlahTamu}
                onChange={(e) => setJumlahTamu(e.target.value)}
                className="border border-pink-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <select
                value={kehadiran}
                onChange={(e) => setKehadiran(e.target.value)}
                className="border border-pink-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
              >
                <option value="">Kehadiran</option>
                <option value="hadir">Hadir</option>
                <option value="tidak">Tidak Hadir</option>
              </select>
              <textarea
                placeholder="Ucapan & Doa"
                value={ucapan}
                onChange={(e) => setUcapan(e.target.value)}
                className="border border-pink-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <button
                type="submit"
                className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded shadow transition"
              >
                Kirim
              </button>
            </form>
            {/* Daftar ucapan */}
            <div className="max-w-md mx-auto mt-8">
              <h3 className="text-lg font-bold mb-4 text-pink-500">
                Daftar Ucapan & Konfirmasi
              </h3>
              {ucapanList.length === 0 && (
                <div className="text-gray-400 italic">Belum ada ucapan.</div>
              )}
              <ul className="space-y-4">
                {ucapanList.map((item, idx) => (
                  <li key={idx} className="bg-white rounded-lg shadow p-4">
                    <div className="font-bold text-pink-600">
                      {item.nama} ({item.kehadiran})
                    </div>
                    <div className="text-gray-700">{item.ucapan}</div>
                    <div className="text-xs text-gray-400">
                      Jumlah tamu: {item.jumlahTamu}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
          {/* 9. Penutup */}
          <footer className="bg-pink-200 text-center py-6 mt-8 text-pink-700 font-medium">
            <p>Atas kehadiran dan doa restunya kami ucapkan terima kasih.</p>
            <p className="text-lg font-bold mt-2">
              Wassalamu'alaikum warahmatullahi wabarakatuh
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
