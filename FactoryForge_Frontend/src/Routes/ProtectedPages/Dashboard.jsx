import useFetch from "../../hooks/useFetch.jsx";

const Dashboard = () => {

    const {data, loading} = useFetch('products/')

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
                          {data && data.map(product =>
                              <div className='product' key={product.id}>{product.title}</div>
                          )}</div>
                      <div className={'tasks'}>
                          <div className={'header'}> <h3>Tasks</h3> <p>Due Date</p></div>
                          <p><input type={'checkbox'}/> Ship Order #13335</p>
                          <p><input type={'checkbox'}/> Order Raw Material</p>
                          <p><input type={'checkbox'}/> Confirm Order #44331</p>
                          <p><input type={'checkbox'}/> Prepare Order #28733</p>
                      </div>
                      <div className={'suppliers'}><h3>Suppliers</h3></div>
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
