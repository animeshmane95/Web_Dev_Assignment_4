import React from 'react'
import {View,Alert,ScrollView} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
  from 'react-native-elements'


class TrueFalseQuestionEditor extends React.Component {
  static navigationOptions = { title: "True False"}
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      points: 0,
      isTrue: true,
    }
  }

componentDidMount() {
    const {navigation} = this.props;
    const examId = navigation.getParam("examId")
    this.setState({examId: examId})
  }


  createTrueFalseQuestion(examId){

      var TrueFalseQuestion = {
      title: this.state.title,
      description: this.state.description,
      points: this.state.points,
      type: 'TrueFalse',
      isTrue: this.state.isTrue
      }

      return fetch('http://10.0.0.77:8080/api/exam/'+examId+'/truefalse',
      {
        body: JSON.stringify(TrueFalseQuestion),
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

        <FormLabel>Points</FormLabel>
        <FormInput onChangeText={
          text => this.updateForm({points: text})
        }/>

        <FormLabel>Description</FormLabel>
        <FormInput onChangeText={
          text => this.updateForm({description: text})
        }/>
        <FormValidationMessage>
          Description is required
        </FormValidationMessage>

        <CheckBox onPress={() => this.updateForm({isTrue: !this.state.isTrue})}
                  checked={this.state.isTrue} title='The answer is true'/>

        <Button	backgroundColor="green"
                 color="white"
                 title="Save"
                 onPress={() => 
          this.createTrueFalseQuestion(this.state.examId)}/>


        <Button	backgroundColor="red"
                 color="white"
                 title="Cancel"
                 onPress={() => 
         this.props.navigation.navigate("QuestionList"
        ,{examId:this.state.examId})} />

         <View style={{padding: 15, borderWidth: 1,margin: 10,borderColor: "black"}}>

        <Text style={{textAlignVertical: "center",textAlign: "center",}} h6>Preview</Text>
        <Text style={{textAlignVertical: "center",textAlign: "center",}} h4> Title: {this.state.title}</Text>
        <Text style={{textAlignVertical: "center",textAlign: "center",}}>Description: {this.state.description}</Text>
        <Text style={{textAlignVertical: "center",textAlign: "center",}}>Points: {this.state.points}</Text>
  
        </View>
      </ScrollView>
    )
  }
}

export default TrueFalseQuestionEditor