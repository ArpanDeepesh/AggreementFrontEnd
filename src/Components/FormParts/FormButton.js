import './btn.css';
const FormButton = (props) => {
    return (<div>
        <button className='btn btn-info myBtn' type="button" style={{
            
            margin: '5px'
        }} onClick={props.onClick}>{props.name}</button>
    </div>);
};
export default FormButton;