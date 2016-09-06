import Time from 'react-time'
import React from 'react'

export default {

	formattedDate: (timestamp) => {
        var now = new Date()
        var timestamp = new Date(timestamp)
        var diff = now-timestamp

        var date = null
        if (diff > 24*60*1000) 
            return <Time value={timestamp} format="MMM DD, YYYY" /> 
        
        return <Time value={timestamp} titleFormat="YYYY/MM/DD HH:mm" relative />
	}

}