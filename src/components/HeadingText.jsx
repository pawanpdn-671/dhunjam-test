import React from "react";

const HeadingText = ({ text }) => {
	return <div>{text && <h2 className="heading-text">{text}</h2>}</div>;
};

export default HeadingText;
