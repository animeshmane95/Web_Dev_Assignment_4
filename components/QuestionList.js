import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import {Picker} from 'react-native'
import { Icon } from 'react-native-elements'

class QuestionList extends Component {
  static navigationOptions = {title: 'Questions'}
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      examId: 1,
      questionType : 1
    }
    this.createQuestion = this.createQuestion.bind(this)
  }
  componentDidMount() {
    const {navigation} = this.props;
    const examId = navigation.getParam("examId")
    fetch("http://localhost:8080/api/exam/"+examId+"/question")
      .then(response => (response.json()))
      .then(questions => this.setState({questions}))
  }


  createQuestion(){

    Alert.alert(this.state.questionType)

    if(this.state.questionType === "TrueFalse")
                this.props.navigation
                  .navigate("TrueFalseQuestionEditor")
    if(this.state.questionType === "MultipleChoice")
                this.props.navigation
                  .navigate("MultipleChoiceQuestionEditor")



  }
  render() {
    return(
      <View style={{padding: 15}}>
      {this.state.questions.map(
        (question, index) => (
           
          <ListItem 

            onPress={() => {
              if(question.type === "TrueFalse")
                this.props.navigation
                  .navigate("TrueFalseQuestionEditor", {questionId: question.id})
              if(question.type === "MultipleChoice")
                this.props.navigation
                  .navigate("MultipleChoiceQuestionEditor", {questionId: question.id})
            }}
            key={index}
            subtitle={question.description}
            title={question.title}


            />))}

           <Picker
          onValueChange={(itemValue, itemIndex) =>
            this.setState({questionType: itemValue})}
          selectedValue={this.state.questionType}>
          <Picker.Item value="MultipleChoice" label="Multiple choice" />
          <Picker.Item value="ES" label="Essay" />
          <Picker.Item value="TrueFalse" label="True or false" />
          <Picker.Item value="FB" label="Fill in the blanks" />
        </Picker>

        <Icon
      reverse
      color='#517fa4'
      name='ios-add-circle'
      type='ionicon'
       onPress={() => this.createQuestion()}
    />
        
      </View>
    )
  }
}
export default QuestionList






