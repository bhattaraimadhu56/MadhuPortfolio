import { Toaster } from "@/components/ui/sonner";
import { AppData } from "./lib/configLoader";
import { DataProvider } from "./contexts/DataContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useScrollToTop } from "./hooks/useScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BlogPost from "./pages/BlogPost";
import { AdminProvider } from "./contexts/AdminContext";
import { AdminPasswordDialog } from "./components/AdminPasswordDialog";
import { AdminIndicator } from "./components/AdminIndicator";
import { lazy, Suspense } from "react";
import { useAdmin } from "./contexts/AdminContext";

// Lazy load admin editor to avoid loading it for regular users
const AdminEditor = lazy(() => import("./pages/AdminEditor"));

function AppRoutes() {
  const { isAuthenticated } = useAdmin();
  
  return (
    <>
      <Header />
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path="/about" component={About} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        <Route path="/contact" component={Contact} />
        <Route path={"/404"} component={NotFound} />
        
        {/* Admin route - only accessible when authenticated */}
        {isAuthenticated && (
          <Route path="/admin">
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading Admin Editor...</p>
                </div>
              </div>
            }>
              <AdminEditor />
            </Suspense>
          </Route>
        )}

        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
      <Footer />
      
      {/* Admin components - only shown when needed */}
      <AdminPasswordDialog />
      <AdminIndicator />
    </>
  );
}

interface AppProps {
  appData: AppData;
}

function App({ appData }: AppProps) {
   useScrollToTop(); 
  return (
    <ErrorBoundary>
      <DataProvider appData={appData}>
        <AdminProvider>
          <ThemeProvider
            defaultTheme="dark"
            switchable
          >
            <TooltipProvider>
              {/*  To show in github hosting with custom domain/... */} 
              <Router base={import.meta.env.BASE_URL}>
                <Toaster />
                <AppRoutes />
              </Router>
            </TooltipProvider>
          </ThemeProvider>
        </AdminProvider>
      </DataProvider>
    </ErrorBoundary>
  );
}

export default App;
