
const Footer = () => {
  return (
    <footer className="bg-card border-t py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Track<span className="text-primary">Edge</span></h2>
            <p className="text-muted-foreground">Your simple, no-bloat trading journal</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-muted-foreground hover:text-primary transition">Features</a></li>
              <li><a href="#pricing" className="text-muted-foreground hover:text-primary transition">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition">About Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition">Careers</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t pt-8 text-center">
          <p className="text-muted-foreground text-sm">&copy; 2025 TrackEdge. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
