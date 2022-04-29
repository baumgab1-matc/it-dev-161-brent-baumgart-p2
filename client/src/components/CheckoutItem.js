import { useContext } from "react";
import ProductContext from "../context/ProductContext";


const CheckoutItem = ({product}) => {
    const { removeFromCart } = useContext(ProductContext);

    const handleRemove = () => {
        removeFromCart(product);
    }

    return ( 
         <div className="checkout-card">
            <img src={product.img} width="100" alt="checkout product" />

            <div className="checkout-details">
                <h4>{product.name}</h4>
                <h4>{product.price}</h4>
                <h4>{product.amount}</h4>
                <br />
                {/* fix href */}
                <a href="#" onClick={handleRemove}>Remove</a>  
            </div>
         </div>         
     );
}
 
export default CheckoutItem;