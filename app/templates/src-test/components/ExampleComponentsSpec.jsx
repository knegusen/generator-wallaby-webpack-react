import React from "react";
import { shallow } from "enzyme";
import ExampleComponent from "../../src/components/ExampleComponent";
import ExampleComponents from "../../src/components/ExampleComponents";
import ExampleStateComponent from "../../src/components/ExampleStateComponent";

describe('ExampleComponents', () => {
    it('is rendered correctly', () => {
        const component = shallow(<ExampleComponents />);
        expect(component.contains(
          <ExampleComponent>
            This is the example component
          </ExampleComponent>,
          <ExampleStateComponent />
        )).toBe(true);
    });
});
