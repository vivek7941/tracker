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
      className={`justify-start gap-3 w-full transition-all duration-300 font-medium ${
        activeTab === tab 
          ? 'bg-gradient-to-r from-primary/15 to-secondary/15 text-primary shadow-sm border-l-2 border-primary' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:translate-x-1 border-l-2 border-transparent'
      }`}
      onClick={() => setActiveTab(tab as any)}
    >
      <div className={`p-1.5 rounded-lg transition-all duration-300 ${
        activeTab === tab 
          ? 'bg-gradient-to-br from-primary to-secondary text-white' 
          : 'bg-muted/50 group-hover:bg-muted'
      }`}>
        <Icon className="h-4 w-4" />
      </div>
      <span className={activeTab === tab ? 'font-semibold' : ''}>{label}</span>
    </Button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Top Header Bar */}
      <header className="bg-card/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50 shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur-lg opacity-70 group-hover:opacity-90 transition-opacity"></div>
                <div className="relative p-2 bg-gradient-to-br from-primary to-secondary rounded-xl">
                  <img src={logo} alt="Logo" className="h-8 w-8" />
                </div>
              </div>
              <div>
                <h1 className="font-display font-bold text-xl gradient-text">SmartBudget</h1>
                <p className="text-xs text-muted-foreground font-medium">Financial Intelligence</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full animate-pulse"></span>
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-colors">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="h-8 w-px bg-border"></div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2 hover:bg-destructive/10 hover:text-destructive transition-all"
              onClick={onLogout}
            >
              <User className="h-4 w-4" />
              <span className="font-medium">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-73px)]">
        {/* Sleek Sidebar */}
        <div className="w-72 bg-card/50 backdrop-blur-xl border-r border-border/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5 pointer-events-none"></div>
          <div className="p-6 space-y-6 relative z-10">
            {/* Quick Stats in Sidebar */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Quick Overview</p>
              <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground font-medium">Balance</span>
                  <span className="text-xl font-bold gradient-text">₹{stats.balance}</span>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
                <div className="flex justify-between text-xs">
                  <div className="text-center">
                    <p className="text-muted-foreground">Income</p>
                    <p className="font-semibold text-income mt-0.5">+₹{stats.income}</p>
                  </div>
                  <div className="w-px bg-border"></div>
                  <div className="text-center">
                    <p className="text-muted-foreground">Expenses</p>
                    <p className="font-semibold text-expense mt-0.5">-₹{stats.expenses}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">Navigation</p>

              <nav className="space-y-1">
                <NavButton tab="overview" icon={Home} label="Dashboard" />
                <NavButton tab="expenses" icon={CreditCard} label="Transactions" />
                <NavButton tab="budgets" icon={Target} label="Budget Plan" />
                <NavButton tab="goals" icon={PiggyBank} label="Savings Goals" />
                <NavButton tab="analytics" icon={TrendingUp} label="Analytics" />
              </nav>
            </div>

            {/* Quick Actions */}
            <div className="mt-auto pt-4 border-t border-border/50 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">Quick Actions</p>
              <Button className="w-full justify-start gap-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                Add Transaction
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-8 max-w-[1600px] mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-display font-bold mb-2">
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'expenses' && 'Transaction History'}
                {activeTab === 'budgets' && 'Budget Management'}
                {activeTab === 'goals' && 'Financial Goals'}
                {activeTab === 'analytics' && 'Financial Analytics'}
              </h1>
              <p className="text-muted-foreground font-medium">
                {activeTab === 'overview' && 'Get a complete view of your financial health'}
                {activeTab === 'expenses' && 'Track and manage all your expenses'}
                {activeTab === 'budgets' && 'Plan and monitor your spending limits'}
                {activeTab === 'goals' && 'Set and achieve your savings targets'}
                {activeTab === 'analytics' && 'Deep dive into your financial patterns'}
              </p>
            </div>

          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards - More Compact & Modern */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <Card className="stat-card border-0 shadow-md hover:shadow-xl transition-all duration-500 group cursor-pointer overflow-hidden relative backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="pb-3 relative z-10">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Balance</CardTitle>
                      <div className="p-2 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10 pb-4">
                    <div className="text-4xl font-display font-extrabold gradient-text mb-1 group-hover:scale-105 transition-transform duration-300">₹{stats.balance.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-income" />
                      Available funds
                    </p>
                  </CardContent>
                </Card>

                <Card className="stat-card border-0 shadow-md hover:shadow-xl transition-all duration-500 group cursor-pointer overflow-hidden relative backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-income/10 via-income/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="pb-3 relative z-10">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Income</CardTitle>
                      <div className="p-2 bg-gradient-to-br from-income/20 to-income/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <TrendingUp className="h-5 w-5 text-income" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10 pb-4">
                    <div className="text-4xl font-display font-extrabold text-income mb-1 group-hover:scale-105 transition-transform duration-300">₹{stats.income.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                      <span className="text-income">+12%</span> from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="stat-card border-0 shadow-md hover:shadow-xl transition-all duration-500 group cursor-pointer overflow-hidden relative backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-expense/10 via-expense/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="pb-3 relative z-10">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Expenses</CardTitle>
                      <div className="p-2 bg-gradient-to-br from-expense/20 to-expense/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <TrendingDown className="h-5 w-5 text-expense" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10 pb-4">
                    <div className="text-4xl font-display font-extrabold text-expense mb-1 group-hover:scale-105 transition-transform duration-300">₹{stats.expenses.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                      <span className="text-expense">-8%</span> from last month
                    </p>
                  </CardContent>
                </Card>

                <Card className="stat-card border-0 shadow-md hover:shadow-xl transition-all duration-500 group cursor-pointer overflow-hidden relative backdrop-blur-sm">
                  <div className="absolute inset-0 bg-gradient-to-br from-savings/10 via-savings/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardHeader className="pb-3 relative z-10">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Savings</CardTitle>
                      <div className="p-2 bg-gradient-to-br from-savings/20 to-savings/10 rounded-xl group-hover:scale-110 transition-transform duration-300">
                        <PiggyBank className="h-5 w-5 text-savings" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10 pb-4">
                    <div className="text-4xl font-display font-extrabold text-savings mb-1 group-hover:scale-105 transition-transform duration-300">₹{stats.savings.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-savings" />
                      40% of income
                    </p>
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