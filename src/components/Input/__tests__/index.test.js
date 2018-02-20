import React from "react"
import renderer from "react-test-renderer"

import Input from ".."

it("renders singleline correctly", () => {
  const tree = renderer.create(<Input labelText="label" />)
  expect(tree.toJSON()).toMatchSnapshot()
})

it("renders multiline correctly", () => {
  const tree = renderer.create(<Input labelText="label" multiline={true} />)
  expect(tree.toJSON()).toMatchSnapshot()
})