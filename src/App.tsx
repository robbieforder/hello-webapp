import { useEffect, useState } from "react";

export default function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("items");
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  function addItem(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setItems([{ id: Date.now(), text: text.trim(), done: false }, ...items]);
    setText("");
  }

  function toggle(id) {
    setItems(items.map(i => i.id === id ? { ...i, done: !i.done } : i));
  }

  function remove(id) {
    setItems(items.filter(i => i.id !== id));
  }

  return (
    <main style={{ maxWidth: 640, margin: "3rem auto", padding: "0 1rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Mini Tasks</h1>
      <form onSubmit={addItem} style={{ display: "flex", gap: 8 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task…"
          style={{ flex: 1, padding: 8 }}
        />
        <button>Add</button>
      </form>
      <ul style={{ listStyle: "none", padding: 0, marginTop: 16 }}>
        {items.map(i => (
          <li key={i.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: "1px solid #eee" }}>
            <input type="checkbox" checked={i.done} onChange={() => toggle(i.id)} />
            <span style={{ textDecoration: i.done ? "line-through" : "none", flex: 1 }}>{i.text}</span>
            <button onClick={() => remove(i.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
