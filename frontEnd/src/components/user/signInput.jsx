export default function signInput({form,handleInputChange}){
    return (
        <>
           <div className="input-group">
                <label>Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Your username"
                  autoComplete="username"
                  value={form.username}
                  onChange={handleInputChange}
                  required
                />
                <span className="input-icon">
                  <i className="fas fa-user"></i>
                </span>
              </div>
    
              <div className="input-group">
                <label>E-Mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={handleInputChange}
                  required
                />
                <span className="input-icon">
                  <i className="fas fa-envelope"></i>
                </span>
              </div>
    
             
    
              <div className="input-group">
                <label>OTP</label>
                <input
                  type="number"
                  name="otp"
                  id="otp"
                  placeholder="Enter OTP"
                  value={form.otp}
                  onChange={handleInputChange}
                  required
                />
                <span className="input-icon">
                  <i className="fas fa-key"></i>
                </span>
              </div>
        </>
    )
}