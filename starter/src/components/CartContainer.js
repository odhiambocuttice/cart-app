import { useSelector, useDispatch } from "react-redux";
import { CartItems } from "./CartItems";
import { openModal } from "../modalSlice";

export const CartContainer = () => {
  const { cartItems, total, totalItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <section className="cart">
      <h2>your bag</h2>
      {
        /* cart header */
        totalItems < 1 ? (
          <header>
            <h4 className="empty-cart">is currently empty</h4>
          </header>
        ) : (
          <>
            <div>
              {cartItems.map((item) => {
                return <CartItems key={item.id} {...item} />;
              })}
            </div>
            {/* cart footer */}
            <footer>
              <hr />
              <div className="cart-total">
                <h4>
                  total <span>${total.toFixed(2)}</span>
                </h4>
              </div>
              <button
                className="btn clear-btn"
                onClick={() => {
                  dispatch(openModal());
                }}
              >
                clear cart
              </button>
            </footer>
          </>
        )
      }
    </section>
  );
};
