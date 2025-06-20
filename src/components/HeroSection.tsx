
import { Button } from "@/components/ui/button";
import DashboardPreview from "./DashboardPreview";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Background gradient circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[80px]" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[80px]" />
      </div>
      
      <div className="container relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left column - Text content */}
          <div className="flex flex-col space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight animate-fade-in">
              Simple Trading Journal.
              <span className="bg-gradient-to-r from-primary to-tradeedge-blue-dark bg-clip-text text-transparent relative leading-normal">
                Powerful Results.
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground animate-slide-up animate-delay-300">
              The streamlined, no-bloat trading journal that focuses on what matters: 
              tracking your trades effectively and finding your edge.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-slide-up animate-delay-600">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-tradeedge-blue-dark transition-all duration-300 hover:scale-105"
                onClick={() => navigate("/auth", { replace: true })}
              >
                Start Free
              </Button>
              <Button size="lg" variant="outline" asChild className="transition-all duration-300 hover:scale-105">
                <a href="#features">Explore Features</a>
              </Button>
            </div>
          </div>
          
          {/* Right column - Dashboard Preview */}
          <div className="relative group animate-scale-in animate-delay-900">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 blur-xl rounded-xl opacity-70 group-hover:opacity-100 transition duration-500 rotate-[-3deg]"></div>
            <DashboardPreview className="relative transition-all duration-300 group-hover:-translate-y-1" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
