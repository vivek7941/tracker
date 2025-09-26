import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Target, 
  PiggyBank,
  CreditCard,
  ShoppingCart,
  Home,
  Car,
  Coffee,
  Plane,
  Plus,
  Settings,
  Bell,
  User,
  LogOut
} from "lucide-react";
import { ExpenseTracker } from "./ExpenseTracker";
import { GoalTracker } from "./GoalTracker";
import { BudgetOverview } from "./BudgetOverview";
import { FinancialCharts } from "./FinancialCharts";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'expenses' | 'goals' | 'budgets' | 'analytics'>('overview');

  // basic data
  const stats = {
    balance: 850.50,
    income: 500.00,
    expenses: 190.75,
    savings: 320.00
  };

  const expenses = [
    { id: 1, category: "Food", amount: 85.60, description: "Groceries", date: "Today", icon: ShoppingCart },
    { id: 2, category: "Transport", amount: 25.00, description: "Bus pass", date: "Yesterday", icon: Car },
    { id: 3, category: "Coffee", amount: 5.75, description: "Coffee", date: "2 days ago", icon: Coffee },
  ];

  const budgets = [
    { name: "Food", spent: 120, budget: 150, percentage: 80 },
    { name: "Transport", spent: 40, budget: 50, percentage: 80 },
    { name: "Entertainment", spent: 30, budget: 80, percentage: 38 },
  ];

  const goals = [
    { name: "New Laptop", current: 320, target: 800, percentage: 40, deadline: "Aug 2024" }
  ];

  const NavButton = ({ tab, icon: Icon, label }: { tab: string, icon: any, label: string }) => (
    <Button
      variant="ghost"
      className={`justify-start gap-2 w-full ${
        activeTab === tab 
          ? 'bg-primary/10 text-primary' 
          : 'text-muted-foreground hover:text-foreground'
      }`}
      onClick={() => setActiveTab(tab as any)}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Button>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* sidebar */}
        <div className="w-60 bg-card border-r">
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary rounded">
                <PiggyBank className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold">SmartBudget</h1>
                <p className="text-xs text-muted-foreground">Budget App</p>
              </div>
            </div>

            <nav className="space-y-1">
              <NavButton tab="overview" icon={DollarSign} label="Overview" />
              <NavButton tab="expenses" icon={CreditCard} label="Expenses" />
              <NavButton tab="budgets" icon={Target} label="Budgets" />
              <NavButton tab="goals" icon={PiggyBank} label="Goals" />
              <NavButton tab="analytics" icon={TrendingUp} label="Charts" />
            </nav>

            <div className="border-t pt-4">
              <Button 
                variant="ghost" 
                className="justify-start gap-2 w-full text-destructive"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* content */}
        <div className="flex-1">
          <div className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">
                {activeTab === 'overview' && 'Dashboard'}
                {activeTab === 'expenses' && 'Expenses'}
                {activeTab === 'budgets' && 'Budgets'}
                {activeTab === 'goals' && 'Goals'}
                {activeTab === 'analytics' && 'Charts'}
              </h1>
            </div>

          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* main stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Balance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">₹{stats.balance}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Income
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">₹{stats.income}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                      <TrendingDown className="h-4 w-4" />
                      Expenses
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">₹{stats.expenses}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Savings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">₹{stats.savings}</div>
                  </CardContent>
                </Card>
              </div>

              {/* recent stuff */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Expenses</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {expenses.map((expense) => (
                      <div key={expense.id} className="flex items-center justify-between p-3 rounded bg-muted/50">
                        <div className="flex items-center gap-3">
                          <expense.icon className="h-4 w-4" />
                          <div>
                            <p className="font-medium">{expense.description}</p>
                            <p className="text-sm text-muted-foreground">{expense.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-red-600">-₹{expense.amount}</p>
                          <p className="text-xs text-muted-foreground">{expense.category}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Budget Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {budgets.map((budget) => (
                      <div key={budget.name} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{budget.name}</span>
                          <span className="text-sm text-muted-foreground">
                            ₹{budget.spent} / ₹{budget.budget}
                          </span>
                        </div>
                        <Progress value={budget.percentage} className="h-2" />
                        <div className="flex justify-between text-xs">
                          <span>{budget.percentage}% used</span>
                          <span className="text-muted-foreground">
                            ₹{budget.budget - budget.spent} left
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* goals */}
              <Card>
                <CardHeader>
                  <CardTitle>Savings Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {goals.map((goal) => (
                      <div key={goal.name} className="space-y-3 p-4 rounded bg-muted/50">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{goal.name}</h3>
                          <span className="text-xs bg-muted px-2 py-1 rounded">{goal.deadline}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>₹{goal.current}</span>
                            <span className="text-muted-foreground">₹{goal.target}</span>
                          </div>
                          <Progress value={goal.percentage} className="h-2" />
                          <p className="text-xs text-muted-foreground">
                            {goal.percentage}% complete
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'expenses' && <ExpenseTracker />}
          {activeTab === 'budgets' && <BudgetOverview />}
          {activeTab === 'goals' && <GoalTracker />}
          {activeTab === 'analytics' && <FinancialCharts />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;