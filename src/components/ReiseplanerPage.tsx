import { useEffect, useState } from "react";
import type { Reise } from "../models/Reiseplaner";

export default function ReisePage() {
  const [reisen, setReisen] = useState<Reise[]>([]);
  const [results, setResults] = useState<Reise[]>([]);
  const [selectedZiel, setSelectedZiel] = useState("");

  const [ziel, setZiel] = useState("");
  const [dauer, setDauer] = useState("");
  const [abenteuerlevel, setAbenteuerlevel] = useState(0);
  const [zweck, setZweck] = useState("");
  const [jahreszeit, setJahreszeit] = useState("");

  // Daten laden aus JSON Server
  useEffect(() => {
    fetch("http://localhost:3000/reisen")
      .then((res) => res.json())
      .then((data) => setReisen(data));
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const filtered = reisen.filter((r) => {
      let score = 0;

      if (zweck && r.zweck === zweck) score++;
      if (jahreszeit && r.jahreszeit === jahreszeit) score++;
      if (abenteuerlevel > 0 && Math.abs(r.abenteuerlevel - abenteuerlevel) <= 1) score++;
      if (dauer && r.dauer >= Number(dauer) - 2 && r.dauer <= Number(dauer) + 2) score++;
      if (
        ziel &&
        r.ziel.toLowerCase().includes(ziel.toLowerCase())
      )
        score += 2;

      return score >= 2;
    });

    setResults(filtered);
  }

  return (
    <div style={{ padding: "20px", color: "#fff", background: "#000" }}>
      <h1>Reiseplaner</h1>

      {/* FORMULAR */}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", maxWidth: "500px" }}>
        
        {/* ZIEL */}
        <div>
          <label htmlFor="ziel" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Reiseziel / Land</label>
          <input
            id="ziel"
            placeholder="z.B. Japan, Thailand, Ägypten"
            value={ziel}
            onChange={(e) => setZiel(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        {/* DAUER */}
        <div>
          <label htmlFor="dauer" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Dauer (Tage)</label>
          <input
            id="dauer"
            type="number"
            placeholder="z.B. 7 oder 10 Tage"
            value={dauer}
            onChange={(e) => setDauer(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          />
        </div>

        {/* ZWECK */}
        <div>
          <label htmlFor="zweck" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Zweck der Reise</label>
          <select 
            id="zweck"
            value={zweck} 
            onChange={(e) => setZweck(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          >
            <option value="">Bitte auswählen</option>
            <option value="Strandurlaub">Strandurlaub</option>
            <option value="Bergwelt">Bergwelt</option>
            <option value="Stadtbesuch">Stadtbesuch</option>
            <option value="Abenteuerreise">Abenteuerreise</option>
          </select>
        </div>

        {/* JAHRESZEIT */}
        <div>
          <label htmlFor="jahreszeit" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Jahreszeit</label>
          <select
            id="jahreszeit"
            value={jahreszeit}
            onChange={(e) => setJahreszeit(e.target.value)}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
          >
            <option value="">Bitte auswählen</option>
            <option value="Sommer">Sommer</option>
            <option value="Winter">Winter</option>
            <option value="Frühling">Frühling</option>
            <option value="Herbst">Herbst</option>
          </select>
        </div>

        {/* ABENTEUERLEVEL */}
        <div>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}>Abenteuerlevel: {abenteuerlevel > 0 ? abenteuerlevel : "nicht gewählt"}</label>
          <div style={{ display: "flex", gap: "10px" }}>
            {[1, 2, 3, 4, 5].map((lvl) => (
              <label key={lvl} style={{ cursor: "pointer" }}>
                <input
                  type="radio"
                  checked={abenteuerlevel === lvl}
                  onChange={() => setAbenteuerlevel(lvl)}
                />
                {lvl}
              </label>
            ))}
          </div>
        </div>

        <button type="submit" style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}>Suchen</button>
      </form>

      {/* RESULTS */}
      <h2 style={{ marginTop: "20px" }}>Vorschläge</h2>

      {results.length === 0 ? (
        <p>Keine passenden Reisen gefunden</p>
      ) : (
        <ul>
          {results.map((r) => (
            <li key={r.id} style={{ backgroundColor: selectedZiel === r.ziel ? "#1a3a52" : "transparent", padding: "8px", borderRadius: "4px" }}>
              <b 
                style={{ cursor: "pointer", color: selectedZiel === r.ziel ? "#ff6b6b" : "#4da6ff", textDecoration: "underline" }}
                onClick={() => {
                  setZiel(r.ziel);
                  setSelectedZiel(r.ziel);
                }}
              >
                {r.name}
              </b>
              – {r.ziel} ({r.dauer} Tage)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}