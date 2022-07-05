import React, { useEffect, useRef, useState } from "react";

/**
 *
 * defined components
 */
import Item from "./products_scroll_item";
import FormsApi from "../api/api";

/**
 * next js
 */
import Link from "next/link";

/***
 * initial props
 */

export default function Products({ sub_category }) {
  const [state, setState] = useState({ pdts: [] });
  const scrollBackRef = useRef(null);

  useEffect(() => {
    (async () => {
      let pdts = await new FormsApi().get(
        `/product/sub_category/${sub_category.id}`
      );
      if (pdts !== "Error" && pdts.status) {
        setState({ ...state, pdts: pdts.result });
      }
    })();

    return () => {
      setState({
        pdts: [],
      });
    };
  }, []);

  return (
    <div className="-ct -b-x">
      <button
        className="-sc-b"
        onClick={() => {
          scrollBackRef.current.scrollBy({
            top: 0,
            left: -250,
            behavior: "smooth",
          });
        }}
      >
        <i className="las la-chevron-left"></i>
      </button>
      <button
        className="-sc-n"
        onClick={() => {
          scrollBackRef.current.scrollBy({
            top: 0,
            left: 250,
            behavior: "smooth",
          });
        }}
      >
        <i className="las la-chevron-right"></i>
      </button>
      <div className="-ch-all">
        <span>{sub_category.sub_category_name}</span>
        <Link href={`/catalog?sbc=${sub_category.id}`}>
          <a>
            Check All <i className="las la-chevron-right"></i>
          </a>
        </Link>
      </div>
      <div className="-scroll -ct-trending" ref={scrollBackRef}>
        {state.pdts.length === 0 ? (
          <div>No Products for this Sub Category....</div>
        ) : (
          state.pdts.map((v, i) => {
            return (
              <Link href={`/item/${v.id}`} key={i}>
                <a>
                  <Item product={v} />
                </a>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
