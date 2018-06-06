import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import {Button} from 'react-native-elements'

class WidgetList extends Component {
  static navigationOptions = {title: 'Widgets'}
  constructor(props) {
    super(props)
    this.state = {
      widgets: [],
      topicId: 1
    }
  }
  componentDidMount() {
    const {navigation} = this.props;
    const topicId = navigation.getParam("topicId")
    this.setState({
      topicId: topicId
    })
    fetch("http://192.168.43.120:8080/api/topic/"+topicId+"/widget")
      .then(response => (response.json()))
      .then(widgets => this.setState({widgets}))
  }
  render() {
    return(
      <View style={{padding: 15}}>
      <Text>
      Widget List for {this.state.topicId} 
      </Text>
      <Button title = "ASSIGNMENT WIDGET" color = "blue"
       onPress={() => this.props.navigation
              .navigate("AssignmentList",{topicId:
                this.state.topicId})}/>
       <Button title="EXAM WIDGET" color = "blue" />
      </View>
    )
  }
}
export default WidgetList