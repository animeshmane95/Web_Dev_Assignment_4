import React, {Component} from 'react'
import {View, Alert, ScrollView} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import {Button} from 'react-native-elements'
import { Icon } from 'react-native-elements'

class ExamList extends Component {
  static navigationOptions = {title: 'exams'}
  constructor(props) {
    super(props)
    this.state = {
      exams: [],
      topicId: 1
    }
  }

   deleteExam(examId){

      return fetch('https://webdev-summer1-2018-animesh.herokuapp.com/api/delete/exam/'+examId , {
      method: 'Delete'
    }).then(() => this.props.navigation.navigate("ExamList"
        ,{topicId:this.state.topicId}))

  }

   componentWillReceiveProps(newProps){

    const {navigation} = newProps;
    const topicId = navigation.getParam("topicId")
    this.setState({topicId: topicId})
    fetch("https://webdev-summer1-2018-animesh.herokuapp.com/api/topic/"+topicId+"/exam")
      .then(response => (response.json()))
      .then(exams => {
        this.setState({exams})})

  }


componentDidMount() {
    const {navigation} = this.props;
    const topicId = navigation.getParam("topicId")
    this.setState({topicId: topicId})
    fetch("https://webdev-summer1-2018-animesh.herokuapp.com/api/topic/"+topicId+"/exam")
      .then(response => (response.json()))
      .then(exams => {
        this.setState({exams})})
      }


render() {
    return(
      <ScrollView style={{padding: 15}}>
      <Text> Exam List for Topic {this.state.topicId}</Text>
      
      {this.state.exams.map(
        (exam, index) => (
          <ListItem
          	onPress={() => this.props.navigation
          		.navigate("QuestionList",{examId: exam.id})} 
            key={index}
            title={exam.title}
            rightIcon = {<Icon
      reverse
      color='red'
      size = {15}
      name='ios-close-circle-outline'
      type='ionicon'
        onPress={() => 
          this.deleteExam(exam.id)}
    />

            }

          />))}

      <Icon
      reverse
      color='#517fa4'
      name='ios-add-circle'
      type='ionicon'
       onPress={() => this.props.navigation
              .navigate("ExamEditor",{topicId:
                this.state.topicId})}
    />

      </ScrollView>
    )
  }
}

 export default ExamList