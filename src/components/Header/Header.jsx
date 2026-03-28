
import "./Header.css";

// Special offer item — defined here until backend provides a dedicated endpoint
const SPECIAL_OFFER = {
  id: 1,
  nom: "Special Offer Burger",
  prix: 29,
  image: "/src/assets/images/banner-offer.png",
};

const Header = () => {
  const { addToCart } = useCart();

  const handleOrderNow = () => {
    addToCart(SPECIAL_OFFER);
  };

  return (
    <section id="offers" className="header-container">
      <div className="header-banner">
        <button className="header-order-btn" onClick={handleOrderNow}>
          Order Now
        </button>
      </div>
    </section>
  );
};

export default Header;