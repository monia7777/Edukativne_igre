import { useState } from "react"
import MainMenu from "./pages/MainMenu"
import GamesMenu from "./pages/GamesMenu"
import LettersGame from "./games/LettersGame/LettersGame"
import FairyTaleGame from "./games/FairyTaleGame"
import SquirrelGame from "./games/LettersGame/SquirrelGame"

function App() {
  const [screen, setScreen] = useState("main")

  return (
    <>
      {screen === "main" && (
        <MainMenu onStart={() => setScreen("games")} />
      )}

      {screen === "games" && (
        <GamesMenu
          onBack={() => setScreen("main")}
          onOpenLetters={() => setScreen("letters")}
          onOpenFairyTales={() => setScreen("fairytales")}
          onOpenSquirrel={() => setScreen("squirrel")}
        />
      )}

      {screen === "letters" && (
        <LettersGame onBack={() => setScreen("games")} />
      )}

      {screen === "fairytales" && (
        <FairyTaleGame onBack={() => setScreen("games")} />
      )}

      {screen === "squirrel" && (
        <SquirrelGame onBack={() => setScreen("games")} />
      )}
    </>
  )
}

export default App