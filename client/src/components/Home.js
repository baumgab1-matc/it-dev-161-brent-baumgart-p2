import { useContext, useEffect } from "react";
import CustomerContext from "../context/CustomerContext";
import ProductContext from "../context/ProductContext";
import Product from "./Product";

//This is component that shows the home page
const Home = () => {

    //get array of all products from context
    const { products, isLoadingProducts } = useContext(ProductContext);

    return (
        <div className="product-gallery">
            {!isLoadingProducts && products.map((product) => (
                <Product key={product._id} product={product} />
            ))}
        </div>
    );
}

export default Home;