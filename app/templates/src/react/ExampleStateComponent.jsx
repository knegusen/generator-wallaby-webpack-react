import React from 'React';

export default React.createClass({

    getInitialState(){
        return {
            text: 'example text'
        };
    },

    render() {
        return (
            <div>
                <p>{this.state.text}</p>
                <button className='textChangeButton' type='button' onClick={this.onClick}>button</button>
            </div>
        );
    },

    onClick(){
        this.setState({text: 'new state example text'});
    }
});