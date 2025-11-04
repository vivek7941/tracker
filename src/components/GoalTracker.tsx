import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Target, Laptop, Plane, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { formatIndianNumber } from "@/lib/utils";

const GoalTracker = () => {
  const [goals, setGoals] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: "",
    target_amount: "",
    current_amount: "0",
    deadline: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load goals",
        variant: "destructive",
      });
    } else {
      setGoals(data || []);
    }
  };

  const handleAddGoal = async () => {
    if (newGoal.name && newGoal.target_amount && newGoal.deadline) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('goals')
        .insert([{
          user_id: user.id,
          name: newGoal.name,
          target_amount: parseFloat(newGoal.target_amount),
          current_amount: parseFloat(newGoal.current_amount) || 0,
          deadline: newGoal.deadline,
        }]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add goal",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Goal created",
        });
        fetchGoals();
        setNewGoal({
          name: "",
          target_amount: "",
          current_amount: "0",
          deadline: "",
        });
        setIsAddDialogOpen(false);
      }
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', goalId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete goal",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Goal deleted",
      });
      fetchGoals();
    }
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Savings Goals</h2>
          <p className="text-muted-foreground">Track your goals</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Goal</DialogTitle>
              <DialogDescription>Set a new savings goal</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Goal Name</Label>
                <Input
                  placeholder="e.g., New Laptop"
                  value={newGoal.name}
                  onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Target (₹)</Label>
                  <Input
                    type="number"
                    placeholder="1000"
                    value={newGoal.target_amount}
                    onChange={(e) => setNewGoal({...newGoal, target_amount: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Current (₹)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={newGoal.current_amount}
                    onChange={(e) => setNewGoal({...newGoal, current_amount: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Deadline</Label>
                <Input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddGoal}>
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => {
          const progress = calculateProgress(parseFloat(goal.current_amount), parseFloat(goal.target_amount));
          const remaining = parseFloat(goal.target_amount) - parseFloat(goal.current_amount);

          return (
            <Card key={goal.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Target className="h-6 w-6" />
                    <div>
                      <CardTitle>{goal.name}</CardTitle>
                      <CardDescription>
                        Target: {new Date(goal.deadline).toLocaleDateString()}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={progress >= 100 ? "default" : "outline"}>
                      {progress >= 100 ? "Complete" : "In Progress"}
                    </Badge>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteGoal(goal.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>
                      ₹{formatIndianNumber(parseFloat(goal.current_amount))} / ₹{formatIndianNumber(parseFloat(goal.target_amount))}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{progress.toFixed(1)}% complete</span>
                    <span>₹{formatIndianNumber(remaining)} remaining</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        
        {goals.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Goals Yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first savings goal
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export { GoalTracker };
