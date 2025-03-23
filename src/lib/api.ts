
// API endpoints for demonstration
const API_ENDPOINTS = {
  "Test API 1": "https://jsonplaceholder.typicode.com/posts/1",
  "Test API 2": "https://jsonplaceholder.typicode.com/users/1",
  "Test API 3": "https://jsonplaceholder.typicode.com/comments/1"
};

export type ApiEndpoint = keyof typeof API_ENDPOINTS;

export const fetchApiData = async (endpoint: ApiEndpoint): Promise<any> => {
  try {
    // Simulate a slight delay to demonstrate loading state
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const response = await fetch(API_ENDPOINTS[endpoint]);
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
};

// Function to open Eclipse IDE
export const openEclipseIde = () => {
  try {
    // In a real application, this would use a protocol handler registered on the system
    // For demonstration purposes, we'll show how it might work
    
    // On Windows, this might be something like:
    // window.open('eclipse://open', '_self');
    
    // Since we can't actually launch desktop apps from the browser directly due to security restrictions,
    // we'll just show a toast notification in our implementation
    
    console.log("Attempting to open Eclipse IDE");
    return { success: true, message: "Launch request sent to Eclipse IDE" };
  } catch (error) {
    console.error("Failed to open Eclipse IDE:", error);
    return { success: false, message: "Failed to open Eclipse IDE" };
  }
};
