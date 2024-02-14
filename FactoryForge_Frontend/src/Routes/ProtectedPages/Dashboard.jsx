import Chart from "chart.js/auto";
import {CategoryScale} from "chart.js";
import BarChart from "../../Components/BarChart.jsx"
import PieChart from "../../Components/PieChart.jsx"
import {useEffect, useState} from "react";
import API from "../../api/API.js";


Chart.register(CategoryScale);

const Dashboard = () => {

    const [profitLoss, setProfitLoss] = useState({
        profit: 100,
        "Total Cost": 10
    })
    const [products, setProducts] = useState([])
    const [clientOrders, setClientOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [rawMaterialChartData, setRawMaterialChartData] = useState({datasets: []})
    const [profitChartData, setProfitChartData] = useState({datasets: []})


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
        } finally {
            setLoading(false)
        }
    }

    async function fetchClientOrders() {
        try {
            const response = await API.get(`client_orders/`)
            setClientOrders(response.data)
        } catch (error) {
            console.log(error.message)
        } finally {
            setLoading(false)
        }
    }

    async function fetchRawMaterials() {
        try {
            const response = await API.get(`raw_materials/`)
            setRawMaterialChartData({
                labels: response.data.map((data) => data.name),
                datasets: [
                    {
                        label: "Quantity Available ",
                        data: response.data.map((data) => data.quantity_available),
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
        } finally {
            setLoading(false)
        }
    }

    async function fetchProfit() {
        try {
            const response = await API.get(`analytics/profit/?start_date=2024-01-01&end_date=2025-01-01`)
            setProfitLoss(response.data)
            setProfitChartData({
                labels: ['Income', 'Expenses'],
                datasets: [
                    {
                        data: [response.data.profit, response.data["Total Cost"]],
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
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
        fetchClientOrders()
        fetchRawMaterials()
        fetchProfit()

    }, [])


    return (
        <>
            {loading && <div className='loadingSpinner'>
                <div className="loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>}
            {!loading && <div className='dashboard'>

                <div className={'search'}>
                    <h1>Dashboard</h1>
                    <div>
                        <input placeholder={'Search'}/>
                        <button>GO</button>
                    </div>


                </div>
                <div className='dash_top'>
                    <div className={'left'}>
                        <div className='top_products'>
                            <h3>Top Products</h3>
                            {products && products.filter((item) => products.indexOf(item) < 5).map(product =>
                                <div className='product' key={product.id}>
                                    <h4>{products.indexOf(product) + 1}</h4> {product.title}</div>
                            )}</div>
                        <div className={'tasks'}>
                            <div className={'header'}><h3>Tasks</h3> <p>Due Date</p></div>
                            {tasks.map(task =>
                                <div className={'task'} key={tasks.indexOf(task)}><p><input
                                    type={'checkbox'}/> {task.todo}</p><p>{task.due}</p>
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

                        <div className={'customer_orders'}>
                            <h3>Customer Orders</h3>
                            <div className={'header'}>
                                <h5 className={'tracking'}>Tracking Number</h5>
                                <h5>Order Status</h5>
                                <h5>Number of Products</h5>
                                <h5>Due Date</h5>
                            </div>
                            {clientOrders.filter((item) => clientOrders.indexOf(item) < 5).map(order =>
                                <div className={'order'} key={order.id}>
                                    <p className={'tracking'}>{order.tracking_number.slice(-6)}</p>
                                    <p>{order.order_status === 1 ? 'Working' : 'Completed'}</p>
                                    <p>{order.nr_products}</p>
                                    <p>{order.due_date ? order.due_date : 'None'}</p>
                                </div>
                            )}
                        </div>
                        <div className={'raw_material_inventory'}>
                            <h3>Raw Material Inventory</h3>
                            <BarChart chartdata={rawMaterialChartData}/>
                        </div>
                    </div>
                </div>
                <div className='weekly_budget'>
                    <h3>YTD Income & Expenses</h3>
                    <div className={'budget_container'}>
                        <div className={'earnings'}>
                            <h4>Income</h4>
                            <h2>{profitLoss.profit.toLocaleString()}</h2>
                        </div>
                        <div className={'spendings'}>
                            <h4>Expenses</h4>
                            <h2>{profitLoss['Total Cost'].toLocaleString()}</h2>
                        </div>
                        <PieChart chartData={profitChartData}/>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default Dashboard;
