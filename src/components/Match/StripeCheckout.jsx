import { useState, useEffect } from "react";

// import "./App.css";

const ProductDisplay = ({ matchObj, token }) => (
  <section>
    <div className="product">
      <img src={matchObj.image} alt="Match" />

      <div className="description">
        <h3>{matchObj.description}</h3>

        <h5>{`€ ${matchObj.entryFee}`} </h5>
      </div>
    </div>

    <form action="/checkout" method="POST" matchObj={matchObj} token={token}>
      <button type="submit">Checkout</button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout

    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? <Message message={message} /> : <ProductDisplay />;
}
