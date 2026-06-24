import { createContext, useState, useEffect, useMemo } from "react";
import axios from "axios";

export const StoreContest = createContext(null);

const StoreContestProvider = (props) => {

    const url = "http://localhost:4000";

    const [token, setToken] = useState(
        localStorage.getItem("token") || ""
    );

    const [cartItems, setCartItems] = useState({});

    const [food_list, setFoodList] = useState([]);

    // ADD TO CART
    const addToCart = async (itemId) => {

        if (!cartItems[itemId]) {
            setCartItems((prev) => ({
                ...prev,
                [itemId]: 1
            }));
        } else {
            setCartItems((prev) => ({
                ...prev,
                [itemId]: prev[itemId] + 1
            }));
        }

        if (token) {
            await axios.post(
                url + "/api/cart/add",
                { itemId },
                { headers: { token } }
            );
        }
    };

    // REMOVE FROM CART
    const removeFromCart = async (itemId) => {

        if (cartItems[itemId] > 1) {
            setCartItems((prev) => ({
                ...prev,
                [itemId]: prev[itemId] - 1
            }));
        } else {
            setCartItems((prev) => {
                const newCart = { ...prev };
                delete newCart[itemId];
                return newCart;
            });
        }

        if (token) {
            await axios.post(
                url + "/api/cart/remove",
                { itemId },
                { headers: { token } }
            );
        }
    };

    // TOTAL CART AMOUNT
    const getTotalCartAmount = () => {

        let totalAmount = 0;

        for (const item in cartItems) {

            if (cartItems[item] > 0) {

                let itemInfo = food_list.find(
                    (product) => product._id === item
                );

                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }

        return totalAmount;
    };

    // FETCH FOOD LIST
    const fetchFoodList = async () => {

        const response = await axios.get(
            url + "/api/food/list"
        );

        setFoodList(response.data.data);
    };

    // LOAD CART DATA
   const loadCartData = async (token) => {
    try {
        const response = await axios.post(
            url + "/api/cart/get",
            {},
            { headers: { token } }
        );
        
        if (response.data.cartData) {
            setCartItems(response.data.cartData);
        } else {
            setCartItems({});
        }
    } catch (error) {
        console.log("Error loading cart:", error);
    }
};

    // FETCH FOOD LIST ON MOUNT
    useEffect(() => {
        fetchFoodList();
    }, []);

    // LOAD CART DATA ON MOUNT
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        
        if (savedToken) {
            loadCartData(savedToken);
        }
    }, []);

    const ContextValue = useMemo(() => ({
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }), [food_list, cartItems, token]);

    return (
        <StoreContest.Provider value={ContextValue}>
            {props.children}
        </StoreContest.Provider>
    );
};

export default StoreContestProvider;