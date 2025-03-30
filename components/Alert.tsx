// components/Alert.tsx
import React, { useEffect, useState } from 'react';

interface AlertProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hide alert after 5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`text-[1.2rem] font-semibold font-bol fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-lg text-white w-[15rem] h-[4rem] md:w-[20rem] md:h-[6rem] lg:w-[25rem] lg:h-[8.8rem] ${
        type === 'success'
          ? 'bg-green-500'
          : type === 'error'
          ? 'bg-red-500'
          : 'bg-blue-500'
      }`}
    >
      {message}
    </div>
  );
};

export default Alert;
