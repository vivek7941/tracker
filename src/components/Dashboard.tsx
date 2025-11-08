import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "next-themes";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
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
  Sparkles,
  Menu,
  X,
  Moon,
  Sun
} from "lucide-react";
import { ExpenseTracker } from "./ExpenseTracker";
import { GoalTracker } from "./GoalTracker";
import { BudgetOverview } from "./BudgetOverview";
import { FinancialCharts } from "./FinancialCharts";
import { ProfileEditDialog } from "./ProfileEditDialog";
import logo from "@/assets/logo.png";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'expenses' | 'goals' | 'budgets' | 'analytics'>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileEditOpen, setProfileEditOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<{ full_name: string; currency: string } | null>(null);
  const [currency, setCurrency] = useState("INR");
  const [notificationPrefs, setNotificationPrefs] = useState({
    budget_alerts: true,
    goal_updates: true,
    savings_tips: true,
  });
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, currency, notification_budget_alerts, notification_goal_updates, notification_savings_tips")
          .eq("id", user.id)
          .single();
        
        if (profile) {
          setUserProfile({
            full_name: profile.full_name || "User",
            currency: profile.currency || "INR",
          });
          setCurrency(profile.currency || "INR");
          setNotificationPrefs({
            budget_alerts: profile.notification_budget_alerts ?? true,
            goal_updates: profile.notification_goal_updates ?? true,
            savings_tips: profile.notification_savings_tips ?? true,
          });
        }
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const updateCurrency = async (newCurrency: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from("profiles")
        .update({ currency: newCurrency })
        .eq("id", user.id);

      if (error) throw error;

      setCurrency(newCurrency);
      toast({
        title: "Success",
        description: "Currency updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update currency",
        variant: "destructive",
      });
    }
  };

  const updateNotificationPrefs = async (prefs: typeof notificationPrefs) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from("profiles")
        .update({
          notification_budget_alerts: prefs.budget_alerts,
          notification_goal_updates: prefs.goal_updates,
          notification_savings_tips: prefs.savings_tips,
        })
        .eq("id", user.id);

      if (error) throw error;

      setNotificationPrefs(prefs);
      toast({
        title: "Success",
        description: "Notification preferences updated",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update preferences",
        variant: "destructive",
      });
    }
  };

  const getCurrencySymbol = (curr: string) => {
    const symbols: Record<string, string> = {
      INR: "₹",
      USD: "$",
      EUR: "€",
      GBP: "£",
      JPY: "¥",
    };
    return symbols[curr] || curr;
  };

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

  const NavButton = ({ tab, icon: Icon, label, onClick }: { tab: string, icon: any, label: string, onClick?: () => void }) => (
    <Button
      variant="ghost"
      className={`justify-start gap-3 w-full transition-all duration-300 font-medium ${
        activeTab === tab 
          ? 'bg-gradient-to-r from-primary/15 to-secondary/15 text-primary shadow-sm border-l-2 border-primary' 
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:translate-x-1 border-l-2 border-transparent'
      }`}
      onClick={() => {
        setActiveTab(tab as any);
        onClick?.();
      }}
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

  const SidebarContent = ({ onNavClick }: { onNavClick?: () => void }) => (
    <>
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
          <NavButton tab="overview" icon={Home} label="Dashboard" onClick={onNavClick} />
          <NavButton tab="expenses" icon={CreditCard} label="Transactions" onClick={onNavClick} />
          <NavButton tab="budgets" icon={Target} label="Budget Plan" onClick={onNavClick} />
          <NavButton tab="goals" icon={PiggyBank} label="Savings Goals" onClick={onNavClick} />
          <NavButton tab="analytics" icon={TrendingUp} label="Analytics" onClick={onNavClick} />
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
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      {/* Top Header Bar */}
      <header className="bg-card/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50 shadow-sm">
        <div className="px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <div className="p-6 space-y-6 h-full flex flex-col">
                  <SidebarContent onNavClick={() => setMobileMenuOpen(false)} />
                </div>
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-xl blur-lg opacity-70 group-hover:opacity-90 transition-opacity"></div>
                <div className="relative p-1.5 sm:p-2 bg-gradient-to-br from-primary to-secondary rounded-xl">
                  <img src={logo} alt="Logo" className="h-6 w-6 sm:h-8 sm:w-8" />
                </div>
              </div>
              <div>
                <h1 className="font-display font-bold text-lg sm:text-xl gradient-text">SmartBudget</h1>
                <p className="text-xs text-muted-foreground font-medium hidden sm:block">Financial Intelligence</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Notifications */}
            <Sheet open={notificationsOpen} onOpenChange={setNotificationsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 transition-colors h-8 w-8 sm:h-10 sm:w-10">
                  <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full animate-pulse"></span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-96">
                <div className="space-y-4">
                  <div>
                    <h2 className="text-lg font-semibold">Notifications</h2>
                    <p className="text-sm text-muted-foreground">Stay updated with your financial activities</p>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <TrendingUp className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">Budget Alert</p>
                          <p className="text-xs text-muted-foreground mt-1">You've reached 80% of your Food budget</p>
                          <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-secondary/10 rounded-lg">
                          <Target className="h-4 w-4 text-secondary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">Goal Progress</p>
                          <p className="text-xs text-muted-foreground mt-1">You're 40% closer to your Laptop goal!</p>
                          <p className="text-xs text-muted-foreground mt-2">Yesterday</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg bg-muted/30">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-accent/10 rounded-lg">
                          <Sparkles className="h-4 w-4 text-accent" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">Savings Tip</p>
                          <p className="text-xs text-muted-foreground mt-1">You could save ₹50 by reducing coffee expenses</p>
                          <p className="text-xs text-muted-foreground mt-2">3 days ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Settings */}
            <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-colors h-8 w-8 sm:h-10 sm:w-10 hidden sm:flex">
                  <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-96">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold">Settings</h2>
                    <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
                  </div>

                  {/* Profile Settings */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Profile</h3>
                    <div className="space-y-2">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start gap-3"
                        onClick={() => {
                          setProfileEditOpen(true);
                          setSettingsOpen(false);
                        }}
                      >
                        <User className="h-4 w-4" />
                        <span>Edit Profile</span>
                      </Button>
                      
                      {/* Notification Preferences */}
                      <div className="space-y-3 p-3 rounded-lg bg-muted/30">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4" />
                          <span className="text-sm font-medium">Notification Preferences</span>
                        </div>
                        <div className="space-y-2 ml-6">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="budget-alerts" className="text-sm font-normal">Budget Alerts</Label>
                            <Switch
                              id="budget-alerts"
                              checked={notificationPrefs.budget_alerts}
                              onCheckedChange={(checked) => 
                                updateNotificationPrefs({ ...notificationPrefs, budget_alerts: checked })
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="goal-updates" className="text-sm font-normal">Goal Updates</Label>
                            <Switch
                              id="goal-updates"
                              checked={notificationPrefs.goal_updates}
                              onCheckedChange={(checked) => 
                                updateNotificationPrefs({ ...notificationPrefs, goal_updates: checked })
                              }
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <Label htmlFor="savings-tips" className="text-sm font-normal">Savings Tips</Label>
                            <Switch
                              id="savings-tips"
                              checked={notificationPrefs.savings_tips}
                              onCheckedChange={(checked) => 
                                updateNotificationPrefs({ ...notificationPrefs, savings_tips: checked })
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* App Preferences */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Preferences</h3>
                    <div className="space-y-2">
                      {/* Currency Selector */}
                      <div className="p-3 rounded-lg bg-muted/30 space-y-2">
                        <div className="flex items-center gap-3">
                          <DollarSign className="h-4 w-4" />
                          <span className="text-sm font-medium">Currency</span>
                        </div>
                        <Select value={currency} onValueChange={updateCurrency}>
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="INR">INR (₹)</SelectItem>
                            <SelectItem value="USD">USD ($)</SelectItem>
                            <SelectItem value="EUR">EUR (€)</SelectItem>
                            <SelectItem value="GBP">GBP (£)</SelectItem>
                            <SelectItem value="JPY">JPY (¥)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {/* Theme Switcher */}
                      <div className="p-3 rounded-lg bg-muted/30 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Sparkles className="h-4 w-4" />
                            <span className="text-sm font-medium">Theme</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant={theme === "light" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTheme("light")}
                            className="flex-1 gap-2"
                          >
                            <Sun className="h-4 w-4" />
                            Light
                          </Button>
                          <Button
                            variant={theme === "dark" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTheme("dark")}
                            className="flex-1 gap-2"
                          >
                            <Moon className="h-4 w-4" />
                            Dark
                          </Button>
                          <Button
                            variant={theme === "system" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTheme("system")}
                            className="flex-1"
                          >
                            Auto
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Security</h3>
                    <div className="space-y-2">
                      <Button variant="ghost" className="w-full justify-start gap-3">
                        <Settings className="h-4 w-4" />
                        <span>Change Password</span>
                      </Button>
                    </div>
                  </div>

                  {/* About */}
                  <div className="space-y-3 pt-4 border-t">
                    <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
                      <span className="text-sm">Version 1.0.0</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        setSettingsOpen(false);
                        onLogout();
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <div className="h-6 sm:h-8 w-px bg-border hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
                {userProfile?.full_name || "User"}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-1 sm:gap-2 hover:bg-destructive/10 hover:text-destructive transition-all h-8 sm:h-9 px-2 sm:px-3"
                onClick={onLogout}
              >
                <User className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="font-medium text-xs sm:text-sm hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-57px)] sm:min-h-[calc(100vh-73px)]">
        {/* Desktop Sidebar - Hidden on mobile */}
        <div className="hidden lg:block w-72 bg-card/50 backdrop-blur-xl border-r border-border/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-secondary/5 pointer-events-none"></div>
          <div className="p-6 space-y-6 relative z-10 h-full flex flex-col">
            <SidebarContent />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
            {/* Page Header */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-2">
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'expenses' && 'Transaction History'}
                {activeTab === 'budgets' && 'Budget Management'}
                {activeTab === 'goals' && 'Financial Goals'}
                {activeTab === 'analytics' && 'Financial Analytics'}
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground font-medium">
                {activeTab === 'overview' && 'Get a complete view of your financial health'}
                {activeTab === 'expenses' && 'Track and manage all your expenses'}
                {activeTab === 'budgets' && 'Plan and monitor your spending limits'}
                {activeTab === 'goals' && 'Set and achieve your savings targets'}
                {activeTab === 'analytics' && 'Deep dive into your financial patterns'}
              </p>
            </div>

          {activeTab === 'overview' && (
            <div className="space-y-6 sm:space-y-8">
              {/* Stats Cards - More Compact & Modern */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
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
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold gradient-text mb-1 group-hover:scale-105 transition-transform duration-300">₹{stats.balance.toFixed(2)}</div>
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
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-income mb-1 group-hover:scale-105 transition-transform duration-300">₹{stats.income.toFixed(2)}</div>
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
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-expense mb-1 group-hover:scale-105 transition-transform duration-300">₹{stats.expenses.toFixed(2)}</div>
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
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-savings mb-1 group-hover:scale-105 transition-transform duration-300">₹{stats.savings.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-savings" />
                      40% of income
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
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

      {/* Profile Edit Dialog */}
      <ProfileEditDialog open={profileEditOpen} onOpenChange={setProfileEditOpen} />
    </div>
  );
};

export default Dashboard;