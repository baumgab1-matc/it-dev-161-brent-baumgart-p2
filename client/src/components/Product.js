import { useContext } from "react";
import ProductContext from "../context/ProductContext";

const Product = ({product}) => {


    const { addToCart } = useContext(ProductContext);


    const handleAdd = () => {
        addToCart(product);
    }

    return (

        <div className="product">

            <img src={product.img} alt="coffee product" width="200px" />

            <div className="product-name">
                <h3>{product.name}</h3>
                <h4 className="product-special">{product.blendDescription}</h4>
            </div>

            <div className="product-info">
                <h4>{product.roastType}</h4>
                <h4>{product.price}</h4> 
            </div>

            <div className="product-description">
                <p>{product.description}</p>
            </div>

            <div>
                <button onClick={handleAdd}>Add</button>
            </div>

        </div>
    )
}

export default Product;