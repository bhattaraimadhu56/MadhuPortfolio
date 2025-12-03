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

function AppRoutes() {
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
        

        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
      <Footer />
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
        <ThemeProvider
          defaultTheme="light"
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
      </DataProvider>
    </ErrorBoundary>
  );
}

export default App;


