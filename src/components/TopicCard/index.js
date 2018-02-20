import React from "react"
import PropTypes from "prop-types"
import { View, Text } from "react-native"
import { colorStyle, fontStyle } from "../../style"

import Card from "../Card"
import Button from "../Button"
import Icon from 'react-native-vector-icons/MaterialIcons'

class TopicCard extends React.Component {
  
  handleUpvoteTopic = (topicId) => {
    this.props.actions.upvoteTopic(topicId)
  }

  handleDownvoteTopic = (topicId) => {
    this.props.actions.downvoteTopic(topicId)
  }

  render() {
    const { data, actions: { downvoteTopic, upvoteTopic } } = this.props

    return (
      <View>
        <Card containerStyle={{ marginHorizontal: 0, marginVertical: 3 }}>
          <View
            style={{
              paddingTop: 10,
              paddingHorizontal: 15,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={fontStyle.caption}>@{data.username}</Text>
          </View>

          <View style={{ paddingVertical: 3, paddingHorizontal: 15 }}>
            <Text style={fontStyle.body2}>{data.title}</Text>
          </View>

          <View style={{ flexDirection: "row", paddingTop: 5 }}>
            
            <Icon.Button 
              name="thumb-up" 
              rippleColor={colorStyle.primaryDark}
              backgroundColor="#f2f2f2" 
              onPress={this.handleUpvoteTopic.bind(this, data.id)} 
              size={30} 
              color="#0f0" 
            >
            </Icon.Button>
            
            <Icon.Button 
              name="thumb-down" 
              backgroundColor="#f2f2f2"
              onPress={this.handleUpvoteTopic.bind(this, data.id)} 
              size={30} 
              color="#f00" 
            >
            </Icon.Button>

            
            <Text
              style={{
                paddingVertical: 8,
                paddingHorizontal: 3
              }}
            >
              {data.vote} votes
            </Text>

          </View>

        </Card>
      </View>
    )
  }
}

TopicCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    vote: PropTypes.number.isRequired,
  }).isRequired,
  actions: PropTypes.shape({
    downvoteTopic: PropTypes.func.isRequired,
    upvoteTopic: PropTypes.func.isRequired,
  }).isRequired,
}

export default TopicCard
