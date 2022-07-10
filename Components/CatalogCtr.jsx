import React, { useEffect, useState } from "react";
import { Base64 } from "js-base64";

// material
import { AddShoppingCartOutlined } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";

const CatalogCtr = ({ products, title }) => {
  const [state, setState] = useState({
    higher_sort_price: 0,
    lower_sort_price: 0,
    sort_discount_value: 0,
    sort_price: false,
    sort_discount: false,
    show_small_sort_panel: false,
  });

  useEffect(() => {
    setState({
      ...state,
      show_small_sort_panel: window.innerWidth < 769 ? false : true,
    });
  }, []);

  return (
    <div className="main-CatalogCtr">
      <div className="sort-CatalogCtr -b-x">
        <button
          className="sort-btn catalog_show_sort_panel"
          onClick={() => {
            setState({
              ...state,
              show_small_sort_panel: !state.show_small_sort_panel,
            });
          }}
        >
          {state.show_small_sort_panel ? "Hide Sort Panel" : "Show Sort Panel"}
        </button>
        <div
          className="ctlg-sort catalog_show_sort_panel_ctr"
          style={{
            display: state.show_small_sort_panel ? "block" : "none",
          }}
        >
          <h3>Sort Between Prices</h3>
          <form
            id="sort-price-form"
            className="price-form"
            onSubmit={(e) => {
              e.preventDefault();
              setState({
                ...state,
                sort_price: true,
              });
            }}
          >
            <div className="display-price -stv">
              <div>
                <label htmlFor="lower-p">Min.</label>
                <br />
                <input
                  required
                  type="number"
                  id="lower-p"
                  placeholder="Min. Price"
                  name="lp"
                  onChange={(e) => {
                    setState({
                      ...state,
                      lower_sort_price: parseInt(e.target.value),
                    });
                  }}
                />
              </div>
              <div>
                <label htmlFor="higher-p">Max.</label>
                <br />
                <input
                  required
                  placeholder="Max. Price"
                  type="number"
                  id="higher-p"
                  name="hp"
                  onChange={(e) => {
                    setState({
                      ...state,
                      higher_sort_price: parseInt(e.target.value),
                    });
                  }}
                />
              </div>
            </div>
            <button className="sort-btn" type="submit" id="_sbp">
              Apply
            </button>
          </form>
          <h3>Sort By Discount</h3>
          <form
            id="_sdiscount"
            onSubmit={(e) => {
              e.preventDefault();
              setState({
                ...state,
                sort_discount: true,
              });
            }}
          >
            <ul className="sort-list">
              <li className="input-field">
                <input
                  required
                  type="radio"
                  name="_discount"
                  id=""
                  value="1"
                  onChange={(e) => {
                    setState({
                      ...state,
                      sort_discount_value: parseInt(e.target.value),
                    });
                  }}
                />
                <label htmlFor="discount"> &lt; 10%</label>
              </li>
              <li className="input-field">
                <input
                  required
                  type="radio"
                  name="_discount"
                  id=""
                  value="2"
                  onChange={(e) => {
                    setState({
                      ...state,
                      sort_discount_value: parseInt(e.target.value),
                    });
                  }}
                />
                <label htmlFor="discount">10% - 20%</label>
              </li>
              <li className="input-field">
                <input
                  required
                  type="radio"
                  name="_discount"
                  id=""
                  value="3"
                  onChange={(e) => {
                    setState({
                      ...state,
                      sort_discount_value: parseInt(e.target.value),
                    });
                  }}
                />
                <label htmlFor="discount">20% - 30%</label>
              </li>
              <li className="input-field">
                <input
                  required
                  type="radio"
                  name="_discount"
                  id=""
                  value="4"
                  onChange={(e) => {
                    setState({
                      ...state,
                      sort_discount_value: parseInt(e.target.value),
                    });
                  }}
                />
                <label htmlFor="discount">30% - 40%</label>
              </li>
              <li className="input-field">
                <input
                  required
                  type="radio"
                  name="_discount"
                  id=""
                  value="5"
                  onChange={(e) => {
                    setState({
                      ...state,
                      sort_discount_value: parseInt(e.target.value),
                    });
                  }}
                />
                <label htmlFor="discount"> &gt; 40%</label>
              </li>
            </ul>
            <button className="sort-btn" type="submit">
              Apply
            </button>
          </form>
        </div>
      </div>
      <div className="pdts-CatalogCtr">
        <div
          className="-b-x"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <span style={{ flex: "1" }}>
            Showing For: {title || "...."} <br />{" "}
          </span>
          <span style={{ opacity: "0.8", fontSize: "12px", flex: "1" }}>
            *Prices may vary from market prices.
          </span>
        </div>
        <div className="-b-x">
          {products.length === 0 && <div>No Products to Display...</div>}
          {products.map((v, i) => {
            let message = " ";
            if (state.sort_price && state.sort_discount) {
              if (
                v.product_price >= state.lower_sort_price &&
                v.product_price <= state.higher_sort_price
              ) {
                let discount = Math.round(
                  (parseInt(v.product_discount) / parseInt(v.product_price)) *
                    100
                );
                switch (state.sort_discount_value) {
                  case 1:
                    if (discount < 10) {
                      return (
                        <div key={i} className="pdt-CatalogCtr">
                          <Product product={v} />
                        </div>
                      );
                    } else {
                      return <div key={i}>{message}</div>;
                    }

                  case 2:
                    if (discount >= 10 && discount < 20) {
                      return (
                        <div key={i} className="pdt-CatalogCtr">
                          <Product product={v} />
                        </div>
                      );
                    } else {
                      return <div key={i}>{message}</div>;
                    }

                  case 3:
                    if (discount >= 20 && discount < 30) {
                      return (
                        <div key={i} className="pdt-CatalogCtr">
                          <Product product={v} />
                        </div>
                      );
                    } else {
                      return <div key={i}>{message}</div>;
                    }

                  case 4:
                    if (discount >= 30 && discount < 40) {
                      return (
                        <div key={i} className="pdt-CatalogCtr">
                          <Product product={v} />
                        </div>
                      );
                    } else {
                      return <div key={i}>{message}</div>;
                    }

                  case 5:
                    if (discount >= 40) {
                      return (
                        <div key={i} className="pdt-CatalogCtr">
                          <Product product={v} />
                        </div>
                      );
                    } else {
                      return <div key={i}>{message}</div>;
                    }

                  default:
                    return <div key={i}>{message}</div>;
                }
              } else {
                return <div key={i}>{message}</div>;
              }
            } else if (state.sort_price) {
              if (
                v.product_price >= state.lower_sort_price &&
                v.product_price <= state.higher_sort_price
              ) {
                return (
                  <div key={i} className="pdt-CatalogCtr">
                    <Product product={v} />
                  </div>
                );
              } else {
                return <div key={i}>{message}</div>;
              }
            } else if (state.sort_discount) {
              let discount = Math.round(
                (parseInt(v.product_discount) / parseInt(v.product_price)) * 100
              );
              switch (state.sort_discount_value) {
                case 1:
                  if (discount < 10) {
                    return (
                      <div key={i} className="pdt-CatalogCtr">
                        <Product product={v} />
                      </div>
                    );
                  } else {
                    return <div key={i}>{message}</div>;
                  }

                case 2:
                  if (discount > 10 && discount < 20) {
                    return (
                      <div key={i} className="pdt-CatalogCtr">
                        <Product product={v} />
                      </div>
                    );
                  } else {
                    return <div key={i}>{message}</div>;
                  }

                case 3:
                  if (discount > 20 && discount < 30) {
                    return (
                      <div key={i} className="pdt-CatalogCtr">
                        <Product product={v} />
                      </div>
                    );
                  } else {
                    return <div key={i}>{message}</div>;
                  }

                case 4:
                  if (discount > 30 && discount < 40) {
                    return (
                      <div key={i} className="pdt-CatalogCtr">
                        <Product product={v} />
                      </div>
                    );
                  } else {
                    return <div key={i}>{message}</div>;
                  }

                case 5:
                  if (discount > 40) {
                    return (
                      <div key={i} className="pdt-CatalogCtr">
                        <Product product={v} />
                      </div>
                    );
                  } else {
                    return <div key={i}>{message}</div>;
                  }

                default:
                  return <div key={i}>{message}</div>;
              }
            } else {
              return (
                <div key={i} className="pdt-CatalogCtr">
                  <Product product={v} />
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default CatalogCtr;

const Product = ({ product }) => {
  /**
   * Hooks
   */
  // const navigate = useNavigate();
  const [state, setState] = useState({ adding: false });

  const add_to_cart = () => {
    setState({
      ...state,
      adding: true,
    });
    const cart_stored = localStorage.getItem("cart_id")
      ? JSON.parse(Base64.decode(localStorage.getItem("cart_id")))
      : [];
    let in_cart = cart_stored.find((el) => el.product === product.id);
    if (in_cart) {
      cart_stored[cart_stored.indexOf(in_cart)] = {
        product: product.id,
        qty: in_cart.qty + 1,
      };
    } else {
      cart_stored.push({ product: product.id, qty: 1 });
    }

    localStorage.setItem("cart_id", Base64.encode(JSON.stringify(cart_stored)));
    setTimeout(() => {
      setState({
        ...state,
        adding: false,
      });
    }, 2000);
    window.location.reload();
  };

  let images =
    typeof product.product_images === "string" &&
    JSON.parse(product.product_images)
      ? JSON.parse(product.product_images)
      : [];
  return (
    <>
      <div className="pdt-CatalogCtr-discount">
        {`${Math.round(
          (parseInt(product.product_discount) /
            parseInt(product.product_price)) *
            100
        )}%`}
      </div>
      <div className="pdt-CatalogCtr-img">
        <img
          src={images.length === 0 ? "/banner.png" : images[0]}
          alt="PLUS PRODUCT FROM PROPS"
        />
      </div>
      <div className="pdt-CatalogCtr-seller">Plus Collections</div>
      <div className="pdt-CatalogCtr-name">
        <b>{product.product_name}</b> - {product.product_description}
      </div>
      <div className="pdt-CatalogCtr-current-price">{`UGX ${
        parseInt(product.product_price) - parseInt(product.product_discount)
      }`}</div>
      <div className="pdt-CatalogCtr-prev-price">
        {product.product_discount ? `UGX ${product.product_price}` : ""}
      </div>
      <div></div>
      <div className="pdt-CatalogCtr-btn-ctr">
        <button onClick={add_to_cart}>
          <span>
            {state.adding ? (
              <CircularProgress size={15} color="inherit" />
            ) : (
              <AddShoppingCartOutlined fontSize="small" />
            )}
          </span>
          <span style={{ paddingLeft: 5 }}>
            {state.adding ? "Please Wait..." : "Add to Cart"}
          </span>
        </button>
      </div>
    </>
  );
};
