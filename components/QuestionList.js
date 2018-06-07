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
      questionType : "MultipleChoice"
    }
    //this.createQuestion = this.createQuestion.bind(this)
  }
  componentDidMount() {
    const {navigation} = this.props;
    const examId = navigation.getParam("examId")
    this.setState({examId: examId})
    fetch("http://10.0.0.77:8080/api/exam/"+examId+"/question")
      .then(response => (response.json()))
      .then(questions => {
        this.setState({questions})

      })

  }

  componentWillReceiveProps(newProps){

    const {navigation} = newProps;
    const examId = navigation.getParam("examId")
    this.setState({examId: examId})
    fetch("http://10.0.0.77:8080/api/exam/"+examId+"/question")
      .then(response => (response.json()))
      .then(questions => {
        this.setState({questions})})

  }


  createQuestion(examId){
    if(this.state.questionType === "TrueFalse")
                this.props.navigation
                  .navigate("TrueFalseQuestionEditor", {examId: this.state.examId})
    if(this.state.questionType === "MultipleChoice")
                this.props.navigation
                  .navigate("MultipleChoiceQuestionEditor",{examId: this.state.examId})
    if(this.state.questionType === "EssayQuestion")
                this.props.navigation
                  .navigate("EssayQuestionEditor",{examId: this.state.examId})
    if(this.state.questionType === "Blank")
                this.props.navigation
                  .navigate("BlankQuestionEditor",{examId: this.state.examId})
  }
  render() {
    return(
      <View style={{padding: 15}}>
      {this.state.questions.map(
        (question, index) => (
           
          <ListItem 
            key={index}
            subtitle={question.description}
            title={question.title}
            />))}

           <Picker
          onValueChange={(itemValue, itemIndex) =>
            this.setState({questionType: itemValue})}
          selectedValue={this.state.questionType}>
          <Picker.Item value="MultipleChoice" label="Multiple choice" />
          <Picker.Item value="EssayQuestion" label="Essay" />
          <Picker.Item value="TrueFalse" label="True or false" />
          <Picker.Item value="Blank" label="Fill in the blanks" />
        </Picker>

        <Icon
      reverse
      color='#517fa4'
      name='ios-add-circle'
      type='ionicon'
       onPress={() => this.createQuestion(this.state.examId)}
    />
        
      </View>
    )
  }
}
export default QuestionList






