import React from 'react'
import {View,ScrollView,TextInput} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
  from 'react-native-elements'

class BlankQuestionEditor extends React.Component {
  static navigationOptions = { title: "Essay"}
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      points: 0,
      blankQuestion: ''
    }
  }

  componentDidMount() {
    const {navigation} = this.props;
    const examId = navigation.getParam("examId")
    this.setState({examId: examId})
  }


   createBlank(examId){

      var blank = {
      title: this.state.title,
      description: this.state.description,
      points: this.state.points,
      blankQuestion: this.state.blankQuestion

      }

      return fetch('http://10.0.0.77:8080/api/exam/'+examId+'/blanks',
      {
        body: JSON.stringify(blank),
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

        <FormLabel>Points</FormLabel>
        <FormInput onChangeText={
          text => this.updateForm({points: text})
        }/>

        <FormLabel>Blanks</FormLabel>
        <TextInput
    multiline={true}
    numberOfLines={4}
    onChangeText={text => this.updateForm({blanks: text})}
    value={this.state.text}/>

        


        <Button backgroundColor="green"
                 color="white"
                 title="Save"
        onPress={() => 
          this.createBlank(this.state.examId)}
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
        <Text>{this.state.points}</Text>
        <Text>{this.state.blanks}</Text>


      </ScrollView>
    )
  }
}

export default BlankQuestionEditor