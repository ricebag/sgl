export const HorizontalLine = ({ title }: { title: string }) => {
    return (
        <div className="relative flex py-5 items-center w-[80%]">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400 text-xl">{title}</span>
            <div className="flex-grow border-t border-gray-400"></div>
        </div>
    );
}