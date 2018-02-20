import { topicBackend, actions, types, reducer } from "../topic"

describe("reducers", () => {
  it("should fetch topics", () => {
    const stateBefore = { topics: null }
    const action = actions.fetchTopics()

    const stateAfter = reducer(stateBefore, action)

    expect(typeof stateAfter.topics).toEqual("object")
    expect(stateAfter.topics).toHaveLength(20)

    data = topicBackend.getTopics()
    expect(stateAfter.topics[stateAfter.topics.length - 1].id).toEqual(
      data[data.length - 1].id,
    )
  })

  it("should get topics ordered by vote descending", () => {
    const stateBefore = { topics: null }
    const action = actions.fetchTopics({ orderBy: "vote", ordering: -1 })

    const stateAfter = reducer(stateBefore, action)

    expect(typeof stateAfter.topics).toEqual("object")
    expect(stateAfter.topics).toHaveLength(20)
    expect(
      stateAfter.topics.reduce(
        (isSorted, next, i, arr) =>
          isSorted && (i === 0 || next.vote <= arr[i - 1].vote),
        true,
      ),
    ).toBeTruthy()
  })

  describe("new topic creations", () => {
    it("should create topic when topics array is not initialized", () => {
      const stateBefore = { topics: null }
      const action = actions.createTopic("username", "topic content")
      const stateAfter = reducer(stateBefore, action)

      expect(stateAfter.topics).toHaveLength(1)
      expect(stateAfter.topics[0].username).toEqual("username")
      expect(stateAfter.topics[0].title).toEqual("topic content")
    })

    it("should create topic when topics array is empty", () => {
      const stateBefore = { topics: [] }
      const action = actions.createTopic("username", "topic content")
      const stateAfter = reducer(stateBefore, action)

      expect(stateAfter.topics).toHaveLength(1)
      expect(stateAfter.topics[0].username).toEqual("username")
      expect(stateAfter.topics[0].title).toEqual("topic content")
    })

    it("should create topic and place it first when there are existing topics", () => {
      const stateBefore = {
        topics: [
          {
            id: "5a53344f82e7eec2a93dae9b",
            username: "myname",
            title: "title",
            vote: 33,
            createdAt: "Tue Jan 16 2018 15:43:13 GMT+0000 (UTC)",
          },
        ],
      }
      const action = actions.createTopic("username", "topic content")
      const stateAfter = reducer(stateBefore, action)

      expect(stateAfter.topics).toHaveLength(2)
      expect(stateAfter.topics[0].username).toEqual("username")
      expect(stateAfter.topics[0].title).toEqual("topic content")

      expect(stateAfter.topics[1]).toEqual(stateBefore.topics[0])
    })
  })

  it("should upvote topic", () => {
    const stateBefore = {
      topics: topicBackend.getTopics(),
    }
    const topicBefore = stateBefore.topics[0]

    const action = actions.upvoteTopic(topicBefore.id)

    const stateAfter = reducer(stateBefore, action)
    const topicAfter = stateAfter.topics[0]

    expect(topicAfter.vote).toEqual(topicBefore.vote + 1)
  })

  it("should downvote topic", () => {
    const stateBefore = { topics: topicBackend.getTopics() }
    const topicBefore = stateBefore.topics[0]

    const action = actions.downvoteTopic(topicBefore.id)

    const stateAfter = reducer(stateBefore, action)
    const topicAfter = stateAfter.topics[0]

    expect(topicAfter.vote).toEqual(topicBefore.vote - 1)
  })

  it("should not downvote topic", () => {
    const stateBefore = { topics: topicBackend.getTopics() }
    const topicBefore = stateBefore.topics[0]

    const action = actions.downvoteTopic(stateBefore.topics[1])

    const stateAfter = reducer(stateBefore, action)
    const topicAfter = stateAfter.topics[0]

    expect(topicAfter.vote).toEqual(topicBefore.vote)
  })

  it("should not change state", () => {
    const stateBefore = { topics: [] }
    const action = { type: 'random', payload: null }

    const stateAfter = reducer(stateBefore, action)

    expect(stateAfter).toEqual(stateBefore)
  })
})
