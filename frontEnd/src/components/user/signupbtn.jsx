
import Swal from 'sweetalert2';
import web from '../../customers/web';
export default function signupBtn({loading,otpSent,otpLoading,setOtpLoading,setOtpSent,form ,navigate}){
    const Loginredirect = () => {
        navigate("/login")
    }

        const verifyOtp = async (event) => {
            event.preventDefault();
            const { email } = form;
            if (!email) {
              Swal.fire({
                icon: 'warning',
                title: 'Missing Email',
                text: 'Please enter your email address.',
              });
              return;
            }
        
            setOtpLoading(true);
        
            try {
              const response = await fetch(`${web}/generateOtp`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
              });
        
              const data = await response.json();
              if (response.ok) {
                Swal.fire({
                  icon: 'success',
                  title: 'OTP Sent',
                  text: `OTP sent to ${email}`,
                });
                setOtpSent(true);
                
        
                setTimeout(() => {
                  Swal.fire({
                    icon: 'info',
                    title: 'OTP Expired',
                    text: 'The OTP has expired. Please request a new one.',
                  });
                  sethidebtn(false)
                 
                }, 6 * 60 * 1000);
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error',
                  text: data.message,
                });
              }
            } catch (error) {
              console.log('Error:', error);
              Swal.fire({
                icon: 'error',
                title: 'Too Many Attempts',
                text: 'Too many attempts or something went wrong. Please try again later.',
              });
            } finally {
              setOtpLoading(false);
            }
          };
    return(
        <>
           <div className="accCreate">
              {otpSent ?
                <button
                  id="signupbtn"
                  className="submit"
                  type="submit"
                  disabled={loading || !otpSent}
                >
                  <span className="subspan2" id="subspan2" style={{ display: loading ? 'inline-block' : 'none' }}>
                    Creating..<span className="spinner"></span>
                  </span>
                  <span className="subspan1" id="subspan1" style={{ display: loading ? 'none' : 'inline-block' }}>
                    Sign-Up
                  </span>
                </button>
                 :
                <button
                  id="otpbtn"
                  onClick={verifyOtp}
                  disabled={otpLoading}
                  style={{ display: otpSent ? 'none' : 'block' }}
                >
                  <span className="subspan2" id="otpsubspan2" style={{ display: otpLoading ? 'inline-block' : 'none' }}>
                    Sending..<span className="spinner"></span>
                  </span>
                  <span className="subspan1" id="otpsubspan1" style={{ display: otpLoading ? 'none' : 'inline-block' }}>
                    Send OTP
                  </span>
                </button> }
    
                <button type="reset" onClick={Loginredirect}>
                  Login
                </button>
              </div>
        </>
    )
}