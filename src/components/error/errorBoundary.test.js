import React from 'react';
import { shallow, mount } from "enzyme";
import expect from 'expect';
import ErrorBoundary from './errorBoundary.jsx';

describe('<ErrorBoundary />', () => {
    const ComponentWithError = () => null;
    const wrapper = shallow(
        <ErrorBoundary>
            <ComponentWithError />
        </ErrorBoundary>
    );

    itx('displays error message on error generated by child', () => {
        wrapper.setState({
            error: 'error name',
            errorInfo: 'error info'
        });
        expect(wrapper.state().error).toEqual('error name');
        expect(wrapper.state().errorInfo).toEqual('error info');
        expect(wrapper).toMatchSnapshot();
        console.log(wrapper.debug() );    
    });
});
