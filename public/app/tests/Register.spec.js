// https://github.com/producthunt/chai-enzyme

import Register from '../components/Register'
import { mount, shallow } from 'enzyme'


describe('Register', () => {
  it('shows membership type', () => {
    const component = shallow(<Register membershipType="basic" />)
//    console.log(component.html())

    expect(component.find('h4')).to.have.length(1)
    expect(component.find('h4')).to.have.text('Basic Membership')
  })


})