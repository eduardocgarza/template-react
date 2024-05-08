import React from "react"

export default function TemplateBlueprint(WrappedComponent) {
  return function TemplateLayerComponent(props) {
    return (
      <div className="min-height-screen">
        <WrappedComponent {...props} />
      </div>
    )
  }
}