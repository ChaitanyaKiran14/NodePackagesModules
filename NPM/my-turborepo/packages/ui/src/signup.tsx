"use client";

import { ReactNode } from "react";

interface SignupProps {
  children?: ReactNode;
  className?: string;
}

export const Signup = ({ children, className }: SignupProps) => {
  return (
    <div className={`signup-container ${className}`}>
      <style>{`
        .signup-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f5f5f5;
        }

        .signup-form {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          box-sizing: border-box;
        }

        .signup-form h2 {
          margin-bottom: 20px;
          font-size: 24px;
          text-align: center;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          margin-bottom: 5px;
        }

        .form-group input {
          width: 100%;
          padding: 10px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 4px;
          box-sizing: border-box;
        }

        .form-group button {
          width: 100%;
          padding: 10px;
          font-size: 16px;
          color: white;
          background-color: #007bff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .form-group button:hover {
          background-color: #0056b3;
        }
      `}</style>

      <form className="signup-form">
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
          />
        </div>
        <div className="form-group">
          <button type="button" onClick={() => alert("Signup successful!")}>
            Sign Up
          </button>
        </div>
        {children}
      </form>
    </div>
  );
};
