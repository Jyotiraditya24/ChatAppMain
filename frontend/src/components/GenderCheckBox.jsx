const GenderCheckBox = () => {
  return (
    <div className="flex">
      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text mx-1">Male</span>
          <input type="checkbox" className="checkbox checkbox-info" />
        </label>
      </div>
      <div className="form-control">
        <label className="cursor-pointer label">
          <span className="label-text mx-1">Female</span>
          <input type="checkbox" className="checkbox checkbox-secondary" />
        </label>
      </div>
    </div>
  );
};

export default GenderCheckBox;
