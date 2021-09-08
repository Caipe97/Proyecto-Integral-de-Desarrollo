import React from 'react';
import { shallow } from 'enzyme'; 
import Header from './Header';

it('expect to render Header component', () => {
    expect(shallow(<Header userId={1}/>)).toMatchSnapshot();
})