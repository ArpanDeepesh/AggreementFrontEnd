const FormSubmitButton = (props) => {
    return (<div>
        <button className='btn btn-info' style={{ backgroundColor: 'grey', border: 'grey solid 1px' }} onClick={props.onClick}>{props.name}</button>
    </div>);
};
export default FormSubmitButton;