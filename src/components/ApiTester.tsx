
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Copy, ExternalLink, Trash, Send, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LoadingSpinner from "./LoadingSpinner";
import { ApiEndpoint, fetchApiData, openEclipseIde } from "@/lib/api";

const ApiTester = () => {
  const [selectedApi, setSelectedApi] = useState<ApiEndpoint>("Test API 1");
  const [textContent, setTextContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseData, setResponseData] = useState<any | null>(null);

  // Handle API selection
  const handleApiChange = (value: string) => {
    setSelectedApi(value as ApiEndpoint);
    setResponseData(null);
  };

  // Handle external URL navigation
  const navigateToTestsigma = () => {
    window.open("https://testsigma.com/", "_blank", "noopener,noreferrer");
  };
  
  // Handle Eclipse IDE launch
  const handleOpenEclipse = () => {
    const result = openEclipseIde();
    
    if (result.success) {
      toast.success("Eclipse IDE launch request sent");
    } else {
      toast.error("Failed to open Eclipse IDE");
    }
  };
  
  // Handle copying text content
  const handleCopy = () => {
    if (!textContent) {
      toast.info("Nothing to copy");
      return;
    }
    
    navigator.clipboard.writeText(textContent)
      .then(() => toast.success("Copied to clipboard"))
      .catch(() => toast.error("Failed to copy text"));
  };
  
  // Handle clearing text content
  const handleClear = () => {
    if (!textContent) {
      toast.info("Text area is already empty");
      return;
    }
    
    setTextContent("");
    toast.success("Text cleared");
  };

  // Handle API submission
  const handleSubmit = async () => {
    setIsLoading(true);
    setResponseData(null);
    
    try {
      const data = await fetchApiData(selectedApi);
      setResponseData(data);
      
      // If there's text content, append it to the response
      if (textContent) {
        setTextContent((prev) => 
          `${prev}\n\nResponse from ${selectedApi}:\n${JSON.stringify(data, null, 2)}`
        );
      } else {
        setTextContent(`Response from ${selectedApi}:\n${JSON.stringify(data, null, 2)}`);
      }
      
      toast.success(`Successfully fetched data from ${selectedApi}`);
    } catch (error) {
      console.error("Error fetching API:", error);
      toast.error(`Failed to fetch data: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="container mx-auto px-4 md:px-6 pb-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div 
          className="glass-card rounded-xl p-6 shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          {/* Button Group */}
          <motion.div 
            className="grid grid-cols-2 gap-4 mb-6"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <Button 
              variant="default" 
              onClick={navigateToTestsigma}
              className="button-transition hover-lift group"
            >
              <ExternalLink className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              Testsigma.com
            </Button>
            
            <Button 
              variant="outline"
              onClick={handleOpenEclipse}
              className="bg-accent text-accent-foreground button-transition hover-lift group"
            >
              <Terminal className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
              Open Eclipse IDE
            </Button>
          </motion.div>
          
          {/* API Selection */}
          <motion.div 
            className="mb-6"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.7 }}
          >
            <label className="block text-sm font-medium mb-2">
              Select API Endpoint
            </label>
            <Select value={selectedApi} onValueChange={handleApiChange}>
              <SelectTrigger className="w-full bg-background/80 backdrop-blur-sm">
                <SelectValue placeholder="Select an API endpoint" />
              </SelectTrigger>
              <SelectContent className="bg-background/95 backdrop-blur-md border border-border/30">
                <SelectItem value="Test API 1">Test API 1</SelectItem>
                <SelectItem value="Test API 2">Test API 2</SelectItem>
                <SelectItem value="Test API 3">Test API 3</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
          
          {/* Text Area */}
          <motion.div
            className="mb-6"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
          >
            <label className="block text-sm font-medium mb-2">
              Text Content
            </label>
            <Textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Enter text or view API response here..."
              className="min-h-32 resize-y bg-background/80 backdrop-blur-sm"
            />
          </motion.div>
          
          {/* Text Actions */}
          <motion.div 
            className="grid grid-cols-4 gap-3"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.9 }}
          >
            <Button 
              variant="outline" 
              onClick={handleCopy}
              className="col-span-1 button-transition"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleClear}
              className="col-span-1 button-transition"
            >
              <Trash className="mr-2 h-4 w-4" />
              Clear
            </Button>
            
            <Button 
              variant="default" 
              onClick={handleSubmit}
              disabled={isLoading}
              className={cn(
                "col-span-2 button-transition",
                isLoading ? "opacity-90" : "hover-lift"
              )}
            >
              {isLoading ? (
                <LoadingSpinner size="sm" className="mr-2" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              {isLoading ? "Submitting..." : "Submit Request"}
            </Button>
          </motion.div>
          
          {/* Response Preview */}
          <AnimatePresence>
            {responseData && (
              <motion.div
                className="mt-6 p-4 rounded-lg bg-muted/70 backdrop-blur-sm"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-sm font-semibold mb-2">Response Preview</h3>
                <pre className="text-xs overflow-auto p-2 rounded bg-background/80 max-h-40">
                  {JSON.stringify(responseData, null, 2)}
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ApiTester;
