import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../features/cartSlice";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>🛍️ Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart 💤</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              margin: "10px auto",
              width: "300px",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <h3>{item.name}</h3>
            <p>💰 Price: ₹{item.price}</p>
            <p>
              Quantity:{" "}
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      quantity: Number(e.target.value),
                    })
                  )
                }
                style={{ width: "50px", textAlign: "center" }}
              />
            </p>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "6px 12px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Remove
            </button>
          </div>
        ))
      )}
      <h3>Total: ₹{total}</h3>
    </div>
  );
}

export default Cart;
