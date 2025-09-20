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
    { name: "Food & Dining", icon: ShoppingCart, color: "bg-orange-500" },
    { name: "Transportation", icon: Car, color: "bg-blue-500" },
    { name: "Utilities", icon: Home, color: "bg-green-500" },
    { name: "Entertainment", icon: Gamepad2, color: "bg-purple-500" },
    { name: "Healthcare", icon: Heart, color: "bg-red-500" },
    { name: "Education", icon: BookOpen, color: "bg-indigo-500" },
    { name: "Travel", icon: Plane, color: "bg-cyan-500" },
    { name: "Shopping", icon: Coffee, color: "bg-pink-500" },
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
        color: categoryData?.color || "bg-gray-500",
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
    <div className="space-y-6 animate-scale-in">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Budget Management</h2>
          <p className="text-muted-foreground">
            Overall Budget Usage: <span className="font-semibold text-primary">{overallProgress.toFixed(1)}%</span>
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-3d bg-gradient-primary text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Budget
            </Button>
          </DialogTrigger>
          <DialogContent className="card-3d">
            <DialogHeader>
              <DialogTitle>Create New Budget</DialogTitle>
              <DialogDescription>
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
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddBudget} className="bg-gradient-primary text-white">
                Create Budget
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Budget Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              Total Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              ₹{totalBudget.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-expense" />
              Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-expense">
              ₹{totalSpent.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">
              {overallProgress.toFixed(1)}% of budget
            </p>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              Remaining
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              ₹{remainingBudget.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">Available to spend</p>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Over Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {budgets.filter(b => (b.spentAmount / b.budgetAmount) > 1).length}
            </div>
            <p className="text-sm text-muted-foreground">Categories</p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress */}
      <Card className="card-3d">
        <CardHeader>
          <CardTitle>Overall Budget Progress</CardTitle>
          <CardDescription>Your spending across all categories this month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Monthly Progress</span>
              <span className="text-muted-foreground">
                ₹{totalSpent.toLocaleString()} / ₹{totalBudget.toLocaleString()}
              </span>
            </div>
            <Progress value={overallProgress} className="h-4" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{overallProgress.toFixed(1)}% used</span>
              <span>{Math.max(0, 100 - overallProgress).toFixed(1)}% remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Categories */}
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
              className="card-3d animate-slide-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${budget.color}`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{budget.category}</CardTitle>
                      <CardDescription className="capitalize">{budget.period} budget</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={status.status === "danger" ? "destructive" : status.status === "warning" ? "secondary" : "default"}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {status.status === "danger" ? "Over Budget" : status.status === "warning" ? "Almost Full" : "On Track"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Spent</span>
                    <span className="text-muted-foreground">
                      ₹{budget.spentAmount.toLocaleString()} / ₹{budget.budgetAmount.toLocaleString()}
                    </span>
                  </div>
                  <Progress 
                    value={progress} 
                    className={`h-3 ${progress >= 100 ? '[&>div]:bg-destructive' : progress >= 75 ? '[&>div]:bg-warning' : '[&>div]:bg-primary'}`}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{progress.toFixed(1)}% used</span>
                    <span>
                      {remaining >= 0 ? `₹${remaining.toLocaleString()} remaining` : `₹${Math.abs(remaining).toLocaleString()} over`}
                    </span>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Daily Avg</p>
                    <p className="text-lg font-semibold text-foreground">
                      ₹{(budget.spentAmount / 30).toFixed(0)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Recommended Daily</p>
                    <p className="text-lg font-semibold text-primary">
                      ₹{(budget.budgetAmount / 30).toFixed(0)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Days Left</p>
                    <p className="text-lg font-semibold text-muted-foreground">
                      {new Date().getDate() > 25 ? new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate() - new Date().getDate() : 30 - new Date().getDate()}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="btn-3d">
                    Add Expense
                  </Button>
                  <Button variant="outline" className="btn-3d">
                    Edit Budget
                  </Button>
                  {progress >= 90 && (
                    <Badge variant="destructive" className="ml-auto">
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

      {/* Budget Tips */}
      <Card className="card-3d">
        <CardHeader>
          <CardTitle>💡 Smart Budget Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <h4 className="font-medium text-primary mb-2">50/30/20 Rule</h4>
              <p className="text-sm text-muted-foreground">
                Allocate 50% for needs, 30% for wants, and 20% for savings and debt repayment.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/10 border border-secondary/20">
              <h4 className="font-medium text-secondary mb-2">Weekly Check-ins</h4>
              <p className="text-sm text-muted-foreground">
                Review your spending weekly to stay on track and make adjustments early.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
              <h4 className="font-medium text-warning mb-2">Emergency Buffer</h4>
              <p className="text-sm text-muted-foreground">
                Keep 10-15% buffer in each category for unexpected expenses.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
              <h4 className="font-medium text-accent mb-2">Automate Savings</h4>
              <p className="text-sm text-muted-foreground">
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