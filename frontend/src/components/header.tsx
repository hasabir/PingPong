import React from "react";
import "./header.css"

type HeaderDescription = {
    title: string;
    description?: string;
};

function Header({ title, description }: HeaderDescription) {
    return (
        <header>
            <h1>{title}</h1>
            {description && <p>{description}</p>}
        </header>
    );
}

export default Header;
