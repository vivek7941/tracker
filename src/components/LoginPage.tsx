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
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
      <div className="absolute top-20 left-20 animate-float">
        <div className="w-32 h-32 bg-gradient-primary rounded-full opacity-20"></div>
      </div>
      <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
        <div className="w-24 h-24 bg-gradient-secondary rounded-full opacity-20"></div>
      </div>
      <div className="absolute bottom-32 left-40 animate-float" style={{ animationDelay: '4s' }}>
        <div className="w-28 h-28 bg-gradient-accent rounded-full opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Hero Section */}
          <div className="space-y-8 animate-slide-in-up">
            <div className="space-y-6">
              <div className="flex items-center gap-3 animate-scale-in">
                <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
                  <Wallet className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                  SmartBudget
                </h1>
              </div>
              
              <h2 className="text-5xl font-bold text-foreground leading-tight">
                Master Your
                <span className="bg-gradient-primary bg-clip-text text-transparent"> Finances </span>
                with Intelligence
              </h2>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Track expenses, set smart budgets, and achieve your savings goals with AI-powered insights and beautiful 3D visualizations.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-4 animate-slide-in-right">
              <div className="card-3d p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-secondary rounded-lg">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Smart Tracking</h3>
                    <p className="text-sm text-muted-foreground">AI-powered categorization</p>
                  </div>
                </div>
              </div>
              
              <div className="card-3d p-4 rounded-xl" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-accent rounded-lg">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Goal Setting</h3>
                    <p className="text-sm text-muted-foreground">Achieve dreams faster</p>
                  </div>
                </div>
              </div>
              
              <div className="card-3d p-4 rounded-xl" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-primary rounded-lg">
                    <PiggyBank className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Auto Savings</h3>
                    <p className="text-sm text-muted-foreground">Effortless wealth building</p>
                  </div>
                </div>
              </div>
              
              <div className="card-3d p-4 rounded-xl" style={{ animationDelay: '0.6s' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-secondary rounded-lg">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Secure</h3>
                    <p className="text-sm text-muted-foreground">Bank-level security</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-float">
              <img 
                src={heroImage} 
                alt="Smart Budget Dashboard" 
                className="rounded-2xl shadow-3d w-full max-w-md mx-auto lg:mx-0"
              />
              <div className="absolute -top-4 -right-4 animate-pulse-glow">
                <div className="bg-gradient-accent p-3 rounded-full shadow-glow">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="animate-slide-in-right" style={{ animationDelay: '0.5s' }}>
            <Card className="card-3d p-8 max-w-md mx-auto">
              <CardHeader className="text-center space-y-4">
                <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
                <CardDescription className="text-lg">
                  Sign in to continue your financial journey
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="login" className="space-y-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login" className="btn-3d">Sign In</TabsTrigger>
                    <TabsTrigger value="register" className="btn-3d">Sign Up</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login" className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="btn-3d"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Enter your password"
                          className="btn-3d"
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full btn-3d bg-gradient-primary hover:opacity-90 text-white font-semibold py-6 text-lg"
                        disabled={isLoading}
                      >
                        {isLoading ? "Signing In..." : "Sign In"}
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="register" className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="Enter your name"
                          className="btn-3d"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email-register">Email</Label>
                        <Input
                          id="email-register"
                          type="email"
                          placeholder="Enter your email"
                          className="btn-3d"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="password-register">Password</Label>
                        <Input
                          id="password-register"
                          type="password"
                          placeholder="Create a password"
                          className="btn-3d"
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full btn-3d bg-gradient-secondary hover:opacity-90 text-white font-semibold py-6 text-lg"
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