import { useState, useMemo, useEffect, useRef } from "react"


const wordTasks = [
  {
    word: "Palčica",
    image: "/images/fairytales/palcica.png",
  },
  {
    word: "Pače",
    image: "/images/fairytales/ruzno-pace.png",
  },
  {
    word: "Crvenkapica",
    image: "/images/fairytales/crvenkapica.png",
  },
  {
    word: "Ivica",
    image: "/images/fairytales/ivica-marica.png",
  },
  {
    word: "Marica",
    image: "/images/fairytales/ivica-marica.png",
  },
  {
    word: "Medvjed",
    image: "/images/fairytales/tri-medvjeda-gitara.png",
  },
  {
    word: "Heidi",
    image: "/images/fairytales/heidi.png",
  },
  {
    word: "Jež",
    image: "/images/fairytales/jezeva-kucica.png",
  },
  {
    word: "Žabac",
    image: "/images/fairytales/kralj-zabac.png",
  },
  {
    word: "Slon",
    image: "/images/fairytales/stanari-u-slonu.png",
  },
  {
    word: "Kozlić",
    image: "/images/fairytales/vuk-sedam-kozlica.png",
  },
  {
    word: "Čarobnjak",
    image: "/images/fairytales/carobnjak-iz-oza.png",
  },
  {
    word: "Dolittle",
    image: "/images/fairytales/doktor-dolittle.png",
  },
  {
    word: "Hlapić",
    image: "/images/fairytales/hlapic.png",
  },
  {
    word: "Jelen",
    image: "/images/fairytales/bijeli-jelen.png",
  },
]

function shuffleArray(array) {
  const copy = [...array]

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }

  return copy
}

export default function SquirrelGame({ onBack }) {
  const [taskIndex, setTaskIndex] = useState(0)
  const [pickedLetters, setPickedLetters] = useState([])
  const [usedIndexes, setUsedIndexes] = useState([])
  const [stars, setStars] = useState(0)
  const [showPanel, setShowPanel] = useState(false)
  const [flyingStar, setFlyingStar] = useState(false)
  const [squirrelJump, setSquirrelJump] = useState(false)
  const [blink, setBlink] = useState(false)
  const [clap, setClap] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [introEnded, setIntroEnded] = useState(false)
  const [soundOn, setSoundOn] = useState(true)
  const backgroundMusicRef = useRef(null)

  const currentTask = wordTasks[taskIndex]
  const isFinished = !currentTask

  useEffect(() => {
    if (!isFinished || !soundOn) return

    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.pause()
    }

    const endingAudio = new Audio("/audio/ending_game.mp3")
    endingAudio.volume = 0.8
    endingAudio.play().catch(() => {})
  }, [isFinished, soundOn])

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true)

      setTimeout(() => {
        setBlink(false)
      }, 230)
    }, 2300)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
  if (!isFinished) return

  setClap(true)

  const firstTimeout = setTimeout(() => {
    setClap(false)
  }, 620)

  // Zatim nastavi pljeskati
  const interval = setInterval(() => {
    setClap(true)

    setTimeout(() => {
      setClap(false)
    }, 620)
  }, 1500)

  return () => {
    clearTimeout(firstTimeout)
    clearInterval(interval)
  }
}, [isFinished])

  const shuffledLetters = useMemo(() => {
    if (!currentTask) return []
    return shuffleArray(currentTask.word.split(""))
  }, [currentTask])

  const currentAnswer = pickedLetters.join("")
  const isWordComplete = currentTask && currentAnswer === currentTask.word

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
  lj: "elj",
  m: "em",
  n: "en",
  nj: "enj",
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
          top: "22px",
          left: "100px",
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
          top: "25px",
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
        <source src="/images/squirrel_intro.mp4" type="video/mp4" />
      </video>

      {introEnded && (
        <div
          style={{
            position: "absolute",
            left: "50%",
            bottom: "45px",
            transform: "translateX(-50%)",
            width: "650px",
            padding: "18px 28px",
            borderRadius: "28px",
            background: "rgba(239, 227, 200, 0.96)",
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
              color: "#5b4630",
              fontFamily: "var(--heading)",
            }}
          >
            <div
              style={{
                fontSize: "30px",
                fontWeight: "900",
                lineHeight: "1.1",
              }}
            >
              Vjeverica treba tvoju pomoć!
            </div>

            <div
              style={{
                fontSize: "21px",
                fontWeight: "700",
                marginTop: "8px",
                lineHeight: "1.3",
              }}
            >
              Klikni slova redom i složi riječ.
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
              whiteSpace: "nowrap",
            }}
          >
            Dalje ➜
          </button>
        </div>
      )}
    </main>
  )
}

  function handleLetterClick(letter, index) {
    if (showPanel) return
    if (usedIndexes.includes(index)) return

    speakLetter(letter)

    const nextLetters = [...pickedLetters, letter]
    const nextAnswer = nextLetters.join("")

    if (!currentTask.word.startsWith(nextAnswer)) {
      return
    }

    setPickedLetters(nextLetters)
    setUsedIndexes([...usedIndexes, index])

    if (nextAnswer === currentTask.word) {
      setStars((prev) => Math.min(prev + 1, wordTasks.length))
      setFlyingStar(true)
      if (soundOn) {
        const starAudio = new Audio("/audio/stars.mp3")
        starAudio.volume = 0.8
        starAudio.play().catch(() => {})
      }
      setSquirrelJump(true)

      setTimeout(() => setFlyingStar(false), 900)
      setTimeout(() => setSquirrelJump(false), 500)
      setTimeout(() => setShowPanel(true), 700)
    }
  }

  function resetCurrentWord() {
    setPickedLetters([])
    setUsedIndexes([])
  }

  function nextTask() {
    if (soundOn) {
      const clickAudio = new Audio("/audio/button_click.mp3")
      clickAudio.volume = 1
      clickAudio.play().catch(() => {})
    }
    setPickedLetters([])
    setUsedIndexes([])
    setShowPanel(false)
    setTaskIndex((prev) => prev + 1)
  }

  if (isFinished) {
    return (
      <main
        style={{
          minHeight: "100vh",
          backgroundImage: "url('/images/school-yaard_background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
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
            zIndex: 30,
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
            top: "60px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "650px",
            padding: "24px 36px",
            borderRadius: "28px",
            background: "rgba(239, 227, 200, 0.96)",
            border: "4px solid #c9b080",
            boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "24px",
          }}
        >
          <img
            src="/images/mouse_helper.png"
            alt="Miš pomagač"
            style={{
              width: "105px",
              height: "105px",
              objectFit: "contain",
            }}
          />

          <div
            style={{
              textAlign: "center",
              color: "#5b4630",
              fontFamily: "var(--heading)",
            }}
          >
            <div
              style={{
                fontSize: "38px",
                fontWeight: "800",
              }}
            >
              Bravo!
            </div>

            <div
              style={{
                fontSize: "22px",
                fontWeight: "700",
                marginTop: "8px",
              }}
            >
              Složili smo sve riječi od slova!
            </div>

            <div
              style={{
                fontSize: "30px",
                fontWeight: "800",
                marginTop: "10px",
                color: "#b8860b",
              }}
            >
              ⭐ {stars} / {wordTasks.length} ⭐
            </div>
          </div>
        </div>

        <img
          src= {clap ? "/images/vjeverica_pljeska.png" : "/images/squirrel.png"}
          alt="Sretna vjeverica"
           style={{
          position: "absolute",
          left: "50%",
          bottom: "70px",
          transform: "translateX(-50%)",
          width: "500px",
          zIndex: 10,
        }}
      />
        <style>
          {`
            @keyframes clapSquirrel {
              0%, 100% {
                transform: translateX(-50%) scale(1);
            }

          50% {
            transform: translateX(-50%) scale(1.05);
          }
        }
      `}
      </style>
      </main>
    )
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/images/squirrel-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
        backgroundImage: "url('/images/school-yaard_background.png')",
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
            zIndex: 10000,
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
        ⭐ {stars} / {wordTasks.length}
      </div>

  

      <section
        style={{
          position: "absolute",
          left: "50%",
          top: "52%",
          transform: "translate(-50%, -50%)",
          width: "1100px",
          minHeight: "470px",
          padding: "28px",
          borderRadius: "30px",
          background: "rgba(239, 227, 200, 0.94)",
          border: "4px solid #c9b080",
          boxShadow: "0 10px 28px rgba(0,0,0,0.28)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "36px",
          zIndex: 15,
        }}
      >
        <img
          src={currentTask.image}
          alt={currentTask.word}
          style={{
            width: "360px",
            height: "300px",
            objectFit: "cover",
            borderRadius: "24px",
            border: "4px solid #fff7e6",
            boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
          }}
        />

        <div
          style={{
            flex: 1,
            textAlign: "center",
            color: "#5b4630",
            fontFamily: "var(--heading)",
            marginLeft: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "28px",
              minHeight: "70px",
            }}
          >
            {currentTask.word.split("").map((letter, index) => (
              <div
                key={index}
                style={{
                  width: "54px",
                  height: "62px",
                  borderRadius: "16px",
                  background: pickedLetters[index]
                    ? "#fff7e6"
                    : "rgba(255,255,255,0.45)",
                  border: "3px solid #c9b080",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "34px",
                  fontWeight: "900",
                  color: "#5b4630",
                  boxShadow: pickedLetters[index]
                    ? "0 4px 10px rgba(0,0,0,0.16)"
                    : "none",
                }}
              >
                {pickedLetters[index] || ""}
              </div>
            ))}
          </div>

          <div
            style={{
              fontSize: "22px",
              fontWeight: "800",
              marginBottom: "18px",
            }}
          >
            Klikni slova redom i složi riječ.
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            {shuffledLetters.map((letter, index) => {
              const used = usedIndexes.includes(index)

              return (
                <button
                  key={`${letter}-${index}`}
                  onClick={() => handleLetterClick(letter, index)}
                  disabled={used || showPanel}
                  style={{
                    width: "68px",
                    height: "68px",
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0",
                    lineHeight: "1",
                    border: "3px solid #dfead9",
                    background: used ? "#d7c7a4" : "#b4c9aa",
                    color: "#fff",
                    fontSize: "38px",
                    fontWeight: "900",
                    fontFamily: "var(--reading)",
                    cursor: used || showPanel ? "not-allowed" : "pointer",
                    opacity: used ? 0.45 : 1,
                    boxShadow: "0 5px 14px rgba(0,0,0,0.2)",
                  }}
                >
                  {letter}
                </button>
              )
            })}
          </div>

          <button
            onClick={resetCurrentWord}
            disabled={showPanel || pickedLetters.length === 0}
            style={{
              marginTop: "22px",
              fontSize: "18px",
              padding: "10px 22px",
              borderRadius: "16px",
              cursor:
                showPanel || pickedLetters.length === 0
                  ? "not-allowed"
                  : "pointer",
              background: "#f5ead2",
              border: "3px solid #d8c8a8",
              color: "#5b4630",
              fontWeight: "800",
              opacity: showPanel || pickedLetters.length === 0 ? 0.5 : 1,
            }}
          >
            Pokušaj ponovno
          </button>
        </div>
      </section>

      <img
        src={blink ? "/images/squirrel_blink.png" : "/images/squirrel.png"}
        alt="Vjeverica"
        style={{
        position: "absolute",
        right: "20px",
        bottom: "25px",
        width: "300px",
        zIndex: 20,
       animation: "squirrelTail 2s ease-in-out infinite",
      transformOrigin: "bottom center",
         }}
    />

      {flyingStar && (
        <div
          style={{
            position: "absolute",
            right: "300px",
            top: "52%",
            fontSize: "46px",
            animation: "flyStar 0.9s ease-out forwards",
            zIndex: 40,
            pointerEvents: "none",
          }}
        >
          ⭐
        </div>
      )}

      {showPanel && (
        <div
          style={{
            position: "absolute",
            left: "-20px",
            bottom: "0",
            width: "calc(100% + 40px)",
            minHeight: "115px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            padding: "18px 48px",
            boxSizing: "border-box",
            background: "rgba(239, 227, 200, 0.96)",
            borderTop: "4px solid #c9b080",
            boxShadow: "0 -8px 24px rgba(0,0,0,0.22)",
            zIndex: 35,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <img
              src="/images/mouse_helper.png"
              alt="Miš pomagač"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "contain",
              }}
            />

            <div
              style={{
                textAlign: "left",
                color: "#5b4630",
                fontFamily: "var(--heading)",
              }}
            >
              <div
                style={{
                  fontSize: "30px",
                  fontWeight: "800",
                }}
              >
                Bravo!
              </div>

              <div
                style={{
                  fontSize: "26px",
                  fontWeight: "700",
                  marginTop: "6px",
                }}
              >
                Složio/la si riječ od slova!
              </div>
            </div>
          </div>

          <button
            onClick={nextTask}
            style={{
              fontSize: "22px",
              padding: "12px 26px",
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
        </div>
      )}
    </main>
  )
}
