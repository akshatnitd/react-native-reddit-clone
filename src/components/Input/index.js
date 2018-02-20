import React from "react"
import PropTypes from "prop-types"
import { Text, TextInput, View, StyleSheet } from "react-native"
import { colorStyle, fontStyle } from "../../style"

const Input = (props) => {
  const { labelText, labelStyle, inputStyle, containerStyle } = props
  return (
    <View style={[style.container, containerStyle]}>
      <Text style={[fontStyle.caption, style.label, labelStyle]}>
        {labelText}
      </Text>
      <TextInput
        style={[
          fontStyle.body1,
          style.input,
          props.multiline ? { paddingBottom: 12 } : null,
          inputStyle,
        ]}
        {...props}
      />
    </View>
  )
}

Input.propTypes = {
  labelText: PropTypes.string,
  labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  inputStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
}

const style = StyleSheet.create({
  container: {
    paddingVertical: 5,
  },
  label: {
    paddingHorizontal: 4,
  },
  input: {
    padding: 4,
    justifyContent: "flex-start",
    textAlignVertical: "top",
  },
})

export default Input
