import React from 'react';
import ExampleComponent from './ExampleComponent';
import ExampleStateComponent from './ExampleStateComponent';

export default React.createClass({

    render() {
        return (
            <div>
                <ExampleComponent>This is the example component</ExampleComponent>
                <ExampleStateComponent />
            </div>
        );
    }
});
