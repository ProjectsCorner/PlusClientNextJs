import React, { useEffect, useState } from "react";
import { Base64 } from "js-base64";
import { useRouter } from "next/router";
import Head from "next/head";

/**
 *
 * Defined components
 */
import MainHeader from "../../Components/MainHeader";
import MainFooter from "../../Components/MainFooter";
import Products from "../../Components/products_scroll";
import FormsApi from "../../api/api";

/**
 *
 * material
 */
import { CircularProgress } from "@material-ui/core";
import { AddShoppingCartOutlined } from "@material-ui/icons";

function Item() {
  const router = useRouter();
  const [state, setState] = useState({
    product: {},
    seller: {},
    sub_categories: [],
  });
  useEffect(() => {
    (async () => {
      let res = await new FormsApi().get(`/product/${router.query.id}`);
      let sub_categories = await new FormsApi().get(`/sub-category/all`);
      if (res !== "Error" && sub_categories !== "Error") {
        if (sub_categories.status && res.status) {
          if (res.status !== false) {
            let filtered = sub_categories.result.filter(
              (el) => el.id === res.result.product.product_sub_category
            );
            setState({
              ...state,
              product: res.result.product || {},
              seller: res.result.seller || {},
              sub_categories: filtered,
            });
          }
        }
      }
    })();
    return () => {
      setState({ product: {}, seller: {}, sub_categories: [] });
    };
  }, []);

  const add_to_cart = () => {
    if (!state.product.product_name) return;
    setState({
      ...state,
      adding: true,
    });
    const cart_stored = localStorage.getItem("cart_id")
      ? JSON.parse(Base64.decode(localStorage.getItem("cart_id")))
      : [];
    let in_cart = cart_stored.find((el) => el.product === state.product.id);
    if (in_cart) {
      cart_stored[cart_stored.indexOf(in_cart)] = {
        product: state.product.id,
        qty: in_cart.qty + 1,
      };
    } else {
      cart_stored.push({ product: state.product.id, qty: 1 });
    }

    localStorage.setItem("cart_id", Base64.encode(JSON.stringify(cart_stored)));
    setTimeout(() => {
      setState({
        ...state,
        adding: false,
      });
      window.location.reload();
    }, 2000);
  };

  return (
    <>
      <>
        <Head>
          <title>Plus - {state.product.product_name || "We add value"}</title>
          <meta name="description" content="Shop Online with plus" />
          <link rel="icon" href="/logos/plus_logo_color.png" />
        </Head>
      </>
      <MainHeader />
      <section className="width-auto item-section-ctr">
        <div className="item-ctr">
          <div className="-b-x">
            <div className="item-img-ctr">
              <img
                src={
                  state.product.product_images
                    ? JSON.parse(state.product.product_images)[0]
                    : "/banner.png"
                }
                alt={`${state.product.product_name || "ITEM"}'s image`}
                height="200px"
                width="200px"
              />
              <div>
                {state.product.product_images &&
                JSON.parse(state.product.product_images) ? (
                  JSON.parse(state.product.product_images).map((el, i) => {
                    return (
                      <img
                        key={i}
                        src={el}
                        alt={state.product.product_name}
                        height="75px"
                        width="75px"
                      />
                    );
                  })
                ) : (
                  <img
                    src="/banner.png"
                    alt="ITEM MAIN "
                    height="75px"
                    width="75px"
                  />
                )}
              </div>
            </div>
            <div className="item-details-ctr">
              <div>
                Brand: {`${state.product.product_brand || "... "} `}
                <small>
                  Check other products from
                  {` ${state.product.product_brand || " ..."}`}
                </small>
              </div>
              <div>
                {`${state.product.product_name || "..."} -
                ${state.product.product_description || "..."}`}
              </div>
              <div>
                <div className="item-price">
                  {state.product.product_price
                    ? `UGX ${
                        parseInt(state.product.product_price) -
                        parseInt(state.product.product_discount)
                      }`
                    : "UGX ..."}
                </div>
                {parseInt(state.product.product_discount) ? (
                  <div id="item-discount">
                    <span>Save: {state.product.product_discount} </span>
                    <span>{`${Math.round(
                      (parseInt(state.product.product_discount) /
                        parseInt(state.product.product_price)) *
                        100
                    )}%`}</span>
                  </div>
                ) : (
                  <div id="item-discount">
                    <span>
                      <small>
                        We're still requesting seller to make a discount for
                        you, Don't hang Up Please....
                      </small>
                    </span>
                  </div>
                )}
                <button className="plus-btn item-btn" onClick={add_to_cart}>
                  <div>
                    {state.adding ? (
                      <CircularProgress color="inherit" size={18} />
                    ) : (
                      <AddShoppingCartOutlined fontSize="small" />
                    )}
                  </div>
                  <span>
                    {state.adding
                      ? "Please Wait.... "
                      : "Add this item to cart"}
                  </span>
                </button>
              </div>
              <div>
                No Promotions for this Product - We're still getting the best
                way to present this product to you
              </div>
            </div>
          </div>
          <div className="-b-x">
            <h4>Item Details</h4>
            <div>{state.product.product_details || " .... "}</div>
            <h4>Delivery Information</h4>
            <div>
              <ul>
                <li>
                  Delivered to one of the locations below, <br />
                  <small>
                    (We will call or send a mail when your order is ready )
                  </small>
                </li>
                <li>Lira University</li>
                <li>
                  <small>
                    <i>We'll reach your location soon..... </i>
                  </small>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {state.sub_categories.length === 0 ? (
        <section className="products-scroll-ctr">
          <div
            style={{
              textAlign: "center",
              margin: "30px 0px",
              width: "100%",
            }}
          >
            Loading Sub Categories...
          </div>
        </section>
      ) : (
        state.sub_categories.map((el, i) => {
          return (
            <section className="products-scroll-ctr" key={i}>
              <Products sub_category={el} />
            </section>
          );
        })
      )}
      <MainFooter />
    </>
  );
}

export default Item;

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
