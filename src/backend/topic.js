import { generateObjectId } from "../util"

/**
 * TopicBackend is an in-memory backend for handling topics
 */
class TopicBackend {
  constructor() {
    // initialize with sample in-memory data
    this.data = sampleData
  }

  /**
   * Get all topics in db
   * @param  {number} args.skip  number of items skipped
   * @param  {number} args.limit  number of items fetched
   * @param  {string} args.orderBy  key of object which is used for ordering (id, username, title, and vote)
   * @param  {number} args.ordering  1 means ascending order, -1 means descending order
   */
  getTopics = ({ skip = 0, limit = 20, orderBy = null, ordering = 1 } = {}) => {
    let data = [...this.data]

    if (["id", "username", "title", "vote"].includes(orderBy)) {
      if (ordering === -1) {
        /** perform case-insensitive sorting */
        data.sort((a, b) => {
          // prettier-ignore
          const valA = typeof a[orderBy] === "string" ? a[orderBy].toUpperCase() : a[orderBy]
          // prettier-ignore
          const valB = typeof b[orderBy] === "string" ? b[orderBy].toUpperCase() : b[orderBy]

          if (a[orderBy] > b[orderBy]) return -1
          if (a[orderBy] < b[orderBy]) return 1
          return 0
        })
      } else {
        /** perform case-insensitive sorting */
        data.sort((a, b) => {
          // prettier-ignore
          const valA = typeof a[orderBy] === "string" ? a[orderBy].toUpperCase() : a[orderBy]
          // prettier-ignore
          const valB = typeof b[orderBy] === "string" ? b[orderBy].toUpperCase() : b[orderBy]

          if (a[orderBy] < b[orderBy]) return -1
          if (a[orderBy] > b[orderBy]) return 1
          return 0
        })
      }
    }

    //handle skip and limit
    data = data.slice(skip, skip + limit)

    return data
  }

  /**
   * Get topic by its object id
   * @param  {string} topicId  object id of the topic
   */
  getTopicById = (topicId) => {
    return this.data.find((e) => e.id === topicId)
  }

  /**
   * Upvote topic by its object id
   * @param  {string} topicId  object id of the topic
   */
  upvoteTopic = (topicId) => {
    return this._changeTopicVote(topicId, 1)
  }

  /**
   * Downvote topic by its object id
   * @param  {string} topicId  object id of the topic
   */
  downvoteTopic = (topicId) => {
    return this._changeTopicVote(topicId, -1)
  }

  /**
   * Get topic's index in db by its object id
   * @param  {string} topicId  object id of the topic
   */
  _getTopicIndex = (topicId) => {
    return this.data.findIndex((e) => e.id === topicId)
  }

  /**
   * Change topic's vote value by its object id
   * @param  {string} topicId  object id of the topic
   */
  _changeTopicVote = (topicId, value) => {
    const topicIndex = this._getTopicIndex(topicId)
    if (topicIndex >= 0) {
      this.data[topicIndex] = {
        ...this.data[topicIndex],
        vote: this.data[topicIndex].vote + value,
      }
      return this.data[topicIndex].vote
    } else {
      return -1
    }
  }
}

/** Sample data containing 20 topics
 * Generated from https://next.json-generator.com using template:
 [
    {
    'repeat(20, 20)': {
        id: '{{objectId()}}',
        username: '{{firstName()}}',
        title: '{{lorem(10, "words")}}',
        vote: '{{integer(0, 100)}}',
        createdAt: '{{date(new Date(2017, 12, 1), new Date(2018, 1, 8))}}',
        modifiedAt: '{{date(new Date(2017, 12, 1), new Date(2018, 1, 8))}}'
    }
    }
]
*/
export const sampleData =[
  {
    "id": "5a8bc96ceaab59cdae86d416",
    "username": "Hardy",
    "title": "commodo consequat quis et sunt eu enim nulla qui eu",
    "vote": 51,
    "createdAt": "Fri Jan 19 2018 21:44:45 GMT+0000 (UTC)",
    "modifiedAt": "Thu Jan 18 2018 23:52:40 GMT+0000 (UTC)"
  },
  {
    "id": "5a8bc96d226c31732bf8c11d",
    "username": "Leola",
    "title": "minim ipsum duis excepteur voluptate nostrud laboris amet sint qui",
    "vote": 20,
    "createdAt": "Sat Feb 03 2018 08:28:29 GMT+0000 (UTC)",
    "modifiedAt": "Thu Jan 11 2018 18:56:22 GMT+0000 (UTC)"
  },
  {
    "id": "5a8bc96d510aad4c93896414",
    "username": "Gaines",
    "title": "eu nostrud ipsum excepteur ea nisi Lorem nulla sit aute",
    "vote": 96,
    "createdAt": "Sat Jan 13 2018 23:07:42 GMT+0000 (UTC)",
    "modifiedAt": "Mon Feb 05 2018 09:51:31 GMT+0000 (UTC)"
  },
  {
    "id": "5a8bc96dd41cfaf224c6f42f",
    "username": "Allison",
    "title": "mollit consectetur consectetur laborum sit eu qui pariatur irure est",
    "vote": 11,
    "createdAt": "Mon Jan 22 2018 00:55:08 GMT+0000 (UTC)",
    "modifiedAt": "Tue Jan 23 2018 17:19:01 GMT+0000 (UTC)"
  },
  {
    "id": "5a8bc96d22e4490091028959",
    "username": "Petty",
    "title": "sunt nisi velit labore eiusmod dolor ex tempor ullamco est",
    "vote": 80,
    "createdAt": "Thu Feb 01 2018 04:24:42 GMT+0000 (UTC)",
    "modifiedAt": "Sun Jan 14 2018 23:22:51 GMT+0000 (UTC)"
  },
  {
    "id": "5a8bc96de139055ba8791c21",
    "username": "Kelley",
    "title": "ipsum elit sint id excepteur duis elit cupidatat excepteur qui",
    "vote": 78,
    "createdAt": "Sun Jan 14 2018 03:16:05 GMT+0000 (UTC)",
    "modifiedAt": "Tue Feb 06 2018 22:28:28 GMT+0000 (UTC)"
  },
  {
    "id": "5a8bc96d74c847f2add6d501",
    "username": "Meadows",
    "title": "dolore dolor tempor duis dolore sint cillum dolor magna adipisicing",
    "vote": 77,
    "createdAt": "Sat Jan 20 2018 05:49:51 GMT+0000 (UTC)",
    "modifiedAt": "Sun Jan 21 2018 12:19:09 GMT+0000 (UTC)"
  },
  {
    "id": "5a8bc96d19402ff8e509fed9",
    "username": "Riley",
    "title": "ea qui aliqua proident ea nisi esse sunt minim fugiat",
    "vote": 19,
    "createdAt": "Sun Jan 14 2018 06:31:03 GMT+0000 (UTC)",
    "modifiedAt": "Tue Jan 30 2018 10:23:14 GMT+0000 (UTC)"
  },
  {
    "id": "5a8bc96d3f352e7e4722240c",
    "username": "Guy",
    "title": "dolor do mollit anim nulla deserunt minim do consectetur eiusmod",
    "vote": 5,
    "createdAt": "Fri Jan 19 2018 14:19:22 GMT+0000 (UTC)",
    "modifiedAt": "Thu Jan 18 2018 05:27:30 GMT+0000 (UTC)"
  },
  {
    "id": "5a8bc96df1285d8f4537c425",
    "username": "Dunn",
    "title": "anim voluptate dolor laborum in exercitation in sit dolore cupidatat",
    "vote": 32,
    "createdAt": "Thu Jan 11 2018 01:12:20 GMT+0000 (UTC)",
    "modifiedAt": "Fri Jan 26 2018 05:32:47 GMT+0000 (UTC)"
  },
  {
    "id": "5a8bc96ddec0799cb3a87d7b",
    "username": "Celina",
    "title": "aute culpa reprehenderit minim culpa culpa ipsum ullamco adipisicing commodo",
    "vote": 22,
    "createdAt": "Fri Jan 05 2018 08:33:48 GMT+0000 (UTC)",
    "modifiedAt": "Fri Feb 02 2018 22:03:05 GMT+0000 (UTC)"
  },
  {
    "id": "5a8bc96d6962d3115fb4d66f",
    "username": "Effie",
    "title": "eiusmod sit officia nostrud nulla reprehenderit et incididunt Lorem nulla",
    "vote": 26,
    "createdAt": "Thu Jan 04 2018 06:29:39 GMT+0000 (UTC)",
    "modifiedAt": "Thu Jan 25 2018 07:50:32 GMT+0000 (UTC)"
  },
  {
    "id": "5a8bc96dca2373b28ac25c98",
    "username": "Juliet",
    "title": "anim nisi laborum labore laborum mollit dolore Lorem adipisicing labore",
    "vote": 8,
    "createdAt": "Fri Jan 12 2018 18:20:07 GMT+0000 (UTC)",
    "modifiedAt": "Wed Jan 31 2018 10:35:07 GMT+0000 (UTC)"
  },
  {
    "id": "5a8bc96d0dd1b0a570c513e1",
    "username": "Hunt",
    "title": "aliqua ipsum cillum qui mollit ut sint magna est est",
    "vote": 3,
    "createdAt": "Thu Jan 25 2018 17:36:35 GMT+0000 (UTC)",
    "modifiedAt": "Sat Jan 20 2018 18:22:14 GMT+0000 (UTC)"
  },
  {
    "id": "5a8bc96db631fae49aa55522",
    "username": "Huffman",
    "title": "eiusmod sit anim cillum minim magna minim Lorem cupidatat enim",
    "vote": 99,
    "createdAt": "Wed Jan 31 2018 15:49:33 GMT+0000 (UTC)",
    "modifiedAt": "Sun Jan 14 2018 19:24:35 GMT+0000 (UTC)"
  },
  {
    "id": "5a8bc96d29a073cd1781817f",
    "username": "Jenny",
    "title": "dolor nisi enim consectetur exercitation ipsum culpa do nisi ea",
    "vote": 6,
    "createdAt": "Wed Jan 10 2018 09:46:22 GMT+0000 (UTC)",
    "modifiedAt": "Mon Jan 15 2018 08:13:16 GMT+0000 (UTC)"
  },
  {
    "id": "5a8bc96dc52790f99829a1f2",
    "username": "Leona",
    "title": "aute laborum id proident anim veniam fugiat aliquip magna commodo",
    "vote": 57,
    "createdAt": "Fri Jan 19 2018 15:13:04 GMT+0000 (UTC)",
    "modifiedAt": "Wed Jan 17 2018 18:27:12 GMT+0000 (UTC)"
  },
  {
    "id": "5a8bc96dbf3e8ec133473f5f",
    "username": "Madeline",
    "title": "qui reprehenderit pariatur ipsum minim sit ea duis aliquip ut",
    "vote": 5,
    "createdAt": "Thu Jan 04 2018 20:02:20 GMT+0000 (UTC)",
    "modifiedAt": "Sat Feb 03 2018 08:55:27 GMT+0000 (UTC)"
  },
  {
    "id": "5a8bc96d72acff5db4a03b40",
    "username": "Deidre",
    "title": "Lorem ut exercitation esse cupidatat labore magna aliqua consequat exercitation",
    "vote": 66,
    "createdAt": "Thu Jan 11 2018 07:22:58 GMT+0000 (UTC)",
    "modifiedAt": "Mon Jan 22 2018 02:11:49 GMT+0000 (UTC)"
  },
  {
    "id": "5a8bc96d4d7b2135ce28283b",
    "username": "Avila",
    "title": "esse dolore ut magna ut pariatur culpa eiusmod dolore nostrud",
    "vote": 20,
    "createdAt": "Mon Jan 08 2018 01:41:35 GMT+0000 (UTC)",
    "modifiedAt": "Tue Jan 02 2018 08:41:22 GMT+0000 (UTC)"
  }
]

export default TopicBackend
