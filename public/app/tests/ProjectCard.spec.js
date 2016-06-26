import ProjectCard from '../components/ProjectCard'
import { mount, render, shallow } from 'enzyme'
//import { expect } from 'chai'

describe('ProjectCard', () => {

	const project = {
		id: 123,
		title: 'First Project',
		description: 'Project description',
		tags: ['tag 1', 'tag 2']
	}

	const component = mount(<ProjectCard project={project} />)

    it('shows title and tags', () => {
		var anchors = component.find('a')
	    expect(anchors).to.have.length(3)
    })

    it('shows title of project', () => {
	    expect(component.find('#title')).to.have.length(1)
	    expect(component.find('#title')).to.have.text('First Project')
    })

    it('shows description of project', () => {
	    expect(component.find('#description')).to.have.length(1)
	    expect(component.find('#description')).to.have.text('Project description')
    })


})