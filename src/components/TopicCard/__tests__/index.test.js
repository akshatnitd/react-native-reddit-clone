import React from "react"
import renderer from "react-test-renderer"

import TopicCard from ".."

it("renders correctly", () => {
  const downvoteTopicAction = jest.fn()
  const upvoteTopicAction = jest.fn()
  const tree = renderer.create(
    <TopicCard
      data={{
        id: "5a53344f82e7eec2a93dae9b",
        username: "Eva",
        title:
          "id ad nulla mollit incididunt exercitation ipsum quis ullamco nostrud",
        vote: 33,
        createdAt: "Tue Jan 16 2018 15:43:13 GMT+0000 (UTC)",
        modifiedAt: "Wed Jan 03 2018 03:28:48 GMT+0000 (UTC)",
      }}
      actions={{
        downvoteTopic: downvoteTopicAction,
        upvoteTopic: upvoteTopicAction,
      }}
    />,
  )
  expect(tree.toJSON()).toMatchSnapshot()

  const instance = tree.getInstance()
  instance.handleUpvoteTopic("asdf")
  expect(upvoteTopicAction.mock.calls).toHaveLength(1)

  instance.handleDownvoteTopic("asdf")
  expect(upvoteTopicAction.mock.calls).toHaveLength(1)
})
