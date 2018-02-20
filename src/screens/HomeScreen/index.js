import React from "react"
import PropTypes from "prop-types"
import { Text, View, FlatList } from "react-native"
import { Navigation } from "react-native-navigation"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { actions } from "../../reducers/topic"

import TopicCard from "../../components/TopicCard"
import FloatingActionButton from "../../components/FloatingActionButton"

export class HomeScreen extends React.Component {
  
  componentDidMount() {
    this.handleListRefresh()
  }

  handleListRefresh = () => {
    this.props.fetchTopics({ limit: 20, orderBy: "vote", ordering: -1 })
  }

  handleShowCreateTopicForm = () => {
    Navigation.showModal({
      screen: "carousell.CreateTopicScreen",
      title: "Create Topic",
    })
  }

  render() {
    const { topics, upvoteTopic, downvoteTopic } = this.props

    return (
      <View>
        {typeof topics === "object" ? (
          <FlatList
            style={{ marginVertical: 5 }}
            data={topics}
            renderItem={({ item }) => (
              <TopicCard data={item} actions={{ upvoteTopic, downvoteTopic }} />
            )}
            keyExtractor={(item) => item.id}
            onRefresh={this.handleListRefresh}
            refreshing={topics === null}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>No Data</Text>
          </View>
        )}
        <FloatingActionButton onPress={this.handleShowCreateTopicForm}>
          + NEW TOPIC
        </FloatingActionButton>
      </View>
    )
  }
}

HomeScreen.propTypes = {
  topics: PropTypes.array,
  fetchTopics: PropTypes.func.isRequired,
  upvoteTopic: PropTypes.func.isRequired,
  downvoteTopic: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  topics: state.topic.topics,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchTopics: actions.fetchTopics,
      upvoteTopic: actions.upvoteTopic,
      downvoteTopic: actions.downvoteTopic,
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
