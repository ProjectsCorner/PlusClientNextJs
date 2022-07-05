import React, { useEffect, useState } from "react";

/**
 *
 * next js
 */
import Link from "next/link";

/***
 * components
 */
import MainHeader from "../Components/MainHeader";
import MainFooter from "../Components/MainFooter";
import Products from "../Components/products_scroll";
// const MainHeader = dynamic(() => import("../Components/MainHeader"), {
//   ssr: false,
// });

/***
 *
 * helpers
 */
import FormsApi from "../api/api";

const Home = ({ sub_categories }) => {
  return (
    <>
      <MainHeader />
      <main>
        <section className="main-banner-ctr">
          <ul className="ctg-li">
            <li className="ctg-item">
              <Link href="/category/628a66f4dfadcc15c2546ef7">
                <a className="ctg-name">
                  <i className="las la-shopping-basket ctg-icon"></i>
                  EasyMarket On Plus
                </a>
              </Link>
            </li>
            <li className="ctg-item">
              <Link href="/category/627b655966349809adc1d7c6">
                <a className="ctg-name">
                  <i className="las la-pizza-slice ctg-icon"></i>
                  Fast Foods &amp; Drinks
                </a>
              </Link>
            </li>
            <li className="ctg-item">
              <Link href="/category/627b657566349809adc1d7cd">
                <a className="ctg-name">
                  <i className="las la-layer-group ctg-icon"></i>
                  Supermarket
                </a>
              </Link>
            </li>
            <li className="ctg-item">
              <Link href="/category/627b658f66349809adc1d7d4">
                <a className="ctg-name">
                  <i className="las la-headphones-alt ctg-icon"></i>
                  Phones &amp; Accessories
                </a>
              </Link>
            </li>
            <li className="ctg-item">
              <Link href="/category/627b659f66349809adc1d7db">
                <a className="ctg-name">
                  <i className="las la-charging-station ctg-icon"></i>
                  Electronics
                </a>
              </Link>
            </li>
            <li className="ctg-item">
              <Link href="/category/627b65b766349809adc1d7e4">
                <a className="ctg-name">
                  <i className="las la-tshirt ctg-icon"></i>
                  Clothes &amp; Shoes
                </a>
              </Link>
            </li>
            <li className="ctg-item">
              <Link href="/category/627b65d866349809adc1d7ed">
                <a className="ctg-name">
                  <i className="las la-utensils ctg-icon"></i>
                  Kitchen stuff &amp; Utensils
                </a>
              </Link>
            </li>
            <li className="ctg-item">
              <Link href="/category/627b65f666349809adc1d7f4">
                <a className="ctg-name">
                  <i className="las la-desktop ctg-icon"></i>
                  Computing &amp; Accessories
                </a>
              </Link>
            </li>
            <li className="ctg-item">
              <Link href="/category/627b661966349809adc1d7fc">
                <a className="ctg-name">
                  <i className="las la-desktop ctg-icon"></i>
                  Cleaning, Healthy &amp; Beauty
                </a>
              </Link>
            </li>
            <li className="ctg-item">
              <Link href="/category/627b664566349809adc1d803">
                <a className="ctg-name">
                  <i className="las la-paperclip ctg-icon"></i>
                  Stationery
                </a>
              </Link>
            </li>
          </ul>
          <div className="banner-pm">
            <PromotionImage
              images={[
                "/banner_4.png",
                "/banner_2.png",
                "/banner_3.png",
                "/banner_1.png",
              ]}
            />
          </div>
          <div className="banner-pm-sm">
            <div className="">
              <img
                src={"/banner_1.png"}
                alt="BANNER"
                width="100%"
                height="100%"
                style={{ borderRadius: "5px" }}
              />
            </div>
            <div className="">
              <img
                src={"/banner_3.png"}
                alt="BANNER"
                width="100%"
                height="100%"
                style={{ borderRadius: "5px" }}
              />
            </div>
          </div>
        </section>
        <section className="main-welcome-ctr">
          <div className="welcome-ctr">
            <div className="welcome-hdr">
              <span>Plus, Thanks For The Visit</span>
              <span>Shop The Best Products</span>
            </div>
            <div className="welcome-items">
              <div className="welcome-item">
                <Link href="/catalog?sbc=629a3d8841cbfc14a67a7103">
                  <a>
                    <img src={"/utencils.jpg"} alt="Shop Foods on Plus" />
                  </a>
                </Link>
                <div>
                  <div>Utencils</div>
                </div>
              </div>
              <div className="welcome-item">
                <Link href={`/catalog?sbc=629a3e4241cbfc14a67a710e`}>
                  <a>
                    <img src={"/cloth4.jpg"} alt="T shirts on plus" />
                  </a>
                </Link>
                <div>
                  <div>T Shirts</div>
                </div>
              </div>
              <div className="welcome-item">
                <Link href={`/catalog?sbc=629a3e9d41cbfc14a67a711a`}>
                  <a>
                    <img src={"/men_sandals.jpg"} alt="Get Sandals on Plus" />
                  </a>
                </Link>

                <div>
                  <div>Sandals</div>
                </div>
              </div>
              <div className="welcome-item">
                <div>
                  <Link href={`/catalog?sbc=629a3f8641cbfc14a67a7127`}>
                    <a>
                      <img
                        src={"/studio-speech.png"}
                        alt="Shop your Phone accessories from plus"
                      />
                    </a>
                  </Link>
                </div>
                <div>
                  <div>Phone Accessories</div>
                </div>
              </div>
              <div className="welcome-item">
                <Link href={`/catalog?sbc=629a3f8641cbfc14a67a7127`}>
                  <a>
                    <img src={"/airmax.jpg"} alt="Shop Nice Shoes from plus" />
                  </a>
                </Link>

                <div>
                  <div>Shoes</div>
                </div>
              </div>
              <div className="welcome-item">
                <Link href={`/catalog?sbc=629a414041cbfc14a67a7135`}>
                  <a>
                    <img src={"/super_rice.png"} alt="Shop Foods on Plus" />
                  </a>
                </Link>
                <div>
                  <div>Food Stuffs</div>
                </div>
              </div>
            </div>
            <div className="welcome-items">
              <div className="welcome-item">
                <Link href={`/catalog?sbc=627b659f66349809adc1d7db`}>
                  <a>
                    <img
                      src={"/headsets.png"}
                      alt="Get Music Accessories on Plus"
                    />
                  </a>
                </Link>

                <div>
                  <div>For Music</div>
                </div>
              </div>
              <div className="welcome-item">
                <div>
                  <Link href={`/category/627b659f66349809adc1d7db`}>
                    <a>
                      <img src={"/tea.jpg"} alt="One Stop for electronics" />
                    </a>
                  </Link>
                </div>
                <div>
                  <div>Electronics</div>
                </div>
              </div>
              <div className="welcome-item">
                <Link href={`/catalog?sbc=629a44876d1d211ac33352a8`}>
                  <a>
                    <img src={"/milk.jpg"} alt="Get Cold Drinks on Plus" />
                  </a>
                </Link>

                <div>
                  <div>Drinks</div>
                </div>
              </div>
              <div className="welcome-item">
                <div>
                  <Link href="/category/627b661966349809adc1d7fc">
                    <a>
                      <img
                        src={"/cleaning.jpg"}
                        alt="Cleaning Materials On Plus"
                      />
                    </a>
                  </Link>
                </div>
                <div>
                  <div>Cleaning</div>
                </div>
              </div>
              <div className="welcome-item">
                <div>
                  <Link href="/category/627b65f666349809adc1d7f4">
                    <a>
                      <img src={"/hp-elitebook.png"} alt="Shop Foods on Plus" />
                    </a>
                  </Link>
                </div>
                <div>
                  <div>Computers</div>
                </div>
              </div>
              <div className="welcome-item">
                <div>
                  <Link href="/catalog?sbc=629a44ed6d1d211ac33352b9">
                    <a>
                      <img
                        src={"/hp_battery.jpg"}
                        alt="Shop Foods on Computer Accessories on Plus"
                      />
                    </a>
                  </Link>
                </div>
                <div>
                  <div>PC Accessories</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {sub_categories.length === 0 ? (
          <section className="products-scroll-ctr">
            <div
              style={{
                textAlign: "center",
                margin: "30px 0px",
                width: "100%",
              }}
            >
              Hung Around, We're Still looking for Sub Categories to Show
              You....{" "}
              <span style={{ textDecoration: "underline", color: "#85b811" }}>
                <a href="/">Refresh</a>
              </span>
            </div>
          </section>
        ) : (
          sub_categories.map((el, i) => {
            return (
              <section className="products-scroll-ctr" key={i}>
                <Products sub_category={el} />
              </section>
            );
          })
        )}
      </main>
      <MainFooter />
    </>
  );
};

export default Home;

/**
 * Promotion Images
 */
const PromotionImage = ({ images }) => {
  const [state, setState] = useState({ current_banner: 1 });

  useEffect(() => {
    let isRunning = true;
    setTimeout(() => {
      if (isRunning) {
        setState({
          current_banner:
            state.current_banner === images.length
              ? 1
              : state.current_banner + 1,
        });
      }
    }, 5000);

    return () => (isRunning = false);
  });

  return (
    <>
      <div className="banner-pm-indicators">
        {images.map((v, i) => (
          <button
            key={i}
            className={
              state.current_banner === i + 1 ? "banner-pm-indicator-active" : ""
            }
          ></button>
        ))}
      </div>
      <img
        src={images[state.current_banner - 1]}
        alt="BANNER"
        width="100%"
        height="100%"
        style={{ borderRadius: "5px" }}
      />
    </>
  );
};

Home.getInitialProps = async () => {
  let sub_categories = await new FormsApi().get(`/sub-category/all`);
  if (sub_categories !== "Error" && sub_categories.status) {
    return { sub_categories: sub_categories.result };
  } else {
    return { sub_categories: [] };
  }
};
