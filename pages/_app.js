/***
 * styles here
 */
import "../app.css";

/**
 * components
 */
import "../Design/MainHeader.css";
import "../Design/MainFooter.css";
import "../Design/products_scroll.css";
import "../Design/CatalogCtr.css";

/***
 *
 *pages
 *
 * */
import "../Design/home.css";
import "../Design/item.css";
import "../Design/cart.css";
import "../Design/Category.css";
import "../Design/user.css";
import "../Design/login.css";
import "../Design/register.css";
import "../Design/item.css";
import "../Design/checkout.css";
import "../Design/order_finish.css";

import ProgressBar from "@badrap/bar-of-progress";
import Router from "next/router";
import Head from "next/head";
import Script from "next/script";

const progress = new ProgressBar({
  size: 3,
  color: "#86B811",
  className: "bar-of-progress",
  delay: 100,
});

Router.events.on("routeChangeStart", progress.start);
Router.events.on("routeChangeComplete", progress.finish);
Router.events.on("routeChangeError", progress.finish);

export default function Plus({ Component, pageProps }) {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-12T9E8SJ4Y"
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-12T9E8SJ4Y');

        `}
      </Script>
      <Head>
        <title>
          Plus - We add value. Shop the best and low priced Products around you
        </title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
