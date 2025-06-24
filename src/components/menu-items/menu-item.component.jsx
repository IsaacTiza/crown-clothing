import React from "react";
// import {  withRouter  } from "react-router-dom";
import { useNavigate,} from "react-router-dom";
import "./menu-item.style.css";

const MenuItem = ({ title, imageUrl, size, linkUrl }) => {
	const navigate = useNavigate();
	// const location = useLocation();
	// const params = useParams();

	// console.log(params)
	return (
		<div
			className={`${size} menu-item`}
			onClick={()=> navigate(`${linkUrl}`)}>
			<div
				className="background-image"
				style={{
					backgroundImage: `url(${imageUrl})`,
				}}
			/>
			<div className="content">
				<h1 className="title">{title.toUpperCase()}</h1>
				<span className="subtitle">SHOP NOW</span>
			</div>
		</div>
	);
};

export default MenuItem;
