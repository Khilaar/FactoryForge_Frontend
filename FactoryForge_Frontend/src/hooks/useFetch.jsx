import { useState, useEffect } from 'react'
import API from "../api/API.js";


export default function useFetch(endpoint) {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(true)
	
	async function fetchData() {
		try {
			const response = await API.get(`${endpoint}`)
			setData(response.data)
		}
		catch(error) {
			console.log(error.message)
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