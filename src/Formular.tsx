import { useState } from "react";
import './App.css'

export default function Formular() {
    const [reiseziel, setReiseziel] = useState<string>("");
    const [dauer, setDauer] = useState<number | "">("");
    const [abenteuerlevel, setAbenteuerlevel] = useState<number | null>(null);
    const [Zweck, setZweck] = useState<string>("");
    const [Jahreszeit, setJahreszeit] = useState<string>("");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        console.log("Reiseziel:", reiseziel);
        console.log("Dauer (Tage):", dauer);
        console.log("Abenteuerlevel:", abenteuerlevel);
        console.log("Zweck:", Zweck);
        console.log("Jahreszeit:", Jahreszeit);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Reiseplaner</h1>
            <div>
                <label htmlFor="reiseziel">Reiseziel (Land): </label>
                <input
                    type="text"
                    id="reiseziel"
                    value={reiseziel}
                    onChange={(e) => setReiseziel(e.target.value)}
                    placeholder="z.B. Italien"
                    required
                />
            </div>

            <div>
                <label htmlFor="dauer">Dauer (Tage): </label>
                <input
                    type="number"
                    id="dauer"
                    value={dauer}
                    onChange={(e) =>
                        setDauer(e.target.value === "" ? "" : Number(e.target.value))
                    }
                    min={1}
                    required
                />
            </div>

            <div>
                <label htmlFor="Zweck">Zweck: </label>
                <select
                    id="Zweck"
                    value={Zweck}
                    onChange={(e) => setZweck(e.target.value)}
                    required
                >
                    <option value="">-- Bitte auswählen --</option>
                    <option value="Strandurlaub">Strandurlaub</option>
                    <option value="Bergwelt">Bergwelt</option>
                    <option value="Geschäftsreise">Geschäftsreise</option>
                    <option value="Stadtbesuch">Stadtbesuch</option>
                    <option value="Abenteuerreise">Abenteuerreise</option>
                    <option value="Roadtrip">Roadtrip</option>
                    <option value="Kulturreise">Kulturreise</option>
                    <option value="Wellnessurlaub">Wellnessurlaub</option>
                    <option value="Camping">Camping</option>
                    <option value="Kreuzfahrt">Kreuzfahrt</option>
                    <option value="Backpacking">Backpacking</option>
                    <option value="Familienurlaub">Familienurlaub</option>
                    <option value="Luxusreise">Luxusreise</option>
                    <option value="Naturreise">Naturreise</option>
                    <option value="Sportreise">Sportreise</option>
                    <option value="Skiurlaub">Skiurlaub</option>
                </select>
            </div>

            <div>
                <label htmlFor="Jahreszeit">Jahreszeit: </label>
                <select
                    id="Jahreszeit"
                    value={Jahreszeit}
                    onChange={(e) => setJahreszeit(e.target.value)}
                    required
                >
                    <option value="">-- Bitte auswählen --</option>
                    <option value="Fühling">Fühling</option>
                    <option value="Sommer">Sommer</option>
                    <option value="Herbst">Herbst</option>
                    <option value="Winter">Winter</option>
                </select>
            </div>

            <div>
                <p>Abenteuerlevel:</p>
                {[1, 2, 3, 4, 5].map((level) => (
                    <label key={level} style={{ marginRight: "10px" }}>
                        <input
                            type="radio"
                            name="abenteuerlevel"
                            value={level}
                            checked={abenteuerlevel === level}
                            onChange={() => setAbenteuerlevel(level)}
                            required
                        />
                        {level}
                    </label>
                ))}
            </div>

            <button type="submit">Reise finden</button>
        </form>
    );
}