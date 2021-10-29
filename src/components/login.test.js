import React from 'react';
import { shallow } from 'enzyme';
import { LoginComponent } from './login';
//import { validateLogin } from '../util';
    describe('Login component tests', ()=> {

        it("should render correctly", () => {
            const wrapper = shallow(<LoginComponent/>);
        });
   

       // const wrapper = shallow(<LoginComponent />);


        // it('should have a button component', ()=> {

        //     //There should be only one button
        //     expect(wrapper.find('button')).toHaveLength(1);

        //     //Button should be of type button
        //     expect(wrapper.find('button')
        //     .type().defaultProps.type)
        //     .toEqual('button');

        //     //Button should have matching text
        //     expect(wrapper.find('button').text()).toEqual('Sign in');
        // });

        // it('should have input for email and password', ()=> {
        //     //Email and password input field should be present
        //     expect(wrapper.find('input#email')).toHaveLength(1);
        //     expect(wrapper.find('input#password')).toHaveLength(1);
        // });



        // it('should have an empty email and password state var', ()=> {
        //     //Optionally test to check if password and email are empty strings on setup
        //     expect(wrapper.state('email')).toEqual('');
        //     expect(wrapper.state('password')).toEqual('');
        // });

    //     it('should test email and password presence', () => {

    //         //should return true 
    //         expect(validateLogin('email@email.com', 
    //         'password').toEqual(true);

    //         //should return false
    //          expect(validateLogin('', 
    //         '').toEqual(false);
    //    });

    });
