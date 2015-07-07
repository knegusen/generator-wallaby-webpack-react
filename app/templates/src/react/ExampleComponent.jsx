'use strict';

import React from 'react'

class ExampleComponent extends React.Component {
    render() {
        return <div className="blueLabel">
            {this.props ? this.props.children : 'no label'}
        </div>;
    }
}

export default ExampleComponent;