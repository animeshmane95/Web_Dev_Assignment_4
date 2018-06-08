import React from 'react'
import {View} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'

class ExamEditor extends React.Component {
  static navigationOptions = { title: "ExamEditor"}
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      description: 'This is description of the exam widget',
      title: 'Default Exam'
    }
  }

   componentDidMount() {
    const {navigation} = this.props;
    const topicId = navigation.getParam("topicId")
    this.setState({topicId: topicId})
  }

    createExam(topicId){

      var exam = {
      description: this.state.description,
      questions: this.state.questions,
      title: this.state.title

      }

      return fetch('https://webdev-summer1-2018-animesh.herokuapp.com/api/topic/'+topicId+'/exam',
      {
        body: JSON.stringify(exam),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      }).then(() => this.props.navigation.navigate("ExamList"
        ,{topicId:this.state.topicId}))

    }

  updateForm(newState) {
    this.setState(newState)
    this.setState()
  }
  render() {
    return(
      <View>
        <FormLabel>Title</FormLabel>
        <FormInput onChangeText={
          text => this.updateForm({title: text})
        }/>

        <FormValidationMessage>
          Title is required
        </FormValidationMessage>

        <FormLabel>Description</FormLabel>
        <FormInput onChangeText={
          text => this.updateForm({description: text})
        }/>
        

        <Button	backgroundColor="green"
                 color="white"
                 title="Save"
        onPress={() => 
          this.createExam(this.state.topicId)}
          />


          
        <Text h3>Preview</Text>
        <Text h2>{this.state.title}</Text>
        <Text>{this.state.description}</Text>
      </View>
    )
  }
}

export default ExamEditor