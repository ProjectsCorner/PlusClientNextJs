import React, { useEffect, useState } from "react";

/**
 * next js
 */
import { useRouter } from "next/router";

/**
 * Defined components
 */
import FormsApi from "../../api/api";
import MainHeader from "../../Components/MainHeader";
import MainFooter from "../../Components/MainFooter";
import Products from "../../Components/products_scroll";
import CatalogCtr from "../../Components/CatalogCtr";

function Category() {
  const [state, setState] = useState({
    sub_categories: [],
    category: {},
    category_pdts: [],
  });
  let router = useRouter();

  useEffect(() => {
    (async () => {
      let sub_categories = await new FormsApi().get(
        `/category/${router.query.id}/sub_categories`
      );
      let category = await new FormsApi().get(`/category/${router.query.id}`);
      let category_pdts = await new FormsApi().get(
        `/product/category/${router.query.id}`
      );
      if (sub_categories !== "Error" && category !== "Error") {
        if (sub_categories.status && category.status) {
          setState({
            ...state,
            category: category.result,
            sub_categories: sub_categories.result,
            category_pdts: category_pdts.result,
          });
        }
      }
      return () => {
        setState({
          sub_categories: [],
          category: {},
          category_pdts: [],
        });
      };
    })();
  }, []);

  return (
    <>
      <MainHeader />
      <section className="ctg-banner-ctr">
        <img
          src={
            state.category.category_image
              ? state.category.category_image
              : "/banner.png"
          }
          alt="SHOP ON PLUS"
        />
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

      <div className="width-auto width-auto-catalog">
        <CatalogCtr
          products={state.category_pdts}
          title={state.category.category_name}
        />
      </div>
      <MainFooter />
    </>
  );
}

export default Category;

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
