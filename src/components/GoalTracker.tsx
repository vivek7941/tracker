import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Target, Calendar, TrendingUp, DollarSign, Plane, Home, Car, GraduationCap, Heart, Laptop } from "lucide-react";

const GoalTracker = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "Emergency Fund",
      description: "6 months of expenses saved",
      targetAmount: 15000,
      currentAmount: 8500,
      deadline: "2024-12-31",
      category: "Emergency",
      icon: Heart,
      color: "bg-red-500",
      monthlyContribution: 500
    },
    {
      id: 2,
      name: "Japan Vacation",
      description: "2-week trip to Tokyo and Kyoto",
      targetAmount: 5000,
      currentAmount: 2800,
      deadline: "2024-08-15",
      category: "Travel",
      icon: Plane,
      color: "bg-blue-500",
      monthlyContribution: 400
    },
    {
      id: 3,
      name: "New MacBook Pro",
      description: "Latest M3 MacBook for work",
      targetAmount: 2500,
      currentAmount: 1200,
      deadline: "2024-05-30",
      category: "Tech",
      icon: Laptop,
      color: "bg-purple-500",
      monthlyContribution: 300
    },
    {
      id: 4,
      name: "House Down Payment",
      description: "20% down payment for first home",
      targetAmount: 50000,
      currentAmount: 12000,
      deadline: "2025-12-31",
      category: "Housing",
      icon: Home,
      color: "bg-green-500",
      monthlyContribution: 1500
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    description: "",
    targetAmount: "",
    currentAmount: "0",
    deadline: "",
    category: "",
    monthlyContribution: ""
  });

  const goalCategories = [
    { name: "Emergency", icon: Heart, color: "bg-red-500" },
    { name: "Travel", icon: Plane, color: "bg-blue-500" },
    { name: "Tech", icon: Laptop, color: "bg-purple-500" },
    { name: "Housing", icon: Home, color: "bg-green-500" },
    { name: "Education", icon: GraduationCap, color: "bg-indigo-500" },
    { name: "Vehicle", icon: Car, color: "bg-orange-500" },
    { name: "Other", icon: Target, color: "bg-gray-500" },
  ];

  const handleAddGoal = () => {
    if (newGoal.name && newGoal.targetAmount && newGoal.deadline && newGoal.category) {
      const categoryData = goalCategories.find(cat => cat.name === newGoal.category);
      const goal = {
        id: Date.now(),
        name: newGoal.name,
        description: newGoal.description,
        targetAmount: parseFloat(newGoal.targetAmount),
        currentAmount: parseFloat(newGoal.currentAmount) || 0,
        deadline: newGoal.deadline,
        category: newGoal.category,
        icon: categoryData?.icon || Target,
        color: categoryData?.color || "bg-gray-500",
        monthlyContribution: parseFloat(newGoal.monthlyContribution) || 0
      };
      setGoals([...goals, goal]);
      setNewGoal({
        name: "",
        description: "",
        targetAmount: "",
        currentAmount: "0",
        deadline: "",
        category: "",
        monthlyContribution: ""
      });
      setIsAddDialogOpen(false);
    }
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const calculateMonthsRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    return Math.max(diffMonths, 0);
  };

  const calculateRequiredMonthly = (current: number, target: number, deadline: string) => {
    const monthsRemaining = calculateMonthsRemaining(deadline);
    if (monthsRemaining <= 0) return 0;
    return (target - current) / monthsRemaining;
  };

  const totalGoalsValue = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const overallProgress = (totalSaved / totalGoalsValue) * 100;

  return (
    <div className="space-y-6 animate-scale-in">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Savings Goals</h2>
          <p className="text-muted-foreground">
            Overall Progress: <span className="font-semibold text-primary">{overallProgress.toFixed(1)}%</span>
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-3d bg-gradient-primary text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="card-3d max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Savings Goal</DialogTitle>
              <DialogDescription>
                Set a new financial goal to work towards.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="goal-name">Goal Name</Label>
                <Input
                  id="goal-name"
                  placeholder="e.g., Emergency Fund"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="goal-description">Description</Label>
                <Textarea
                  id="goal-description"
                  placeholder="Brief description of your goal"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({...newGoal, description: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="target-amount">Target Amount ($)</Label>
                  <Input
                    id="target-amount"
                    type="number"
                    placeholder="5000"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal({...newGoal, targetAmount: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="current-amount">Current Amount ($)</Label>
                  <Input
                    id="current-amount"
                    type="number"
                    placeholder="0"
                    value={newGoal.currentAmount}
                    onChange={(e) => setNewGoal({...newGoal, currentAmount: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deadline">Target Date</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="monthly">Monthly Contribution ($)</Label>
                  <Input
                    id="monthly"
                    type="number"
                    placeholder="300"
                    value={newGoal.monthlyContribution}
                    onChange={(e) => setNewGoal({...newGoal, monthlyContribution: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={newGoal.category} onValueChange={(value) => setNewGoal({...newGoal, category: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {goalCategories.map((category) => (
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
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddGoal} className="bg-gradient-primary text-white">
                Create Goal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Progress Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Active Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">{goals.length}</div>
            <p className="text-sm text-muted-foreground">Goals in progress</p>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-success" />
              Total Saved
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-success">
              ${totalSaved.toLocaleString()}
            </div>
            <p className="text-sm text-muted-foreground">
              ${totalGoalsValue.toLocaleString()} target
            </p>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {overallProgress.toFixed(1)}%
            </div>
            <Progress value={overallProgress} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Goals List */}
      <div className="grid gap-6">
        {goals.map((goal, index) => {
          const IconComponent = goal.icon;
          const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
          const monthsRemaining = calculateMonthsRemaining(goal.deadline);
          const requiredMonthly = calculateRequiredMonthly(goal.currentAmount, goal.targetAmount, goal.deadline);
          const isOnTrack = goal.monthlyContribution >= requiredMonthly;

          return (
            <Card 
              key={goal.id} 
              className="card-3d animate-slide-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${goal.color}`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{goal.name}</CardTitle>
                      <CardDescription>{goal.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={isOnTrack ? "default" : "destructive"}>
                    {isOnTrack ? "On Track" : "Behind"}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Progress</span>
                    <span className="text-muted-foreground">
                      ${goal.currentAmount.toLocaleString()} / ${goal.targetAmount.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{progress.toFixed(1)}% complete</span>
                    <span>${(goal.targetAmount - goal.currentAmount).toLocaleString()} remaining</span>
                  </div>
                </div>

                {/* Goal Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Months Left</p>
                    <p className="text-lg font-semibold text-foreground">
                      {monthsRemaining}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Required/Month</p>
                    <p className="text-lg font-semibold text-warning">
                      ${requiredMonthly.toFixed(0)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Current/Month</p>
                    <p className={`text-lg font-semibold ${isOnTrack ? 'text-success' : 'text-destructive'}`}>
                      ${goal.monthlyContribution}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="btn-3d">
                    Add Money
                  </Button>
                  <Button variant="outline" className="btn-3d">
                    Edit Goal
                  </Button>
                  <Button variant="outline" size="sm" className="btn-3d ml-auto">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(goal.deadline).toLocaleDateString()}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {goals.length === 0 && (
        <Card className="card-3d">
          <CardContent className="text-center py-12">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Goals Yet</h3>
            <p className="text-muted-foreground mb-4">
              Start your savings journey by creating your first goal
            </p>
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="btn-3d bg-gradient-primary text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Goal
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export { GoalTracker };