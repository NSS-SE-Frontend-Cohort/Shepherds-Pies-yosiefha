import React from "react";
import { Pizza, ChefHat, Smile } from "lucide-react";

const Header = () => {
  const generateRandomPosition = () => {
    const randomX = Math.floor(Math.random() * 100) + "%";
    const randomY = Math.floor(Math.random() * 100) + "%";
    return { randomX, randomY };
  };

  return (
    <header className="app-header">
      <div className="header-text-container">
        <h1 className="app-header-text">Shepherd's Pies Order Management</h1>
        <p className="app-header-subtext">Effortlessly manage orders with our intuitive interface</p>
      </div>

      {/* Animations */}
      <div className="header-animation-pizzas">
        {[...Array(6)].map((_, index) => {
          const { randomX, randomY } = generateRandomPosition();
          return (
            <Pizza
              key={`pizza-${index}`}
              className="app-header-icon pizza-icon"
              style={{
                left: randomX,
                top: randomY,
                animationDelay: `${index * 2}s`,
              }}
            />
          );
        })}
      </div>

      <div className="header-animation-hats">
        {[...Array(6)].map((_, index) => {
          const { randomX, randomY } = generateRandomPosition();
          return (
            <ChefHat
              key={`chef-hat-${index}`}
              className="app-header-icon chef-hat-icon"
              style={{
                left: randomX,
                top: randomY,
                animationDelay: `${index * 2}s`,
              }}
            />
          );
        })}
      </div>

      <div className="header-animation-smiles">
        {[...Array(6)].map((_, index) => {
          const { randomX, randomY } = generateRandomPosition();
          return (
            <Smile
              key={`smile-${index}`}
              className="smiling-chef-icon animated-smile"
              style={{
                left: randomX,
                top: randomY,
                animationDelay: `${index * 2}s`,
              }}
            />
          );
        })}
      </div>
    </header>
  );
};

export default Header;
