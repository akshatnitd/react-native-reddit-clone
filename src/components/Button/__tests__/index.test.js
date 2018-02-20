import React from "react"
import renderer from "react-test-renderer"

import Button from ".."

jest.mock("Platform", () => {
  const Platform = require.requireActual("Platform")
  Platform.OS = "android"
  return Platform
})

jest.mock("TouchableNativeFeedback", () => {
  const RealComponent = require.requireActual("TouchableNativeFeedback")
  RealComponent.Ripple = () => null
  return RealComponent
})

it("renders correctly", () => {
  const tree = renderer.create(<Button>Button</Button>)
  expect(tree.toJSON()).toMatchSnapshot()
})
