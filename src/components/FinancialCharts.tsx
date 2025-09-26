import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";

const FinancialCharts = () => {
  // Mock data for charts
  const expenseByCategory = [
    { name: 'Food', value: 120, color: '#f97316' },
    { name: 'Transport', value: 40, color: '#3b82f6' },
    { name: 'Entertainment', value: 30, color: '#8b5cf6' }
  ];

  const monthlyTrends = [
    { month: 'Jan', income: 500, expenses: 190, savings: 310 },
    { month: 'Feb', income: 500, expenses: 220, savings: 280 },
    { month: 'Mar', income: 500, expenses: 180, savings: 320 }
  ];

  const budgetVsSpending = [
    { category: 'Food', budget: 150, spent: 120 },
    { category: 'Transport', budget: 50, spent: 40 },
    { category: 'Entertainment', budget: 80, spent: 30 }
  ];

  const savingsProgress = [
    { month: 'Jan', target: 200, actual: 310 },
    { month: 'Feb', target: 200, actual: 280 },
    { month: 'Mar', target: 200, actual: 320 }
  ];

  const COLORS = ['#f97316', '#3b82f6', '#10b981', '#8b5cf6', '#ef4444', '#ec4899'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 rounded-lg border shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: ₹{entry.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 animate-scale-in">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Expense Breakdown Pie Chart */}
        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Expense Breakdown
            </CardTitle>
            <CardDescription>Your spending by category this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {expenseByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`₹${value}`, 'Amount']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {expenseByCategory.map((entry) => (
                <Badge key={entry.name} variant="outline" className="text-xs">
                  <div 
                    className="w-2 h-2 rounded-full mr-1" 
                    style={{ backgroundColor: entry.color }}
                  />
                  {entry.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Budget vs Spending */}
        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-success" />
              Budget vs Spending
            </CardTitle>
            <CardDescription>How you're tracking against your budgets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetVsSpending}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="budget" fill="hsl(var(--primary))" name="Budget" />
                  <Bar dataKey="spent" fill="hsl(var(--destructive))" name="Spent" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Financial Trends */}
      <Card className="card-3d">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Monthly Financial Trends
          </CardTitle>
          <CardDescription>Income, expenses, and savings over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="income" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={3}
                  name="Income"
                  dot={{ fill: 'hsl(var(--success))', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={3}
                  name="Expenses"
                  dot={{ fill: 'hsl(var(--destructive))', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="savings" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  name="Savings"
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Savings Goals Progress */}
      <Card className="card-3d">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-savings" />
            Savings Goals Progress
          </CardTitle>
          <CardDescription>Target vs actual monthly savings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={savingsProgress}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="target" fill="hsl(var(--muted))" name="Target" />
                <Bar dataKey="actual" fill="hsl(var(--primary))" name="Actual Savings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingUp className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Avg. Monthly</span>
              </div>
              <p className="text-xl font-bold text-success">₹303</p>
              <p className="text-xs text-muted-foreground">52% above target</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Target className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Best Month</span>
              </div>
              <p className="text-xl font-bold text-primary">₹320</p>
              <p className="text-xs text-muted-foreground">March 2024</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <TrendingDown className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium">Needs Attention</span>
              </div>
              <p className="text-xl font-bold text-warning">February</p>
              <p className="text-xs text-muted-foreground">Lowest savings</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { FinancialCharts };