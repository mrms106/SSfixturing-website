import { useState } from "react";

export default function LoginForm({navigate,handleLoginSubmit,loading,inputChange,loginForm}){
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
      };
    
      const handleSignupRedirect = () => {
        navigate("/signup")
      };

    return(
        <>
        <div className="contactus">
        <form onSubmit={handleLoginSubmit}>
          <div className="input-group">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Your username"
              autoComplete="username"
              value={loginForm.username}
              onChange={inputChange}
              required
            />
            <span className="input-icon">
              <i className="fas fa-user"></i>
            </span>
          </div>
          
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              placeholder="Your password"
              autoComplete="current-password"
              value={loginForm.password}
              onChange={inputChange}
              required
            />
            <span className="input-icon" id="showPass" onClick={handleShowPassword}>
              {showPassword ? 'HIDE' : 'SHOW'}
            </span>
          </div>
          <div className="accCreate">
            <button type="submit" className="submit" id="submit">
              {loading ? (
                <span className="subspan2" id="subspan2">
                  Logging in<span className="spinner"></span>
                </span>
              ) : (
                <span className="subspan1" id="subspan1">Log-In</span>
              )}
            </button>
            <button type="button" onClick={handleSignupRedirect}>
              Sign-UP?
            </button>
          </div>
        </form>
      </div>
        </>
    )
}