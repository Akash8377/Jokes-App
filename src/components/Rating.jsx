import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const ratingStyleNormal = {
    height: '2vh',
    width: '2vh',
    border: '1px solid black',
    backgroundColor: 'white',
    cursor: 'pointer',
    borderRadius: '1vh',
    marginLeft: '1vh'
}

const ratingStyleClicked = {
    height: '2vh',
    width: '2vh',
    border: '1px solid black',
    backgroundColor: 'red',
    cursor: 'pointer',
    borderRadius: '1vh',
    marginLeft: '1vh'
}

const ratingSystemStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '10px'
}
export default function Rating({ rating, setRating }) {
    const [ratingStyle, setRatingStyle] = useState([ratingStyleNormal, ratingStyleNormal, ratingStyleNormal, ratingStyleNormal, ratingStyleNormal])

    useEffect(() => {
        let Arr = []
        if (rating === 0) {
            for (let i = 1; i <= 5; i++) {
                Arr.push(ratingStyleNormal)
            }

            setRatingStyle(Arr)
        }
    }, [rating])

    const ratingHandler = (ratingNum) => {
        let arr = []
        if (ratingNum === 1 && ratingStyle[0] === ratingStyleClicked && ratingStyle[1] === ratingStyleNormal) {
            for (let i = 1; i <= 5; i++) {
                arr.push(ratingStyleNormal)
            }
            setRating(0)
        } else {
            for (let i = 1; i <= 5; i++) {
                if (i <= ratingNum) {
                    arr.push(ratingStyleClicked)
                } else {
                    arr.push(ratingStyleNormal)
                }
            }
            setRating(ratingNum)
        }
        setRatingStyle(arr)

    }
    return (
        <div className='ratingSystem' style={ratingSystemStyle}>
            <h5 style={{ marginTop: '.5vh' }}>Rating:</h5>
            <div onClick={(e) => ratingHandler(1)} style={ratingStyle[0]} className='rating'></div>
            <div onClick={(e) => ratingHandler(2)} style={ratingStyle[1]} className='rating'></div>
            <div onClick={(e) => ratingHandler(3)} style={ratingStyle[2]} className='rating'></div>
            <div onClick={(e) => ratingHandler(4)} style={ratingStyle[3]} className='rating'></div>
            <div onClick={(e) => ratingHandler(5)} style={ratingStyle[4]} className='rating'></div>
        </div>
    )
}
