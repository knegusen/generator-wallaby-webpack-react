import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import ExampleComponent from '../../src/react/ExampleComponent';
import ExampleComponents from '../../src/react/ExampleComponents';
import ExampleStateComponent from '../../src/react/ExampleStateComponent';

describe('ExampleComponents', () => {
    it('is rendered correctly', () => {
        const shallowRenderer = createRenderer();
        shallowRenderer.render(<ExampleComponents />);
        const result = shallowRenderer.getRenderOutput();
        expect(result.props.children).toEqual([
            <ExampleComponent>This is the example component</ExampleComponent>,
            <ExampleStateComponent />
        ]);
    });
});