export default function GamesMenu({
  onBack,
  onOpenLetters,
  onOpenFairyTales,
  onOpenSquirrel,
}) {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "28px",
        textAlign: "center",
        backgroundImage: "url('/images/pozadina-main-menu.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <button onClick={onBack} style={backButtonStyle}>
        ← Natrag
      </button>

      <h1 style={headingStyle}>Odaberi igru</h1>


      <div style={cardsWrapperStyle}>
        <button onClick={onOpenLetters} style={cardStyle("#fffaf0")}>
          <img src="/images/owl_cream.jpg" alt="Sovica" style={imageStyle} />
          <span style={titleStyle("#4b3f35")}>Dopunjavanje riječi sa slovima</span>
        </button>

        <button onClick={onOpenFairyTales} style={cardStyle("#eef5ed")}>
          <img src="/images/raccoon_cream.jpg" alt="Rakun" style={imageStyle} />
          <span style={titleStyle("#4f654b")}>
            Spajanje slova sa slikama
          </span>
        </button>

        <button onClick={onOpenSquirrel} style={cardStyle("#f0ebf8")}>
          <img
            src="/images/squirrel_cream.jpg"
            alt="Vjeverica"
            style={imageStyle}
          />
          <span style={titleStyle("#5d5270")}>Slaganje riječi od slova</span>
        </button>
      </div>
    </main>
  )
}

const backButtonStyle = {
  alignSelf: "flex-start",
  background: "#f5ead2",
  color: "#4b3f35",
  boxShadow: "0 4px 10px rgba(0,0,0,0.18)",
  border: "3px solid #d8c8a8",
  borderRadius: "18px",
  padding: "11px 20px",
  fontSize: "17px",
  fontWeight: "800",
  cursor: "pointer",
  marginBottom: "10px",
}

const headingStyle = {
  color: "#ffffff",
  marginTop: "35px",
  marginBottom: "170px",
  fontSize: "50px",
  fontFamily: "var(--heading)",
  fontWeight: "900",
  textShadow:
    "2px 0 0 #5b4630, " +
    "-2px 0 0 #5b4630, " +
    "0 2px 0 #5b4630, " +
    "0 -2px 0 #5b4630, " +
    "2px 2px 0 #5b4630, " +
    "-2px 2px 0 #5b4630, " +
    "2px -2px 0 #5b4630, " +
    "-2px -2px 0 #5b4630, " +
    "0 6px 14px rgba(0,0,0,0.35)",
}

const subtitleStyle = {
  maxWidth: "620px",
  color: "#5b4630",
  marginBottom: "45px",
  fontSize: "23px",
  fontWeight: "700",
  lineHeight: "1.45",
}

const cardsWrapperStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "stretch",
  gap: "26px",
  flexWrap: "wrap",
  width: "100%",
  maxWidth: "1080px",
  marginTop: "20px",
}

const cardStyle = (background) => ({
  width: "320px",
  minHeight: "300px",
  padding: "18px",
  borderRadius: "30px",
  cursor: "pointer",
  background,
  border: "3px solid rgba(255,255,255,0.85)",
  boxShadow: "0 14px 34px rgba(75,63,53,0.2)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "18px",
})

const imageStyle = {
  width: "100%",
  height: "180px",
  objectFit: "cover",
  borderRadius: "24px",
  background: "#fff7e6",
}

const titleStyle = (color) => ({
  fontSize: "26px",
  fontWeight: "900",
  color,
  fontFamily: "var(--heading)",
  lineHeight: "1.15",
})