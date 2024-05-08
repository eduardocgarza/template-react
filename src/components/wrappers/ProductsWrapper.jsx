import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useResourcesContext } from "../../state/ResourcesContext";


export default function ProductsWrapperWrapper() {
  /**
   * @State
   */
  const [selectedProduct, setSelectedProduct] = useState(null);

  /**
   * @Hooks
   */
  const { listsState } = useResourcesContext();

  /**
   * @Constants
   */
  const { lists } = listsState;

    /**
   * @Initialize
   */
    useEffect(() => {
      if (listsState.lists.length > 0) {
        setSelectedProduct(listsState.lists[0]);
      }
    }, [listsState]);

  /**
   * @Functions
   */
  function selectProduct(listID) {
    const list = lists && lists.find((list) => list.listID === listID);
    setSelectedProduct(list);
  }

  return (
    <section className="pt-10 p-6 bg-gray-100">
      <div className="container mx-auto">
        <section className="flex flex-col lg:flex-row items-start">
          <Outlet />
        </section>
      </div>
    </section>
  );
}
