import React, { createContext, Component } from "react";

const ThemeContext = createContext();

class ThemeProvider extends Component {
  state = {
    theme: "dark", // Default theme key
  };

  themes = {
    dark: {
      id: 1,
      background: "bg-slate-900",
      text: "text-light",
    },
    light: {
      id: 2,
      background: "bg-slate-200",
      text: "text-light",
    },
    primary: {
      id: 3,
      background: "bg-primary-dark",
      text: "text-primary",
    },
    danger: {
      id: 4,
      background: "bg-danger-dark",
      text: "text-danger",
    },
    warning: {
      id: 5,
      background: "bg-warning-dark",
      text: "text-warning",
    },
    success: {
      id: 6,
      background: "bg-success-dark",
      text: "text-success",
    },
  };

  setThemeById = (id) => {
    const themeKey = Object.keys(this.themes).find(key => this.themes[key].id === id);
    if (themeKey) {
      this.setState({ theme: themeKey });
    }
  };

  render() {
    return (
      <ThemeContext.Provider
        value={{
          theme: this.state.theme,
          themes: this.themes,
          setThemeById: this.setThemeById,
        }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}

const ThemeConsumer = ThemeContext.Consumer;

export { ThemeProvider, ThemeConsumer, ThemeContext };
