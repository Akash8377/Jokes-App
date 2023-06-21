import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';
import Loading from './Loading';
import Rating from './Rating';
import bookmark from '../asset/bookmark.png';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const jokeApi = 'https://official-joke-api.appspot.com/random_joke';

const deleteBookmarkButtonStyle = {
    width: '10vw',
    backgroundColor: 'red',
    color: 'White',
    border: '0',
    borderRadius: '5px',
    fontWeight: 'bolder',
    padding: '10px',
    marginLeft: '10vw'
}

const cardStyle = {
    height: '50vh',
    width: '60vw',
}

const cardBodyStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

const jokeStyle = {
    height: '20vh',
    width: '40vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}
export default function JokeDisplay() {

    const [joke, setJoke] = useState()
    const [data, setData] = useState(0);
    const [rating, setRating] = useState(0)

    // useStates for modal
    const [bookmarks, setBookMarks] = useState([])
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true)
    const handleClose = () => setShow(false);

    useEffect(() => {
        if (bookmarks.length === 0) {
            let arr = [];
            for (let i = 1; i <= 1000; i++) {
                if (localStorage.getItem(`${i}`)) {
                    arr.push(JSON.parse(localStorage.getItem(`${i}`)))
                }
            }
            setBookMarks(arr)
        }
    }, [bookmarks])

    const bookmarkDeleteHandler = (id) => {
        localStorage.removeItem(id)
        setBookMarks([])
    }
    // modal ends here 

    // fecthing jokeApi
    useEffect(() => {
        Axios.get(jokeApi)
            .then((res) => {
                // console.log(res.data);
                setJoke(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [data])

    const newJokeHandler = () => {
        const randomNum = Math.random() * 100
        setData(randomNum)
        setJoke()
        setRating(0)
    }

    // setting bookmark here
    const bookMarkHandler = () => {
        localStorage.setItem(joke.id, JSON.stringify({ ...joke, rating: rating }))
        setBookMarks([])
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Your Bookmarks</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ padding: '20px' }}>
                    {bookmarks.map((e, i) => {
                        return (
                            <Modal.Dialog key={e.id}>
                                <b >
                                    {e.setup}
                                </b>
                                <b>
                                    {e.punchline}
                                </b>
                                <b>
                                    Rating: {e.rating}/5
                                </b>
                                <button onClick={(event) => { bookmarkDeleteHandler(e.id) }} style={deleteBookmarkButtonStyle}>Delete</button>
                            </Modal.Dialog>
                        )
                    })}
                </Modal.Body>
            </Modal>
            <Card style={cardStyle}>
                <Card.Body style={cardBodyStyle}>
                    <Card.Header style={{ width: '60vw', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgb(195, 195, 195)' }}>
                        <Card.Text style={{ textDecoration: 'underline' }}>
                            JOKES APPLLICATION
                        </Card.Text>
                        <button onClick={(e) => handleShow()} style={{ border: '0', marginLeft: '10vh', backgroundColor: 'inherit' }}>
                            <img
                                src={bookmark}
                                alt='bookmarkIcon'
                                style={{ height: '4vh', width: '4vh', cursor: 'pointer' }}
                                className='bookmarkIcon'
                            />
                        </button>
                    </Card.Header>
                    <Card.Title style={jokeStyle}>
                        {joke && <>
                            <p>{joke.setup}</p>
                            <p>{joke.punchline}</p>
                        </>}
                        {!joke && <Loading />}
                    </Card.Title>
                    
                    <ButtonGroup>
                        <Button variant="danger" onClick={(e) => newJokeHandler()} style={{ marginRight: '1vw' }}>New Joke</Button>
                        <Button variant="info" onClick={(e) => bookMarkHandler()}>Bookmark</Button>
                    </ButtonGroup>
                    <Rating rating={rating} setRating={setRating} />
                </Card.Body>
            </Card>
        </>
    );
}
