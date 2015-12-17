import React, {Component} from 'react'

class ExampleComponent extends Component {
    render() {
        return (
            <div className="label">
                {this.props ? this.props.children : 'no label'}
            </div>
        );
    }
}

export default ExampleComponent;