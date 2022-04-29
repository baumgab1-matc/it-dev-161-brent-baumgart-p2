import { createContext, useEffect, useState } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {

    //This class is the same a Product schema but with added field amount
    //I made a class because I wanted to have product amounts in checkout
    //probably a better way but this is best I could come up with
    class CartItem {
        constructor(_id, name, img, price, amount) {
            this._id = _id;
            this.name = name;
            this.img = img;
            this.price = price;
            this.amount = amount;
        }
    }

    const [products, setProducts] = useState([]);
    const[isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [cart, setCart] = useState([]);
    const [cartSize, setCartSize] = useState(0);

    //load products when first loaded
    useEffect(() => {
        fetchProducts();
    }, []);

    //load products from database
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products');
            const data = await response.json();
            setProducts(data);
            setIsLoadingProducts(false);
        } catch (err) {
            console.log('error loading products');
        }

    }

    //when customer hits add button on product this the function handling the logic
    const addToCart = (toAdd) => {
        //increase size of cart by 1
        setCartSize(cartSize + 1);

        //if we've already seen the product, then don't add it again, just increase the amount by 1
        for (let i = 0; i < cart.length; i++) {
            if (cart[i]._id === toAdd._id) {
                cart[i].amount++;
                return;
            }
        }

        //the product has not been added to cart, create new cart item
        const product = new CartItem(toAdd._id, toAdd.name, toAdd.img, toAdd.price, 1);
        //update items in cart
        setCart(cart => [product, ...cart]);
    }

    //removes in item from the cart and updates the carts size
    const removeFromCart = (toRemove) => {
        //remove from cart array
        setCart(cart.filter(current => current._id !== toRemove._id));

        //update in cart amount
        for (let i = 0; i < cart.length; i++) {
            if (cart[i]._id === toRemove._id) {
                setCartSize(cartSize - cart[i].amount);
                break;
            }
        }
    }

    //when customer places order this function is used to reset cart
    const emptyCart = () => {
        setCart([]);
        setCartSize(0);
    }

    return (
        <ProductContext.Provider
            value={{ products, addToCart, cart, removeFromCart, cartSize, emptyCart, isLoadingProducts }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export default ProductContext;