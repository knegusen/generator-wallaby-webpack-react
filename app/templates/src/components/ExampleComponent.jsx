import React, { Component } from "react";

class ExampleComponent extends Component {
    render() {
        return (
            <div className="label">
                {this.props.children ? this.props.children : 'No label'}
            </div>
        );
    }
}

export default ExampleComponent;