import React from 'react'
import {View,ScrollView} from 'react-native'
import {Text, Button, CheckBox, TextInput} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
  from 'react-native-elements'

class EssayQuestionEditor extends React.Component {
  static navigationOptions = { title: "Essay"}
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      points: 0,
      essayQuestion: ''
    }
  }

  componentDidMount() {
    const {navigation} = this.props;
    const examId = navigation.getParam("examId")
    this.setState({examId: examId})
  }


   createEssay(examId){

      var essay = {
      title: this.state.title,
      description: this.state.description,
      points: this.state.points,
      essayQuestion: this.state.essayQuestion

      }

      return fetch('http://10.0.0.77:8080/api/exam/'+examId+'/essay',
      {
        body: JSON.stringify(essay),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      }).then(() => this.props.navigation.navigate("QuestionList"
        ,{examId:this.state.examId}))

    }


  updateForm(newState) {
    this.setState(newState)
  }
  render() {
    return(
      <ScrollView>

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
        <FormValidationMessage>
          Description is required
        </FormValidationMessage>

        <FormLabel>Essay Question</FormLabel>
        <FormInput onChangeText={
          text => this.updateForm({essayQuestion: text})
        }/>

        <FormLabel>Points</FormLabel>
        <FormInput onChangeText={
          text => this.updateForm({points: text})
        }/>


        <Button backgroundColor="green"
                 color="white"
                 title="Save"
        onPress={() => 
          this.createEssay(this.state.examId)}
          />

        <Button backgroundColor="red"
                 color="white"
                 title="Cancel"
          onPress={() => 
         this.props.navigation.navigate("QuestionList"
        ,{examId:this.state.examId})}/>

        <Text h3>Preview</Text>
        <Text h2>{this.state.title}</Text>
        <Text>{this.state.description}</Text>
        <Text>{this.state.essayQuestion}</Text>
        <Text>{this.state.points}</Text>


      </ScrollView>
    )
  }
}

export default EssayQuestionEditor