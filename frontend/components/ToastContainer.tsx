'use client'

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Toaster } from "react-hot-toast"

const ToastContainer = () => {

  return (
    <Toaster 
      position="top-center" 
      reverseOrder={false} 
      toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
        },
      }} 
    />
  );
}

export default ToastContainer