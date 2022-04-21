import React, { Component, ReactChild } from "react";

interface Props {
  children: ReactChild;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };

  static getDerivedStateFromError(_: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.log("an error happened in rendering components : ", error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <span>Something went wrong while rendering components !!!</span>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
