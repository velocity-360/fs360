import Time from 'react-time'
import React from 'react'

const differenceFromNow = (timestamp) => {
    let now = new Date()
    let ts = new Date(timestamp)
    let diff = now-ts
    return diff
}

export default {

	formattedDate: (timestamp) => {
        let diff = differenceFromNow(timestamp)
        let date = null
        if (diff > 24*60*1000) 
            return <Time value={timestamp} format="MMM DD, YYYY" /> 
        
        return <Time value={timestamp} titleFormat="YYYY/MM/DD HH:mm" relative />
	},

    abbreviatedDate: (timestamp) => {
        let diff = differenceFromNow(timestamp)
        let date = null
        if (diff > 24*60*1000) 
            return <Time value={timestamp} format="MMM DD" /> 

        return <Time value={timestamp} format="MMM DD" relative /> 
    },

	today: () => <Time value={new Date()} format="MMM D, YYYY" />
}