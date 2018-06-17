import React from 'react'
import {View, ScrollView} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage} from 'react-native-elements'

class AssignmentEditor extends React.Component {
  static navigationOptions = { title: "AssignmentEditor"}
  constructor(props) {
    super(props)
    this.state = {
      answer: 'Default Answer',
      description: 'This description of the assignment widget',
      points: 0,
      title: 'Assignment Title'
    }
  }

   componentDidMount() {
    const {navigation} = this.props;
    const topicId = navigation.getParam("topicId")
    this.setState({topicId: topicId})
  }

    createAssignment(topicId){

      var assignment = {
      answer: this.state.answer,
      description: this.state.description,
      points: this.state.points,
      title: this.state.title

      }
      return fetch('https://webdev-summer1-2018-animesh.herokuapp.com/api/topic/'+topicId+'/assignment',
      {
        body: JSON.stringify(assignment),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST'
      }).then(() => this.props.navigation.navigate("AssignmentList"
        ,{topicId:this.state.topicId}))

    }

  updateForm(newState) {
    this.setState(newState)
    this.setState()
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

        <FormLabel>Answer</FormLabel>
        <FormInput onChangeText={
          text => this.updateForm({answer: text})
        }/>

        

        <Button	backgroundColor="green"
                 color="white"
                 title="Save"
        onPress={() => 
          this.createAssignment(this.state.topicId)}
          />

        <Button backgroundColor="red"
                 color="white"
                 title="Cancel"
                 onPress={() => 
         this.props.navigation.navigate("AssignmentList"
        ,{topicId:this.state.topicId})} />


        <View style={{padding: 15, borderWidth: 1,margin: 10,borderColor: "black"}}>
        <Text h3>Preview</Text>
        <Text h2>{this.state.title}</Text>
        <Text>Points : {this.state.points}</Text>
        <Text>{this.state.description}</Text>
        <Text>{this.state.answer}</Text>
        </View>
        

      </ScrollView>
    )
  }
}

export default AssignmentEditor