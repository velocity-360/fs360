import Nav from '../components/Nav'
import { mount, shallow } from 'enzyme'
import store from '../stores/store'
import testStore from '../tests/testStore'


describe('Nav', () => {
  it('shows login link', () => {
    const element = mount(<Nav store={testStore} />)
//    console.log(element.html())

    expect(element.find('.user')).to.have.length(1)
  })

  it('shows current user name', () => {
    const element = mount(<Nav store={testStore}  />)
//    console.log(element.html())

    expect(element.find('.user')).to.have.length(1)
  })

})