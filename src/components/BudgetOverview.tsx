import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, AlertTriangle, CheckCircle, ShoppingCart, Car, Gamepad2, Coffee } from "lucide-react";

const BudgetOverview = () => {
  const [budgets, setBudgets] = useState([
    {
      id: 1,
      category: "Food",
      budgetAmount: 150,
      spentAmount: 120,
      icon: ShoppingCart,
      color: "bg-orange-500",
      period: "monthly"
    },
    {
      id: 2,
      category: "Transport",
      budgetAmount: 50,
      spentAmount: 40,
      icon: Car,
      color: "bg-blue-500",
      period: "monthly"
    },
    {
      id: 3,
      category: "Entertainment",
      budgetAmount: 80,
      spentAmount: 30,
      icon: Gamepad2,
      color: "bg-purple-500",
      period: "monthly"
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newBudget, setNewBudget] = useState({
    category: "",
    budgetAmount: "",
    period: "monthly"
  });

  const categories = [
    { name: "Food", icon: ShoppingCart, color: "category-food" },
    { name: "Transport", icon: Car, color: "category-transport" },
    { name: "Entertainment", icon: Gamepad2, color: "category-entertainment" },
    { name: "Other", icon: Coffee, color: "category-shopping" },
  ];

  const addNewBudget = () => {
    if (newBudget.category && newBudget.budgetAmount) {
      const cat = categories.find(c => c.name === newBudget.category);
      const budget = {
        id: Date.now(),
        category: newBudget.category,
        budgetAmount: parseFloat(newBudget.budgetAmount),
        spentAmount: 0,
        icon: cat?.icon || ShoppingCart,
        color: cat?.color || "category-shopping",
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

  const getProgress = (spent, budget) => {
    return Math.min((spent / budget) * 100, 100);
  };

  const getStatus = (spent, budget) => {
    const pct = (spent / budget) * 100;
    if (pct >= 90) return { status: "danger", color: "text-red-500", icon: AlertTriangle };
    if (pct >= 75) return { status: "warning", color: "text-yellow-500", icon: AlertTriangle };
    return { status: "good", color: "text-green-500", icon: CheckCircle };
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.budgetAmount, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spentAmount, 0);
  const remaining = totalBudget - totalSpent;
  const progress = (totalSpent / totalBudget) * 100;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Budgets</h2>
          <p className="text-muted-foreground">
            Used: {progress.toFixed(1)}%
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Budget
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New Budget</DialogTitle>
              <DialogDescription>
                Set spending limit for category
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={newBudget.category} onValueChange={(value) => setNewBudget({...newBudget, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pick category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.name} value={cat.name}>
                        <div className="flex items-center gap-2">
                          <cat.icon className="h-4 w-4" />
                          {cat.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Amount (₹)</Label>
                <Input
                  type="number"
                  placeholder="100"
                  value={newBudget.budgetAmount}
                  onChange={(e) => setNewBudget({...newBudget, budgetAmount: e.target.value})}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={addNewBudget}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{totalBudget}</div>
            <p className="text-sm text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₹{totalSpent}</div>
            <p className="text-sm text-muted-foreground">{progress.toFixed(1)}% used</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Left</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹{remaining}</div>
            <p className="text-sm text-muted-foreground">Available</p>
          </CardContent>
        </Card>
      </div>

      {/* Budget List */}
      <div className="space-y-4">
        {budgets.map((budget) => {
          const Icon = budget.icon;
          const prog = getProgress(budget.spentAmount, budget.budgetAmount);
          const status = getStatus(budget.spentAmount, budget.budgetAmount);
          const StatusIcon = status.icon;
          const left = budget.budgetAmount - budget.spentAmount;

          return (
            <Card key={budget.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded ${budget.color}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{budget.category}</CardTitle>
                      <CardDescription>Monthly budget</CardDescription>
                    </div>
                  </div>
                  <Badge variant={status.status === "danger" ? "destructive" : "outline"}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {status.status === "danger" ? "Over" : status.status === "warning" ? "Close" : "Good"}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Spent</span>
                    <span>₹{budget.spentAmount} / ₹{budget.budgetAmount}</span>
                  </div>
                  <Progress value={prog} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{prog.toFixed(1)}% used</span>
                    <span>{left >= 0 ? `₹${left} left` : `₹${Math.abs(left)} over`}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Add Expense</Button>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export { BudgetOverview };