// https://github.com/producthunt/chai-enzyme

import ProjectCard from '../components/ProjectCard'
import { mount, render, shallow } from 'enzyme'

describe('ProjectCard', () => {

	const project = {
		id: 123,
		title: 'First Project',
		description: 'Project description',
		tags: ['tag 1', 'tag 2'],
		slug: 'first-project',
		image: '1234'
	}

	const component = mount(<ProjectCard project={project} />)

    it('shows title and tags', () => {
		var anchors = component.find('a')
	    expect(anchors).to.have.length(3)
    })

    it('shows title of project', () => {
	    expect(component.find('#title')).to.have.length(1)
	    expect(component.find('#title')).to.have.text('First Project')
	    expect(component.find('#title')).to.have.attr('href').equal('/project/first-project')
    })

    it('shows description of project', () => {
	    expect(component.find('#description')).to.have.length(1)
	    expect(component.find('#description')).to.have.text('Project description')
    })

    it('shows image of project', () => {
	    expect(component.find('img')).to.have.length(1)
	    expect(component.find('img')).to.have.attr('src').equal('https://media-service.appspot.com/site/images/1234?crop=260')
    })

})