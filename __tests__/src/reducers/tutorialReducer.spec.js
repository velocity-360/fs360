import { tutorialReducer } from '../../../src/reducers'
import constants from '../../../src/constants'

describe('Tutorial Reducer', () => {

	it('has a default state', () => {
		expect(tutorialReducer(undefined, {type:'undefined'})).toEqual({
			all: null
		})
	})

	it ('can handle TUTORIALS_RECEIVED', () => {
		const comingSoon = {
			'title': 'Coming Soon',
			'category': 'web development',
			'status': 'coming soon',
			'isFeatured': 'no',
			'description': 'this tutorial is coming coon.',
			'image': 'gy2Oyl2k',
			'wistia': '',
			'slug': 'coming-soon',
			'subscribers': [],
			'youtube': [],
			'posts': [],
			'price': 0,
			'priority': 100,
			'timestamp': '2016-12-23T01:24:21.913Z',
			'schema': 'tutorial',
			'id': '585c7cc5e867722b828802d4'
		}

		const tutorials = [comingSoon]


		expect(tutorialReducer(undefined, {type:constants.TUTORIALS_RECEIVED, tutorials:tutorials})).toEqual({
			'585c7cc5e867722b828802d4': comingSoon,
			'web development': [comingSoon],
			'coming-soon': comingSoon,
			'all': [comingSoon]
		})
	})

})