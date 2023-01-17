import React from "react";

const DropDown = (props) => {
    const options = props.optionList.map((item) => (
      <option key={item.key} value={item.key}>
        {item.key} - {item.doc_count}
      </option>
    ));
    return (
      <div>
        <select onChange={props.onChange}>
          <option key="1">{props.name}</option>
          {options}
        </select>
      </div>
    );
}

export default DropDown;