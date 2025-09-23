import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, TrendingUp, Target, PiggyBank, Shield, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-finance.jpg";

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-screen">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary rounded-lg">
                  <Wallet className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-primary">
                  SmartBudget
                </h1>
              </div>
              
              <h2 className="text-4xl font-bold text-foreground">
                Manage Your Finances Better
              </h2>
              
              <p className="text-lg text-muted-foreground">
                Simple budget tracking app to help you manage expenses, set budgets, and save money.
              </p>
            </div>

            {/* Simple Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  <h3 className="font-semibold">Expense Tracking</h3>
                </div>
                <p className="text-sm text-muted-foreground">Track daily expenses</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Budget Planning</h3>
                </div>
                <p className="text-sm text-muted-foreground">Set monthly budgets</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <PiggyBank className="h-5 w-5 text-accent" />
                  <h3 className="font-semibold">Savings Goals</h3>
                </div>
                <p className="text-sm text-muted-foreground">Achieve financial goals</p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-secondary" />
                  <h3 className="font-semibold">Secure</h3>
                </div>
                <p className="text-sm text-muted-foreground">Safe and private</p>
              </div>
            </div>

            {/* Simple Image */}
            <div className="mt-6">
              <img 
                src={heroImage} 
                alt="Budget Dashboard" 
                className="rounded-lg shadow-sm w-full max-w-md"
              />
            </div>
          </div>

          {/* Login Form */}
          <div>
            <Card className="simple-card p-6 max-w-md mx-auto">
              <CardHeader className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
                <CardDescription>
                  Sign in to your account
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="login" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="register">Sign Up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login" className="space-y-3">
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
                        disabled={isLoading}
                      >
                        {isLoading ? "Signing In..." : "Sign In"}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="register" className="space-y-3">
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter your name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="email-register">Email</Label>
                        <Input
                          id="email-register"
                          type="email"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="password-register">Password</Label>
                        <Input
                          id="password-register"
                          type="password"
                          placeholder="Create a password"
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold"
                        disabled={isLoading}
                      >
                        {isLoading ? "Creating Account..." : "Create Account"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;