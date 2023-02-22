import React, { } from 'react';

function DateInput(props) {
    // const [date, setDate] = useState(props.initialDate);

    const {Date} = props;

    function handleChange(event) {
        // setDate(event.target.value);
        console.log(event.target.value)
        props.onChange(event.target.value);
    }

    return (
        <input style={{display: 'block', marginBottom: '20px'}} type="date" value={Date} onChange={handleChange} />
    );
}

export default DateInput;
