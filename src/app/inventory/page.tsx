"use client";

import { useEffect, useState } from "react";

type Inventory = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  unit: string;
  imagePath: string;
};

export default function InventoryPage() {
  const [items, setItems] = useState<Inventory[]>([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [unit, setUnit] = useState("");
  const [imagePath, setImagePath] = useState("");

  useEffect(() => {
    // Fetch data dari API
    fetch("/api/inventory")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const addItem = async () => {
    const res = await fetch("/api/inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        quantity,
        price,
        unit,
        imagePath, // field baru untuk image path
      }),
    });
    const newItem = await res.json();
    setItems([...items, newItem]); // Tambahkan item baru ke state
  };

  return (
    <div className="grid grid-cols-8 border">
      <div className="col-span-2 flex h-full flex-col gap-2 bg-sky-100 p-8">
        <h1 className="text-2xl font-semibold">Form Inventory </h1>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-sm p-2 text-slate-900"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="rounded-sm p-2 text-slate-900"
        />
        <input
          type="text"
          placeholder="Unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="rounded-sm p-2 text-slate-900"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="rounded-sm p-2 text-slate-900"
        />
        <input
          type="text"
          placeholder="Image Path"
          value={imagePath}
          onChange={(e) => setImagePath(e.target.value)}
          className="rounded-sm p-2 text-slate-900"
        />
        <button onClick={addItem} className="rounded-lg bg-sky-500 p-2">
          Add Item
        </button>
      </div>
      <div className="col-span-6 border p-4">
        <h1 className="py-2 text-2xl font-semibold">Inventory List</h1>
        <ul>
          {items.map((item, index) => (
            <li key={item.id} className="border-b border-slate-400 py-1">
              {index + 1}
              {") "} {item.name} - {item.quantity} {item.unit} - Rp.{item.price}{" "}
              {/* <img src={item.imagePath} alt={item.name} width={50} /> */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
