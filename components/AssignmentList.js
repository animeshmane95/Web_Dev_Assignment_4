import React, {Component} from 'react'
import {View, Alert, ScrollView} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import {Button} from 'react-native-elements'
import { Icon } from 'react-native-elements'


class AssignmentList extends Component {
  static navigationOptions = {title: 'assignments'}
  constructor(props) {
    super(props)
    this.state = {
      assignments: [],
      topicId: 1
    }
  }

  deleteAssignment(assignmentId){

      return fetch('https://webdev-summer1-2018-animesh.herokuapp.com/api/delete/assignment/'+assignmentId , {
      method: 'Delete'
    }).then(() => this.props.navigation.navigate("AssignmentList"
        ,{topicId:this.state.topicId}))

  }

  componentWillReceiveProps(newProps){

    const {navigation} = newProps;
    const topicId = navigation.getParam("topicId")
    this.setState({topicId: topicId})
    fetch("https://webdev-summer1-2018-animesh.herokuapp.com/api/topic/"+topicId+"/assignment")
      .then(response => (response.json()))
      .then(assignments => {
        this.setState({assignments})})

  }




  componentDidMount() {
    const {navigation} = this.props;
    const topicId = navigation.getParam("topicId")
    this.setState({topicId: topicId})
    fetch("https://webdev-summer1-2018-animesh.herokuapp.com/api/topic/"+topicId+"/assignment")
      .then(response => (response.json()))
      .then(assignments => {
        this.setState({assignments})})
      }
  
  render() {
    return(
      <ScrollView style={{padding: 15}}>
      <Text> Assignment List for Topic {this.state.topicId}</Text>
      
      {this.state.assignments.map(
        (assignment, index) => (
          <ListItem
            key={index}
            title={assignment.title}
            rightIcon = {<Icon
      reverse
      color='red'
      name='ios-close-circle-outline'
      type='ionicon'
        onPress={() => 
          this.deleteAssignment(assignment.id)}
    />

            }

          />))}

      <Icon
      reverse
      color='#517fa4'
      name='ios-add-circle'
      type='ionicon'
       onPress={() => this.props.navigation
              .navigate("AssignmentEditor",{topicId:
                this.state.topicId})}
    />

      </ScrollView>
    )
  }
}
export default AssignmentList