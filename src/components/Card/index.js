import React from "react"
import PropTypes from "prop-types"
import { View, StyleSheet } from "react-native"
import { colorStyle, fontStyle } from "../../style"

const Card = (props) => {
  const { containerStyle, children } = props
  return (
    <View style={[style.container, containerStyle]} {...props}>
      {children}
    </View>
  )
}

Card.propTypes = {
  containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node,
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "nowrap",
    backgroundColor: colorStyle.superLight,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 1,
  },
})

export default Card
