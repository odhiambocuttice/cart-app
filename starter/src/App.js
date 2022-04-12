import Navbar from "./components/Navbar";
import { CartContainer } from "./components/CartContainer";
import { calculateTotals, getCartItems } from "../src/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Modal from "./components/Modal";

function App() {
  const { cartItems, isLoading } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <main>
          {isOpen && <Modal />}
          <Navbar />
          <CartContainer />
        </main>
      )}
    </>
  );
}
export default App;
