import useFetch from "../../hooks/useFetch.jsx";

const Dashboard = () => {

    const {data, loading} = useFetch('products/')
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
              <div className='dash_top'>
                  <div className={'left'}>
                      <div className='top_products'>
                          <h3>Top Products</h3>
                          {data && data.filter((item) => data.indexOf(item) < 5).map(product =>
                              <div className='product' key={product.id}><h4>{data.indexOf(product)+1}</h4> {product.title}</div>
                          )}</div>
                      <div className={'tasks'}>
                          <div className={'header'}> <h3>Tasks</h3> <p>Due Date</p></div>
                          {tasks.map(task =>
                              <div className={'task'} key={tasks.indexOf(task)}><p><input type={'checkbox'}/>   {task.todo}</p><p>{task.due}</p>
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
                                      <p>{supplier.address}</p>
                                  </div>
                              )}
                              </div>
                          </div>
                  </div>
                  <div className={'right'}>
                      <div className={'search'}><h3>Search</h3><input/></div>
                      <div className={'customer_order'}><h3>Customer Order</h3></div>
                      <div className={'raw_material_inventory'}><h3>Raw Material Inventory</h3></div>
                  </div>
              </div>
              <div className='weekly_budget'><h3>Weekly Budget</h3></div>
          </div>}
      </>
  );
};

export default Dashboard;
