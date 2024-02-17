import { useState, useEffect } from "react";
import axios from "axios";
import API from "../../api/API";

const Analytics = () => {
  const [statistics, setStatistics] = useState(null);

  return (
    <>
      <h1 className="route-title">Analytics</h1>
    </>
  );
};

export default Analytics;
