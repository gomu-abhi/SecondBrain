interface ButtonProps {
    variant: "primary" | "secondary" | "iconPrimary" | "iconSecondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: any;
    endIcon?: any;
    onClick: () => void;
    loading? : boolean;
}

const variantStyles = {
    "primary" : "bg-[#5148dd] text-white gap-2",
    "secondary" : "bg-[#e1e6fd] text-[#3e38a7] gap-2",
    "iconPrimary" : "bg-gray-300 trasition-all text-black border",
    "iconSecondary" : "bg-white transition-all text-black"
}

export const Button = (props: ButtonProps) => {
    return (
        <button className={`${variantStyles[props.variant]} py-2 px-4 rounded-md font-normal flex justify-center items-center ${props.loading ? " opacity-40 " : ""} ${props.loading ? "" : "cursor-pointer"}`} 
            onClick={props.onClick}
            disabled = {props.loading}
            >
            {props.startIcon && (
                <span className="flex items-center">
                {props.startIcon}
                </span>
            )}
            <span>{props.text}</span>
            {props.endIcon && (
                <span className="flex items-center">
                {props.endIcon}
                </span>
            )}
        </button>
    );
}