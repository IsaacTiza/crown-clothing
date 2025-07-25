import React from "react";
import CollectionItem from "../collection-items/collection-item.component";
import './collection-preview.styles.css';

const CollectionPreview = ({ title, items }) => {
	return (
		<div className="collection-preview">
			<h1 className="tilte">{title.toUpperCase()}</h1>
			<div className="preview">
				{items
					.filter((item, idx) => idx < 4)
                    .map(({ id, ...otherItemProps }) => (
						<CollectionItem key={id} {...otherItemProps}/>
					))}
			</div>
		</div>
	);
};

export default CollectionPreview;
