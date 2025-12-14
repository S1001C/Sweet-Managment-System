import { useState } from "react";
import { createSweet } from "../api/sweets";

const AddSweet = ({ onAdded }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSweet({
        name,
        category,
        price: Number(price),
        quantity: Number(quantity),
      });
      alert("Sweet added successfully");
      setName("");
      setCategory("");
      setPrice("");
      setQuantity("");
      onAdded(); // refresh sweets list
    } catch (err) {
      alert("Only admin can add sweets");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Sweet</h3>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        required
      />

      <button type="submit">Add Sweet</button>
    </form>
  );
};

export default AddSweet;
