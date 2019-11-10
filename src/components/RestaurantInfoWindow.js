import React from "react";

export function RestaurantInfoWindow({name, address, url}) {
  return <div>
            <h2>{name}</h2>
            <img src={url} alt='restaurant' />
            <p>{address}</p>
            <button>Click me!</button>
          </div>;
}
  