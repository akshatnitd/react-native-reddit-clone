import React from "react"
import PropTypes from "prop-types"
import { View, Image, Text, StyleSheet } from "react-native"
import { colorStyle, fontStyle } from "../../style"
import Button from "../Button"

const FloatingActionButton = (props) => {
  const { containerStyle, buttonStyle, textStyle, children, onPress } = props

  return (
    <Button
      containerStyle={[style.container, containerStyle]}
      buttonStyle={[style.button, buttonStyle]}
      textStyle={[style.text, textStyle]}
      {...props}
    >
      {children}
    </Button>
  )
}

FloatingActionButton.propTypes = {
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  buttonStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.string,
  onPress: PropTypes.func,
}

const style = StyleSheet.create({
  container: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    bottom: 10,
    borderRadius: 20,
    elevation: 4,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: colorStyle.primaryDark,
  },
  text: {
    color: colorStyle.superLight,
  },
})

export default FloatingActionButton
