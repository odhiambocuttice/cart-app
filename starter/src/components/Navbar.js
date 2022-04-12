import { CartIcon } from "../icons";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { totalItems, cartItems } = useSelector((store) => store.cart);
  console.log(cartItems);

  return (
    <nav>
      <div className="nav-center">
        <h3>Items</h3>
        <div className="nav-container">
          <CartIcon />
          <div className="amount-container">
            <p className="total-amount">{totalItems}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
