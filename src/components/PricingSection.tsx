import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check, X, Star, Crown, Medal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const VITE_PRO_BUY_URL = import.meta.env.VITE_PRO_BUY_URL;
const VITE_ELITE_BUY_URL = import.meta.env.VITE_ELITE_BUY_URL;

interface PlanFeature {
  name: string;
  included: boolean;
}

interface PricingPlanProps {
  name: string;
  price: string;
  period: string;
  features: PlanFeature[];
  popular?: boolean;
  ctaText: string;
  delay: string;
  icon: JSX.Element;
}

const PricingPlan = ({
  name,
  price,
  period,
  features,
  popular = false,
  ctaText,
  delay,
  icon,
}: PricingPlanProps) => {
  const navigate = useNavigate();
  const isExpired = (limitInMs: number): boolean => {
    const stored = localStorage.getItem("expireTime");

    if (!stored) return true; // No timestamp saved

    const savedExpireTime: number = parseInt(stored, 10);
    const currentTime: number = Date.now();

    return currentTime - savedExpireTime > limitInMs;
  };

  const handlePro = () => {
    // Effect to simulate API loading and calculate metrics
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to get Pro subscription.");
      navigate("/auth?plan=Pro", { replace: true });
      return;
    }
    if (isExpired(0)) {
      toast.error("Please log in to get Pro subscription.");
      localStorage.removeItem("token");
      navigate("/auth?plan=Pro", { replace: true });
      return;
    }
    window.location.href = VITE_PRO_BUY_URL;
  };

  const handleElite = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to get Elite subscription.");
      navigate("/auth?plan=Elite", { replace: true });
      return;
    }
    if (isExpired(0)) {
      toast.error("Please log in to get Elite subscription.");
      localStorage.removeItem("token");
      navigate("/auth?plan=Elite", { replace: true });
      return;
    }
    window.location.href = VITE_ELITE_BUY_URL;
  };

  return (
    <div
      className={`relative bg-card border rounded-xl shadow-sm transition-all duration-300 opacity-0 ${delay}  hover:shadow-2xl hover:scale-[1.05] cursor-pointer
        ${popular ? "md:scale-105 border-primary md:shadow-md" : ""} ${
        name === "Elite" ? "md:scale-105 border-amber-500 md:shadow-md" : ""
      }`}
    >
      {popular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-sm font-semibold py-1 px-4 rounded-full">
          Most Popular
        </div>
      )}
      {name === "Elite" && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-amber-500 text-white text-sm font-semibold py-1 px-4 rounded-full">
          Best Value
        </div>
      )}

      <div className="p-6 text-center border-b">
        {/* <div className="absolute top-0 right-0 text-5">Free for now</div> */}
        <div className="mx-auto bg-primary/10 rounded-full p-3 mb-4 w-16 h-16 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-2xl font-bold">{name}</h3>
        <div className="flex items-baseline justify-center mt-2">
          {price !== "Free" && <span className="text-3xl font-bold">$</span>}
          <span className="text-4xl font-bold tracking-tight">{price}</span>
          {period && (
            <span className="text-sm text-muted-foreground ml-1">{period}</span>
          )}
        </div>
      </div>

      <div className="p-6">
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              {feature.included ? (
                <Check
                  className={`h-5 w-5 text-gray shrink-0 mr-2 ${
                    name === "Elite" ? "text-amber-500" : ""
                  } ${name === "Pro" ? "text-primary" : ""}`}
                />
              ) : (
                <X className="h-5 w-5 text-muted-foreground shrink-0 mr-2" />
              )}
              <span
                className={
                  feature.included ? "" : "text-muted-foreground line-through"
                }
              >
                {feature.name}
              </span>
            </li>
          ))}
        </ul>

        {name === "Pro" ? (
          <Button
            className={`w-full ${
              popular
                ? "bg-primary hover:bg-tradeedge-blue-dark"
                : "bg-gray-400 hover:bg-gray-600"
            }`}
            onClick={handlePro}
          >
            {ctaText}
          </Button>
        ) : name === "Elite" ? (
          <Button
            className={`w-full ${
              popular
                ? "bg-primary hover:bg-tradeedge-blue-dark"
                : "bg-amber-400 hover:bg-amber-600"
            }`}
            onClick={handleElite}
          >
            {ctaText}
          </Button>
        ) : (
          <Button
            className={`w-full ${
              popular
                ? "bg-primary hover:bg-tradeedge-blue-dark"
                : "bg-gray-400 hover:bg-gray-600"
            }`}
            onClick={() => navigate("/dashboard")}
          >
            {ctaText}
          </Button>
        )}
      </div>
    </div>
  );
};

const PricingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".opacity-0");
            elements.forEach((el) => {
              el.classList.add("animate-slide-up");
            });
          }
        });
      },
      { threshold: 0.1 }
    );

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
    <section id="pricing" className="py-16 md:py-24" ref={sectionRef}>
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Simple Trading Journal, Simple Pricing
          </h2>
          <p className="text-muted-foreground">
            Start free, upgrade when you're ready
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <PricingPlan
            name="Basic"
            price="Free"
            period=""
            delay="animate-delay-300"
            icon={<Star className="w-8 h-8 text-gray" />}
            features={[
              { name: "Up to 10 entries/month", included: true },
              { name: "100MB data storage", included: true },
              { name: "30-day data retention", included: true },
              { name: "Basic analytics", included: true },
              { name: "Mobile access", included: true },
              { name: "Advanced Search Filters", included: false },
              { name: "API Access", included: false },
              { name: "Priority support", included: false },
            ]}
            ctaText="Register"
          />

          <PricingPlan
            name="Pro"
            price="19.99"
            period="/month"
            popular={true}
            delay="animate-delay-600"
            icon={<Crown className="w-8 h-8 text-primary" />}
            features={[
              { name: "Up to 100 entries/month", included: true },
              { name: "1GB data storage", included: true },
              { name: "Lifetime data retention", included: true },
              { name: "Advanced analytics", included: true },
              { name: "Mobile access", included: true },
              { name: "Advanced Search Filters", included: true },
              { name: "API Access", included: false },
              { name: "Priority support", included: false },
            ]}
            ctaText="Join Free Beta"
          />

          <PricingPlan
            name="Elite"
            price="49.99"
            period="/month"
            delay="animate-delay-900"
            icon={<Medal className="w-8 h-8 text-amber-500" />}
            features={[
              { name: "Unlimited entries", included: true },
              { name: "5GB data storage", included: true },
              { name: "Lifetime data retention", included: true },
              { name: "Advanced analytics", included: true },
              { name: "Mobile access", included: true },
              { name: "Advanced Search Filters", included: true },
              { name: "API Access", included: true },
              { name: "Priority support", included: true },
            ]}
            ctaText="Join Free Beta"
          />
        </div>

        <div
          className="text-center opacity-0 animate-delay-900"
          ref={(el) => el?.classList.add("animate-fade-in")}
        >
          <div className="inline-block bg-secondary/50 border border-primary/20 text-center rounded-lg px-6 py-3">
            {/* <p className="font-semibold">
              <span className="text-primary">
                Unlock Full Access - 30 Days Free :{" "}
              </span>
              Track, analyze, and optimize every trade with our premium features
            </p> */}
            <p className="font-semibold">
              <span className="text-primary">
                Join Our Beta - Completely Free:{" "}
              </span>
              Get full access to all premium features, shape the product with your feedback, and help build the trading journal that works for you.
            </p>            
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
