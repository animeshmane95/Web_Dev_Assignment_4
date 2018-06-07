import React from 'react'
import {ScrollView,View} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
  from 'react-native-elements'
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import { Icon } from 'react-native-elements'

class MultipleChoiceQuestionEditor extends React.Component {
  static navigationOptions = { title: "Multiple Choice"}
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      points: 0,
      options: [],
      correctOption: 0,
      choice: ''
    }
  }

  createMCQ(examId){

      var MCQ = {
      title: this.state.title,
      description: this.state.description,
      points: this.state.points,
      correctOption: this.state.correctOption,
      options: this.state.options.toString()
      }

      return fetch('http://10.0.0.77:8080/api/exam/'+examId+'/choice',
      {
        body: JSON.stringify(MCQ),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      }).then(() => this.props.navigation.navigate("QuestionList"
        ,{examId:this.state.examId}))

    }

   addOption(){
        var options = []
        options = this.state.options;
        options.push(this.state.choice);
        this.setState({options:options})
    }

    onSelect(index, value){
      this.setState({correctOption : index })
  }

  componentDidMount() {
    const {navigation} = this.props;
    const examId = navigation.getParam("examId")
    this.setState({examId: examId})
  }


  updateForm(newState) {
    this.setState(newState)
  }

  updateChoice(newState) {
      this.setState({choice : newState })
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

        <FormLabel>Points</FormLabel>
        <FormInput onChangeText={
          text => this.updateForm({points: text})
        }/>

        <FormValidationMessage>
          Points are required
        </FormValidationMessage>

        <FormLabel>Choice</FormLabel>
        <FormInput onChangeText={
          text => this.updateChoice(text)
        }/>

        <Icon
      reverse
      color='green'
      size = {15}
      name='ios-add-circle'
      type='ionicon'
       onPress={() => this.addOption()}
    />

    <RadioGroup onSelect = {(index, value) => this.onSelect(index, value)} selectedIndex={this.state.correctOption}>
          { this.state.options.map(
            (option,index) =>(
              <RadioButton value = {option} key = {index}>
              <Text> {option} </Text> 
              </RadioButton>

              )
            )

          }
        </RadioGroup>



        <Button	backgroundColor="green"
                 color="white"
                 title="Save"
                 onPress={() => 
          this.createMCQ(this.state.examId)}
                 />

        <Button backgroundColor="red"
                 color="white"
                 title="Cancel"
                 onPress={() => 
         this.props.navigation.navigate("QuestionList"
        ,{examId:this.state.examId})} />

        <Text style={{textAlignVertical: "center",textAlign: "center",}} h5>Preview</Text>
        <Text style={{textAlignVertical: "center",textAlign: "center",}} h2>Title : {this.state.title}</Text>
        <Text style={{textAlignVertical: "center",textAlign: "center",}}> Description: {this.state.description}</Text>
        <Text style={{textAlignVertical: "center",textAlign: "center",}}>Points: {this.state.points}</Text>
        <Text style={{textAlignVertical: "center",textAlign: "center",}}>CorrectOption: {this.state.correctOption}</Text>

        

      </ScrollView>
    )
  }
}

export default MultipleChoiceQuestionEditor