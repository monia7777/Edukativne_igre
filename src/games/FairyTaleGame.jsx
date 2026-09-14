import { useMemo, useState, useEffect, useRef } from "react"

const ITEMS_PER_PAGE = 4

const fairyTales = [
  { title: "Miševi i mačke naglavačke", image: "/images/fairytales/misevi-macke.png", letter: "M" },
  { title: "Čudnovate zgode šegrta Hlapića", image: "/images/fairytales/hlapic.png", letter: "Č" },
  { title: "Vlak u snijegu", image: "/images/fairytales/vlak-u-snijegu.png", letter: "V" },
  { title: "Princeza na zrnu graška", image: "/images/fairytales/princeza-grasak.png", letter: "P" },

  { title: "Ključić oko vrata", image: "/images/fairytales/kljucic-oko-vrata.png", letter: "K" },
  { title: "Pripovijest o doktoru Dolittleu", image: "/images/fairytales/doktor-dolittle.png", letter: "D" },
  { title: "Crvenkapica", image: "/images/fairytales/crvenkapica.png", letter: "C" },
  { title: "Ivica i Marica", image: "/images/fairytales/ivica-marica.png", letter: "I" },

  { title: "Ježeva kućica", image: "/images/fairytales/jezeva-kucica.png", letter: "J" },
  { title: "Ružno pače", image: "/images/fairytales/ruzno-pace.png", letter: "R" },
  { title: "Tri medvjeda i gitara", image: "/images/fairytales/tri-medvjeda-gitara.png", letter: "T" },
  { title: "Heidi", image: "/images/fairytales/heidi.png", letter: "H" },

  { title: "Bijeli jelen", image: "/images/fairytales/bijeli-jelen.png", letter: "B" },
  { title: "Čarobnjak iz Oza", image: "/images/fairytales/carobnjak-iz-oza.png", letter: "Č" },
  { title: "Kralj žabac", image: "/images/fairytales/kralj-zabac.png", letter: "K" },
  { title: "Palčica", image: "/images/fairytales/palcica.png", letter: "P" },

  { title: "Pipi Duga Čarapa", image: "/images/fairytales/pipi-duga-carapa.png", letter: "P" },
  { title: "Družba Pere Kvržice", image: "/images/fairytales/druzba-pere-kvrzice.png", letter: "D" },
  { title: "Stanari u slonu", image: "/images/fairytales/stanari-u-slonu.png", letter: "S" },
  { title: "Vuk i sedam kozlića", image: "/images/fairytales/vuk-sedam-kozlica.png", letter: "V" },
]

function shuffleArray(array) {
  const copy = [...array]

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }

  return copy
}

export default function FairyTaleGame({ onBack }) {
  const [page, setPage] = useState(0)
  const [matched, setMatched] = useState({})
  const [message, setMessage] = useState("Povuci slovo na pravu sliku bajke!")
  const [raccoonJump, setRaccoonJump] = useState(false)
  const [flyingStar, setFlyingStar] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [introEnded, setIntroEnded] = useState(false)
  const [soundOn, setSoundOn] = useState(true)
  const backgroundMusicRef = useRef(null)
  const stars = Object.keys(matched).length
  const totalPages = Math.ceil(fairyTales.length / ITEMS_PER_PAGE)
  const isFinished = stars === fairyTales.length

  useEffect(() => {
    if (!isFinished || !soundOn) return

    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause()
    }

    const endingAudio = new Audio("/audio/ending_game.mp3")
    endingAudio.volume = 0.8
    endingAudio.play().catch(() => {})
  }, [isFinished, soundOn])

  const currentTales = fairyTales.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  )

  const currentLetters = useMemo(() => {
    return shuffleArray(currentTales.map((tale) => tale.letter))
  }, [page])

  const pageSolved = currentTales.every((tale) => matched[tale.title])
  const isLastPage = page === totalPages - 1

  function toggleSound() {
  setSoundOn(prev => !prev)
  }

  const pronunciation = {
  a: "a",
  b: "be",
  c: "ce",
  č: "če",
  ć: "će",
  d: "de",
  đ: "đe",
  e: "e",
  f: "ef",
  g: "ge",
  h: "ha",
  i: "i",
  j: "je",
  k: "ka",
  l: "el",
  m: "em",
  n: "en",
  o: "o",
  p: "pe",
  r: "er",
  s: "es",
  š: "eš",
  t: "te",
  u: "u",
  v: "ve",
  z: "ze",
  ž: "že",
}

function speakLetter(letter) {
  if (!soundOn) return

  speechSynthesis.cancel()

  const spokenLetter = pronunciation[letter.toLowerCase()] || letter

  const utterance = new SpeechSynthesisUtterance(spokenLetter)
  utterance.lang = "hr-HR"
  utterance.rate = 0.85
  utterance.pitch = 1.1
  utterance.volume = 1

  speechSynthesis.speak(utterance)
}

  useEffect(() => {
    backgroundMusicRef.current = new Audio("/audio/background_music.mp3")
    backgroundMusicRef.current.loop = true
    backgroundMusicRef.current.volume = 0.12

    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause()
      }
    }
  }, [])

  useEffect(() => {
    if (!backgroundMusicRef.current) return

    if (soundOn) {
      backgroundMusicRef.current.play().catch(() => {})
    } else {
      backgroundMusicRef.current.pause()
    }
  }, [soundOn])

  if (showIntro) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <button
        onClick={onBack}
        style={{
          position: "absolute",
          top: "25px",
          left: "27px",
          width: "56px",
          height: "56px",
          borderRadius: "18px",
          border: "3px solid #d8c8a8",
          background: "#f5ead2",
          cursor: "pointer",
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0",
        }}
      >
        <img
          src="/images/home_icon.png"
          alt="Početna"
          style={{
            width: "120px",
            height: "120px",
            objectFit: "contain",
          }}
        />
      </button>

      <button
        onClick={toggleSound}
        style={{
          position: "absolute",
          top: "25px",
          left: "100px",
          width: "56px",
          height: "56px",
          borderRadius: "18px",
          border: "3px solid #d8c8a8",
          background: "#f5ead2",
          cursor: "pointer",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "34px",
        }}
      >
        {soundOn ? "🔊" : "🔇"}
      </button>

      {!introEnded && (
        <button
          onClick={() => setIntroEnded(true)}
          style={{
            position: "absolute",
            top: "20px",
            right: "25px",
            zIndex: 30,
            padding: "14px 26px",
            borderRadius: "22px",
            background: "#f5ead2",
            border: "3px solid #d8c8a8",
            color: "#5b4630",
            fontSize: "22px",
            fontWeight: "800",
            cursor: "pointer",
            boxShadow: "0 4px 10px rgba(0,0,0,0.18)",
          }}
        >
          Preskoči ⏭
        </button>
      )}

      <video
        autoPlay
        muted
        playsInline
        onEnded={() => setIntroEnded(true)}
        style={{
          width: "100%",
          height: "100vh",
          objectFit: "cover",
        }}
      >
        <source
          src="/images/raccoon_intro.mp4"
          type="video/mp4"
        />
      </video>

      {introEnded && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "45px",
            transform: "translateX(-50%)",
            width: "700px",
            padding: "20px 28px",
            borderRadius: "28px",
            background: "rgba(239,227,200,0.96)",
            border: "4px solid #c9b080",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            zIndex: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          <img
            src="/images/mouse_helper.png"
            alt="Miš pomagač"
            style={{
              width: "95px",
              height: "95px",
              objectFit: "contain",
            }}
          />

          <div
            style={{
              flex: 1,
              textAlign: "left",
            }}
          >
            <div
              style={{
                fontSize: "34px",
                fontWeight: "900",
                color: "#5b4630",
                lineHeight: "1.1",
              }}
            >
              Rakun treba tvoju pomoć!
            </div>

            <div
              style={{
                fontSize: "22px",
                fontWeight: "700",
                color: "#6b533b",
                marginTop: "6px",
              }}
            >
              Povuci početno slovo na odgovarajuću bajku.
            </div>
          </div>

          <button
            onClick={() => {
              if (soundOn) {
                const clickAudio = new Audio("/audio/button_click.mp3")
                  clickAudio.volume = 1
                  clickAudio.play().catch(() => {})
              }

            setShowIntro(false)
          }}
          style={{
            fontSize: "24px",
            padding: "14px 26px",
            borderRadius: "18px",
            cursor: "pointer",
            background: "#b4c9aa",
            border: "3px solid #dfead9",
            color: "#355234",
            fontWeight: "900",
          }}
        >
            Dalje ➜
          </button>
        </div>
      )}
    </main>
  )
}

  if (isFinished) {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/images/library-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button
        onClick={onBack}
        style={{
          position: "absolute",
          top: "25px",
          left: "27px",
          width: "56px",
          height: "56px",
          borderRadius: "18px",
          border: "3px solid #d8c8a8",
          background: "#f5ead2",
          cursor: "pointer",
          zIndex: 9999,
          boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0",
        }}
      >
        <img
          src="/images/home_icon.png"
          alt="Početna"
          style={{
            width: "120px",
            height: "120px",
            objectFit: "contain",
          }}
        />
      </button>

      <button
        onClick={toggleSound}
        style={{
          position: "absolute",
          top: "25px",
          left: "100px",
          width: "56px",
          height: "56px",
          borderRadius: "18px",
          border: "3px solid #d8c8a8",
          background: "#f5ead2",
          cursor: "pointer",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "34px",
      }}
    >
        {soundOn ? "🔊" : "🔇"}
      </button>

      <div
  style={{
    position: "absolute",
    top: "40px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "760px",
    display: "flex",
    alignItems: "center",
    gap: "28px",
    padding: "22px 30px",
    background: "rgba(245,236,215,0.98)",
    border: "4px solid #c9b080",
    borderRadius: "30px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.22)",
    zIndex: 20,
  }}
>
  <img
    src="/images/mouse_helper.png"
    alt="Miš pomagač"
    style={{
      width: "120px",
      height: "120px",
      objectFit: "contain",
      flexShrink: 0,
    }}
  />

  <div
    style={{
      flex: 1,
      textAlign: "center",
    }}
  >
    <div
      style={{
        fontSize: "48px",
        fontWeight: "900",
        color: "#5b4630",
      }}
    >
      Bravo!
    </div>

    <div
      style={{
        fontSize: "24px",
        fontWeight: "700",
        color: "#6b533b",
        marginTop: "6px",
      }}
    >
      Pobijedili smo! Pomogli smo rakunu pročitati i zapamtiti imena bajki!
    </div>

    <div
      style={{
        marginTop: "10px",
        fontSize: "34px",
        fontWeight: "900",
        color: "#c79b12",
      }}
    >
      ⭐ {stars} / {fairyTales.length} ⭐
    </div>
  </div>
</div>

      <style>
        {`
          @keyframes happyRaccoonJump {
            0%, 100% {
              transform: translateY(0) scale(1);
            }
            50% {
              transform: translateY(-45px) scale(1.04);
            }
          }
        `}
      </style>

      <img
        src="/images/skakajuci_rakun.png"
        alt="Sretni rakun"
        style={{
          width: "440px",
          maxWidth: "80vw",
          marginTop: "220px",
          animation: "happyRaccoonJump 0.8s ease-in-out infinite",
          filter: "drop-shadow(0 18px 18px rgba(0,0,0,0.35))",
        }}
      />
    </main>
  )
}

 function handleDragStart(event, letter) {
  speakLetter(letter)
  event.dataTransfer.setData("letter", letter)
}

  function allowDrop(event) {
    event.preventDefault()
  }

  function handleDrop(event, tale) {
    event.preventDefault()

    if (matched[tale.title]) return

    const draggedLetter = event.dataTransfer.getData("letter")

    if (draggedLetter === tale.letter) {
      setMatched((prev) => ({
        ...prev,
        [tale.title]: draggedLetter,
      }))

      setMessage(`Bravo! To je bajka "${tale.title}".`)
      setRaccoonJump(true)
      setFlyingStar(true)

      if (soundOn) {
        const starAudio = new Audio("/audio/stars.mp3")
        starAudio.volume = 0.8
        starAudio.play().catch(() => {})
      }

      setTimeout(() => setRaccoonJump(false), 500)
      setTimeout(() => setFlyingStar(false), 900)
    } else {
      setMessage("Pokušaj ponovno! To slovo ne pripada toj slici.")
    }
  }

  function nextPage() {
    if (soundOn) {
      const clickAudio = new Audio("/audio/button_click.mp3")
      clickAudio.volume = 1
      clickAudio.play().catch(() => {})
    }

    setPage((prev) => prev + 1)
    setMessage("Povuci slovo na pravu sliku bajke!")
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/images/library-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "visible",
        textAlign: "center",
        padding: "150px 40px 35px",
        boxSizing: "border-box",
      }}
    >
      <button
        onClick={onBack}
        style={{
          position: "absolute",
          top: "25px",
          left: "27px",
          width: "56px",
          height: "56px",
          borderRadius: "18px",
          border: "3px solid #d8c8a8",
          background: "#f5ead2",
          cursor: "pointer",
          zIndex: 9999,
          boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0",
        }}
      >
        <img
          src="/images/home_icon.png"
          alt="Početna"
          style={{
            width: "120px",
            height: "120px",
            objectFit: "contain",
          }}
        />
      </button>

      <button
        onClick={toggleSound}
        style={{
          position: "absolute",
          top: "25px",
          left: "100px",
          width: "56px",
          height: "56px",
          borderRadius: "18px",
          border: "3px solid #d8c8a8",
          background: "#f5ead2",
          cursor: "pointer",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "34px",
        }}
      >
        {soundOn ? "🔊" : "🔇"}
      </button>
      
<div
  style={{
    position: "absolute",
    top: "6px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "760px",
    display: "flex",
    alignItems: "center",
    gap: "22px",
    padding: "16px 24px",
    background: "rgba(245,236,215,0.96)",
    border: "3px solid #c9b080",
    borderRadius: "22px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
    zIndex: 15,
  }}
>
  <img
    src="/images/mouse_helper.png"
    alt="Miš pomagač"
    style={{
      width: "100px",
      height: "100px",
      objectFit: "contain",
      flexShrink: 0,
    }}
  />

  <div
    style={{
      flex: 1,
      textAlign: "left",
    }}
  >
    <div
      style={{
        fontSize: "25px",
        fontWeight: "700",
        color: "#6b533b",
      }}
    >
      {message}
    </div>
  </div>
</div>

      <div
        style={{
          position: "absolute",
          top: "38px",
          right: "30px",
          fontSize: "28px",
          fontWeight: "700",
          fontFamily: "var(--heading)",
          background: "rgba(248,241,227,0.95)",
          border: "2px solid #d7c7a4",
          padding: "6px 16px",
          borderRadius: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          zIndex: 20,
        }}
      >
        ⭐ {stars} / {fairyTales.length}
      </div>

      <div
        style={{
          position: "absolute",
          top: "0",
          left: "-20px",
          width: "calc(100% + 40px)",
          height: "120px",
          background: "linear-gradient(180deg, #8c6542, #6f4b2c)",
          borderTop: "2px solid #a67c52",
          borderBottom: "4px solid #4a2f18",
          boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
          zIndex: 5,
        }}
      />

      <section
        style={{
          maxWidth: "980px",
          margin: "0 auto",
          padding: "18px 22px 22px",
          borderRadius: "30px",
          background: "rgba(239, 227, 200, 0.94)",
          border: "4px solid #c9b080",
          boxShadow: "0 10px 28px rgba(0,0,0,0.28)",
          position: "relative",
          zIndex: 15,
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "18px",
            flexWrap: "wrap",
            marginBottom: "14px",
          }}
        >
          {currentLetters.map((letter, index) => {
            const usedOnThisPage = currentTales.some(
              (tale) => matched[tale.title] === letter
            )

            return (
              <div
                key={`${letter}-${index}`}
                draggable={!usedOnThisPage}
                onDragStart={(event) => handleDragStart(event, letter)}
                style={{
                  width: "78px",
                  height: "78px",
                  borderRadius: "24px",
                  background: usedOnThisPage ? "#d8c8a8" : "#b4c9aa",
                  border: "3px solid #dfead9",
                  color: "#fff",
                  fontSize: "50px",
                  fontWeight: "900",
                  fontFamily: "var(--reading)",
                  display: "grid",
                  placeItems: "center",
                  lineHeight: "1",
                  cursor: usedOnThisPage ? "not-allowed" : "grab",
                  boxShadow: "0 5px 14px rgba(0,0,0,0.2)",
                  opacity: usedOnThisPage ? 0.45 : 1,
                  userSelect: "none",
                }}
              >
                <span style={{ transform: "translateY(-2px)" }}>
                  {letter}
                </span>
              </div>
            )
          })}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "18px",
          }}
        >
          {currentTales.map((tale) => {
            const solved = matched[tale.title]

            return (
              <div
                key={tale.title}
                onDragOver={allowDrop}
                onDrop={(event) => handleDrop(event, tale)}
                style={{
                  borderRadius: "24px",
                  padding: "8px",
                  background: solved ? "#f7df8a" : "rgba(255,247,230,0.9)",
                  border: solved
                    ? "4px solid #b8860b"
                    : "4px dashed #c9b080",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minHeight: "335px",
                  boxSizing: "border-box",
                }}
              >
                <img
                  src={tale.image}
                  alt={tale.title}
                  style={{
                    width: "100%",
                    height: "230px",
                    objectFit: "contain",
                    borderRadius: "18px",
                    border: "3px solid #fff7e6",
                    background: "#fff7e6",
                  }}
                />

                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    borderRadius: "18px",
                    background: solved ? "#b4c9aa" : "#efe3c8",
                    border: "3px solid #c9b080",
                    color: solved ? "#fff" : "#8c6542",
                    fontSize: "36px",
                    fontWeight: "900",
                    fontFamily: "var(--reading)",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  {solved || "?"}
                </div>

                {solved && (
                  <div
                    style={{
                      fontFamily: "var(--heading)",
                      fontSize: "22px",
                      fontWeight: "900",
                      textAlign: "center",
                      lineHeight: "1.12",
                      marginTop: "6px",
                      color: "#5b4630",
                    }}
                  >
                      {tale.title}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {pageSolved && !isLastPage && (
          <button
            onClick={nextPage}
            style={{
              marginTop: "18px",
              fontSize: "22px",
              padding: "12px 30px",
              borderRadius: "18px",
              cursor: "pointer",
              background: "#b4c9aa",
              border: "3px solid #dfead9",
              color: "#355234",
              fontWeight: "800",
              boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
            }}
          >
            Dalje ➜
          </button>
        )}

        {isFinished && (
          <button
            onClick={onBack}
            style={{
              marginTop: "18px",
              fontSize: "22px",
              padding: "12px 30px",
              borderRadius: "18px",
              cursor: "pointer",
              background: "#b4c9aa",
              border: "3px solid #dfead9",
              color: "#355234",
              fontWeight: "800",
              boxShadow: "0 4px 12px rgba(0,0,0,0.18)",
            }}
          >
            Povratak u školu ➜
          </button>
        )}
      </section>

      {flyingStar && (
         <div
          style={{
            position: "absolute",
            right: "250px",
            top: "52%", 
            fontSize: "52px",
            zIndex: 9999,
            pointerEvents: "none",
            animation: "flyToCounter 0.9s ease-out forwards",
          }}
        >
          ⭐
        </div>
      )}

      <style>
        {`
          @keyframes flyToCounter {
            0% {
              transform: translate(0, 0) scale(1);
              opacity: 1;
            }
            100% {
              transform: translate(220px, -420px) scale(0.25);
              opacity: 0;
            }
          }
        `}
      </style>

      <img
        src="/images/raccoon-student.png"
        alt="Rakun"
        style={{
          position: "absolute",
          right: "-40px",
          bottom: "25px",
          width: "260px",
          zIndex: 50,
          transition: "0.3s ease",
          transform: raccoonJump
            ? "translateY(-35px) scale(1.05)"
            : "translateY(0) scale(1)",
        }}
      />
    </main>
  )
}