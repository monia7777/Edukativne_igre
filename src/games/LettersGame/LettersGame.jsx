import { useMemo, useState, useEffect, useRef } from "react"

const storyLevels = [
  {
    id: 1,
    title: "Priča o Crvenkapici",
    subtitle: "Pomogni sovi dovršiti priču",
    tasks: [
      {
        parts: ["Crven", "apica \nje krenula \nbak", " kroz \nšum", "."],
        missing: ["k", "i", "u"],
        options: ["k", "i", "u", "m", "s", "a"],
      },
      {
        parts: ["    Nos", "la   je \nkošar", " \n    s hran", "m."],
        missing: ["i", "u", "o"],
        options: ["i", "u", "o", "a", "e", "k"],
      },
      {
        parts: ["U šum", " je \nsrela lukav", "g \nvuk", "."],
        missing: ["i", "o", "a"],
        options: ["i", "o", "a", "u", "e", "m"],
      },
      {
        parts: ["V", "k  je pitao \nkamo id", " i \nšto nos", "."],
        missing: ["u", "e", "i"],
        options: ["u", "e", "i", "a", "o", "p"],
      },
      {
        parts: ["Vuk je požuri", " \ndo bakin", " \nkuć", "."],
        missing: ["o", "e", "e"],
        options: ["o", "e", "u", "a", "i", "k"],
      },
      {
        parts: ["Bak", " je \nčekal", " \nCrvenkapic", "."],
        missing: ["a", "a", "u"],
        options: ["a", "u", "i", "e", "o", "m"],
      },
      {
        parts: ["Crven", "apica \nje stigla do \nkuć", " i \npokucal", "."],
        missing: ["k", "e", "a"],
        options: ["k", "e", "a", "i", "o", "t"],
      },
      {
        parts: ["U sob", " je \nvidjela \nčudn", "g \nvuk", "."],
        missing: ["i", "o", "a"],
        options: ["i", "o", "a", "e", "u", "k"],
      },
      {
        parts: ["Lov", "c je čuo \nbuku i doša", "\n pomoć", "."],
        missing: ["a", "o", "i"],
        options: ["a", "o", "i", "e", "u", "č"],
      },
      {
        parts: ["Bak", " i \nCrvenkapica \nbile su \nsretn", " \ni sigurn", "."],
        missing: ["a", "e", "e"],
        options: ["a", "e", "i", "o", "u", "k"],
      },
    ],
  },
]

export default function LettersGame({ onBack }) {
  const [selectedLevel, setSelectedLevel] = useState(storyLevels[0])
  const [taskIndex, setTaskIndex] = useState(0)
  const [filledLetters, setFilledLetters] = useState([])
  const [message, setMessage] = useState("")
  const [popup, setPopup] = useState(null)
  const [owlState, setOwlState] = useState("normal")
  const [isWriting, setIsWriting] = useState(false)
  const [stars, setStars] = useState(0)
  const [owlJump, setOwlJump] = useState(false)
  const [flyingStar, setFlyingStar] = useState(false)
  const [introDone, setIntroDone] = useState(false)
  const [showIntroPanel, setShowIntroPanel] = useState(false)
  const [soundOn, setSoundOn] = useState(true)
  const backgroundMusicRef = useRef(null)


  if (!selectedLevel) {
  setSelectedLevel(storyLevels[0])
  }

  function resetGame() {
    setTaskIndex(0)
    setFilledLetters([])
    setMessage("")
    setOwlState("normal")
    setIsWriting(false)
    setStars(0)
  }

  function showPopup(text, type) {
    setPopup ({ text, type })

    setTimeout(() => {
      setPopup(null)
    },1000)
  }

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
  speechSynthesis.cancel()

  const spokenLetter = pronunciation[letter.toLowerCase()] || letter

  const utterance = new SpeechSynthesisUtterance(spokenLetter)
  utterance.lang = "hr-HR"
  utterance.rate = 0.75
  utterance.pitch = 1.1
  utterance.volume = 1

  speechSynthesis.speak(utterance)
}

  useEffect(() => {
    backgroundMusicRef.current = new Audio("/audio/background_music.mp3")
    backgroundMusicRef.current.loop = true
    backgroundMusicRef.current.volume = 0.25

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

  function handleLetterClick(letter) {
  const currentTask = selectedLevel.tasks[taskIndex]

  if (!currentTask) return

  const nextIndex = filledLetters.length
  const correctLetter = currentTask.missing[nextIndex]

  if (!correctLetter) return

  if (letter !== correctLetter) {
    return
  }

  if (soundOn) {
  speakLetter(letter)
}

setMessage("")
setIsWriting(true)

  setTimeout(() => {
    const newFilledLetters = [...filledLetters, letter]
    setFilledLetters(newFilledLetters)


    setIsWriting(false)

    if (newFilledLetters.length === currentTask.missing.length) {
      setStars((prev) => Math.min(prev + 1, selectedLevel.tasks.length))

      setOwlJump(true)
      setFlyingStar(true)
      setOwlState("speaking")

      if (soundOn) {
        const starAudio = new Audio("/audio/stars.mp3")
        starAudio.volume = 0.7
        starAudio.play().catch(() => {})
      }

      setTimeout(() => setOwlJump(false), 500)
      setTimeout(() => setFlyingStar(false), 900)
      setTimeout(() => setOwlState("normal"), 1500)
    }
  }, 250)
}


  function nextTask() {
    if (soundOn) {
      const clickAudio = new Audio("/audio/button_click.mp3")
      clickAudio.volume = 1
      clickAudio.play().catch(() => {})
    }

    setFilledLetters([])
    setMessage("")
    setOwlState("normal")
    setTaskIndex((prev) => prev + 1)
  }

  const currentTask = selectedLevel?.tasks[taskIndex]
  const isFinished = selectedLevel && !currentTask

  const isTaskDone =
  currentTask && filledLetters.length === currentTask.missing.length

  useEffect(() => {
    if (!isFinished || !soundOn) return

    const endingAudio = new Audio("/audio/ending_game.mp3")
    endingAudio.volume = 0.8
    endingAudio.play().catch(() => {})
  }, [isFinished, soundOn])

  const shuffledOptions = useMemo(() => {
    if (!currentTask) return []
    
    const options = [...currentTask.options]

    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[options[i], options[j]] = [options[j], options[i]]
    }

    return options
  }, [taskIndex, currentTask])

  if (!introDone) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#14121c",
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
            zIndex: 20,
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

        {!showIntroPanel && (
          <button
            onClick={() => setShowIntroPanel(true)}
            style={{
              position: "absolute",
              top: "25px",
              right: "25px",
              padding: "14px 26px",
              borderRadius: "22px",
              background: "#f5ead2",
              border: "3px solid #d8c8a8",
              color: "#5b4630",
              fontSize: "22px",
              fontWeight: "800",
              fontFamily: "var(--heading)",
              cursor: "pointer",
              boxShadow: "0 4px 10px rgba(0,0,0,0.25)",
          }}
            >
             Preskoči ⏭
            </button>
        )}

        <video
          src="/images/owl-intro.mp4"
          autoPlay
          playsInline
          onEnded={() => setShowIntroPanel(true)}
          style={{
            width: "100%",
            height: "100vh",
            objectFit: "cover",
          }}
       />
  {showIntroPanel && (
    <div
      style={{
       position: "absolute",
       left: "50%",
       bottom: "40px", 
       transform: "translateX(-50%)",
       width: "620px",
       padding: "18px 28px",
       borderRadius: "28px",
       background: "rgba(239, 227, 200, 0.96)",
       border: "4px solid #c9b080",
       boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
       zIndex: 25,
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
        width: "110px",
        height: "110px",
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

    <div style={{ fontSize: "30px", fontWeight: "800" }}>
        Sovica treba tvoju pomoć!
    </div>

      <div style={{ fontSize: "20px", fontWeight: "700", marginTop: "6px" }}>
        Pronađi slova koja nedostaju i pomozi joj dovršiti priču.
      </div>
    </div>

     <button
      onClick={() => setIntroDone(true)}
      style={{
        fontSize: "22px",
        padding: "12px 24px",
        borderRadius: "18px",
        cursor: "pointer",
        background: "#b4c9aa",
        border: "3px solid #dfead9",
        color: "#355234",
        fontWeight: "800",
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
          textAlign: "center",
          minHeight: "100vh",
          padding: "40px",
          backgroundImage: "url('/images/storybook-background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
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
        left: "100px", // odmah desno od Home gumba
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
            top: "50px",
            left: "50%",
            transform: "translateX(-50%)",

            background: "rgba(239, 227, 200, 0.96)",
            border: "4px solid #c9b080",
            borderRadius: "28px",

            padding: "16px 24px",
            Width: "500px",

            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.22)",
            zIndex: 20,
          }}
      > 
          <div
            style= {{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "24px",
              width: "100%",
              margin: "0 auto",
            }}
          >
          <img
              src="/images/mouse_helper.png"
              alt="Miš pomagač"
               style={{
                  width: "120px",
                  height: "120px",
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
                fontSize: "42px",
                fontWeight: "800",
                lineHeight: "1.1",
              }}
            >

            Bravo!
            </div>

            <div
              style={{
                fontSize: "24px",
                fontWeight: "700",
                marginTop: "8px",
              }}
             >
              Pobijedili smo!
              Pomogli smo sovici da zapamti i pročita cijelu lektiru!
              </div>
              
              <div
              style={{
                fontSize: "30px",
                fontWeight: "800",
                marginTop: "10px",
                color: "#b8860b",
              }}
             >
               ⭐ {stars} / {selectedLevel.tasks.length} ⭐
            </div>
          </div>
        </div>
      </div>

        <img
          src="/images/owl-happy.png"
          alt="Sretna sova"
          style={{
            width: "680px",
            position: "absolute",
            right: "40px",
            bottom: "120px",
            animation: "owlTakeOff 3s ease-in-out forwards",
            zIndex: 10,
          }}
        />

        <br />

     
      </main>
    )
  }

  const owlImage =
    owlState === "speaking"
      ? "/images/owl-speaking.png"
      : "/images/owl-normal.png"

  return (
    <main
      style={{
        textAlign: "center",
        minHeight: "100vh",
        padding: "20px",
        backgroundImage: "url('/images/storybook-background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <button
        onClick={onBack}
        style={{
          position: "absolute",
          top: "30px",
          left: "27px",
          width: "56px",
          height: "56px",
          borderRadius: "18px",
          border: "3px solid #d8c8a8",
          background: "#f5ead2",
          cursor: "pointer",
          zIndex: 10000,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
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
        top: "30px",
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

      <h2>{selectedLevel.subtitle}</h2>

      <div
        style={{
          position: "absolute",
          top: "0",
          left: "-20px",
          width: "calc(100% + 40px)",
          display: "flex",
          justifyContent: "center",
          gap: "24px",
          padding: "8px 0",
          background: "linear-gradient(180deg, #8c6542, #6f4b2c)",
          borderTop: "2px solid #a67c52",
          borderBottom: "4px solid #4a2f18",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
          zIndex: 9999,
        }}
      >
        {shuffledOptions.map((letter) => (
          <button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            disabled={isTaskDone}
            style={{
              width: "95px",
              height: "95px",
              fontSize: "54px",
              fontWeight: "bold",
              fontFamily: "var(--reading)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "24px",
              border: "3px solid #dfead9",
              background: " #b4c9aa",
              cursor: isTaskDone ? "not-allowed" : "pointer",
              transition: "0.2s ease",
            }}
          >
            {letter.toLowerCase()}
          </button>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          top: "35px",
          right: "30px",
          fontSize: "28px",
          fontWeight: "700",
          fontFamily: "var(--heading)",
          background: "rgba(248,241,227,0.95)",
          border: "2px solid #d7c7a4",
          padding: "6px 16px",
          borderRadius: "20px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          zIndex: 10000,
        }}
      >
        ⭐ {stars} / {selectedLevel.tasks.length}
      </div>

      <img
        src={owlImage}
        alt="Sova"
        style={{
          position: "absolute",
          left: "55%",
          top: "70%",
          width: "700px",
          transition: "0.3s ease",
          
          transform: owlJump
            ? "translateY(-70%) scale(1.06)"
            : "translateY(-50%) scale(1)",
        }}
      />

      {flyingStar && (
        <div
        style={{
          position: "absolute",
          left: "73%",
          top: "55%",
          fontSize: "42px",
          animation: "flyStar 0.9s ease-out forwards",
          zIndex: 30,
          pointerEvents: "none",
        }}
      >
        ⭐
      </div>
      )}
      <img
        src="/images/pen.png"
        alt="Pero"
        style={{
          position: "absolute",
          left: isWriting ? "54%" : "64%",
          top: isWriting ? "56%" : "63%",
          width: "160px",
          transform: isWriting ? "rotate(25deg)" : "rotate(-20deg)",
          transition: "0.9s ease",
          zIndex: 5,
        }}
      />

        <section
          style={{
            position: "absolute",
            left: "41%",
            top: "57%",
            transform: "translate(-50%, -50%)",
            width: "320px",
            minHeight: "180px",
          }}
        >
        <div
          style={{
            width: "100%",
            fontSize: "30px",
            lineHeight: "1.9",
            color: "#4b2e2e",
            textAlign: "left",
            paddingLeft: "20px",
            paddingRight: "20px",
            fontFamily: "var(--reading)",
            whiteSpace: "pre-line",
          }}
        >
        {currentTask.parts.map((part, index) => (
          <span key={index}>
            {part}
            {index < currentTask.missing.length && (
              <span
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "42px",
                  height: "48px",
                  margin: "0 5px",
                  borderBottom: "5px solid #4b2e2e",
                  color: "#8b3a62",
                  fontWeight: "bold",
                  fontFamily: "var(--reading)",
                  animation: filledLetters[index] ? "pop 0.4s ease" : "none",
                }}
              >
                {filledLetters[index]?.toLowerCase() || ""}
              </span>
            )}
          </span>
        ))}
      </div>
    </section>
        <h2
          style={{
            position: "absolute",
            left: "50%",
            bottom: "70px",
            transform: "translateX(-50%)",
          }}
        >
          {message}
        </h2>
          
        {isTaskDone && (
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
        gap: "24px"
      }}
    >
      <img
        src="/images/mouse_helper.png"
        alt="Miš pomagač"
        style={{
          width: "120px",
          height: "120px",
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
            lineHeight: "1.1",
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
          Pomogao/la si sovici pronaći slovo!
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
      Dalje ➡
    </button>
  </div>
)}

    </main>
  )
}