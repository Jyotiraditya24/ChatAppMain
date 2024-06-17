const GenderCheckBox = ({ inputs, handleChange }) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text mx-1">Male</span>
          <input
            name="gender"
            type="checkbox"
            value="male"
            className="checkbox checkbox-info"
            checked={inputs.gender === "male"}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text mx-1">Female</span>
          <input
            name="gender"
            type="checkbox"
            value="female"
            className="checkbox checkbox-secondary"
            checked={inputs.gender === "female"}
            onChange={handleChange}
          />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckBox;
