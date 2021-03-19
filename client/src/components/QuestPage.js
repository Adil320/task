import React from 'react';
import EnteredValues from './EnteredValues'
import axios from 'axios'
class QuestPage extends React.Component {

    state = {
        addedValue: '',
        values: ''
    }

    componentDidMount() {
        this.getValues()
    }

    getValues = () => {
        axios.get('/values')
            .then(res => {
                if (res.status === 200) {
                    this.setState({ values: res.data })
                }
            })
            .catch((err) => console.log(err))
    }

    handleChange = (e) => {
        let value = e.target.value
        this.setState({ addedValue: value })
    }

    addValue = (e) => {
        e.preventDefault()
        let { addedValue } = this.state

        axios.post("/value", { title: addedValue })
            .then(res => {
                if (res.status === 200) {
                    let newState = [...this.state.values]
                    newState.push(res.data)
                    this.setState({ values: [...newState], addedValue: '' })
                }
            })
    }

    render() {
        return (
            <div className="quest-container">
                <form onSubmit={this.addValue}>
                    <input type="text" value={this.state.addedValue || ''} onChange={this.handleChange} className="form-control rounded-0 m-0 mb-3" placeholder="Введите значение ..." required />
                    <button className="form-control rounded-0 btn-secondary mb-1" type="submit">Добавить значение</button>
                </form>
                <EnteredValues values={this.state.values} getValues={this.getValues} />
            </div>
        )
    }
}

export default QuestPage