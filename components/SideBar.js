export default function SideBar({className, width, children}) {
    return (
        <div className={(className || "") + " sidebar"} style={{
            width: width ? width + "px" : "auto",
        }}>
            {children}
        </div>
    );
}