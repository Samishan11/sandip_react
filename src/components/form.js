export const form = (arr, inputFields, index) => {


    // var inputFields = []
    const handleFormChange = (event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        // setInputFields(data);
        console.log(event.target.value)
    };

    return (
        <>
            <div className="mb-3">
                <label htmlFor="" className="form-label">
                    {arr?.name}
                </label>
                <input
                    type="text"
                    name={`${arr?.name}`}
                    onChange={(e) => handleFormChange(e, index)}
                    className="form-control"
                    value={inputFields[index].name}
                    placeholder={`${arr?.name}`}
                    id={`${arr.name}`}
                    aria-describedby="" />
            </div>
        </>
    );
};