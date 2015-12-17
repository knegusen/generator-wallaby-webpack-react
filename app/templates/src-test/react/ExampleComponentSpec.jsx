import React from 'react';
import ReactDOM from 'react-dom';
import ExampleComponent from '../../src/react/ExampleComponent'

describe('ExampleComponent', function () {

    var instance,
        container;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    describe("props", () => {
        it('should write label', function () {
            instance = ReactDOM.render(<ExampleComponent>Label</ExampleComponent>, container);
            expect(React.findDOMNode(instance).innerText).toBe("Label");
        });
    });
});