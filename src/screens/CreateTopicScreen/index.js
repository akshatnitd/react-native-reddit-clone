import React from "react"
import PropTypes from "prop-types"
import { Text, TextInput, View, Alert, Keyboard } from "react-native"
import { Navigation } from "react-native-navigation"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { actions } from "../../reducers/topic"
import { colorStyle, fontStyle } from "../../style"

import Button from "../../components/Button"
import Input from "../../components/Input"
import Card from "../../components/Card"

export class CreateTopicScreen extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = { username: "", title: "" }
  }

  handleUsernameTextChange = (text) => {
    this.setState({ username: text })
  }

  handleTitleTextChange = (text) => {
    this.setState({ title: text })
  }

  handleSubmit = () => {
    const { username, title } = this.state
    if (username.length > 0 && title.length > 0 && title.length <= 255) {
      Keyboard.dismiss()
      this.props.createTopic(username, title)
      Navigation.dismissModal({ animationType: "slide-down" })
    } else {
      Alert.alert("Error", "Please fill username and title (255 chars max).")
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Card containerStyle={{ flex: 1, padding: 20 }}>
          <Input
            placeholder="Type your username"
            labelText="Username"
            onChangeText={this.handleUsernameTextChange}
            value={this.state.username}
          />
          <Input
            placeholder="Type what you want to say"
            labelText="Title"
            onChangeText={this.handleTitleTextChange}
            value={this.state.title}
            multiline={true}
            numberOfLines={6}
            autoGrow={false}
            maxHeight={115}
            maxLength={255}
          />
          <Button
            containerStyle={{
              flex: 0,
              height: 40,
              elevation: 1,
            }}
            buttonStyle={{
              backgroundColor: colorStyle.primaryDark,
            }}
            textStyle={{
              color: colorStyle.superLight,
            }}
            onPress={this.handleSubmit}
          >
            SUBMIT 
          </Button>
        </Card>
      </View>
    )
  }
}

CreateTopicScreen.propTypes = {
  createTopic: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      createTopic: actions.createTopic,
    },
    dispatch,
  )

export default connect(null, mapDispatchToProps)(CreateTopicScreen)
