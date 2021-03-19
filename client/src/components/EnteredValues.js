import React from 'react';

import axios from 'axios'
import EnterValue from './EnterValue'

class EnteredValues extends React.Component {

    state = {
        values: this.props.values,
        isEdit: false,
        newValue: ''
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.values !== this.props.values) {
            this.setState({ values: this.props.values })
        }
    }

    editValue = (id, type) => {
        let changeType = type === 'edit' ? true : false
        let oldVlues = [...this.state.values]
        oldVlues.forEach(item => {
            if (item._id === id) {
                item.isEditValue = changeType
                this.setState({ values: oldVlues })
            } else {
                item.isEditValue = false
            }
        })
    }

    deleteValue = (id) => {
        axios.delete(`/value/${id}`)
            .then(res => {
                if (res.status === 200) {
                    let deletedValue = this.state.values.filter(item => item._id !== id)
                    this.setState({ values: deletedValue })
                }
            })
            .catch(err => console.log(err))
    }

    handleChangeEdit = (e) => {
        let value = e.target.value
        this.setState({ newValue: value })
    }

    putValue = (id) => {
        let newObj = { id: id, title: this.state.newValue }
        axios.post('/value/changeValue', newObj)
            .then(res => {
                if (res.status === 200) {
                    let oldVlues = [...this.state.values]
                    oldVlues.forEach(item => {
                        if (item._id === id) {
                            if (this.state.newValue) {
                                item.title = this.state.newValue
                            }
                            item.isEditValue = false
                            this.setState({ values: oldVlues })
                        }
                    })
                }
            })

    }
    
    render() {
        let { values } = this.state
        return (
            <div>
                {values && values.map(item => (
                    <EnterValue key={item._id}
                        value={item.title}
                        id={item._id}
                        deleteValue={this.deleteValue}
                        isEdit={this.state.isEdit}
                        editValue={this.editValue}
                        handleChangeEdit={this.handleChangeEdit}
                        isEditValue={item.isEditValue}
                        putValue={this.putValue}
                    />
                ))}
            </div>
        )
    }
}

export default EnteredValues;