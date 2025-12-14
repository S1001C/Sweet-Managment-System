import { useEffect, useState } from "react";
import { getSweets, purchaseSweet, deleteSweet } from "../api/sweets";
import { useAuth } from "../context/AuthContext";
import { restockSweet } from "../api/sweets";

const Sweets = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const { role } = useAuth();

  const fetchSweets = async () => {
    try {
      const res = await getSweets();
      setSweets(res.data);
    } catch {
      alert("Failed to fetch sweets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handlePurchase = async (id) => {
    try {
      await purchaseSweet(id);
      fetchSweets();
    } catch {
      alert("Sweet out of stock");
    }
  };
  const handleRestock = async (id) => {
  const amount = prompt("Enter quantity to restock:");
  if (!amount) return;

  try {
    await restockSweet(id, Number(amount));
    fetchSweets();
  } catch {
    alert("Restock failed");
  }
};


  const handleDelete = async (id) => {
    if (!window.confirm("Delete this sweet?")) return;
    try {
      await deleteSweet(id);
      fetchSweets();
    } catch {
      alert("Only admin can delete sweets");
    }
  };

  if (loading) return <p>Loading sweets...</p>;

  return (
    <div>
      <h2>🍬 Available Sweets</h2>

      <ul>
        {sweets.map((sweet) => (
          <li key={sweet._id} style={{ marginBottom: "10px" }}>
            <strong>{sweet.name}</strong> — ₹{sweet.price}
            <br />
            Quantity: {sweet.quantity}
            <br />

            <button
              onClick={() => handlePurchase(sweet._id)}
              disabled={sweet.quantity === 0}
            >
              Purchase
            </button>

           {role === "ADMIN" && (
  <>
    <button
      style={{ marginLeft: "10px" }}
      onClick={() => handleRestock(sweet._id)}
    >
      Restock
    </button>

    <button
      style={{ marginLeft: "10px", color: "red" }}
      onClick={() => handleDelete(sweet._id)}
    >
      Delete
    </button>
  </>
)}

          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sweets;
