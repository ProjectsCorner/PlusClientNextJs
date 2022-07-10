import React, { useEffect, useState } from "react";
import { Base64 } from "js-base64";

import { useRouter } from "next/router";

/**
 * defined components
 */
import MainHeader from "../Components/MainHeader";
import MainFooter from "../Components/MainFooter";
import FormsApi from "../api/api";

let cart_total_amount = 0;

const Cart = () => {
  const router = useRouter();
  const [cartState, setCartState] = useState({
    smallScreen: false,
    saving_cart: false,
    total_amount: 0,
    cart: [],
    cartSmallCtr: true,
    user: null,
  });

  const setTotalAmount = (amount) => {
    setCartState({
      ...cartState,
      total_amount: amount,
    });
  };
  useEffect(() => {
    const user = sessionStorage.getItem("token")
      ? sessionStorage.getItem("token")
      : localStorage.getItem("token")
      ? JSON.parse(
          Base64.decode(
            sessionStorage.getItem("token")
              ? sessionStorage.getItem("token")
              : localStorage.getItem("token")
          )
        )
      : null;

    setCartState({
      ...cartState,
      user,
      cartSmallCtr: window.screen.availWidth < 768,
      cart: localStorage.getItem("cart_id")
        ? JSON.parse(Base64.decode(localStorage.getItem("cart_id")))
        : [],
    });
  }, []);

  return (
    <>
      <MainHeader />
      <main>
        <section className="cart_main_ctr">
          <div className="cart_head_ctr">
            <h1>My Cart</h1>
            <div style={{ opacity: "0.8", margin: "5px 0px" }}>
              *Prices may vary from market prices. We shall correct and give you
              feedback before we process your order...
            </div>
          </div>
          <div></div>

          <div className="cart_items_ctr">
            <div>
              <div>Item</div>
              <div>Qty</div>
              <div>Unit Price</div>
              <div>Total Amount</div>
            </div>
            <div>
              {cartState.cartSmallCtr ? (
                cartState.cart.length === 0 ? (
                  <div className="cart_item_fixed" style={{ padding: "50px" }}>
                    Ooops!! Cart Is Empty
                  </div>
                ) : (
                  cartState.cart.map((el, i) => {
                    return (
                      <CartItemFixedSize
                        key={i}
                        product={el}
                        setTotalAmount={setTotalAmount}
                      />
                    );
                  })
                )
              ) : cartState.cart.length === 0 ? (
                <div className="cart_item" style={{ padding: "25px 10px" }}>
                  Ooops!! Cart Is Empty
                </div>
              ) : (
                cartState.cart.map((el, i) => {
                  return (
                    <CartItem
                      key={i}
                      product={el}
                      setTotalAmount={setTotalAmount}
                    />
                  );
                })
              )}
            </div>
            <div>
              <div></div>
              <div></div>
              <div>Total Amount</div>
              <div>UGX {cartState.total_amount}</div>
            </div>
          </div>
          <div className="cart_start_order">
            <div style={{ display: "flex" }}>
              {/* <button
                className="plus-btn"
                style={{
                  width: "200px",
                  height: "45px",
                  fontSize: "18px",
                  backgroundColor: cartState.saving_cart ? "#85B811" : "white",
                  border: cartState.saving_cart ? "none" : "1px solid #85B811",
                  marginRight: "20px",
                  color: cartState.saving_cart ? "white" : "#85B811",
                }}
                onClick={() => {
                  localStorage.setItem("cart_id", JSON.stringify(cart));
                  setCartState({
                    ...cartState,
                    saving_cart: true,
                  });
                  setTimeout(() => {
                    setCartState({
                      ...cartState,
                      saving_cart: false,
                    });
                  }, 2000);
                }}
              >
                {cartState.saving_cart ? "Cart Saved..." : "Save Cart"}
              </button> */}
              <button
                className="plus-btn"
                disabled={cartState.cart.length === 0}
                style={
                  cartState.cart.length === 0
                    ? { opacity: "0.5" }
                    : {
                        opacity: "1",
                        width: "200px",
                        height: "45px",
                        fontSize: "18px",
                      }
                }
                onClick={() => {
                  if (Boolean(cartState.user)) {
                    router.push("/order/checkout");
                  } else {
                    router.push("/user/login");
                  }
                }}
              >
                Start Order
              </button>
            </div>
          </div>
        </section>
      </main>
      <MainFooter />
    </>
  );
};
export default Cart;

const CartItem = ({ product, setTotalAmount }) => {
  const router = useRouter();
  const [state, setState] = useState({ product: {} });
  useEffect(() => {
    (async () => {
      let pdt = await new FormsApi().get(`/product/${product.product}`);
      if (pdt !== "Error" && pdt.status !== false) {
        setState({ ...state, product: pdt.result.product });
        cart_total_amount +=
          parseInt(pdt.result.product.product_price) * parseInt(product.qty) ||
          0;
        setTotalAmount(cart_total_amount);
      }
    })();
    return () => {
      setState({ product: {} });
    };
  }, []);

  const add_qty = () => {
    const cart_stored = localStorage.getItem("cart_id")
      ? JSON.parse(Base64.decode(localStorage.getItem("cart_id")))
      : [];
    let in_cart = cart_stored.find((el) => el.product === product.product);

    if (in_cart) {
      cart_stored[cart_stored.indexOf(in_cart)] = {
        product: product.product,
        qty: in_cart.qty + 1,
      };
    }

    localStorage.setItem("cart_id", Base64.encode(JSON.stringify(cart_stored)));
    router.reload();
  };

  const reduce_qty = () => {
    const cart_stored = localStorage.getItem("cart_id")
      ? JSON.parse(Base64.decode(localStorage.getItem("cart_id")))
      : [];
    let in_cart = cart_stored.find((el) => el.product === product.product);

    if (in_cart) {
      cart_stored[cart_stored.indexOf(in_cart)] = {
        product: product.product,
        qty: in_cart.qty === 1 ? 1 : in_cart.qty - 1,
      };
    }

    localStorage.setItem("cart_id", Base64.encode(JSON.stringify(cart_stored)));
    router.reload();
  };

  const remove_from_cart = () => {
    const cart_stored = localStorage.getItem("cart_id")
      ? JSON.parse(Base64.decode(localStorage.getItem("cart_id")))
      : [];
    let in_cart = cart_stored.find((el) => el.product === product.product);
    if (in_cart) {
      cart_stored.splice(cart_stored.indexOf(in_cart), 1);
    }

    localStorage.setItem("cart_id", Base64.encode(JSON.stringify(cart_stored)));
    router.reload();
  };

  return (
    <div className="cart_item">
      <div>
        <div className="cart_item_img">
          <img
            src={
              state.product.product_images
                ? JSON.parse(state.product.product_images)[0]
                : "/banner.png"
            }
            alt={state.product.product_name || "Plus Product"}
          />
        </div>
        <div className="cart_item_name">
          <div>
            <b>{state.product.product_name || "..."}</b> -
            {state.product.product_description || "..."}
          </div>
          <div onClick={remove_from_cart} className="remove_from_cart_button">
            Remove from Cart
          </div>
        </div>
      </div>
      <div>
        <div className="cart_item_qty_ctr">
          <div onClick={reduce_qty}>&minus;</div>
          <div>{product.qty}</div>
          <div onClick={add_qty}>&#43;</div>
        </div>
      </div>
      <div>
        <div className="cart_item_unitprice_ctr">
          <div>UGX {state.product.product_price || "..."}</div>
        </div>
      </div>
      <div>
        <div className="cart_item_totalprice_ctr">
          <div>
            UGX
            {` ${
              parseInt(state.product.product_price) * parseInt(product.qty) ||
              "..."
            }`}
          </div>
        </div>
      </div>
    </div>
  );
};

const CartItemFixedSize = ({ product, setTotalAmount }) => {
  const router = useRouter();
  const [state, setState] = useState({ product: {} });
  useEffect(() => {
    (async () => {
      let pdt = await new FormsApi().get(`/product/${product.product}`);
      if (pdt !== "Error" && pdt.status !== false) {
        setState({ ...state, product: pdt.result.product });
      }
      cart_total_amount +=
        parseInt(pdt.result.product.product_price) * parseInt(product.qty) || 0;
      setTotalAmount(cart_total_amount);
    })();
    return () => {
      setState({ product: {} });
    };
  }, []);

  const add_qty = () => {
    const cart_stored = localStorage.getItem("cart_id")
      ? JSON.parse(Base64.decode(localStorage.getItem("cart_id")))
      : [];
    let in_cart = cart_stored.find((el) => el.product === product.product);

    if (in_cart) {
      cart_stored[cart_stored.indexOf(in_cart)] = {
        product: product.product,
        qty: in_cart.qty + 1,
      };
    }

    localStorage.setItem("cart_id", Base64.encode(JSON.stringify(cart_stored)));
    router.reload();
  };
  const reduce_qty = () => {
    const cart_stored = localStorage.getItem("cart_id")
      ? JSON.parse(Base64.decode(localStorage.getItem("cart_id")))
      : [];
    let in_cart = cart_stored.find((el) => el.product === product.product);

    if (in_cart) {
      cart_stored[cart_stored.indexOf(in_cart)] = {
        product: product.product,
        qty: in_cart.qty === 1 ? 1 : in_cart.qty - 1,
      };
    }

    localStorage.setItem("cart_id", Base64.encode(JSON.stringify(cart_stored)));
    router.reload();
  };

  const remove_from_cart = () => {
    const cart_stored = localStorage.getItem("cart_id")
      ? JSON.parse(Base64.decode(localStorage.getItem("cart_id")))
      : [];
    let in_cart = cart_stored.find((el) => el.product === product.product);
    if (in_cart) {
      cart_stored.splice(cart_stored.indexOf(in_cart), 1);
    }

    localStorage.setItem("cart_id", Base64.encode(JSON.stringify(cart_stored)));
    router.reload();
  };
  return (
    <div className="cart_item_fixed">
      <div>
        <div className="cart_item_img">
          <img
            src={
              state.product.product_images
                ? JSON.parse(state.product.product_images)[0]
                : "/banner.png"
            }
            alt={state.product.product_name || "Plus Product"}
          />
        </div>
        <div className="cart_item_name_fixed">
          <div>
            <b>{state.product.product_name || "..."}</b> -
            {state.product.product_description || "..."}
          </div>
          <div>
            {`UGX ${
              parseInt(state.product.product_price) * parseInt(product.qty) ||
              "..."
            }`}
          </div>
        </div>
      </div>
      <div>
        <div onClick={remove_from_cart} className="remove_from_cart_button">
          Remove from Cart
        </div>
        <div className="cart_item_qty_fixed_ctr">
          <div onClick={reduce_qty}>&minus;</div>
          <div>{product.qty}</div>
          <div onClick={add_qty}>&#43;</div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
