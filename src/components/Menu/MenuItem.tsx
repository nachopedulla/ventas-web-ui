import './Menu.css';

const MenuItem = (
    {text, route, handler} : {text : string, route: string, handler: Function }) => (
    <button 
        className="menuItem" 
        onClick={() => handler(route)}
    >
        {text}
    </button>
) 

export default MenuItem;