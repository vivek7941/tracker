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
    { name: "Food", icon: ShoppingCart, color: "category-food" },
    { name: "Transport", icon: Car, color: "category-transport" },
    { name: "Utilities", icon: Home, color: "category-utilities" },
    { name: "Entertainment", icon: Gamepad2, color: "category-entertainment" },
    { name: "Healthcare", icon: Heart, color: "category-healthcare" },
    { name: "Education", icon: BookOpen, color: "category-education" },
    { name: "Travel", icon: Plane, color: "category-travel" },
    { name: "Other", icon: Coffee, color: "category-shopping" },
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
    return category?.color || "category-shopping";
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-8 animate-scale-in bg-muted/20 min-h-screen p-8">
      {/* Professional Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">Expense Tracker</h2>
          <div className="flex items-center gap-4">
            <p className="text-muted-foreground text-lg">
              Total this month: <span className="font-semibold text-expense">₹{totalExpenses.toLocaleString()}</span>
            </p>
            <div className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
              {expenses.length} transactions
            </div>
          </div>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-3d bg-primary text-white hover:bg-primary/90 shadow-md">
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent className="card-elevated border-0 max-w-md">
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-2xl font-semibold">Add New Expense</DialogTitle>
              <DialogDescription className="text-base text-muted-foreground">
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
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="border-border/60">
                Cancel
              </Button>
              <Button onClick={handleAddExpense} className="bg-primary text-white hover:bg-primary/90">
                Add Expense
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Professional Filters Card */}
      <Card className="card-elevated border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search expenses..." className="pl-10 border-border/60 focus:border-primary" />
            </div>
            
            <Select>
              <SelectTrigger className="w-52 border-border/60">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.name} value={category.name.toLowerCase()}>
                    <div className="flex items-center gap-2">
                      <category.icon className="h-4 w-4" />
                      {category.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger className="w-48 border-border/60">
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

      {/* Professional Expense List */}
      <Card className="card-elevated border-0">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold">Recent Expenses</CardTitle>
          <CardDescription className="text-muted-foreground">Your latest transactions and spending</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {expenses.map((expense, index) => {
              const IconComponent = expense.icon;
              return (
                <div 
                  key={expense.id} 
                  className="flex items-center justify-between p-5 rounded-xl border border-border/40 hover:border-border/60 bg-card/50 hover:bg-card transition-all duration-200 animate-slide-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center gap-4">
                    <div className={`category-icon ${getCategoryColor(expense.category)}`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-base">{expense.description}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <Badge variant="outline" className="text-xs border-border/40 font-medium">
                          {expense.category}
                        </Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(expense.date).toLocaleDateString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xl font-bold text-expense">
                      -₹{expense.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Professional Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="card-elevated border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Today's Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-expense">₹67.25</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>3 transactions</span>
                <span>•</span>
                <span className="text-success">↓ 15% vs yesterday</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Weekly Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-primary">₹215.80</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-success">↓ 12% from last week</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-elevated border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-medium">Top Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-foreground">Food</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>42% of total spending</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { ExpenseTracker };