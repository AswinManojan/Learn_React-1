import ReactDOM from 'react-dom/client'
import Todo from './src/components/Todo';

function App(){
    return(
        <div>
            <Todo/>
        </div>
    )
}

const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>)