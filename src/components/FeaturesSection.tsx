
import { useEffect, useRef } from "react";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay: string;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  return (
    <div className={`bg-card border rounded-lg p-6 shadow-sm transition-all duration-300 opacity-0 ${delay} hover:shadow-2xl hover:scale-[1.05] cursor-pointer`}>
      <div className="flex">
        <div className="text-4xl mb-4 pr-5">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const cards = entry.target.querySelectorAll('.opacity-0');
          cards.forEach(card => {
            card.classList.add('animate-slide-up');
          });
        }
      });
    }, { threshold: 0.1 });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="features" className="py-16 md:py-24" ref={sectionRef}>
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Streamlined Features for Serious Traders</h2>
          <p className="text-muted-foreground">Only the essential tools you need, without the bloat or complexity</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            icon="📊" 
            title="Simple Analytics" 
            description="Track only the metrics that matter: win rate, profit factor, and expectancy - without overwhelming complexity."
            delay="animate-delay-300"
          />
          
          <FeatureCard 
            icon="📈" 
            title="At-a-Glance Performance" 
            description="See your trading results instantly with a clean, straightforward dashboard that shows only what you need."
            delay="animate-delay-600"
          />
          
          <FeatureCard 
            icon="📝" 
            title="Quick Trade Entry" 
            description="Log trades in seconds with a clean, minimal interface that captures just what you need without endless form fields."
            delay="animate-delay-900"
          />
          
          <FeatureCard 
            icon="🔍" 
            title="Clear Insights" 
            description="Instantly see what's working and what's not with straightforward visualizations - no data science degree required."
            delay="animate-delay-300"
          />
          
          <FeatureCard 
            icon="📱" 
            title="Works Anywhere" 
            description="Log trades anywhere with our lightweight, fast-loading app that works seamlessly on any device or connection."
            delay="animate-delay-600"
          />
          
          <FeatureCard 
            icon="🔒" 
            title="No Distractions" 
            description="Focus on trading with a clean interface free of unnecessary notifications, popups, or cluttered dashboards."
            delay="animate-delay-900"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
