
import React, { useState } from "react";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [number, setNumber] = useState("");
  const [color, setColor] = useState("");

  const handleAdd = () => {
    if (number === "" || color === "") return;
    const num = parseInt(number);
    const newEntry = {
      number: num,
      color,
      size: num >= 5 ? "Big" : "Small"
    };
    setEntries([...entries, newEntry]);
    setNumber("");
    setColor("");
  };

  const getNextPrediction = () => {
    if (entries.length < 3) return null;
    const lastThree = entries.slice(-3);
    const avg = lastThree.reduce((a, b) => a + b.number, 0) / 3;
    const sizePrediction = avg >= 5 ? "Big" : "Small";
    const redCount = lastThree.filter(e => e.color === "Red").length;
    const greenCount = lastThree.filter(e => e.color === "Green").length;
    const colorPrediction = redCount > greenCount ? "Red" : "Green";
    return { size: sizePrediction, color: colorPrediction };
  };

  const prediction = getNextPrediction();

  return (
    <div className="min-h-screen bg-white text-black p-4">
      <h1 className="text-2xl font-bold mb-4">🎯 Tiranga Predictor App</h1>

      <div className="mb-4 space-y-2">
        <input
          type="number"
          value={number}
          onChange={e => setNumber(e.target.value)}
          placeholder="Enter number (0-9)"
          className="border p-2 rounded w-full"
        />
        <select
          value={color}
          onChange={e => setColor(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Select color</option>
          <option value="Red">🔴 Red</option>
          <option value="Green">🟢 Green</option>
          <option value="Violet">🟣 Violet</option>
        </select>
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          ➕ Add
        </button>
      </div>

      {prediction && (
        <div className="mb-4 p-4 border rounded bg-gray-100">
          <h2 className="text-xl font-semibold">🔮 Next Prediction</h2>
          <p>Size: <strong>{prediction.size}</strong></p>
          <p>Color: <strong>{prediction.color}</strong></p>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">📜 History</h2>
      <ul className="space-y-1">
        {entries.map((e, i) => (
          <li key={i} className="border p-2 rounded">
            Number: {e.number}, Color: {e.color}, Size: {e.size}
          </li>
        ))}
      </ul>
    </div>
  );
}
