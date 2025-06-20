
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useMobileDetection } from "@/hooks/use-mobile-detection";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import blackLogo from '/darkLogo.svg';
import whiteLogo from '/whiteLogo.svg';
import { useTheme } from "next-themes";

const Header = () => {
  const navigate = useNavigate();
  const { isMobile } = useMobileDetection();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { pathname } = useLocation();
  const { toast: uiToast } = useToast();
  const location = useLocation();
  const { resolvedTheme } = useTheme();
  const isDarkLogo = resolvedTheme === 'dark';

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    // Check the theme
    const storedTheme = localStorage.getItem("theme") === "dark";
    setIsDark(storedTheme);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/auth", { replace: true });
    toast.success("Logged out", {
      description: "You have been successfully logged out.",
      position: "top-center",
    });
  };

  return (
    <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50 animate-fade-in">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="md:flex items-center font-bold text-xl text-foreground group-hover:scale-105 transition-transform">
              {
                !isDarkLogo?
                <img src={blackLogo} alt="blackLogo" className={`${isMobile? 'w-[120px]' : 'w-[200px]'}`} style={{ borderRadius: '2px' }} />
                :
                <img src={whiteLogo} alt="whiteLogo" className={`${isMobile? 'w-[120px]' : 'w-[200px]'}`} style={{ borderRadius: '2px' }} />
              }
            </div>
          </Link>

          <nav className="hidden md:flex gap-6">
            {isLoggedIn && (
              <>
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium ${pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground transition-colors hover:scale-105`}
                >
                  Dashboard
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button 
                      className={`text-sm font-medium ${(pathname === "/all-entries" || pathname === "/add-journal-entry") ? "text-foreground" : "text-muted-foreground"} hover:text-foreground transition-colors hover:scale-105`}
                    >
                      Entries
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="animate-slide-up">
                    <DropdownMenuItem asChild>
                      <Link to="/add-journal-entry" className="w-full h-full block">
                        Add Entry
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/all-entries" className="w-full h-full block">
                        View All Entries
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button 
                      className={`text-sm font-medium ${(pathname === "/setups" || pathname === "/add-setup") ? "text-foreground" : "text-muted-foreground"} hover:text-foreground transition-colors hover:scale-105`}
                    >
                      Setups
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="animate-slide-up">
                    <DropdownMenuItem asChild>
                      <Link to="/add-setup" className="w-full h-full block">
                        Add Setup
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/setups" className="w-full h-full block">
                        View All Setups
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link
                  to="/mt5-integration"
                  className={`text-sm font-medium ${pathname === "/mt5-integration" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground transition-colors hover:scale-105`}
                >
                  MT5 Integration
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {
            location.pathname === '/' &&
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="#features"
                className={`text-sm font-medium ${pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground transition-colors hover:scale-105`}
              >
                Features
              </a>
              <a
                href="#pricing"
                className={`text-sm font-medium ${pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground transition-colors hover:scale-105`}
              >
                Pricing
              </a>
            </div>
          }
          <ModeToggle />
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 hover:scale-110 transition-transform">
                  <Avatar className="h-8 w-8 ring-2 ring-primary/30 hover:ring-primary/80 transition-all">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="animate-slide-up">
                <DropdownMenuItem>
                  <Link to="/settings" className="w-full h-full block">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/auth", { replace: true })}
              className="hover:bg-primary/10 transition-colors hover:scale-105"
            >
              Sign In
            </Button>
          )}
          {isMobile && location.pathname === '/' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-primary/10 transition-colors"
            >
              {isMenuOpen ? "Close" : "Menu"}
            </Button>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 border-b bg-background p-4 md:hidden flex flex-col gap-4 shadow-lg animate-slide-up">
          {
            !isLoggedIn && location.pathname === '/' &&
            <>
              <a
                href="#features"
                className={`text-base font-medium ${pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a
                href="#pricing"
                className={`text-base font-medium ${pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
            </>
          }
          {isLoggedIn && (
            <>
              {
                location.pathname === '/' &&
                <>
                  <a
                    href="#features"
                    className={`text-base font-medium ${pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Features
                  </a>
                  <a
                    href="#pricing"
                    className={`text-base font-medium ${pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground transition-colors`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Pricing
                  </a>
                  <hr className="border-t border-gray-300" />
                </>
              }
              <Link
                to="/dashboard"
                className={`text-base font-medium ${pathname === "/dashboard" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <div className="flex flex-col gap-2 pl-4">
                <div className="text-base font-medium text-muted-foreground">Entries</div>
                <Link
                  to="/add-journal-entry"
                  className={`text-sm font-medium ${pathname === "/add-journal-entry" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground transition-colors pl-2`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Add Entry
                </Link>
                <Link
                  to="/all-entries"
                  className={`text-sm font-medium ${pathname === "/all-entries" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground transition-colors pl-2`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  View All Entries
                </Link>
              </div>
              <div className="flex flex-col gap-2 pl-4">
                <div className="text-base font-medium text-muted-foreground">Setups</div>
                <Link
                  to="/add-setup"
                  className={`text-sm font-medium ${pathname === "/add-setup" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground transition-colors pl-2`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Add Setup
                </Link>
                <Link
                  to="/setups"
                  className={`text-sm font-medium ${pathname === "/setups" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground transition-colors pl-2`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  View All Setups
                </Link>
              </div>
              <Link
                to="/mt5-integration"
                className={`text-base font-medium ${pathname === "/mt5-integration" ? "text-foreground" : "text-muted-foreground"} hover:text-foreground transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                MT5 Integration
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
