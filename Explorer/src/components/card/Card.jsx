import React from 'react'

const Card = (props) => {
    return (
        <div className="card">
            <div className="top">
                <img src={props.img} alt="Placeholder" />
            </div>
            <div className="center">
                <h1>{props.name}</h1>
                <p>
                    {props.name} is a {props.role}.
                </p>
            </div>
            <div className="bottom">
                <button>Follow</button>
                <button>Save</button>
            </div>
        </div>
    )
}

export default Card
