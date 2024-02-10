import { useState, useEffect } from 'react'


export default function useFetch(endpoint) {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	
	async function fetchData() {
		try {
			const response = await fetch(`https://factoryforge-5f88b931d18d.herokuapp.com/api/${endpoint}`)
			const data = await response.json()
			setData(data)
		}
		catch(error) {
			alert(error.message)
		}
		finally {
			setLoading(false)
		}
	}
	
	useEffect(() => {
		fetchData()
	}, [endpoint])
	
	return { data, loading }
}