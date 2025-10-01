import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Target } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const FinancialCharts = () => {
  const [expenseByCategory, setExpenseByCategory] = useState([]);
  const [budgetVsSpending, setBudgetVsSpending] = useState([]);

  useEffect(() => {
    fetchChartData();
  }, []);

  const fetchChartData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Fetch expenses grouped by category
    const { data: expenses } = await supabase
      .from('expenses')
      .select('category, amount')
      .eq('user_id', user.id);

    if (expenses) {
      const grouped: Record<string, number> = expenses.reduce((acc, exp) => {
        const cat = exp.category;
        if (!acc[cat]) acc[cat] = 0;
        acc[cat] += Number(exp.amount);
        return acc;
      }, {} as Record<string, number>);

      const colors = ['#f97316', '#3b82f6', '#8b5cf6', '#10b981'];
      const chartData = Object.entries(grouped).map(([name, value], idx) => ({
        name,
        value: value as number,
        color: colors[idx % colors.length]
      }));
      setExpenseByCategory(chartData);
    }

    // Fetch budgets
    const { data: budgets } = await supabase
      .from('budgets')
      .select('*')
      .eq('user_id', user.id);

    if (budgets) {
      const budgetChart = budgets.map(b => ({
        category: b.category,
        budget: b.budget_amount,
        spent: b.spent_amount
      }));
      setBudgetVsSpending(budgetChart);
    }
  };

  const COLORS = ['#f97316', '#3b82f6', '#10b981', '#8b5cf6'];

  return (
    <div className="space-y-6 p-6">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Expenses by Category
            </CardTitle>
            <CardDescription>Your spending breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {expenseByCategory.length > 0 ? (
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
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No expense data yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Budget vs Spending
            </CardTitle>
            <CardDescription>How you're tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              {budgetVsSpending.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={budgetVsSpending}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="budget" fill="#3b82f6" name="Budget" />
                    <Bar dataKey="spent" fill="#ef4444" name="Spent" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No budget data yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { FinancialCharts };
