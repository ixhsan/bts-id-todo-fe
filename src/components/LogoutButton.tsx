// src/components/LogoutButton.tsx
import { LogOut } from 'lucide-react';
import { Button, ButtonProps } from '@/components/ui/button';
import { useLogout } from '@/hooks/useLogout';

interface LogoutButtonProps extends Omit<ButtonProps, 'onClick'> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  showIcon?: boolean;
}

export const LogoutButton = ({ 
  variant = 'outline', 
  showIcon = true,
  className = '',
  ...props 
}: LogoutButtonProps) => {
  const { handleLogout } = useLogout();

  return (
    <Button
      variant={variant}
      onClick={handleLogout}
      className={`${className} ${
        variant === 'outline' 
          ? 'bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700' 
          : ''
      }`}
      {...props}
    >
      {showIcon && <LogOut className="mr-2 h-4 w-4" />}
      Logout
    </Button>
  );
};