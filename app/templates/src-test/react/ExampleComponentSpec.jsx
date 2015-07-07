'use strict';

import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
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
            instance = React.render(<ExampleComponent>Label</ExampleComponent>, container);
            expect(React.findDOMNode(instance).innerText).toBe("Label");
        });
    });
});