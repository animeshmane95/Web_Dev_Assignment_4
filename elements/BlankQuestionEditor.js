import React from 'react'
import {View,ScrollView,TextInput} from 'react-native'
import {Text, Button, CheckBox} from 'react-native-elements'
import {FormLabel, FormInput, FormValidationMessage}
  from 'react-native-elements'

class BlankQuestionEditor extends React.Component {
  static navigationOptions = { title: "Fill in the Blanks"}
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      points: 0,
      type: 'blankQuestion',
      blankQuestion: '2+2=[four=4]\n3+3=[six=6]'
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
      type: 'blankQuestion',
      blankQuestion: this.state.blankQuestion

      }

      return fetch('https://webdev-summer1-2018-animesh.herokuapp.com/api/exam/'+examId+'/blanks',
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
        style = {{
          borderWidth: 1,
          borderColor: "black",
          height: 134,
          margin: 15,
          textAlignVertical: "center",
          textAlign: "center",
          padding: 3
        }}
    multiline={true}
    numberOfLines={4}
    onChangeText={text => this.updateForm({blankQuestion: text})}
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
        <View style={{padding: 15, borderWidth: 1,margin: 10,borderColor: "black"}}>
        <Text style={{textAlignVertical: "center",textAlign: "center",}} h6>Preview</Text>
        <Text style={{textAlignVertical: "center",textAlign: "center",}} h4> Title :{this.state.title}</Text>
        <Text style={{textAlignVertical: "center",textAlign: "center",}}>Description:{this.state.description}</Text>
        <Text style={{textAlignVertical: "center",textAlign: "center",}}>Points:{this.state.points}</Text>
        {


          this.state.blankQuestion!=''&&this.state.blankQuestion.split("\n").map((blanks,index)=>{


            if(blanks.indexOf("[") !== -1 && blanks.indexOf("]") !== -1){
                var first = blanks.split("[");
                var second = first[1].split("]");
              return(
                  <View key = {100 +index} style={{flexDirection: 'row'}}>
                  <View key = {index}>
                    <Text  key = {100 +index} style={{textAlignVertical: "center",textAlign: "center",}}>{first[0]}</Text>
                    </View>
                    <View key = {200 +index}>
                    <TextInput key = {index}
                          style = {{
                            borderWidth: 1,
                            borderColor: "black",
                            height: 25,
                            textAlignVertical: "center",
                            textAlign: "center",
                            width: 100
                          }}
                      multiline={true}
                      numberOfLines={4}
                      />
                      </View>
                      <View key = {300 +index}>
                      <Text  key = {index} style={{textAlignVertical: "center",textAlign: "center",}}>{second[1]}</Text>
                      </View>
                    </View>


              )
            }


        })}

      </View>
      </ScrollView>
    )
  }
}

export default BlankQuestionEditor