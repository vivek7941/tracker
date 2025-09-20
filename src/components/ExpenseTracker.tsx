import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, Filter, Calendar, ShoppingCart, Car, Home, Coffee, Plane, Gamepad2, Heart, BookOpen } from "lucide-react";

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, description: "Grocery Shopping", amount: 125.50, category: "Food", date: "2024-01-15", icon: ShoppingCart },
    { id: 2, description: "Gas Fill Up", amount: 45.00, category: "Transport", date: "2024-01-14", icon: Car },
    { id: 3, description: "Electric Bill", amount: 89.30, category: "Utilities", date: "2024-01-13", icon: Home },
    { id: 4, description: "Coffee Meeting", amount: 12.75, category: "Food", date: "2024-01-12", icon: Coffee },
    { id: 5, description: "Movie Tickets", amount: 28.00, category: "Entertainment", date: "2024-01-11", icon: Gamepad2 },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split('T')[0],
    notes: ""
  });

  const categories = [
    { name: "Food", icon: ShoppingCart, color: "bg-orange-500" },
    { name: "Transport", icon: Car, color: "bg-blue-500" },
    { name: "Utilities", icon: Home, color: "bg-green-500" },
    { name: "Entertainment", icon: Gamepad2, color: "bg-purple-500" },
    { name: "Healthcare", icon: Heart, color: "bg-red-500" },
    { name: "Education", icon: BookOpen, color: "bg-indigo-500" },
    { name: "Travel", icon: Plane, color: "bg-cyan-500" },
    { name: "Other", icon: Coffee, color: "bg-gray-500" },
  ];

  const handleAddExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.category) {
      const categoryData = categories.find(cat => cat.name === newExpense.category);
      const expense = {
        id: Date.now(),
        description: newExpense.description,
        amount: parseFloat(newExpense.amount),
        category: newExpense.category,
        date: newExpense.date,
        icon: categoryData?.icon || Coffee
      };
      setExpenses([expense, ...expenses]);
      setNewExpense({
        description: "",
        amount: "",
        category: "",
        date: new Date().toISOString().split('T')[0],
        notes: ""
      });
      setIsAddDialogOpen(false);
    }
  };

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category?.icon || Coffee;
  };

  const getCategoryColor = (categoryName: string) => {
    const category = categories.find(cat => cat.name === categoryName);
    return category?.color || "bg-gray-500";
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-6 animate-scale-in">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Expense Tracker</h2>
          <p className="text-muted-foreground">
            Total this month: <span className="font-semibold text-expense">₹{totalExpenses.toLocaleString()}</span>
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-3d bg-gradient-primary text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="card-3d">
            <DialogHeader>
              <DialogTitle>Add New Expense</DialogTitle>
              <DialogDescription>
                Track your spending by adding expense details below.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="What did you spend on?"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newExpense.date}
                    onChange={(e) => setNewExpense({...newExpense, date: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={newExpense.category} onValueChange={(value) => setNewExpense({...newExpense, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
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
              
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional details..."
                  value={newExpense.notes}
                  onChange={(e) => setNewExpense({...newExpense, notes: e.target.value})}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddExpense} className="bg-gradient-primary text-white">
                Add Expense
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="card-3d">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search expenses..." className="w-64" />
            </div>
            
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.name} value={category.name.toLowerCase()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Expense List */}
      <Card className="card-3d">
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
          <CardDescription>Your latest transactions and spending</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenses.map((expense, index) => {
              const IconComponent = expense.icon;
              return (
                <div 
                  key={expense.id} 
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors animate-slide-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${getCategoryColor(expense.category)}`}>
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{expense.description}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {expense.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(expense.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-semibold text-expense">
                      -₹{expense.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="text-lg">Today's Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-expense">₹67.25</p>
            <p className="text-sm text-muted-foreground">3 transactions</p>
          </CardContent>
        </Card>
        
        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="text-lg">Weekly Average</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-foreground">₹215.80</p>
            <p className="text-sm text-muted-foreground">Down 12% from last week</p>
          </CardContent>
        </Card>
        
        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="text-lg">Top Category</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-primary">Food</p>
            <p className="text-sm text-muted-foreground">42% of total spending</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { ExpenseTracker };