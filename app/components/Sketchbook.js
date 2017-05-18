import React from 'react'
import {Link} from 'react-router-dom'

export default class Sketchbook extends React.Component {
	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-sm-4 center-block">
						<h1 className="text-center"> Sketchbook</h1>
						<div className="list-group h4 text-center">
							{
								sketchbook.length === 0 ? (<h2>No Sketches Found</h2>) : sketchbook.map((sketch) => (<Link key={`link-${sketch}`} to={`/${sketch}`} className="list-group-item">{sketch.replace('sketches/','')}</Link>))
							}
						</div>
					</div>
				</div>
			</div>)
	}
}