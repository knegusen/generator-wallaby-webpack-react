import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ExampleStateComponent from '../../src/react/ExampleStateComponent';

describe('ExampleStateComponent', () => {
    it('is rendered', () => {
        const component = TestUtils.renderIntoDocument(<ExampleStateComponent/>);
        const textNode = TestUtils.findRenderedDOMComponentWithTag(component, 'p');
        expect(textNode.textContent).toBe('example text');
    });

    describe('button', () => {
        it('is rendered', () => {
            const component = TestUtils.renderIntoDocument(<ExampleStateComponent/>);
            expect(() => {
                TestUtils.findRenderedDOMComponentWithTag(component, 'button');
            }).not.toThrow();
        });

        it('has class name button', () => {
            const component = TestUtils.renderIntoDocument(<ExampleStateComponent/>);
            const buttonNode = TestUtils.findRenderedDOMComponentWithTag(component, 'button');
            expect(buttonNode.className).toBe('textChangeButton');
        });

        it('updates text after click', () => {
            const component = TestUtils.renderIntoDocument(<ExampleStateComponent/>);
            const textNode = TestUtils.findRenderedDOMComponentWithTag(component, 'p');
            TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(component, 'button'));
            expect(textNode.textContent).toBe('new state example text');
        });
    });
});