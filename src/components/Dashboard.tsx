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

  // Mock data - would come from backend
  const userStats = {
    totalBalance: 5420.50,
    monthlyIncome: 4500.00,
    monthlyExpenses: 3250.75,
    totalSavings: 12800.00,
    savingsGoal: 15000.00
  };

  const recentExpenses = [
    { id: 1, category: "Food", amount: 45.60, description: "Grocery Store", date: "Today", icon: ShoppingCart, color: "text-orange-500" },
    { id: 2, category: "Transport", amount: 12.50, description: "Metro Card", date: "Yesterday", icon: Car, color: "text-blue-500" },
    { id: 3, category: "Coffee", amount: 8.75, description: "Morning Coffee", date: "Yesterday", icon: Coffee, color: "text-amber-500" },
    { id: 4, category: "Utilities", amount: 125.00, description: "Electricity Bill", date: "2 days ago", icon: Home, color: "text-green-500" },
  ];

  const budgetCategories = [
    { name: "Food & Dining", spent: 850, budget: 1000, color: "bg-orange-500", percentage: 85 },
    { name: "Transportation", spent: 320, budget: 400, color: "bg-blue-500", percentage: 80 },
    { name: "Shopping", spent: 240, budget: 300, color: "bg-purple-500", percentage: 80 },
    { name: "Entertainment", spent: 150, budget: 250, color: "bg-pink-500", percentage: 60 },
  ];

  const savingsGoals = [
    { 
      name: "Emergency Fund", 
      current: 3200, 
      target: 5000, 
      percentage: 64, 
      deadline: "Dec 2024",
      color: "bg-red-500" 
    },
    { 
      name: "Vacation to Japan", 
      current: 2800, 
      target: 4500, 
      percentage: 62, 
      deadline: "Jun 2024",
      color: "bg-blue-500" 
    },
    { 
      name: "New Laptop", 
      current: 800, 
      target: 1200, 
      percentage: 67, 
      deadline: "Mar 2024",
      color: "bg-green-500" 
    },
  ];

  const NavButton = ({ tab, icon: Icon, label }: { tab: string, icon: any, label: string }) => (
    <Button
      variant="ghost"
      className={`justify-start gap-3 w-full transition-all duration-200 ${
        activeTab === tab 
          ? 'bg-primary/10 text-primary border-r-2 border-primary font-medium' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
      }`}
      onClick={() => setActiveTab(tab as any)}
    >
      <Icon className="h-5 w-5" />
      {label}
    </Button>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* Simple Sidebar */}
        <div className="w-64 bg-card border-r border-border">
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary rounded-lg">
                <PiggyBank className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-lg">SmartBudget</h1>
                <p className="text-sm text-muted-foreground">Finance App</p>
              </div>
            </div>

            <nav className="space-y-2">
              <NavButton tab="overview" icon={DollarSign} label="Overview" />
              <NavButton tab="expenses" icon={CreditCard} label="Expenses" />
              <NavButton tab="budgets" icon={Target} label="Budgets" />
              <NavButton tab="goals" icon={PiggyBank} label="Goals" />
              <NavButton tab="analytics" icon={TrendingUp} label="Analytics" />
            </nav>

            <div className="border-t pt-4 space-y-2">
              <Button variant="ghost" className="justify-start gap-2 w-full text-muted-foreground">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
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

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-6">
            {/* Simple Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">
                  {activeTab === 'overview' && 'Overview'}
                  {activeTab === 'expenses' && 'Expenses'}
                  {activeTab === 'budgets' && 'Budgets'}
                  {activeTab === 'goals' && 'Goals'}
                  {activeTab === 'analytics' && 'Analytics'}
                </h1>
                <p className="text-muted-foreground">
                  {activeTab === 'overview' && 'Your financial dashboard'}
                  {activeTab === 'expenses' && 'Track your spending'}
                  {activeTab === 'budgets' && 'Manage your budgets'}
                  {activeTab === 'goals' && 'Your savings goals'}
                  {activeTab === 'analytics' && 'Financial charts'}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </div>
            </div>

          {/* Content based on active tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="simple-card">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm text-muted-foreground">
                        Total Balance
                      </CardTitle>
                      <DollarSign className="h-4 w-4 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ₹{userStats.totalBalance.toLocaleString()}
                    </div>
                    <p className="text-xs text-success">+12.5% this month</p>
                  </CardContent>
                </Card>

                <Card className="simple-card">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm text-muted-foreground">
                        Monthly Income
                      </CardTitle>
                      <TrendingUp className="h-4 w-4 text-success" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-success">
                      ₹{userStats.monthlyIncome.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Salary & side income
                    </p>
                  </CardContent>
                </Card>

                <Card className="simple-card">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm text-muted-foreground">
                        Monthly Expenses
                      </CardTitle>
                      <TrendingDown className="h-4 w-4 text-destructive" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-expense">
                      ₹{userStats.monthlyExpenses.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((userStats.monthlyExpenses / userStats.monthlyIncome) * 100)}% of income
                    </p>
                  </CardContent>
                </Card>

                <Card className="simple-card">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm text-muted-foreground">
                        Savings
                      </CardTitle>
                      <Target className="h-4 w-4 text-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">
                      {Math.round((userStats.totalSavings / userStats.savingsGoal) * 100)}%
                    </div>
                    <Progress 
                      value={(userStats.totalSavings / userStats.savingsGoal) * 100} 
                      className="mt-2"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Simple Activity Cards */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Expenses */}
                <Card className="simple-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Expenses</CardTitle>
                      <Button size="sm" className="bg-primary text-white">
                        <Plus className="h-4 w-4 mr-1" />
                        Add
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentExpenses.map((expense) => (
                      <div 
                        key={expense.id} 
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border"
                      >
                        <div className="flex items-center gap-3">
                          <div className="category-icon category-food">
                            <expense.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium">{expense.description}</p>
                            <p className="text-sm text-muted-foreground">{expense.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-expense">-₹{expense.amount}</p>
                          <p className="text-xs text-muted-foreground">{expense.category}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Budget Overview */}
                <Card className="simple-card">
                  <CardHeader>
                    <CardTitle>Budget Overview</CardTitle>
                    <CardDescription>This month's spending</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {budgetCategories.map((category) => (
                      <div key={category.name} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{category.name}</span>
                          <span className="text-sm text-muted-foreground">
                            ₹{category.spent.toLocaleString()} / ₹{category.budget.toLocaleString()}
                          </span>
                        </div>
                        <Progress 
                          value={category.percentage} 
                          className={`h-2 ${category.percentage >= 90 ? '[&>div]:bg-destructive' : category.percentage >= 75 ? '[&>div]:bg-warning' : '[&>div]:bg-primary'}`}
                        />
                        <div className="flex justify-between text-xs">
                          <span className={`${category.percentage >= 90 ? 'text-destructive' : category.percentage >= 75 ? 'text-warning' : 'text-primary'}`}>
                            {category.percentage}% used
                          </span>
                          <span className="text-muted-foreground">
                            ₹{(category.budget - category.spent).toLocaleString()} left
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Savings Goals */}
              <Card className="simple-card">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Savings Goals
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      New Goal
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {savingsGoals.map((goal) => (
                      <div key={goal.name} className="space-y-3 p-4 rounded-lg bg-muted/50 border">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{goal.name}</h3>
                          <span className="text-xs bg-muted px-2 py-1 rounded">{goal.deadline}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>₹{goal.current.toLocaleString()}</span>
                            <span className="text-muted-foreground">
                              ₹{goal.target.toLocaleString()}
                            </span>
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