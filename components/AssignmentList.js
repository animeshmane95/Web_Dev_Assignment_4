import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import {Button} from 'react-native-elements'

class AssignmentList extends Component {
  static navigationOptions = {title: 'assignments'}
  constructor(props) {
    super(props)
    this.state = {
      assignments: [],
      topicId: 1
    }
  }

  componentWillReceiveProps(newProps){

    const {navigation} = newProps;
    const topicId = navigation.getParam("topicId")
    this.setState({topicId: topicId})
    fetch("http://10.0.0.77:8080/api/topic/"+topicId+"/assignment")
      .then(response => (response.json()))
      .then(assignments => {
        this.setState({assignments})})

  }


  componentDidMount() {
    const {navigation} = this.props;
    const topicId = navigation.getParam("topicId")
    this.setState({topicId: topicId})
    fetch("http://10.0.0.77:8080/api/topic/"+topicId+"/assignment")
      .then(response => (response.json()))
      .then(assignments => {
        this.setState({assignments})})
      }
  
  render() {
    return(
      <View style={{padding: 15}}>
      <Text> Assignment List for Topic {this.state.topicId}</Text>
      <Button title = "Add Assignment" 
      onPress={() => this.props.navigation
              .navigate("AssignmentEditor",{topicId:
                this.state.topicId})}/>
      {this.state.assignments.map(
        (assignment, index) => (
          <ListItem
            onPress={() => this.props.navigation
              .navigate("WidgetList", {
                widgetId: topic.id})}
            key={index}
            title={assignment.title}/>))}
      </View>
    )
  }
}
export default AssignmentList