// ErrorBoundary.jsx
import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Customize the fallback UI
      return (
        <div>
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message || "An error occurred"}</p>
        </div>
      );
    }

    return this.props.children; // Render the children if no error
  }
}

export default ErrorBoundary;
