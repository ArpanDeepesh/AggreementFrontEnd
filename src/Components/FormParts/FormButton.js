import './btn.css';
const FormButton = (props) => {
    return (<div>
        <button className={props.myClass ? 'btn btn-info ' + props.myClass : 'btn btn-info myBtn'} type="button" style={props.myStyle ? props.myStyle : {
            margin: '5px'
        }} onClick={props.onClick}>{props.name}</button>
    </div>);
};
export default FormButton;