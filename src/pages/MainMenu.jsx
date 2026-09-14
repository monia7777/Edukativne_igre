import { useState } from "react"

export default function MainMenu({ onStart }) {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <main style={mainStyle}>
      <div style={contentStyle}>
        <h1 style={titleStyle}>Edukativne igre</h1>

        <div style={buttonsStyle}>
          <button onClick={onStart} style={primaryButtonStyle}>
            ▶ Pokreni
          </button>

          <button onClick={() => setShowHelp(true)} style={secondaryButtonStyle}>
            Upute
          </button>
        </div>
      </div>

      {showHelp && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <button
              onClick={() => setShowHelp(false)}
              style={closeButtonStyle}
            >
              ×
            </button>

            <div style={helpContentStyle}>
              <img
                src="/images/mouse_upute.png"
                alt="Miš pomagač"
                style={mouseStyle}
              />

              <div style={helpTextStyle}>
                <h2 style={modalTitleStyle}>Upute za igre</h2>

                <h3 style={sectionTitleStyle}>
                  Dopunjavanje riječi sa slovima
                </h3>
                <p style={paragraphStyle}>
                  Klikni na slovo koje nedostaje u riječi. Za svaki točan
                  odgovor osvajaš zvjezdicu i napreduješ kroz priču.
                </p>

                <h3 style={sectionTitleStyle}>
                  Spajanje slova sa slikama
                </h3>
                <p style={paragraphStyle}>
                  Povuci početno slovo na odgovarajuću sliku bajke. Pronađi sve
                  točne parove i osvoji zvjezdice.
                </p>

                <h3 style={sectionTitleStyle}>
                  Slaganje riječi od slova
                </h3>
                <p style={paragraphStyle}>
                  Od ponuđenih slova složi riječ. Pomozi vjeverici riješiti sve
                  zadatke i skupiti što više zvjezdica.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

const mainStyle = {
  textAlign: "center",
  minHeight: "100vh",
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.08), rgba(0,0,0,0.08)), url('/images/Main-menu.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  padding: "20px",
  boxSizing: "border-box",
  position: "relative",
  overflow: "hidden",
}

const contentStyle = {
  position: "relative",
  zIndex: 5,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "52px",
}

const titleStyle = {
  margin: "0",
  color: "#fff",
  fontSize: "54px",
  fontWeight: "900",
  fontFamily: "var(--heading)",
  textShadow: " 3px 0 0 #5b4630, -3px 0 0 #5b4630,    0 3px 0 #5b4630,   0 -3px 0 #5b4630, 3px 3px 0 #5b4630, -3px 3px 0 #5b4630,  3px -3px 0 #5b4630,  -3px -3px 0 #5b4630,  0 8px 18px rgba(0,0,0,0.45)",
  lineHeight: "1",
}

const buttonsStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
  marginTop: "40px",
}

const baseButtonStyle = {
  minWidth: "170px",
  padding: "14px 26px",
  borderRadius: "18px",
  border: "3px solid #d8c8a8",
  background: "#f5ead2",
  color: "#5b4630",
  fontSize: "23px",
  fontWeight: "900",
  fontFamily: "var(--heading)",
  cursor: "pointer",
  boxShadow: "0 5px 14px rgba(0,0,0,0.25)",
}

const primaryButtonStyle = {
  ...baseButtonStyle,
  transform: "scale(1.06)",
}

const secondaryButtonStyle = {
  ...baseButtonStyle,
}

const modalOverlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
}

const modalStyle = {
  width: "900px",
  maxWidth: "90vw",
  background: "rgba(245,234,210,0.98)",
  border: "4px solid #c9b080",
  borderRadius: "30px",
  padding: "32px",
  position: "relative",
  boxShadow: "0 14px 44px rgba(0,0,0,0.35)",
}

const closeButtonStyle = {
  position: "absolute",
  top: "12px",
  right: "18px",
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: "38px",
  fontWeight: "900",
  color: "#5b4630",
  lineHeight: 1,
}

const helpContentStyle = {
  display: "flex",
  gap: "30px",
  alignItems: "flex-start",
}

const mouseStyle = {
  width: "180px",
  height: "180px",
  objectFit: "contain",
  flexShrink: 0,
}

const helpTextStyle = {
  textAlign: "left",
  color: "#5b4630",
  fontFamily: "var(--heading)",
}

const modalTitleStyle = {
  color: "#5b4630",
  fontSize: "34px",
  marginTop: "0",
  marginBottom: "18px",
}

const sectionTitleStyle = {
  color: "#5b4630",
  fontSize: "23px",
  marginBottom: "6px",
}

const paragraphStyle = {
  color: "#6b533b",
  fontSize: "18px",
  fontWeight: "700",
  lineHeight: "1.45",
  marginTop: "0",
}