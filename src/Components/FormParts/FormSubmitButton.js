import './btn.css';
const FormSubmitButton = (props) => {
    return (<div>
        <button className='btn btn-info myBtn' style={props.myStyle ? props.myStyle:{
            margin: '5px'
        }} type="submit" onClick={props.onClick}>{props.name}</button>
    </div>);
};
export default FormSubmitButton;