"use client";

import * as React from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { toast } from "sonner";

interface SalesData {
  name: string;
  total: number;
}

export function SalesChart() {
  const [data, setData] = React.useState<SalesData[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/analytics/sales");
        setData(response.data);
      } catch (error) {
        toast.error("Failed to fetch sales data.");
      }
    };
    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
          }}
        />
        <Legend />
        <Line type="monotone" dataKey="total" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
