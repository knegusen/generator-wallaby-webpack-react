import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import ExampleComponent from '../../src/react/ExampleComponent';

describe('ExampleComponent', () => {

    let shallowRenderer;

    beforeEach(() => {
        shallowRenderer = createRenderer();
    });

    describe('label', () => {
        describe('when not defined', () => {
            it('renders default label', () => {
                shallowRenderer.render(<ExampleComponent />);
                const result = shallowRenderer.getRenderOutput();
                expect(result.props.children).toBe('No label');
            });
        });

        describe('when defined', () => {
            it('should write label', () => {
                shallowRenderer.render(<ExampleComponent>Label</ExampleComponent>);
                const result = shallowRenderer.getRenderOutput();
                expect(result.props.children).toEqual('Label');
            });
        });
    });
});