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
  LogOut,
  Sparkles
} from "lucide-react";
import { ExpenseTracker } from "./ExpenseTracker";
import { GoalTracker } from "./GoalTracker";
import { BudgetOverview } from "./BudgetOverview";
import { FinancialCharts } from "./FinancialCharts";
import logo from "@/assets/logo.png";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'expenses' | 'goals' | 'budgets' | 'analytics'>('overview');

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
      className={`justify-start gap-2 w-full transition-all duration-300 ${
        activeTab === tab 
          ? 'bg-gradient-to-r from-primary/20 to-primary/10 text-primary shadow-md transform scale-105' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:translate-x-1'
      }`}
      onClick={() => setActiveTab(tab as any)}
    >
      <Icon className={`h-4 w-4 transition-transform duration-300 ${activeTab === tab ? 'scale-110' : ''}`} />
      {label}
    </Button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="flex min-h-screen">
        <div className="w-60 glass-effect border-r backdrop-blur-xl shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 shimmer opacity-50"></div>
          <div className="p-4 space-y-4 relative z-10">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/30 rounded-lg blur-md"></div>
                <img src={logo} alt="Logo" className="h-10 w-10 relative" />
              </div>
              <div>
                <h1 className="font-bold gradient-text text-lg">SmartBudget</h1>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Sparkles className="h-3 w-3" />
                  Your Finance Partner
                </p>
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
                className="justify-start gap-2 w-full text-destructive hover:bg-destructive/10"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="stat-card border-0 shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 group cursor-pointer overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="pb-2 relative z-10">
                    <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300 group-hover:scale-110 transform">
                        <DollarSign className="h-4 w-4 text-primary" />
                      </div>
                      Balance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="text-3xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">₹{stats.balance}</div>
                    <p className="text-xs text-muted-foreground mt-1">Current balance</p>
                  </CardContent>
                </Card>

                <Card className="stat-card border-0 shadow-lg hover:shadow-2xl hover:shadow-income/20 transition-all duration-500 group cursor-pointer overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-income/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="pb-2 relative z-10">
                    <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="p-2 bg-income/10 rounded-lg group-hover:bg-income/20 transition-colors duration-300 group-hover:scale-110 transform">
                        <TrendingUp className="h-4 w-4 text-income" />
                      </div>
                      Income
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="text-3xl font-bold text-income group-hover:scale-105 transition-transform duration-300">₹{stats.income}</div>
                    <p className="text-xs text-muted-foreground mt-1">This month</p>
                  </CardContent>
                </Card>

                <Card className="stat-card border-0 shadow-lg hover:shadow-2xl hover:shadow-expense/20 transition-all duration-500 group cursor-pointer overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-expense/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="pb-2 relative z-10">
                    <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="p-2 bg-expense/10 rounded-lg group-hover:bg-expense/20 transition-colors duration-300 group-hover:scale-110 transform">
                        <TrendingDown className="h-4 w-4 text-expense" />
                      </div>
                      Expenses
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="text-3xl font-bold text-expense group-hover:scale-105 transition-transform duration-300">₹{stats.expenses}</div>
                    <p className="text-xs text-muted-foreground mt-1">This month</p>
                  </CardContent>
                </Card>

                <Card className="stat-card border-0 shadow-lg hover:shadow-2xl hover:shadow-savings/20 transition-all duration-500 group cursor-pointer overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-savings/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="pb-2 relative z-10">
                    <CardTitle className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="p-2 bg-savings/10 rounded-lg group-hover:bg-savings/20 transition-colors duration-300 group-hover:scale-110 transform">
                        <Target className="h-4 w-4 text-savings" />
                      </div>
                      Savings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="text-3xl font-bold text-savings group-hover:scale-105 transition-transform duration-300">₹{stats.savings}</div>
                    <p className="text-xs text-muted-foreground mt-1">Total saved</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="card-3d border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors duration-300">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      Recent Expenses
                    </CardTitle>
                    <CardDescription>Your latest transactions</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {expenses.map((expense, index) => (
                      <div 
                        key={expense.id} 
                        className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-muted/50 to-muted/30 hover:from-primary/10 hover:to-primary/5 transition-all duration-300 hover:shadow-md hover:scale-[1.02] cursor-pointer border border-transparent hover:border-primary/20"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors duration-300">
                            <expense.icon className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{expense.description}</p>
                            <p className="text-sm text-muted-foreground">{expense.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-expense">-₹{expense.amount}</p>
                          <Badge variant="outline" className="text-xs mt-1">{expense.category}</Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="card-3d border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 group-hover:text-primary transition-colors duration-300">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
                        <Target className="h-5 w-5 text-primary" />
                      </div>
                      Budget Status
                    </CardTitle>
                    <CardDescription>Track your spending limits</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {budgets.map((budget, index) => (
                      <div 
                        key={budget.name} 
                        className="space-y-2 p-3 rounded-lg hover:bg-muted/30 transition-colors duration-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{budget.name}</span>
                          <Badge variant={budget.percentage > 80 ? "destructive" : "secondary"}>
                            {budget.percentage}%
                          </Badge>
                        </div>
                        <Progress value={budget.percentage} className="h-2.5" />
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">₹{budget.spent} spent</span>
                          <span className="text-muted-foreground font-medium">
                            ₹{budget.budget - budget.spent} remaining
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <Card className="card-3d border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PiggyBank className="h-5 w-5 text-primary" />
                    Savings Goals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {goals.map((goal) => (
                      <div key={goal.name} className="space-y-3 p-5 rounded-lg bg-gradient-to-br from-muted/50 to-muted/30 hover:from-primary/10 hover:to-primary/5 transition-all duration-500 hover:shadow-xl hover:scale-105 cursor-pointer gradient-border">
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