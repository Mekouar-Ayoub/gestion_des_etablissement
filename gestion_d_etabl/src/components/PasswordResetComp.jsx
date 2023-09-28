import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";

function PasswordResetComp() {

    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState();
    const handleSubmit = () =>  {
        if (!email) {
            setErrorMessage('Please enter all fields');
            return;
        }
    }

  return(
    <Box noValidate sx={{ mt: 1 }}>
                        
                        <input
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoComplete="email"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            autoFocus
                        />

                        <button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                           Reset Password
                        </button>
    </Box>

  )
}

export default PasswordResetComp;
