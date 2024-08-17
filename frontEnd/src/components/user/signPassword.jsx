import { useState } from "react";

export default function signPassword({form,handleInputChange}){
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const passWordChange = () => {
        setShowPassword(!showPassword)
      };
      const repeatpassChange=()=>{
        setShowRepeatPassword(!showRepeatPassword)
      }
    
    return(
        <>
           <div className="input-group">
                <label>Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder="Your password"
                  minLength="6"
                  maxLength="10"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleInputChange}
                  required
                />
                <span
                  className="input-icon"
                  id="eye"
                  onClick={passWordChange}
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </span>
              </div>
    
              <div className="input-group">
                <label>Enter Password Again</label>
                <input
                  type={showRepeatPassword ? 'text' : 'password'}
                  name="repeatpass"
                  id="repeatpass"
                  placeholder="Enter your password again"
                  minLength="6"
                  maxLength="10"
                  autoComplete="new-password"
                  value={form.repeatpass}
                  onChange={handleInputChange}
                  required
                />
                <span
                  id="eye2"
                  className="input-icon"
                  onClick={repeatpassChange}
                >
                  {showRepeatPassword ? 'HIDE' : 'SHOW'}
                </span>
              </div>
           
        </>
    )
}