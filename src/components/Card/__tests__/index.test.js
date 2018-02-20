import React from "react"
import renderer from "react-test-renderer"

import Card from ".."

it("renders correctly", () => {
  const tree = renderer.create(<Card />)
  expect(tree.toJSON()).toMatchSnapshot()
})
