import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, AlertTriangle, CheckCircle, TrendingUp, DollarSign, ShoppingCart, Car, Home, Coffee, Plane, Gamepad2, Heart, BookOpen } from "lucide-react";

const BudgetOverview = () => {
  const [budgets, setBudgets] = useState([
    {
      id: 1,
      category: "Food & Dining",
      budgetAmount: 800,
      spentAmount: 650,
      icon: ShoppingCart,
      color: "bg-orange-500",
      period: "monthly"
    },
    {
      id: 2,
      category: "Transportation",
      budgetAmount: 300,
      spentAmount: 280,
      icon: Car,
      color: "bg-blue-500",
      period: "monthly"
    },
    {
      id: 3,
      category: "Utilities",
      budgetAmount: 200,
      spentAmount: 185,
      icon: Home,
      color: "bg-green-500",
      period: "monthly"
    },
    {
      id: 4,
      category: "Entertainment",
      budgetAmount: 250,
      spentAmount: 120,
      icon: Gamepad2,
      color: "bg-purple-500",
      period: "monthly"
    },
    {
      id: 5,
      category: "Healthcare",
      budgetAmount: 150,
      spentAmount: 75,
      icon: Heart,
      color: "bg-red-500",
      period: "monthly"
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newBudget, setNewBudget] = useState({
    category: "",
    budgetAmount: "",
    period: "monthly"
  });

  const budgetCategories = [
    { name: "Food & Dining", icon: ShoppingCart, color: "category-food" },
    { name: "Transportation", icon: Car, color: "category-transport" },
    { name: "Utilities", icon: Home, color: "category-utilities" },
    { name: "Entertainment", icon: Gamepad2, color: "category-entertainment" },
    { name: "Healthcare", icon: Heart, color: "category-healthcare" },
    { name: "Education", icon: BookOpen, color: "category-education" },
    { name: "Travel", icon: Plane, color: "category-travel" },
    { name: "Shopping", icon: Coffee, color: "category-shopping" },
  ];

  const handleAddBudget = () => {
    if (newBudget.category && newBudget.budgetAmount) {
      const categoryData = budgetCategories.find(cat => cat.name === newBudget.category);
      const budget = {
        id: Date.now(),
        category: newBudget.category,
        budgetAmount: parseFloat(newBudget.budgetAmount),
        spentAmount: 0,
        icon: categoryData?.icon || ShoppingCart,
        color: categoryData?.color || "category-shopping",
        period: newBudget.period
      };
      setBudgets([...budgets, budget]);
      setNewBudget({
        category: "",
        budgetAmount: "",
        period: "monthly"
      });
      setIsAddDialogOpen(false);
    }
  };

  const calculateProgress = (spent: number, budget: number) => {
    return Math.min((spent / budget) * 100, 100);
  };

  const getBudgetStatus = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 90) return { status: "danger", color: "text-destructive", icon: AlertTriangle };
    if (percentage >= 75) return { status: "warning", color: "text-warning", icon: AlertTriangle };
    return { status: "good", color: "text-success", icon: CheckCircle };
  };

  const totalBudget = budgets.reduce((sum, budget) => sum + budget.budgetAmount, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spentAmount, 0);
  const remainingBudget = totalBudget - totalSpent;
  const overallProgress = (totalSpent / totalBudget) * 100;

  return (
    <div className="space-y-8 animate-scale-in bg-muted/20 min-h-screen p-8">
      {/* Professional Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Budget Management</h2>
          <div className="flex items-center gap-4">
            <p className="text-muted-foreground text-lg">
              Overall Budget Usage: <span className="font-semibold text-primary">{overallProgress.toFixed(1)}%</span>
            </p>
            <div className={`px-3 py-1 text-sm font-medium rounded-full ${
              overallProgress >= 90 ? 'bg-destructive/10 text-destructive' : 
              overallProgress >= 75 ? 'bg-warning/10 text-warning' : 
              'bg-success/10 text-success'
            }`}>
              {overallProgress >= 90 ? 'Over Budget' : overallProgress >= 75 ? 'Warning' : 'On Track'}
            </div>
          </div>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-3d bg-primary text-white hover:bg-primary/90 shadow-md">
              <Plus className="h-4 w-4 mr-2" />
              Add Budget
            </Button>
          </DialogTrigger>
          <DialogContent className="card-elevated border-0">
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-2xl font-semibold">Create New Budget</DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">
                Set spending limits for different categories.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="budget-category">Category</Label>
                <Select value={newBudget.category} onValueChange={(value) => setNewBudget({...newBudget, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetCategories.map((category) => (
                      <SelectItem key={category.name} value={category.name}>
                        <div className="flex items-center gap-2">
                          <category.icon className="h-4 w-4" />
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget-amount">Budget Amount (₹)</Label>
                  <Input
                    id="budget-amount"
                    type="number"
                    placeholder="500"
                    value={newBudget.budgetAmount}
                    onChange={(e) => setNewBudget({...newBudget, budgetAmount: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="budget-period">Period</Label>
                  <Select value={newBudget.period} onValueChange={(value) => setNewBudget({...newBudget, period: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-border/60">
                Cancel
              </Button>
              <Button onClick={handleAddBudget} className="bg-primary text-white hover:bg-primary/90">
                Create Budget
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Professional Budget Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="card-elevated border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium text-muted-foreground">Total Budget</CardTitle>
              <div className="p-2 bg-primary/10 rounded-lg">
                <DollarSign className="h-4 w-4 text-primary" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground tracking-tight">
              ₹{totalBudget.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground mt-2">This month</p>
          </CardContent>
        </Card>

        <Card className="card-elevated border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium text-muted-foreground">Total Spent</CardTitle>
              <div className="p-2 bg-destructive/10 rounded-lg">
                <TrendingUp className="h-4 w-4 text-destructive" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-expense tracking-tight">
              ₹{totalSpent.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {overallProgress.toFixed(1)}% of budget
            </p>
          </CardContent>
        </Card>

        <Card className="card-elevated border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium text-muted-foreground">Remaining</CardTitle>
              <div className="p-2 bg-success/10 rounded-lg">
                <CheckCircle className="h-4 w-4 text-success" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success tracking-tight">
              ₹{remainingBudget.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground mt-2">Available to spend</p>
          </CardContent>
        </Card>

        <Card className="card-elevated border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium text-muted-foreground">Over Budget</CardTitle>
              <div className="p-2 bg-warning/10 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-warning" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning tracking-tight">
              {budgets.filter(b => (b.spentAmount / b.budgetAmount) > 1).length}
            </div>
            <p className="text-sm text-muted-foreground mt-2">Categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Professional Budget Progress */}
      <Card className="card-elevated border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold">Overall Budget Progress</CardTitle>
          <CardDescription className="text-muted-foreground">Your spending across all categories this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-foreground">Monthly Progress</span>
              <span className="text-muted-foreground font-medium">
                ₹{totalSpent.toLocaleString()} / ₹{totalBudget.toLocaleString()}
              </span>
            </div>
            <Progress 
              value={overallProgress} 
              className={`h-3 ${overallProgress >= 90 ? '[&>div]:bg-destructive' : overallProgress >= 75 ? '[&>div]:bg-warning' : '[&>div]:bg-primary'}`}
            />
            <div className="flex justify-between text-xs">
              <span className={`font-medium ${overallProgress >= 90 ? 'text-destructive' : overallProgress >= 75 ? 'text-warning' : 'text-primary'}`}>
                {overallProgress.toFixed(1)}% used
              </span>
              <span className="text-muted-foreground">
                {Math.max(0, 100 - overallProgress).toFixed(1)}% remaining
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Professional Budget Categories */}
      <div className="grid gap-6">
        {budgets.map((budget, index) => {
          const IconComponent = budget.icon;
          const progress = calculateProgress(budget.spentAmount, budget.budgetAmount);
          const status = getBudgetStatus(budget.spentAmount, budget.budgetAmount);
          const StatusIcon = status.icon;
          const remaining = budget.budgetAmount - budget.spentAmount;

          return (
            <Card 
              key={budget.id} 
              className="card-elevated border-0 animate-slide-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`category-icon ${budget.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold">{budget.category}</CardTitle>
                      <CardDescription className="capitalize text-muted-foreground">{budget.period} budget</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={status.status === "danger" ? "destructive" : "outline"} 
                      className={`${
                        status.status === "danger" ? 'bg-destructive/10 text-destructive border-destructive/20' : 
                        status.status === "warning" ? 'bg-warning/10 text-warning border-warning/20' : 
                        'bg-success/10 text-success border-success/20'
                      }`}
                    >
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {status.status === "danger" ? "Over Budget" : status.status === "warning" ? "Almost Full" : "On Track"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Professional Progress Section */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">Spent</span>
                    <span className="text-sm text-muted-foreground font-medium">
                      ₹{budget.spentAmount.toLocaleString()} / ₹{budget.budgetAmount.toLocaleString()}
                    </span>
                  </div>
                  <Progress 
                    value={progress} 
                    className={`h-3 ${progress >= 100 ? '[&>div]:bg-destructive' : progress >= 75 ? '[&>div]:bg-warning' : '[&>div]:bg-primary'}`}
                  />
                  <div className="flex justify-between text-xs">
                    <span className={`font-medium ${progress >= 100 ? 'text-destructive' : progress >= 75 ? 'text-warning' : 'text-primary'}`}>
                      {progress.toFixed(1)}% used
                    </span>
                    <span className="text-muted-foreground">
                      {remaining >= 0 ? `₹${remaining.toLocaleString()} remaining` : `₹${Math.abs(remaining).toLocaleString()} over`}
                    </span>
                  </div>
                </div>

                {/* Professional Stats Grid */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/40">
                  <div className="text-center space-y-1">
                    <p className="text-xs text-muted-foreground font-medium">Daily Avg</p>
                    <p className="text-lg font-bold text-foreground">
                      ₹{(budget.spentAmount / 30).toFixed(0)}
                    </p>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-xs text-muted-foreground font-medium">Recommended Daily</p>
                    <p className="text-lg font-bold text-primary">
                      ₹{(budget.budgetAmount / 30).toFixed(0)}
                    </p>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-xs text-muted-foreground font-medium">Days Left</p>
                    <p className="text-lg font-bold text-muted-foreground">
                      {new Date().getDate() > 25 ? new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate() : 30 - new Date().getDate()}
                    </p>
                  </div>
                </div>

                {/* Professional Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="btn-3d border-border/60 hover:bg-muted/50">
                    Add Expense
                  </Button>
                  <Button variant="outline" className="btn-3d border-border/60 hover:bg-muted/50">
                    Edit Budget
                  </Button>
                  {progress >= 90 && (
                    <Badge variant="destructive" className="ml-auto bg-destructive/10 text-destructive border-destructive/20">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Budget Alert
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Professional Budget Tips */}
      <Card className="card-elevated border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold">💡 Smart Budget Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-primary/5 border border-primary/10">
              <h4 className="font-semibold text-primary mb-3 text-lg">50/30/20 Rule</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Allocate 50% for needs, 30% for wants, and 20% for savings and debt repayment.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-success/5 border border-success/10">
              <h4 className="font-semibold text-success mb-3 text-lg">Weekly Check-ins</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Review your spending weekly to stay on track and make adjustments early.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-warning/5 border border-warning/10">
              <h4 className="font-semibold text-warning mb-3 text-lg">Emergency Buffer</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Keep 10-15% buffer in each category for unexpected expenses.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-accent/5 border border-accent/10">
              <h4 className="font-semibold text-accent mb-3 text-lg">Automate Savings</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Set up automatic transfers to savings when you stay under budget.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { BudgetOverview };