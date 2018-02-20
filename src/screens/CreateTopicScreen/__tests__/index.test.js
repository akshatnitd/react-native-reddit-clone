import React from "react"
import renderer from "react-test-renderer"

import { CreateTopicScreen } from ".."

it("renders correctly", () => {
  const createTopicAction = jest.fn()
  const goBackAction = jest.fn()
  const tree = renderer.create(
    <CreateTopicScreen
      createTopic={createTopicAction}
      navigation={{ goBack: goBackAction }}
    />,
  )
  expect(tree.toJSON()).toMatchSnapshot()

  const instance = tree.getInstance()
  instance.handleSubmit()
  expect(createTopicAction.mock.calls).toHaveLength(0)

  instance.handleUsernameTextChange("username")
  instance.handleTitleTextChange("title")
  instance.handleSubmit()
  expect(createTopicAction.mock.calls).toHaveLength(1)
})
