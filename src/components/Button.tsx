import React from 'react';

interface ButtonProps {
    onClick: () => void;
    label: string;
    bgColor?: string;
    icon?: React.ReactNode;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, icon, className, type = 'button', disabled = false }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={className ? className : "flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg transition-colors shadow-md"}
        >
            {icon && <span>{icon}</span>}
            <span>{label}</span>
        </button>
    );
};

export default Button;
