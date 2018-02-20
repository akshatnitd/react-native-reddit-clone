import React from "react"
import PropTypes from "prop-types"
import {
  Text,
  View,
  TouchableNativeFeedback,
  TouchableHighlight,
  Platform,
  StyleSheet,
} from "react-native"
import { colorStyle, fontStyle } from "../../style"

const Button = (props) => {
  const {
    containerStyle,
    buttonStyle,
    textStyle,
    rippleColor,
    underlayColor,
    children,
    onPress,
  } = props
  return (
    <View style={[style.container, containerStyle]}>
      {Platform.OS === "android" ? (
        <TouchableNativeFeedback
          onPress={onPress}
          background={TouchableNativeFeedback.Ripple(
            rippleColor || colorStyle.semiLight,
            true,
          )}
        >
          <View style={[style.button, buttonStyle]} {...props}>
            <Text style={[fontStyle.button, textStyle]}>{children}</Text>
          </View>
        </TouchableNativeFeedback>
      ) : (
        <TouchableHighlight onPress={onPress} underlayColor={underlayColor}>
          <View style={[style.button, containerStyle]} {...props}>
            <Text style={[fontStyle.button, textStyle]}>{children}</Text>
          </View>
        </TouchableHighlight>
      )}
    </View>
  )
}

Button.propTypes = {
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  buttonStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  rippleColor: PropTypes.string,
  underlayColor: PropTypes.string,
  children: PropTypes.string,
  onPress: PropTypes.func,
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
    borderRadius: 6,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
    borderColor: colorStyle.semiLight,
    paddingVertical: 8,
    paddingHorizontal: 3,
  },
})

export default Button
