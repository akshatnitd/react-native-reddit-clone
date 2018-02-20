import React from "react"
import renderer from "react-test-renderer"

import { HomeScreen } from ".."

jest.mock("react-native-navigation")

it("renders correctly with no data", () => {
  const fetchTopicsAction = jest.fn()
  const tree = renderer.create(<HomeScreen fetchTopics={fetchTopicsAction} />)
  expect(fetchTopicsAction.mock.calls).toHaveLength(1)
  expect(tree.toJSON()).toMatchSnapshot()
})

it("renders correctly with data", () => {
  const fetchTopicsAction = jest.fn()
  const tree = renderer.create(
    <HomeScreen
      fetchTopics={fetchTopicsAction}
      topics={[{ id: "a", username: "b", title: "c", vote: 0 }]}
    />,
  )
  expect(fetchTopicsAction.mock.calls).toHaveLength(1)
  expect(tree.toJSON()).toMatchSnapshot()

  const instance = tree.getInstance()
  instance.handleListRefresh()
  expect(fetchTopicsAction.mock.calls).toHaveLength(2)

  instance.handleShowCreateTopicForm()
})
