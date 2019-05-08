import React from 'react';
import { Link } from "react-router-dom";

function Page404 () {
	return (
		<React.Fragment>
			<h1>404 Error</h1>
			<Link to="/">Main Page</Link>
		</React.Fragment>
	);
};

export default Page404;