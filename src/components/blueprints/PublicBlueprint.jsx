import React from "react";
import PublicFooter from "../footers/PublicFooter";
import PublicTopNav from "../navigations/PublicTopNav";

export default function PublicBlueprint(WrappedComponent) {
  return function PublicLayerComponent(props) {
    return (
      <div className="relative">
        <PublicTopNav />
        <WrappedComponent {...props} />
        <PublicFooter />
      </div>
    );
  };
}
