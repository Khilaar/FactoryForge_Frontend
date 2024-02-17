import Chart from "chart.js/auto";
import {CategoryScale} from "chart.js";
import BarChart from "../../Components/BarChart.jsx"
import PieChart from "../../Components/PieChart.jsx"
import {useEffect, useState} from "react";
import API from "../../api/API.js";


Chart.register(CategoryScale);

const Dashboard = () => {

    const token = localStorage.getItem('access_token')
    const [profitLoss, setProfitLoss] = useState({
        profit: 1000,
        "Total Cost": 100
    })

    const [showSearchResults, setShowSearchResults] = useState(false)
    const [query, setQuery] = useState([])
    const [searchResultsProducts, setSearchResultsProducts] = useState([])
    const [searchResultsOrders, setSearchResultsOrders] = useState([])
    const [searchResultsRawMaterials, setSearchResultsRawMaterials] = useState([])

    const [showItemOverlay, setShowItemOverlay] = useState(false)
    const [overlayItem, setOverlayItem] = useState({})
    const [filteredProducts, setFilteredProducts] = useState([])

    const [rawMaterials, setRawMaterials] = useState([])
    const [products, setProducts] = useState([])
    const [clientOrders, setClientOrders] = useState([])
    const [rawMaterialChartData, setRawMaterialChartData] = useState({datasets: []})
    const [profitChartData, setProfitChartData] = useState({
        datasets: [
            {
                data: [1000, 100],
                backgroundColor: [
                    "#008000FF",
                    "#D0312D",
                ],
                borderColor: "black",
                borderWidth: 2
            },
        ]
    })


    const tasks = [
        {
            todo: 'Ship Order #13335',
            due: '3 March'
        },
        {
            todo: 'Order M1 chip',
            due: '3 March'
        },
        {
            todo: 'Confirm Order #44331',
            due: '3 March'
        },
        {
            todo: 'Prepare Order #28733',
            due: '3 March'
        },

    ]
    const suppliers = [
        {
            name: 'Apple',
            phone: '077-445-6678',
            email: 'apple@icloud.com',
            address: 'waldstrasse 3, zurich'
        },
        {
            name: 'Microsoft',
            phone: '077-445-6678',
            email: 'microsoft@icloud.com',
            address: 'waldstrasse 3, zurich'
        },
        {
            name: 'Nvidia',
            phone: '077-445-6678',
            email: 'nvidia@icloud.com',
            address: 'waldstrasse 3, zurich'
        },

    ]


    async function fetchProducts() {
        try {
            const response = await API.get(`products/`)
            setProducts(response.data)
        } catch (error) {
            console.log(error.message)
        } 
    }

    async function fetchClientOrders() {
        try {
            const response = await API.get(`client_orders/`)
            setClientOrders(response.data)
        } catch (error) {
            console.log(error.message)
        } 
    }

    async function fetchRawMaterials() {
        try {
            const response = await API.get(`raw_materials/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setRawMaterials(response.data)
            const filteredRawMaterials = response.data.filter((item) => response.data.indexOf(item) < 6)
            setRawMaterialChartData({
                labels: filteredRawMaterials.map((data) => data.name),
                datasets: [
                    {
                        label: "Quantity Available ",
                        data: filteredRawMaterials.map((data) => data.quantity_available),
                        backgroundColor: [
                            "rgba(75,192,192,1)",
                            "#ecf0f1",
                            "#50AF95",
                            "#f3ba2f",
                            "#2a71d0",
                        ],
                        borderColor: "black",
                        borderWidth: 2
                    },
                ]
            })
        } catch (error) {
            console.log(error.message)
        } 
    }

    async function fetchProfit() {
        try {
            const response = await API.get(`/analytics/profit/?start_date=2024-01-01&end_date=2025-01-01`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setProfitLoss(response.data)
            setProfitChartData({
                datasets: [
                    {
                        data: [response.data.profit, response.data["Total Cost"]],
                        backgroundColor: [
                            "#008000FF",
                            "#D0312D",
                        ],
                        borderColor: "black",
                        borderWidth: 2
                    },
                ]
            })
        } catch (error) {
            console.log('fetch profit error:', error.message)
            console.log('token:', token)
        } 
    }

    function handleSearch() {
        event.preventDefault()
        event.target.reset()
        setSearchResultsProducts(products.filter((product) => product.title.includes(query)))
        setSearchResultsOrders(clientOrders.filter((order) => order.tracking_number.includes(query)))
        setSearchResultsRawMaterials(rawMaterials.filter((item) => item.name.includes(query)))
        setShowSearchResults(true)
    }

    function handleItemOverlay(item) {
        setOverlayItem(item)
        setShowItemOverlay(true)
    }

    function filterProduct(id) {
        setFilteredProducts(products.filter((product) => product.id == id))
    }

    useEffect(() => {
        fetchProducts()
        fetchClientOrders()
        fetchRawMaterials()
        fetchProfit()

    }, [])


    return (
        <>
            <div className={'search'} onClick={() => setShowSearchResults(false)}>
                <h1 className={'route-title'}>Dashboard</h1>
                <form className={'search_bar'} onSubmit={handleSearch}>
                    <input placeholder={'Search '} onChange={(e) => setQuery(e.target.value)}/>
                    <button>GO</button>
                </form>
            </div>
            {showSearchResults && <div className={'search_results'}>
                <button onClick={() => setShowSearchResults(false)}>close</button>
                <p>Search Results for: {query}</p>
                {searchResultsProducts.length > 0 && <h3>Products:</h3>}
                {searchResultsProducts.map((item) =>
                    <p className={'product'}
                       key={searchResultsProducts.indexOf(item)}
                       onClick={() => handleItemOverlay(item)}
                    >{item.title}</p>
                )}
                {searchResultsOrders.length > 0 && <h3>Orders:</h3>}
                {searchResultsOrders.map((item) =>
                    <p className={'product'}
                       key={searchResultsOrders.indexOf(item)}
                       onClick={() => {
                           handleItemOverlay(item)
                       }}
                    >{item.tracking_number}</p>
                )}
                {searchResultsRawMaterials.length > 0 && <h3>Raw Material:</h3>}
                {searchResultsRawMaterials.map((item) =>
                    <p className={'product'}
                       key={searchResultsRawMaterials.indexOf(item)}
                       onClick={() => handleItemOverlay(item)}
                    >{item.name}</p>
                )}
            </div>}
            {showItemOverlay && <div className={'item_overlay_bg'} onClick={() => setShowItemOverlay(false)}>
                <div className={'item_overlay'}>
                    {overlayItem.client ? (
                        <div>
                            <p>{overlayItem.client.first_name} {overlayItem.client.last_name}</p>
                            <p>Client Note: {overlayItem.client_note}</p>
                            <p>Tracking Number: {overlayItem.tracking_number}</p>
                            <div>Ordered Products:
                                <div>{overlayItem.ordered_products.map((item) =>
                                    <p key={item.product}> ID: {item.product}. Quantity: {item.quantity}</p>
                                )}</div>
                            </div>
                        </div>
                    ) : (<div></div>)
                    }

                    {overlayItem.title && <p>{overlayItem.title}</p>}
                    {overlayItem.name && <p>{overlayItem.name}</p>}
                    {overlayItem.description && <p>Description: {overlayItem.description}</p>}
                    {overlayItem.quantity_available && <p>Quantity Available: {overlayItem.quantity_available}</p>}
                    {overlayItem.price && <p>Price: {overlayItem.price}</p>}
                    {overlayItem.production_cost && <p>Production Cost: {overlayItem.production_cost}</p>}
                    {overlayItem.category && <p>Category: {overlayItem.category}</p>}
                </div>
            </div>}
            <div>
                <div className='dash_top' onClick={() => setShowSearchResults(false)}>
                    <div className={'left'}>
                        <div className='top_products'>
                            <h3 className={'header'}>Top Products</h3>
                            {products && products.filter((item) => products.indexOf(item) < 5).map(product =>
                                <div className='product' key={product.id}>
                                    <h4>{products.indexOf(product) + 1} </h4>
                                    <p>{product.title} </p>
                                </div>
                            )}</div>
                        <div className={'tasks'}>
                            <div className={'header'}><h3>Tasks</h3> <p>Due Date</p></div>
                            {tasks.map(task =>
                                <div className={'task'} key={tasks.indexOf(task)}>
                                    <input type={'checkbox'}/>
                                    <p>{task.todo}</p>
                                    <p>{task.due}</p>
                                </div>
                            )}
                        </div>
                        <div className={'suppliers'}>
                            <div className={'header'}><h3>Suppliers</h3></div>
                            <div className={'supplier_container'}>
                                {suppliers.map(supplier =>
                                    <div className={'supplier'} key={suppliers.indexOf(supplier)}>
                                        <h4>{supplier.name}</h4>
                                        <p>{supplier.phone}</p>
                                        <p>{supplier.email}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={'right'}>



                        <div className='weekly_budget'>
                            <h3>YTD Income & Expenses</h3>
                            <div className={'earnings'}>
                                {/*<h4>Income</h4>*/}
                                <h2 className={'income'}>{profitLoss.profit.toLocaleString()}</h2>
                                {/*<h4>Expenses</h4>*/}
                                <h2 className={'expenses'}>{profitLoss['Total Cost'].toLocaleString()}</h2>
                            </div>
                            <div className={'pie_chart'}><PieChart chartData={profitChartData}/></div>
                        </div>
                        <div className={'customer_orders'}>
                            <h3>Customer Orders</h3>
                            <div className={'header'}>
                                <h5 className={'tracking'}>Tracking Number</h5>
                                <h5 className={'tracking'}>Status</h5>
                                <h5>Due Date</h5>
                            </div>
                            {clientOrders.filter((item) => clientOrders.indexOf(item) < 5).map(order =>
                                <div className={'order'} key={order.id}>
                                    <p className={'tracking'}>{order.tracking_number.slice(-6)}</p>
                                    <p>{order.order_status === 1 ? 'Working' : 'Completed'}</p>
                                    <p className={'tracking'}>{order.due_date ? order.due_date : 'None'}</p>
                                </div>
                            )}
                        </div>

                    </div>

                </div>
                <div className={'raw_material_inventory'}>
                    <h3>Raw Material Inventory</h3>
                    <BarChart chartdata={rawMaterialChartData}/>
                </div>

            </div>
        </>
    );
};

export default Dashboard;
