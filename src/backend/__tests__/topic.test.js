import TopicBackend, { sampleData } from "../topic"

const topicBackend = new TopicBackend()

describe("reducers", () => {
  it("should get topics", () => {
    topicData = topicBackend.getTopics()
    expect(typeof topicData).toEqual("object")
    expect(topicData).toHaveLength(sampleData.length)
  })

  it("should get topics with limit", () => {
    topicData = topicBackend.getTopics({skip: 1, limit: 15})
    expect(typeof topicData).toEqual("object")
    expect(topicData).toHaveLength(15)
  })

  it("should get topics ordered by vote descending", () => {
    topicData = topicBackend.getTopics({ orderBy: "vote", ordering: -1 })
    expect(
      topicData.reduce(
        (isSorted, next, i, arr) =>
          isSorted && (i === 0 || next.vote <= arr[i - 1].vote),
        true,
      ),
    ).toBeTruthy()
  })

  it("should get topics ordered by vote (number) ascending", () => {
    topicData = topicBackend.getTopics({
      orderBy: "vote",
      ordering: 1,
    })
    expect(
      topicData.reduce(
        (isSorted, next, i, arr) =>
          isSorted && (i === 0 || next.vote >= arr[i - 1].vote),
        true,
      ),
    ).toBeTruthy()
  })

  it("should get topics ordered by username (string) descending", () => {
    topicData = topicBackend.getTopics({ orderBy: "username", ordering: -1 })
    expect(
      topicData.reduce(
        (isSorted, next, i, arr) =>
          isSorted && (i === 0 || next.username <= arr[i - 1].username),
        true,
      ),
    ).toBeTruthy()
  })

  it("should get topics ordered by username (string) ascending", () => {
    topicData = topicBackend.getTopics({ orderBy: "username" })
    expect(
      topicData.reduce(
        (isSorted, next, i, arr) =>
          isSorted && (i === 0 || next.username >= arr[i - 1].username),
        true,
      ),
    ).toBeTruthy()
  })

  it("should get topic by id", () => {
    topic = topicBackend.getTopicById("5a5334507959e328d8cea463")
    expect(topic.id).toEqual("5a5334507959e328d8cea463")
    expect(topic.username).toEqual("Avila")
    expect(topic.title).toEqual(
      "duis aute tempor nulla labore excepteur enim veniam aute et",
    )
    expect(topic.vote).toEqual(2)
  })

  it("should create new topic", () => {
    const topicsBefore = topicBackend.getTopics()
    const newTopic = topicBackend.createTopic("username", "topic content")
    const expectedTopics = [...topicsBefore, newTopic]

    expect(typeof newTopic).toEqual("object")
    expect(expectedTopics).toHaveLength(expectedTopics.length)
    expect(expectedTopics).toContain(newTopic)
  })

  it("should upvote topic", () => {
    topicVoteBefore = topicBackend.getTopicById("5a5334507959e328d8cea463").vote
    topicBackend.upvoteTopic("5a5334507959e328d8cea463")
    topicVoteAfter = topicBackend.getTopicById("5a5334507959e328d8cea463").vote
    expect(topicVoteAfter).toEqual(topicVoteBefore + 1)
  })

  it("should downvote topic", () => {
    topicVoteBefore = topicBackend.getTopicById("5a5334507959e328d8cea463").vote
    topicBackend.downvoteTopic("5a5334507959e328d8cea463")
    topicVoteAfter = topicBackend.getTopicById("5a5334507959e328d8cea463").vote
    expect(topicVoteAfter).toEqual(topicVoteBefore - 1)
  })
})
