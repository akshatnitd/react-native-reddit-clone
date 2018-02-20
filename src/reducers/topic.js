import TopicBackend from "../backend/topic"
import { generateObjectId } from "../util"

export const topicBackend = new TopicBackend()

const initialState = {
  /** topics is a nullable array, containing all fetched topics.
   * null: no data initialized / loading initial data
   * []: no data found
   * 
   * expected data value:
      [{
        "id": "5a53344f82e7eec2a93dae9b",
        "username": "username",
        "title": "title",
        "vote": 1,
        "createdAt": "Tue Jan 16 2018 15:43:13 GMT+0000 (UTC)",
        "modifiedAt": "Wed Jan 03 2018 03:28:48 GMT+0000 (UTC)"
      }]
   */
  topics: null,
}

/** action types */
export const types = {
  /** fetch initial topic data (FIXME: from sample data) */
  FETCH_TOPICS: "topic/FETCH_TOPICS",

  /** create a topic */
  CREATE_TOPIC: "topic/CREATE_TOPIC",

  /** increase a topic vote by 1 */
  UPVOTE_TOPIC: "topic/UPVOTE_TOPIC",

  /** decrease a topic vote by 1 */
  DOWNVOTE_TOPIC: "topic/DOWNVOTE_TOPIC",
}

/** action dispatches */
export const actions = {
  // prettier-ignore
  fetchTopics: ({ skip = 0, limit = 20, orderBy = null, ordering = 1 } = {}) => {
    return {
      type: types.FETCH_TOPICS,
      payload: {
        topics: topicBackend.getTopics({ skip, limit, orderBy, ordering }),
      },
    }
  },
  createTopic: (username, title) => {
    return {
      type: types.CREATE_TOPIC,
      payload: { topic: topicBackend.createTopic(username, title) },
    }
  },
  upvoteTopic: (topicId) => {
    return {
      type: types.UPVOTE_TOPIC,
      payload: { topicId, value: topicBackend.upvoteTopic(topicId) },
    }
  },
  downvoteTopic: (topicId) => {
    return {
      type: types.DOWNVOTE_TOPIC,
      payload: { topicId, value: topicBackend.downvoteTopic(topicId) },
    }
  },
}

/** reducer */
export const reducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case types.FETCH_TOPICS: {
      return {
        ...state,
        topics: payload.topics,
      }
    }
    case types.CREATE_TOPIC: {
      const topicArray = state.topics === null ? [] : state.topics
      return {
        ...state,
        topics: [payload.topic, ...topicArray],
      }
    }
    case types.DOWNVOTE_TOPIC:
    case types.UPVOTE_TOPIC: {
      return {
        ...state,
        topics: state.topics.map(
          (topic) =>
            topic.id === payload.topicId
              ? { ...topic, vote: payload.value }
              : topic,
        ),
      }
    }
    default: {
      return state
    }
  }
}

export default reducer
