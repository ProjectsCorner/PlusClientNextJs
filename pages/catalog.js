import { useEffect, useState } from "react";

/**
 * next js
 */
import { useRouter } from "next/router";

/**
 *
 * Components
 */
import MainHeader from "../Components/MainHeader";
import MainFooter from "../Components/MainFooter";
import CatalogCtr from "../Components/CatalogCtr";

/**
 * api
 */
import FormsApi from "../api/api";

const Catalog = () => {
  /**
   * Hooks
   */
  const [state, setState] = useState({ products: [] });
  const router = useRouter();

  useEffect(() => {
    (async () => {
      let res = router.query.sbc
        ? await new FormsApi().get(`/product/sub_category/${router.query.sbc}`)
        : await new FormsApi().get(`/product/search/${router.query.q}`);
      if (res !== "Error") {
        if (res.status === false) {
          setState({ ...state, products: [] });
        } else {
          setState({ ...state, products: res.result });
        }
      }
    })();

    return () => {
      setState({
        products: [],
      });
    };
  }, []);

  return (
    <>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MGSBJDN"
          height="0"
          width="0"
          style="display:none;visibility:hidden"
        ></iframe>
      </noscript>
      <MainHeader />
      <main className="width-auto width-auto-catalog ">
        <div style={{ width: "100%" }}>
          <CatalogCtr
            products={state.products}
            title={router.query.q || router.query.title}
          />
        </div>
      </main>
      <MainFooter />
    </>
  );
};

export default Catalog;

export async function getServerSideProps(context) {
  return {
    props: {},
  };
}
