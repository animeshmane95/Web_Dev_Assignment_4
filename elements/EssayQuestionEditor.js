import React from 'react'
import {View,ScrollView,TextInput} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
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
      type: 'essay',
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
      essayQuestion: this.state.essayQuestion,
      type: 'Essay'

      }

      return fetch('https://webdev-summer1-2018-animesh.herokuapp.com/api/exam/'+examId+'/essay',
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
        <View style={{padding: 15, borderWidth: 1,margin: 10,borderColor: "black"}}>
        <Text  style={{textAlignVertical: "center",textAlign: "center",}} h6>Preview</Text>
        <Text  style={{textAlignVertical: "center",textAlign: "center",}} h4>Title:{this.state.title}</Text>
        <Text  style={{textAlignVertical: "center",textAlign: "center",}}>Description:{this.state.description}</Text>
        <Text  style={{textAlignVertical: "center",textAlign: "center",}}>Question:{this.state.essayQuestion}</Text>
        <Text  style={{textAlignVertical: "center",textAlign: "center",}}>Points:{this.state.points}</Text>

        <TextInput
        style = {{
          borderWidth: 1,
          borderColor: "black",
          height: 134,
          margin: 15,
          padding: 3
        }}
    multiline={true}
    numberOfLines={4}/>

    </View>


      </ScrollView>
    )
  }
}

export default EssayQuestionEditor