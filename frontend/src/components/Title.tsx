
interface TitleProps {
    title: string;
    subtitle: string;
    aling?: string;
    front?: string;
}
const Title: React.FC<TitleProps> = ({ title, subtitle, aling, front }) => {
    return (
        <div className={`flex flex-col items-center justify-center text-center ${aling === "left" && "md:items-start md:text-left"}`}>
            <h1 className={`text-4xl md:text-[40px] ${front || "front-playfair"}`}>{title}</h1>
            <p className="text-sm md:text-base text-gray-500/90  max-w-174">{subtitle}</p>
        </div>
    );
}

export default Title;
