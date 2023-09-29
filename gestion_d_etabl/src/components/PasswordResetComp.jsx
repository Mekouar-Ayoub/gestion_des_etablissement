import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";

function PasswordResetComp() {

    const [email, setEmail] = useState("");

    handleSubmit = () =>  {
        if (!email) {
            setErrorMessage('Please enter all fields');
            return;
        }
    }

  return(
    <Box noValidate sx={{ mt: 1 }}>
                        
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoComplete="email"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            autoFocus
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmit}
                        >
                           Reset Password
                        </Button>
    </Box>

  )
}

export default Auth;
