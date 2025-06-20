
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CtaSection = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="rounded-2xl bg-gradient-to-br from-primary to-tradeedge-blue-dark p-8 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready for a Trading Journal That Just Works?</h2>
          <p className="text-white/90 max-w-2xl mx-auto mb-8">
            Start simplifying your trading journal experience today.
          </p>
          <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
            <Link to="/auth">Start Free</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
