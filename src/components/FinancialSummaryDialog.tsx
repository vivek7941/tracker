import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface FinancialSummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: () => void;
}

export const FinancialSummaryDialog = ({ open, onOpenChange, onUpdate }: FinancialSummaryDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState("");
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [savings, setSavings] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      loadFinancialData();
    }
  }, [open]);

  const loadFinancialData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("balance, income, expenses, savings")
        .eq("id", user.id)
        .single() as any;

      if (profile) {
        setBalance(profile.balance?.toString() || "0");
        setIncome(profile.income?.toString() || "0");
        setExpenses(profile.expenses?.toString() || "0");
        setSavings(profile.savings?.toString() || "0");
      }
    } catch (error) {
      console.error("Error loading financial data:", error);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from("profiles")
        .update({
          balance: parseFloat(balance) || 0,
          income: parseFloat(income) || 0,
          expenses: parseFloat(expenses) || 0,
          savings: parseFloat(savings) || 0,
        } as any)
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Financial summary updated successfully",
      });
      
      onUpdate();
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update financial summary",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Financial Summary</DialogTitle>
          <DialogDescription>
            Update your balance, income, expenses, and savings
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="balance">Balance</Label>
            <Input
              id="balance"
              type="number"
              step="0.01"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="income">Income</Label>
            <Input
              id="income"
              type="number"
              step="0.01"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expenses">Expenses</Label>
            <Input
              id="expenses"
              type="number"
              step="0.01"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              placeholder="0.00"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="savings">Savings</Label>
            <Input
              id="savings"
              type="number"
              step="0.01"
              value={savings}
              onChange={(e) => setSavings(e.target.value)}
              placeholder="0.00"
            />
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
