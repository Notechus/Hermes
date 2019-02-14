import React from 'react'
import Autosuggest from 'react-autosuggest'
import 'assets/scss/custom/autocomple-picker.scss'

class TeamAutocompletePicker extends React.Component {
  state = {
    myValue: '',
    suggestions: [],
  }

  getSuggestions = value => {
    const { teams } = this.props
    const inputVal = value.trim().toLowerCase()
    const inputLength = inputVal.length
    const suggestions =
      inputLength === 0
        ? []
        : teams.filter(
            e =>
              e.teamName.toLowerCase().slice(0, inputLength) === inputVal ||
              e.teamName.toLowerCase().includes(inputVal)
          )
    return suggestions
  }

  onSuggestionFetch = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    })
  }

  onSuggestionClear = () => {
    this.setState({ suggestions: [] })
  }

  onChange = (event, { newValue }) => {
    this.setState({
      myValue: newValue,
    })
  }

  render() {
    const { myValue, suggestions } = this.state
    const { value } = this.props
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionFetch}
        onSuggestionsClearRequested={this.onSuggestionClear}
        getSuggestionValue={e => e.teamName}
        renderSuggestion={e => <span>{e.teamName}</span>}
        inputProps={{
          placeholder: 'Team name',
          value: value ? value : myValue,
          onChange: this.props.onChange ? this.props.onChange : this.onChange(),
        }}
      />
    )
  }
}
export default TeamAutocompletePicker
