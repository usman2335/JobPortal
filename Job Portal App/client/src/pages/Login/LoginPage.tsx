import { LoginForm } from "@/components/Forms/login-form";
import { motion } from "motion/react";
import React from "react";

const LoginPage = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-center min-h-screen bg-muted "
      >
        <LoginForm />
      </motion.div>
    </>
  );
};

export default LoginPage;
