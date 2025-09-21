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
        {/* Professional Sidebar */}
        <div className="w-72 bg-card/95 border-r border-border/60 backdrop-blur-sm">
          <div className="p-6 space-y-6 animate-slide-in-right">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-primary rounded-xl shadow-medium">
                <PiggyBank className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-xl text-foreground">SmartBudget</h1>
                <p className="text-xs text-muted-foreground">Personal Finance</p>
              </div>
            </div>

            <nav className="space-y-1">
              <NavButton tab="overview" icon={DollarSign} label="Overview" />
              <NavButton tab="expenses" icon={CreditCard} label="Expenses" />
              <NavButton tab="budgets" icon={Target} label="Budgets" />
              <NavButton tab="goals" icon={PiggyBank} label="Goals" />
              <NavButton tab="analytics" icon={TrendingUp} label="Analytics" />
            </nav>

            <div className="border-t border-border/60 pt-4 space-y-1">
              <Button variant="ghost" className="justify-start gap-3 w-full text-muted-foreground hover:text-foreground hover:bg-muted/50">
                <Settings className="h-5 w-5" />
                Settings
              </Button>
              <Button 
                variant="ghost" 
                className="justify-start gap-3 w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={onLogout}
              >
                <LogOut className="h-5 w-5" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Professional Main Content */}
        <div className="flex-1 bg-muted/20">
          <div className="p-8">
            {/* Professional Header */}
            <div className="flex justify-between items-start mb-8 animate-slide-in-up">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  {activeTab === 'overview' && 'Financial Overview'}
                  {activeTab === 'expenses' && 'Expense Tracker'}
                  {activeTab === 'budgets' && 'Budget Management'}
                  {activeTab === 'goals' && 'Savings Goals'}
                  {activeTab === 'analytics' && 'Financial Analytics'}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {activeTab === 'overview' && 'Track your financial health at a glance'}
                  {activeTab === 'expenses' && 'Monitor and categorize your spending'}
                  {activeTab === 'budgets' && 'Set and manage category budgets'}
                  {activeTab === 'goals' && 'Achieve your savings targets'}
                  {activeTab === 'analytics' && 'Visualize your financial data and trends'}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" className="btn-3d border-border/60">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                </Button>
                <Button variant="outline" size="icon" className="btn-3d border-border/60">
                  <User className="h-5 w-5 text-muted-foreground" />
                </Button>
              </div>
            </div>

          {/* Content based on active tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-scale-in">
              {/* Professional Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="card-elevated border-0">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Total Balance
                      </CardTitle>
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-3xl font-bold text-foreground tracking-tight">
                      ₹{userStats.totalBalance.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="h-3 w-3 text-success" />
                      <span className="text-xs text-success font-medium">+12.5%</span>
                      <span className="text-xs text-muted-foreground">from last month</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="card-elevated border-0">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Monthly Income
                      </CardTitle>
                      <div className="p-2 bg-success/10 rounded-lg">
                        <TrendingUp className="h-4 w-4 text-success" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-3xl font-bold text-success tracking-tight">
                      ₹{userStats.monthlyIncome.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Salary & side income
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-elevated border-0">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Monthly Expenses
                      </CardTitle>
                      <div className="p-2 bg-destructive/10 rounded-lg">
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-3xl font-bold text-expense tracking-tight">
                      ₹{userStats.monthlyExpenses.toLocaleString()}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {Math.round((userStats.monthlyExpenses / userStats.monthlyIncome) * 100)}% of income
                    </p>
                  </CardContent>
                </Card>

                <Card className="card-elevated border-0">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        Savings Progress
                      </CardTitle>
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Target className="h-4 w-4 text-primary" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="text-3xl font-bold text-primary tracking-tight">
                      {Math.round((userStats.totalSavings / userStats.savingsGoal) * 100)}%
                    </div>
                    <Progress 
                      value={(userStats.totalSavings / userStats.savingsGoal) * 100} 
                      className="mt-3 h-2"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Professional Activity & Budget Cards */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Expenses */}
                <Card className="card-elevated border-0">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-semibold">Recent Expenses</CardTitle>
                      <Button size="sm" className="btn-3d bg-primary text-white hover:bg-primary/90">
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentExpenses.map((expense, index) => (
                      <div 
                        key={expense.id} 
                        className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/40 hover:bg-muted/50 transition-colors"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="category-icon category-food">
                            <expense.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{expense.description}</p>
                            <p className="text-sm text-muted-foreground">{expense.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-expense text-lg">-₹{expense.amount}</p>
                          <Badge variant="outline" className="text-xs border-border/40">
                            {expense.category}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Budget Overview */}
                <Card className="card-elevated border-0">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold">Budget Overview</CardTitle>
                    <CardDescription className="text-muted-foreground">This month's spending by category</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {budgetCategories.map((category, index) => (
                      <div 
                        key={category.name} 
                        className="space-y-3 animate-slide-in-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-foreground">{category.name}</span>
                          <span className="text-sm text-muted-foreground font-medium">
                            ₹{category.spent.toLocaleString()} / ₹{category.budget.toLocaleString()}
                          </span>
                        </div>
                        <Progress 
                          value={category.percentage} 
                          className={`h-2.5 ${category.percentage >= 90 ? '[&>div]:bg-destructive' : category.percentage >= 75 ? '[&>div]:bg-warning' : '[&>div]:bg-primary'}`}
                        />
                        <div className="flex justify-between text-xs">
                          <span className={`font-medium ${category.percentage >= 90 ? 'text-destructive' : category.percentage >= 75 ? 'text-warning' : 'text-primary'}`}>
                            {category.percentage}% used
                          </span>
                          <span className="text-muted-foreground">
                            ₹{(category.budget - category.spent).toLocaleString()} remaining
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Savings Goals */}
              <Card className="card-3d">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Savings Goals
                    <Button size="sm" className="btn-3d">
                      <Plus className="h-4 w-4 mr-2" />
                      New Goal
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {savingsGoals.map((goal) => (
                      <div key={goal.name} className="space-y-3 p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{goal.name}</h3>
                          <Badge variant="outline">{goal.deadline}</Badge>
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
                            {goal.percentage}% complete • ₹{goal.target - goal.current} remaining
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