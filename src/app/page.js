"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: "", location: "" });
  const [clerkId, setClerkId] = useState("user_xyz789");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch(`/api/items?clerkId=${clerkId}`);
    const data = await res.json();
    setItems(data.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    console.log("Going to submit");
    e.preventDefault();
    try {
      await fetch(`/api/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkId,
          item: form,
        }),
      });
      fetchItems();
      setForm({ name: "", location: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1>Items</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="border m-3 p-2"
          name="name"
          placeholder="Item name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="border m-3 p-2"
          name="location"
          placeholder="Item Location"
          value={form.location}
          onChange={handleChange}
        />
        <button className="border m-3 p-2" type="submit">
          Add Item
        </button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} - {item.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
